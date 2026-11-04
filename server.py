"""
Sanmarga Geleyara Balaga - Web & MongoDB API Server
Serves static website assets and full REST API powered by MongoDB.
"""
import os
import sys
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from dotenv import load_dotenv, set_key

from db import db_manager, clean_doc

# Load environment
load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PORT = int(os.getenv("PORT", 5500))

app = Flask(__name__, static_folder=BASE_DIR)
CORS(app)

# Try seeding on start if DB is connected
if db_manager.is_connected:
    try:
        db_manager.seed_default_data(force=False)
    except Exception as e:
        print(f"[Seed] Error on auto-seed: {e}")

# -------------------------------------------------------------
# DATABASE MANAGEMENT & HEALTH
# -------------------------------------------------------------
@app.route('/api/health', methods=['GET'])
def health_check():
    status = db_manager.get_status()
    return jsonify({
        "status": "online",
        "timestamp": datetime.utcnow().isoformat(),
        "database": status
    })

@app.route('/api/db/config', methods=['POST'])
def update_db_config():
    data = request.get_json(silent=True) or {}
    uri = data.get("uri", "").strip()
    db_name = data.get("db_name", "").strip() or "sanmarga_balaga"

    if not uri:
        return jsonify({"success": False, "error": "MongoDB URI cannot be empty"}), 400

    success, msg = db_manager.connect(uri=uri, db_name=db_name)
    
    # Save to .env file if successful
    if success:
        env_path = os.path.join(BASE_DIR, ".env")
        try:
            set_key(env_path, "MONGODB_URI", uri)
            set_key(env_path, "DB_NAME", db_name)
        except Exception as e:
            print(f"[Config] Note saving to .env: {e}")

        # Seed data if database is empty
        try:
            db_manager.seed_default_data(force=False)
        except Exception:
            pass

    return jsonify({
        "success": success,
        "message": msg,
        "database": db_manager.get_status()
    }), (200 if success else 400)

@app.route('/api/db/seed', methods=['POST'])
def trigger_seed():
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected. Connect first to seed."}), 400
    
    force = request.args.get("force", "false").lower() == "true"
    success, msg = db_manager.seed_default_data(force=force)
    return jsonify({"success": success, "message": msg, "database": db_manager.get_status()})

@app.route('/api/db/sync', methods=['POST'])
def sync_local_data():
    """Bulk sync data from browser localStorage into MongoDB"""
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected"}), 400

    data = request.get_json(silent=True) or {}
    counts = {"enquiries": 0, "donations": 0, "volunteers": 0, "gallery": 0, "stats": 0}

    # Sync enquiries
    for item in data.get("enquiries", []):
        if isinstance(item, dict) and item.get("id"):
            db_manager.db.enquiries.update_one({"id": item["id"]}, {"$set": item}, upsert=True)
            counts["enquiries"] += 1

    # Sync donations
    for item in data.get("donations", []):
        if isinstance(item, dict) and item.get("id"):
            db_manager.db.donations.update_one({"id": item["id"]}, {"$set": item}, upsert=True)
            counts["donations"] += 1

    # Sync volunteers
    for item in data.get("volunteers", []):
        if isinstance(item, dict) and item.get("id"):
            db_manager.db.volunteers.update_one({"id": item["id"]}, {"$set": item}, upsert=True)
            counts["volunteers"] += 1

    # Sync gallery
    for item in data.get("gallery", []):
        if isinstance(item, dict) and item.get("id"):
            db_manager.db.gallery.update_one({"id": item["id"]}, {"$set": item}, upsert=True)
            counts["gallery"] += 1

    # Sync stats
    for item in data.get("stats", []):
        if isinstance(item, dict) and item.get("id"):
            db_manager.db.stats.update_one({"id": item["id"]}, {"$set": item}, upsert=True)
            counts["stats"] += 1

    return jsonify({
        "success": True,
        "message": "Local data synchronized to MongoDB successfully!",
        "synced": counts,
        "database": db_manager.get_status()
    })

# -------------------------------------------------------------
# ENQUIRIES / CONTACT API
# -------------------------------------------------------------
@app.route('/api/enquiries', methods=['GET', 'POST'])
def handle_enquiries():
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected", "data": []}), 503

    if request.method == 'GET':
        docs = list(db_manager.db.enquiries.find({}).sort("createdAt", -1))
        return jsonify({"success": True, "data": clean_doc(docs)})

    if request.method == 'POST':
        payload = request.get_json(silent=True) or {}
        new_id = payload.get("id") or ("ENQ-" + datetime.utcnow().strftime("%Y%m%d%H%M%S"))
        doc = {
            "id": new_id,
            "name": payload.get("name", "").strip(),
            "contact": payload.get("contact", "").strip(),
            "email": payload.get("email", "").strip(),
            "purpose": payload.get("purpose", "General Enquiry").strip(),
            "subject": payload.get("subject", "").strip(),
            "message": payload.get("message", "").strip(),
            "status": payload.get("status", "new"),
            "createdAt": payload.get("createdAt") or datetime.utcnow().isoformat()
        }
        db_manager.db.enquiries.update_one({"id": doc["id"]}, {"$set": doc}, upsert=True)
        return jsonify({"success": True, "data": clean_doc(doc)}), 201

@app.route('/api/enquiries/<enquiry_id>', methods=['PATCH', 'DELETE'])
def manage_enquiry(enquiry_id):
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected"}), 503

    if request.method == 'PATCH':
        updates = request.get_json(silent=True) or {}
        updates.pop("_id", None)
        updates.pop("id", None)
        db_manager.db.enquiries.update_one({"id": enquiry_id}, {"$set": updates})
        updated = db_manager.db.enquiries.find_one({"id": enquiry_id})
        return jsonify({"success": True, "data": clean_doc(updated)})

    if request.method == 'DELETE':
        db_manager.db.enquiries.delete_one({"id": enquiry_id})
        return jsonify({"success": True, "id": enquiry_id})

# -------------------------------------------------------------
# VOLUNTEERS API
# -------------------------------------------------------------
@app.route('/api/volunteers', methods=['GET', 'POST'])
def handle_volunteers():
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected", "data": []}), 503

    if request.method == 'GET':
        docs = list(db_manager.db.volunteers.find({}).sort("createdAt", -1))
        return jsonify({"success": True, "data": clean_doc(docs)})

    if request.method == 'POST':
        payload = request.get_json(silent=True) or {}
        new_id = payload.get("id") or ("VOL-" + datetime.utcnow().strftime("%Y%m%d%H%M%S"))
        doc = {
            "id": new_id,
            "name": payload.get("name", "").strip(),
            "phone": payload.get("phone", "").strip(),
            "email": payload.get("email", "").strip(),
            "area": payload.get("area", "").strip(),
            "message": payload.get("message", "").strip(),
            "status": payload.get("status", "pending"),
            "createdAt": payload.get("createdAt") or datetime.utcnow().isoformat()
        }
        db_manager.db.volunteers.update_one({"id": doc["id"]}, {"$set": doc}, upsert=True)
        return jsonify({"success": True, "data": clean_doc(doc)}), 201

@app.route('/api/volunteers/<volunteer_id>', methods=['PATCH', 'DELETE'])
def manage_volunteer(volunteer_id):
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected"}), 503

    if request.method == 'PATCH':
        updates = request.get_json(silent=True) or {}
        updates.pop("_id", None)
        updates.pop("id", None)
        db_manager.db.volunteers.update_one({"id": volunteer_id}, {"$set": updates})
        updated = db_manager.db.volunteers.find_one({"id": volunteer_id})
        return jsonify({"success": True, "data": clean_doc(updated)})

    if request.method == 'DELETE':
        db_manager.db.volunteers.delete_one({"id": volunteer_id})
        return jsonify({"success": True, "id": volunteer_id})

# -------------------------------------------------------------
# DONATIONS API
# -------------------------------------------------------------
@app.route('/api/donations', methods=['GET', 'POST'])
def handle_donations():
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected", "data": []}), 503

    if request.method == 'GET':
        docs = list(db_manager.db.donations.find({}).sort("date", -1))
        return jsonify({"success": True, "data": clean_doc(docs)})

    if request.method == 'POST':
        payload = request.get_json(silent=True) or {}
        new_id = payload.get("id") or ("DON-" + datetime.utcnow().strftime("%Y%m%d%H%M%S"))
        amount = 0
        try:
            amount = float(payload.get("amount", 0))
        except (ValueError, TypeError):
            amount = 0

        doc = {
            "id": new_id,
            "name": payload.get("name", "").strip(),
            "contact": payload.get("contact", "").strip(),
            "amount": amount,
            "cause": payload.get("cause", "General").strip(),
            "mode": payload.get("mode", "UPI").strip(),
            "date": payload.get("date") or datetime.utcnow().strftime("%Y-%m-%d"),
            "notes": payload.get("notes", "").strip(),
            "createdAt": payload.get("createdAt") or datetime.utcnow().isoformat()
        }
        db_manager.db.donations.update_one({"id": doc["id"]}, {"$set": doc}, upsert=True)
        return jsonify({"success": True, "data": clean_doc(doc)}), 201

@app.route('/api/donations/<donation_id>', methods=['DELETE'])
def delete_donation(donation_id):
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected"}), 503
    db_manager.db.donations.delete_one({"id": donation_id})
    return jsonify({"success": True, "id": donation_id})

# -------------------------------------------------------------
# GALLERY API
# -------------------------------------------------------------
@app.route('/api/gallery', methods=['GET', 'POST'])
def handle_gallery():
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected", "data": []}), 503

    if request.method == 'GET':
        docs = list(db_manager.db.gallery.find({}))
        return jsonify({"success": True, "data": clean_doc(docs)})

    if request.method == 'POST':
        payload = request.get_json(silent=True) or {}
        new_id = payload.get("id") or ("gal-" + datetime.utcnow().strftime("%Y%m%d%H%M%S"))
        doc = {
            "id": new_id,
            "src": payload.get("src", "").strip(),
            "categoryEn": payload.get("categoryEn", "").strip(),
            "categoryKn": payload.get("categoryKn", "").strip(),
            "titleEn": payload.get("titleEn", "").strip(),
            "titleKn": payload.get("titleKn", "").strip(),
            "alt": payload.get("alt", "").strip()
        }
        db_manager.db.gallery.update_one({"id": doc["id"]}, {"$set": doc}, upsert=True)
        return jsonify({"success": True, "data": clean_doc(doc)}), 201

@app.route('/api/gallery/<photo_id>', methods=['DELETE'])
def delete_gallery_photo(photo_id):
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected"}), 503
    db_manager.db.gallery.delete_one({"id": photo_id})
    return jsonify({"success": True, "id": photo_id})

# -------------------------------------------------------------
# IMPACT STATS API
# -------------------------------------------------------------
@app.route('/api/stats', methods=['GET', 'PUT'])
def handle_stats():
    if not db_manager.is_connected:
        return jsonify({"success": False, "error": "MongoDB is not connected", "data": []}), 503

    if request.method == 'GET':
        docs = list(db_manager.db.stats.find({}))
        return jsonify({"success": True, "data": clean_doc(docs)})

    if request.method == 'PUT':
        items = request.get_json(silent=True) or []
        if isinstance(items, list):
            for s in items:
                if isinstance(s, dict) and s.get("id"):
                    s.pop("_id", None)
                    db_manager.db.stats.update_one({"id": s["id"]}, {"$set": s}, upsert=True)
        docs = list(db_manager.db.stats.find({}))
        return jsonify({"success": True, "data": clean_doc(docs)})

# -------------------------------------------------------------
# ADMIN AUTH API
# -------------------------------------------------------------
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if db_manager.is_connected:
        user = db_manager.db.admin_users.find_one({"username": username})
        if user and user.get("password") == password:
            return jsonify({"success": True, "username": username, "source": "mongodb"})
    else:
        # Fallback: check localStorage-persisted creds via env
        env_user = os.getenv("ADMIN_USERNAME", "sanmarga")
        env_pass = os.getenv("ADMIN_PASSWORD", "Sanmarga@2024")
        if username == env_user and password == env_pass:
            return jsonify({"success": True, "username": username, "source": "local_default"})

    return jsonify({"success": False, "error": "Invalid username or password"}), 401


@app.route('/api/admin/setup', methods=['GET', 'POST'])
def admin_setup():
    """First-time setup or password reset endpoint."""
    if request.method == 'GET':
        # Check if any admin exists
        if db_manager.is_connected:
            count = db_manager.db.admin_users.count_documents({})
            return jsonify({"needs_setup": count == 0})
        return jsonify({"needs_setup": True})

    if request.method == 'POST':
        data = request.get_json(silent=True) or {}
        new_username = data.get("username", "").strip()
        new_password = data.get("password", "").strip()
        reset_token  = data.get("reset_token", "").strip()

        if not new_username or not new_password:
            return jsonify({"success": False, "error": "Username and password are required"}), 400

        # Allow setup if: no admin exists OR reset_token matches env
        env_token = os.getenv("RESET_TOKEN", "sanmarga-reset-2024")
        is_first_run = True
        if db_manager.is_connected:
            is_first_run = db_manager.db.admin_users.count_documents({}) == 0

        if not is_first_run and reset_token != env_token:
            return jsonify({"success": False, "error": "Invalid reset token"}), 403

        if db_manager.is_connected:
            db_manager.db.admin_users.delete_many({})
            db_manager.db.admin_users.insert_one({
                "username": new_username,
                "password": new_password,
                "updatedAt": datetime.utcnow().isoformat()
            })

        # Also persist to .env for offline fallback
        env_path = os.path.join(BASE_DIR, ".env")
        try:
            set_key(env_path, "ADMIN_USERNAME", new_username)
            set_key(env_path, "ADMIN_PASSWORD", new_password)
        except Exception as e:
            print(f"[Setup] Could not write .env: {e}")

        return jsonify({"success": True, "message": "Admin credentials set successfully!"})


@app.route('/api/admin/change-creds', methods=['POST'])
def change_admin_creds():
    data = request.get_json(silent=True) or {}
    new_username = data.get("username", "").strip()
    new_password = data.get("password", "").strip()

    if not new_username or not new_password:
        return jsonify({"success": False, "error": "Username and password cannot be empty"}), 400

    if db_manager.is_connected:
        db_manager.db.admin_users.delete_many({})
        db_manager.db.admin_users.insert_one({
            "username": new_username,
            "password": new_password,
            "updatedAt": datetime.utcnow().isoformat()
        })

    env_path = os.path.join(BASE_DIR, ".env")
    try:
        set_key(env_path, "ADMIN_USERNAME", new_username)
        set_key(env_path, "ADMIN_PASSWORD", new_password)
    except Exception:
        pass

    return jsonify({"success": True, "message": "Credentials updated successfully!"})

# -------------------------------------------------------------
# STATIC FILE SERVING
# -------------------------------------------------------------
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve_static(path):
    # Remove leading slash if any
    safe_path = path.lstrip('/')
    full_path = os.path.join(BASE_DIR, safe_path)

    if os.path.isfile(full_path):
        return send_from_directory(BASE_DIR, safe_path)
    
    # Fallback for html pages without extension
    if os.path.isfile(full_path + '.html'):
        return send_from_directory(BASE_DIR, safe_path + '.html')

    # Default to index.html
    return send_from_directory(BASE_DIR, 'index.html')

if __name__ == '__main__':
    print("=" * 60)
    print(" SANMARGA GELEYARA BALAGA - WEB & MONGODB BACKEND")
    print(f" Web Server & API: http://127.0.0.1:{PORT}")
    print(f" Admin Dashboard:  http://127.0.0.1:{PORT}/admin.html")
    print("=" * 60)
    app.run(host='0.0.0.0', port=PORT, debug=False)

