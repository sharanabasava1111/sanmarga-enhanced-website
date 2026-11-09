"""
MongoDB Database Handler for Sanmarga Geleyara Balaga
Supports both Local MongoDB (mongodb://localhost:27017) and MongoDB Atlas (mongodb+srv://...)
"""
import os
import re
from datetime import datetime
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

# Load environment variables
load_dotenv()

DEFAULT_MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/sanmarga_balaga")
DEFAULT_DB_NAME = os.getenv("DB_NAME", "sanmarga_balaga")

class DatabaseManager:
    def __init__(self, uri=None, db_name=None):
        self.uri = uri or DEFAULT_MONGO_URI
        self.db_name = db_name or DEFAULT_DB_NAME
        self.client = None
        self.db = None
        self.is_connected = False
        self.last_error = None
        self.connect()

    def connect(self, uri=None, db_name=None):
        if uri:
            self.uri = uri
        if db_name:
            self.db_name = db_name

        try:
            # Short timeout so server startup is fast even if MongoDB isn't running locally
            self.client = MongoClient(self.uri, serverSelectionTimeoutMS=2500)
            # Test connection
            self.client.admin.command('ping')
            
            # Extract database name if specified in URI
            parsed_db = None
            try:
                # Handle mongodb+srv:// or mongodb:// with db name
                match = re.search(r'mongodb(?:\+srv)?://[^/]+/([^?]+)', self.uri)
                if match and match.group(1):
                    parsed_db = match.group(1)
            except Exception:
                pass

            target_db = parsed_db or self.db_name or "sanmarga_balaga"
            self.db = self.client[target_db]
            self.db_name = target_db
            self.is_connected = True
            self.last_error = None
            print(f"[MongoDB] Successfully connected to database: '{self.db_name}'")
            self.ensure_indexes()
            return True, f"Connected successfully to {self.db_name}"
        except (ConnectionFailure, ServerSelectionTimeoutError) as err:
            self.is_connected = False
            self.last_error = str(err)
            self.client = None
            self.db = None
            print(f"[MongoDB] Connection notice: Not currently connected to MongoDB ({err}). Standby mode active.")
            return False, f"Could not connect to MongoDB: {err}"
        except Exception as ex:
            self.is_connected = False
            self.last_error = str(ex)
            self.client = None
            self.db = None
            print(f"[MongoDB] Unexpected error connecting: {ex}")
            return False, str(ex)

    def get_status(self):
        # Mask credentials in URI for safe display
        masked_uri = "mongodb://localhost:27017"
        if self.uri:
            try:
                masked_uri = re.sub(r'://([^:]+):([^@]+)@', r'://\1:****@', self.uri)
            except Exception:
                masked_uri = "configured"

        counts = {}
        if self.is_connected and self.db is not None:
            try:
                counts = {
                    "enquiries": self.db.enquiries.count_documents({}),
                    "volunteers": self.db.volunteers.count_documents({}),
                    "donations": self.db.donations.count_documents({}),
                    "gallery": self.db.gallery.count_documents({}),
                    "stats": self.db.stats.count_documents({})
                }
            except Exception:
                pass

        return {
            "connected": self.is_connected,
            "database": self.db_name,
            "uri": masked_uri,
            "last_error": self.last_error,
            "counts": counts
        }

    def ensure_indexes(self):
        if not self.is_connected or self.db is None:
            return
        try:
            self.db.enquiries.create_index([("id", 1)], unique=True, sparse=True)
            self.db.volunteers.create_index([("id", 1)], unique=True, sparse=True)
            self.db.donations.create_index([("id", 1)], unique=True, sparse=True)
            self.db.gallery.create_index([("id", 1)], unique=True, sparse=True)
            self.db.stats.create_index([("id", 1)], unique=True, sparse=True)
            self.db.admin_users.create_index([("username", 1)], unique=True, sparse=True)
        except Exception as e:
            print(f"[MongoDB] Warning creating indexes: {e}")

    # --- SEED DATA ---
    def seed_default_data(self, force=False):
        if not self.is_connected or self.db is None:
            return False, "MongoDB is not connected. Connect first to seed data."

        # 1. Admin account
        if force or self.db.admin_users.count_documents({}) == 0:
            self.db.admin_users.update_one(
                {"username": "admin"},
                {"$setOnInsert": {"username": "admin", "password": "admin@sanmarga", "updatedAt": datetime.utcnow().isoformat()}},
                upsert=True
            )

        # 2. Stats
        if force or self.db.stats.count_documents({}) == 0:
            default_stats = [
                {"id": "stat-eye", "number": "4,860", "labelEn": "Free eye-care beneficiaries", "labelKn": "ಉಚಿತ ನೇತ್ರ ಆರೈಕೆ ಫಲಾನುಭವಿಗಳು"},
                {"id": "stat-health", "number": "3,000", "labelEn": "Free health check-ups", "labelKn": "ಉಚಿತ ಆರೋಗ್ಯ ತಪಾಸಣೆ"},
                {"id": "stat-school", "number": "8,000", "labelEn": "School children supported", "labelKn": "ಬೆಂಬಲಿತ ಶಾಲಾ ಮಕ್ಕಳು"},
                {"id": "stat-trees", "number": "2,510", "labelEn": "Trees planted", "labelKn": "ನೆಟ್ಟ ಗಿಡಗಳು"}
            ]
            for s in default_stats:
                self.db.stats.update_one({"id": s["id"]}, {"$set": s}, upsert=True)

        # 3. Gallery
        if force or self.db.gallery.count_documents({}) == 0:
            default_gallery = [
                {
                    "id": "gal-1",
                    "src": "images/save-water-2016.jpg",
                    "categoryEn": "Environment • 28-03-2016",
                    "categoryKn": "ಪರಿಸರ • 28-03-2016",
                    "titleEn": "Save Water Public Campaign",
                    "titleKn": "ಜಲ ಸಂರಕ್ಷಣಾ ಸಾರ್ವಜನಿಕ ಜಾಗೃತಿ",
                    "alt": "Save water public awareness campaign in Ballari"
                },
                {
                    "id": "gal-2",
                    "src": "images/drinking-water-ksrtc-2016.jpg",
                    "categoryEn": "Community Care • 24-04-2016",
                    "categoryKn": "ಸಾರ್ವಜನಿಕ ಸೇವೆ • 24-04-2016",
                    "titleEn": "Cool Water for KSRTC Commuters",
                    "titleKn": "KSRTC ಪ್ರಯಾಣಿಕರಿಗೆ ಕುಡಿಯುವ ನೀರಿನ ಸೇವೆ",
                    "alt": "Distributing cool drinking water to passengers in KSRTC bus"
                },
                {
                    "id": "gal-3",
                    "src": "images/air-pollution-awareness-2019.jpg",
                    "categoryEn": "Public Awareness • 21-11-2019",
                    "categoryKn": "ಸಾರ್ವಜನಿಕ ಜಾಗೃತಿ • 21-11-2019",
                    "titleEn": "Air Pollution Control Campaign",
                    "titleKn": "ವಾಯು ಮಾಲಿನ್ಯ ನಿಯಂತ್ರಣ ಮಾಸ ಅಭಿಯಾನ",
                    "alt": "Air pollution control month seminar with Transport Department"
                },
                {
                    "id": "gal-4",
                    "src": "images/sslc-exam-awareness-sandur.jpg",
                    "categoryEn": "Education • Sandur",
                    "categoryKn": "ಶಿಕ್ಷಣ • ಸಂಡೂರು",
                    "titleEn": "SSLC Exam Awareness & Guidance",
                    "titleKn": "SSLC ಪರೀಕ್ಷಾ ಜಾಗೃತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ",
                    "alt": "SSLC exam awareness and motivation seminar at Sandur"
                },
                {
                    "id": "gal-5",
                    "src": "images/covid-relief-distribution-2021.jpg",
                    "categoryEn": "Relief • 18-06-2021",
                    "categoryKn": "ಸಂಕಷ್ಟ ಪರಿಹಾರ • 18-06-2021",
                    "titleEn": "COVID-19 Food & Ration Relief",
                    "titleKn": "ಕೋವಿಡ್ ಆಹಾರ ಮತ್ತು ರೇಷನ್ ಕಿಟ್ ವಿತರಣೆ",
                    "alt": "COVID-19 food and ration kit distribution with police officers"
                }
            ]
            for g in default_gallery:
                self.db.gallery.update_one({"id": g["id"]}, {"$set": g}, upsert=True)

        # 4. Enquiries
        if force or self.db.enquiries.count_documents({}) == 0:
            default_enquiries = [
                {
                    "id": "ENQ-001",
                    "name": "Ramesh Kumar",
                    "contact": "+91 98450 12345",
                    "email": "ramesh.kumar@example.com",
                    "purpose": "Volunteer / Join the Balaga",
                    "message": "I would like to volunteer for the upcoming eye checkup camp in Ballari. Please let me know how to join.",
                    "status": "new",
                    "createdAt": datetime.utcnow().isoformat()
                },
                {
                    "id": "ENQ-002",
                    "name": "Pooja Patil",
                    "contact": "+91 94480 23456",
                    "phone": "+91 94480 23456",
                    "purpose": "Educational Support / SSLC Guidance",
                    "message": "Can you organize an SSLC student guidance session at our government high school in Sandur?",
                    "status": "responded",
                    "createdAt": datetime.utcnow().isoformat()
                }
            ]
            for e in default_enquiries:
                self.db.enquiries.update_one({"id": e["id"]}, {"$set": e}, upsert=True)

        # 5. Donations
        if force or self.db.donations.count_documents({}) == 0:
            default_donations = [
                {
                    "id": "DON-101",
                    "name": "Anand Rao",
                    "contact": "+91 94480 55667",
                    "amount": 5000,
                    "cause": "Education",
                    "mode": "UPI",
                    "date": "2026-10-15",
                    "notes": "For notebooks and school bags",
                    "createdAt": datetime.utcnow().isoformat()
                },
                {
                    "id": "DON-102",
                    "name": "Vijayalaxmi M.",
                    "contact": "vijaya.m@example.com",
                    "amount": 10000,
                    "cause": "Health",
                    "mode": "Bank Transfer",
                    "date": "2026-10-10",
                    "notes": "Support for free eye-care camp medicines",
                    "createdAt": datetime.utcnow().isoformat()
                }
            ]
            for d in default_donations:
                self.db.donations.update_one({"id": d["id"]}, {"$set": d}, upsert=True)

        return True, "Default Sanmarga data successfully seeded into MongoDB!"

# Helper to serialize mongo document to JSON-safe dictionary
def clean_doc(doc):
    if not doc:
        return None
    if isinstance(doc, list):
        return [clean_doc(d) for d in doc]
    if isinstance(doc, dict):
        d = dict(doc)
        if "_id" in d:
            d["_id"] = str(d["_id"])
            if "id" not in d:
                d["id"] = d["_id"]
        return d
    return doc

# Global instance
db_manager = DatabaseManager()

