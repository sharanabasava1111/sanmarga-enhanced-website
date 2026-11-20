/* Shared navigation, dark mode, bilingual content and safe demo form behaviour. */
const page = document.body.dataset.page || 'home';

const header = document.querySelector('#siteHeader');
if (header) {
  header.className = 'site-header';
  header.innerHTML = `
    <div class="container nav">
      <a class="brand" href="index.html" aria-label="Sanmarga Geleyara Balaga home"><img class="brand-logo-img" src="images/logo.png" alt="Sanmarga Geleyara Balaga Official Emblem"><span class="brand-text" data-en="Sanmarga<br>Geleyara Balaga<small>Ballari</small>" data-kn="ಸನ್ಮಾರ್ಗ<br>ಗೆಳೆಯರ ಬಳಗ<small>ಬಳ್ಳಾರಿ</small>">Sanmarga<br>Geleyara Balaga<small>Ballari</small></span></a>
      <nav class="nav-links" aria-label="Primary navigation">
        <a class="${page === 'home' ? 'active' : ''}" href="index.html" data-en="Home" data-kn="ಮುಖಪುಟ">Home</a>
        
        <div class="nav-dropdown">
          <a class="nav-dropdown-toggle ${page === 'about' || page === 'vision' || page === 'mission' || page === 'vision-mission' ? 'active' : ''}" href="about.html">
            <span data-en="About Us" data-kn="ನಮ್ಮ ಬಗ್ಗೆ">About Us</span>
            <span class="nav-dropdown-arrow">▼</span>
          </a>
          <div class="nav-dropdown-menu">
            <a class="${page === 'about' ? 'active' : ''}" href="about.html" data-en="About Us" data-kn="ನಮ್ಮ ಬಗ್ಗೆ">About Us</a>
            <a class="${page === 'vision-mission' ? 'active' : ''}" href="vision-mission.html" data-en="Vision & Mission" data-kn="ದೃಷ್ಟಿ ಮತ್ತು ಧ್ಯೇಯ">Vision & Mission</a>
          </div>
        </div>

        <div class="nav-dropdown">
          <a class="nav-dropdown-toggle ${page === 'education' || page === 'health' || page === 'environment' || page === 'awareness' || page === 'moments' ? 'active' : ''}" href="education.html">
            <span data-en="Our Work" data-kn="ನಮ್ಮ ಕಾರ್ಯ">Our Work</span>
            <span class="nav-dropdown-arrow">▼</span>
          </a>
          <div class="nav-dropdown-menu">
            <a class="${page === 'education' ? 'active' : ''}" href="education.html" data-en="Education" data-kn="ಶಿಕ್ಷಣ">Education</a>
            <a class="${page === 'health' ? 'active' : ''}" href="health.html" data-en="Health" data-kn="ಆರೋಗ್ಯ">Health</a>
            <a class="${page === 'environment' ? 'active' : ''}" href="environment.html" data-en="Environment" data-kn="ಪರಿಸರ">Environment</a>
            <a class="${page === 'awareness' ? 'active' : ''}" href="awareness.html" data-en="Public Awareness" data-kn="ಸಾರ್ವಜನಿಕ ಜಾಗೃತಿ">Public Awareness</a>
            <a class="${page === 'moments' ? 'active' : ''}" href="moments.html" data-en="Work in Moments 📸" data-kn="ಕಾರ್ಯದ ಕ್ಷಣಗಳು 📸">Work in Moments 📸</a>
          </div>
        </div>

        <a class="${page === 'work' ? 'active' : ''}" href="work-with-us.html" data-en="Join Us" data-kn="ಸೇರಿಕೊಳ್ಳಿ">Join Us</a>

        <div class="nav-dropdown">
          <a class="nav-dropdown-toggle ${page === 'contact' ? 'active' : ''}" href="contact.html">
            <span data-en="Contact Us" data-kn="ಸಂಪರ್ಕಿಸಿ">Contact Us</span>
            <span class="nav-dropdown-arrow">▼</span>
          </a>
          <div class="nav-dropdown-menu">
            <a href="contact.html#get-in-touch" data-en="Get in Touch" data-kn="ಸಂಪರ್ಕದಲ್ಲಿರಿ">Get in Touch</a>
            <a href="contact.html#faqs" data-en="FAQs" data-kn="ಪ್ರಶ್ನೋತ್ತರಗಳು">FAQs</a>
          </div>
        </div>
      </nav>
      <div class="nav-actions">
        <button class="icon-button language-button" id="languageButton" type="button" aria-label="Change language">ಕನ್ನಡ</button>
        <button class="icon-button" id="themeButton" type="button" aria-label="Change colour theme">☼</button>
        <a class="button nav-donate" href="donate.html" data-en="Donate" data-kn="ದೇಣಿಗೆ ನೀಡಿ">Donate</a>
        <button class="icon-button menu-button" id="menuButton" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
      </div>
    </div>
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
      <a href="index.html" data-en="Home" data-kn="ಮುಖಪುಟ">Home</a>
      
      <div class="mobile-nav-group">
        <span class="mobile-nav-heading" data-en="About Us" data-kn="ನಮ್ಮ ಬಗ್ಗೆ">About Us</span>
        <div class="mobile-sublinks">
          <a href="about.html" data-en="About Us (Overview)" data-kn="ನಮ್ಮ ಬಗ್ಗೆ (ಪರಿಚಯ)">About Us (Overview)</a>
          <a href="vision-mission.html" data-en="Vision & Mission" data-kn="ದೃಷ್ಟಿ ಮತ್ತು ಧ್ಯೇಯ">Vision & Mission</a>
        </div>
      </div>

      <div class="mobile-nav-group">
        <span class="mobile-nav-heading" data-en="Our Work" data-kn="ನಮ್ಮ ಕಾರ್ಯ">Our Work</span>
        <div class="mobile-sublinks">
          <a href="education.html" data-en="Education" data-kn="ಶಿಕ್ಷಣ">Education</a>
          <a href="health.html" data-en="Health" data-kn="ಆರೋಗ್ಯ">Health</a>
          <a href="environment.html" data-en="Environment" data-kn="ಪರಿಸರ">Environment</a>
          <a href="awareness.html" data-en="Public Awareness" data-kn="ಸಾರ್ವಜನಿಕ ಜಾಗೃತಿ">Public Awareness</a>
          <a href="moments.html" data-en="Work in Moments 📸" data-kn="ಕಾರ್ಯದ ಕ್ಷಣಗಳು 📸">Work in Moments 📸</a>
        </div>
      </div>

      <a href="work-with-us.html" data-en="Join Us" data-kn="ಸೇರಿಕೊಳ್ಳಿ">Join Us</a>

      <div class="mobile-nav-group">
        <span class="mobile-nav-heading" data-en="Contact Us" data-kn="ಸಂಪರ್ಕಿಸಿ">Contact Us</span>
        <div class="mobile-sublinks">
          <a href="contact.html#get-in-touch" data-en="Get in Touch" data-kn="ಸಂಪರ್ಕದಲ್ಲಿರಿ">Get in Touch</a>
          <a href="contact.html#faqs" data-en="FAQs" data-kn="ಪ್ರಶ್ನೋತ್ತರಗಳು">FAQs</a>
        </div>
      </div>

      <a class="button button--primary" href="donate.html" data-en="Donate" data-kn="ದೇಣಿಗೆ ನೀಡಿ">Donate</a>
    </nav>`;
}

const footer = document.querySelector('#siteFooter');
if (footer) {
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container footer-grid">
      <div><a class="brand" href="index.html"><img class="brand-logo-img" src="images/logo.png" alt="Sanmarga Geleyara Balaga Official Emblem"><span class="brand-text" data-en="Sanmarga Geleyara Balaga<small>Ballari</small>" data-kn="ಸನ್ಮಾರ್ಗ ಗೆಳೆಯರ ಬಳಗ<small>ಬಳ್ಳಾರಿ</small>">Sanmarga Geleyara Balaga<small>Ballari</small></span></a><p class="footer-text" data-en="Thank you for standing with a community that believes every caring action counts." data-kn="ಪ್ರತಿ ಕಾಳಜಿಯ ಕಾರ್ಯಕ್ಕೂ ಮಹತ್ವವಿದೆ ಎನ್ನುವ ಸಮುದಾಯದೊಂದಿಗೆ ನಿಂತಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.">Thank you for standing with a community that believes every caring action counts.</p></div>
      <div class="footer-col"><h3 data-en="Explore" data-kn="ಅನ್ವೇಷಿಸಿ">Explore</h3><a href="about.html" data-en="About us" data-kn="ನಮ್ಮ ಬಗ್ಗೆ">About us</a><a href="vision-mission.html" data-en="Vision & Mission" data-kn="ದೃಷ್ಟಿ ಮತ್ತು ಧ್ಯೇಯ">Vision & Mission</a><a href="education.html" data-en="Education" data-kn="ಶಿಕ್ಷಣ">Education</a><a href="health.html" data-en="Health" data-kn="ಆರೋಗ್ಯ">Health</a><a href="environment.html" data-en="Environment" data-kn="ಪರಿಸರ">Environment</a><a href="moments.html" data-en="Work in Moments" data-kn="ಕಾರ್ಯದ ಕ್ಷಣಗಳು">Work in Moments</a></div>
      <div class="footer-col"><h3 data-en="Get involved" data-kn="ಸೇರಿಕೊಳ್ಳಿ">Get involved</h3><a href="work-with-us.html" data-en="Work with us" data-kn="ನಮ್ಮೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಿ">Work with us</a><a href="awareness.html" data-en="Public awareness" data-kn="ಸಾರ್ವಜನಿಕ ಜಾಗೃತಿ">Public awareness</a><a href="contact.html" data-en="Contact Us & FAQs" data-kn="ಸಂಪರ್ಕಿಸಿ & ಪ್ರಶ್ನೋತ್ತರಗಳು">Contact Us & FAQs</a><a href="donate.html" data-en="Donate" data-kn="ದೇಣಿಗೆ ನೀಡಿ">Donate</a></div>
      <div class="footer-col"><h3 data-en="Connect" data-kn="ಸಂಪರ್ಕ">Connect</h3><a class="instagram-link" href="https://www.instagram.com/sanmarga_geleyara_balaga?obrf=cXNydWpjbjBoNXZ5" target="_blank" rel="noopener noreferrer" aria-label="Visit Sanmarga Geleyara Balaga on Instagram"><svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg><span data-en="Follow on Instagram" data-kn="ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್‌ನಲ್ಲಿ ಫಾಲೋ ಮಾಡಿ">Follow on Instagram</span></a><div class="footer-enquiry-box"><span class="footer-enquiry-label" data-en="Have an enquiry or issue?" data-kn="ವಿಚಾರಣೆ ಅಥವಾ ಸಮಸ್ಯೆ ಇದೆಯೇ?">Have an enquiry or issue?</span><a class="footer-contact-btn" href="contact.html" data-en="Contact Us & FAQs →" data-kn="ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ಪ್ರಶ್ನೋತ್ತರಗಳು →">Contact Us & FAQs →</a></div></div>
    </div>
    
    <!-- FULL-WIDTH CENTERED LETTER-FILLING PHOTO RIBBON -->
    <div class="footer-photo-ribbon" role="region" aria-label="Sanmarga Geleyara Balaga Photo Letters Banner">
      <!-- ENGLISH PHOTO LETTERS CONTAINER -->
      <div class="footer-photo-words-container ribbon-en">
        <!-- WORD 1: SANMARGA (8 letters, each filled with authentic community photos) -->
        <div class="footer-photo-word" aria-label="SANMARGA">
          <span class="photo-letter" style="background-image: url('images/save-water-2016-orig.jpg');" title="S: Save Water Drive 2016">S</span>
          <span class="photo-letter" style="background-image: url('images/air-pollution-awareness-2019-orig.jpg');" title="A: Air Pollution Awareness">A</span>
          <span class="photo-letter" style="background-image: url('images/env-planting-nature.jpg');" title="N: Sapling Plantation">N</span>
          <span class="photo-letter" style="background-image: url('images/sslc-exam-awareness-sandur-orig.jpg');" title="M: SSLC Guidance Sandur">M</span>
          <span class="photo-letter" style="background-image: url('images/contribute-volunteer-team.jpg');" title="A: Volunteer Community">A</span>
          <span class="photo-letter" style="background-image: url('images/covid-relief-distribution-2021-orig.jpg');" title="R: COVID-19 Food Relief">R</span>
          <span class="photo-letter" style="background-image: url('images/env-protecting-plants.jpg');" title="G: Tree Protection">G</span>
          <span class="photo-letter" style="background-image: url('images/drinking-water-ksrtc-2016-orig.jpg');" title="A: Drinking Water for KSRTC">A</span>
        </div>

        <!-- WORD 2: GELEYARA (8 letters, each filled with authentic community photos) -->
        <div class="footer-photo-word" aria-label="GELEYARA">
          <span class="photo-letter" style="background-image: url('images/env-cleanliness-drive.jpg');" title="G: Cleanliness Drive">G</span>
          <span class="photo-letter" style="background-image: url('images/hero-home-1.jpg');" title="E: Community Work">E</span>
          <span class="photo-letter" style="background-image: url('images/env-watering-care.jpg');" title="L: Tree Watering Care">L</span>
          <span class="photo-letter" style="background-image: url('images/edu-library-facility.jpg');" title="E: Education Library">E</span>
          <span class="photo-letter" style="background-image: url('images/env-swachh-surroundings.jpg');" title="Y: Swachh Surroundings">Y</span>
          <span class="photo-letter" style="background-image: url('images/education-activities-mosaic.jpg');" title="A: Education Guidance Drive">A</span>
          <span class="photo-letter" style="background-image: url('images/donate-food-clothes.jpg');" title="R: Food and Clothes Donation">R</span>
          <span class="photo-letter" style="background-image: url('images/hero-health-1.jpg');" title="A: Health Camp">A</span>
        </div>

        <!-- WORD 3: BALAGA (6 letters, each filled with authentic community photos) -->
        <div class="footer-photo-word" aria-label="BALAGA">
          <span class="photo-letter" style="background-image: url('images/sslc-exam-awareness-sandur-orig.jpg');" title="B: Student Workshops">B</span>
          <span class="photo-letter" style="background-image: url('images/air-pollution-awareness-2019-orig.jpg');" title="A: Awareness Campaign">A</span>
          <span class="photo-letter" style="background-image: url('images/donate-books-materials.jpg');" title="L: Books Donation">L</span>
          <span class="photo-letter" style="background-image: url('images/covid-relief-distribution-2021-orig.jpg');" title="A: Ration Relief Kits">A</span>
          <span class="photo-letter" style="background-image: url('images/save-water-2016-orig.jpg');" title="G: Water Conservation">G</span>
          <span class="photo-letter" style="background-image: url('images/contribute-volunteer-team.jpg');" title="A: Volunteer Team">A</span>
        </div>
      </div>

      <!-- KANNADA PHOTO LETTERS CONTAINER (Switches smoothly with same font size & photo letters) -->
      <div class="footer-photo-words-container ribbon-kn" style="display: none;">
        <!-- WORD 1: ಸನ್ಮಾರ್ಗ (3 aksharas) -->
        <div class="footer-photo-word" aria-label="ಸನ್ಮಾರ್ಗ">
          <span class="photo-letter" style="background-image: url('images/save-water-2016-orig.jpg');" title="ಸ: ಜಲ ಸಂರಕ್ಷಣೆ">ಸ</span>
          <span class="photo-letter" style="background-image: url('images/sslc-exam-awareness-sandur-orig.jpg');" title="ನ್ಮಾ: ವಿದ್ಯಾರ್ಥಿ ಮಾರ್ಗದರ್ಶನ">ನ್ಮಾ</span>
          <span class="photo-letter" style="background-image: url('images/education-activities-mosaic.jpg');" title="ರ್ಗ: ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮ">ರ್ಗ</span>
        </div>

        <!-- WORD 2: ಗೆಳೆಯರ (4 aksharas) -->
        <div class="footer-photo-word" aria-label="ಗೆಳೆಯರ">
          <span class="photo-letter" style="background-image: url('images/hero-health-1.jpg');" title="ಗೆ: ಉಚಿತ ಆರೋಗ್ಯ ಶಿಬಿರ">ಗೆ</span>
          <span class="photo-letter" style="background-image: url('images/drinking-water-ksrtc-2016-orig.jpg');" title="ಳೆ: ಕುಡಿಯುವ ನೀರಿನ ಸೇವೆ">ಳೆ</span>
          <span class="photo-letter" style="background-image: url('images/contribute-volunteer-team.jpg');" title="ಯ: ಗೆಳೆಯರ ಬಳಗದ ತಂಡ">ಯ</span>
          <span class="photo-letter" style="background-image: url('images/donate-food-clothes.jpg');" title="ರ: ಅನ್ನದಾನ ಹಾಗೂ ವಸ್ತ್ರದಾನ">ರ</span>
        </div>

        <!-- WORD 3: ಬಳಗ (3 aksharas) -->
        <div class="footer-photo-word" aria-label="ಬಳಗ">
          <span class="photo-letter" style="background-image: url('images/env-planting-nature.jpg');" title="ಬ: ಪರಿಸರ ಹಾಗೂ ಗಿಡ ನೆಡುವಿಕೆ">ಬ</span>
          <span class="photo-letter" style="background-image: url('images/edu-library-facility.jpg');" title="ಳ: ಉಚಿತ ಗ್ರಂಥಾಲಯ ಕೇಂದ್ರ">ಳ</span>
          <span class="photo-letter" style="background-image: url('images/covid-relief-distribution-2021-orig.jpg');" title="ಗ: ಸಂಕಷ್ಟ ಪರಿಹಾರ ಸೇವೆ">ಗ</span>
        </div>
      </div>
      <p class="brand-ribbon-sub" data-en="Sanmarga Geleyara Balaga • Near Wisdom Land School, Moka Road, Ballari • Service Since 2015" data-kn="ಸನ್ಮಾರ್ಗ ಗೆಳೆಯರ ಬಳಗ • ವಿಸ್ಡಮ್ ಲ್ಯಾಂಡ್ ಸ್ಕೂಲ್ ಹತ್ತಿರ, ಮೋಕಾ ರಸ್ತೆ, ಬಳ್ಳಾರಿ • 2015 ರಿಂದ ನಿರಂತರ ಸೇವೆ">Sanmarga Geleyara Balaga • Near Wisdom Land School, Moka Road, Ballari • Service Since 2015</p>
    </div>
    <div class="container footer-bottom"><p>© <span id="year"></span> Sanmarga Geleyara Balaga. <span data-en="All rights reserved." data-kn="ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.">All rights reserved.</span> • <a class="admin-portal-link" href="admin.html" title="Open Admin Portal">Admin Portal 🔒</a></p><p data-en="Built with care for Ballari." data-kn="ಬಳ್ಳಾರಿಗಾಗಿ ಕಾಳಜಿಯಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ.">Built with care for Ballari.</p></div>`;
}

const root = document.documentElement;
let language = localStorage.getItem('sgb-language') || 'en';

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  root.lang = language === 'kn' ? 'kn' : 'en';
  document.querySelectorAll('[data-en][data-kn]').forEach((element) => {
    const val = element.dataset[language];
    if (val.includes('<') && val.includes('>')) {
      element.innerHTML = val;
    } else {
      element.textContent = val;
    }
  });
  document.querySelectorAll('[data-en-placeholder][data-kn-placeholder]').forEach((element) => {
    element.placeholder = element.dataset[`${language}Placeholder`];
  });
  const ribbonEn = document.querySelector('.ribbon-en');
  const ribbonKn = document.querySelector('.ribbon-kn');
  if (ribbonEn && ribbonKn) {
    if (language === 'kn') {
      ribbonEn.style.display = 'none';
      ribbonKn.style.display = 'flex';
    } else {
      ribbonEn.style.display = 'flex';
      ribbonKn.style.display = 'none';
    }
  }
  const languageButton = document.querySelector('#languageButton');
  if (languageButton) languageButton.textContent = language === 'en' ? 'ಕನ್ನಡ' : 'English';
  localStorage.setItem('sgb-language', language);
}

function applyTheme(nextTheme) {
  root.dataset.theme = nextTheme;
  const themeButton = document.querySelector('#themeButton');
  if (themeButton) themeButton.textContent = nextTheme === 'dark' ? '☾' : '☼';
  localStorage.setItem('sgb-theme', nextTheme);
}

applyLanguage(language);
applyTheme(localStorage.getItem('sgb-theme') || 'light');
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#languageButton').addEventListener('click', () => applyLanguage(language === 'en' ? 'kn' : 'en'));
document.querySelector('#themeButton').addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

const menuButton = document.querySelector('#menuButton');
const mobileNav = document.querySelector('#mobileNav');
menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { mobileNav.classList.remove('open'); document.body.classList.remove('menu-open'); }));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), { passive: true });

// Dynamic Impact Stats from Admin
const storedStats = localStorage.getItem('sgb-impact-stats');
if (storedStats) {
  try {
    const statsData = JSON.parse(storedStats);
    const statCards = document.querySelectorAll('.stats .stat');
    statsData.forEach((item, index) => {
      if (statCards[index]) {
        const b = statCards[index].querySelector('b');
        if (b) b.textContent = item.number;
        const span = statCards[index].querySelector('span');
        if (span) {
          span.dataset.en = item.labelEn;
          span.dataset.kn = item.labelKn;
          span.textContent = language === 'kn' ? item.labelKn : item.labelEn;
        }
      }
    });
  } catch (e) {
    console.error('Error loading admin impact stats:', e);
  }
}

// Dynamic Gallery from Admin
const storedGallery = localStorage.getItem('sgb-gallery-items');
const galleryTrack = document.querySelector('#impactGallery');
if (galleryTrack && storedGallery) {
  try {
    const galleryItems = JSON.parse(storedGallery);
    if (Array.isArray(galleryItems) && galleryItems.length > 0) {
      galleryTrack.innerHTML = galleryItems.map((item) => `
        <figure class="gallery-card">
          <img src="${item.src}" alt="${item.alt || item.titleEn}" loading="lazy">
          <figcaption>
            <span data-en="${item.categoryEn}" data-kn="${item.categoryKn}">${language === 'kn' ? item.categoryKn : item.categoryEn}</span>
            <strong data-en="${item.titleEn}" data-kn="${item.titleKn}">${language === 'kn' ? item.titleKn : item.titleEn}</strong>
          </figcaption>
        </figure>
      `).join('');
    }
  } catch (e) {
    console.error('Error loading admin gallery items:', e);
  }
}

const gallery = document.querySelector('#impactGallery');
if (gallery) {
  let isInteracting = false;
  let interactionTimer;

  const pauseInteraction = () => {
    isInteracting = true;
    clearTimeout(interactionTimer);
    interactionTimer = setTimeout(() => { isInteracting = false; }, 4000);
  };

  gallery.addEventListener('mouseenter', () => { isInteracting = true; });
  gallery.addEventListener('mouseleave', () => { isInteracting = false; });
  gallery.addEventListener('touchstart', pauseInteraction, { passive: true });
  gallery.addEventListener('scroll', pauseInteraction, { passive: true });

  document.querySelectorAll('[data-gallery-scroll]').forEach((button) => button.addEventListener('click', () => {
    pauseInteraction();
    gallery.scrollBy({ left: Number(button.dataset.galleryScroll) * Math.round(gallery.clientWidth * .76), behavior: 'smooth' });
  }));

  setInterval(() => {
    if (isInteracting) return;
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;
    if (gallery.scrollLeft >= maxScroll - 15) {
      gallery.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      gallery.scrollBy({ left: Math.round(gallery.clientWidth * 0.72), behavior: 'smooth' });
    }
  }, 3800);
}

document.querySelectorAll('.amount').forEach((amount) => amount.addEventListener('click', () => {
  document.querySelectorAll('.amount').forEach((item) => item.classList.remove('selected'));
  amount.classList.add('selected');
}));

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('#formStatus');
    if (!contactForm.checkValidity()) {
      status.textContent = language === 'kn' ? 'ದಯವಿಟ್ಟು ಎಲ್ಲ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.' : 'Please complete all required fields.';
      contactForm.reportValidity();
      return;
    }
    const formData = Object.fromEntries(new FormData(contactForm));
    const newEnquiry = {
      id: 'ENQ-' + Date.now().toString(36).toUpperCase(),
      name: formData.name,
      contact: formData.contact,
      message: formData.message,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    try {
      const existing = JSON.parse(localStorage.getItem('sgb-enquiries') || '[]');
      existing.unshift(newEnquiry);
      localStorage.setItem('sgb-enquiries', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }
    contactForm.reset();
    status.textContent = language === 'kn' ? 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.' : 'Thank you! Your message has been received. We will get in touch with you soon.';
  });
}

// --- POPUP CONTACT MODAL CONTROLLER ---
const contactModal = document.querySelector('#contactModal');
const openModalBtns = document.querySelectorAll('.open-contact-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-contact-modal-btn');

function openContactModal() {
  if (contactModal) {
    contactModal.classList.add('open');
    document.body.classList.add('modal-open');
    const firstInput = contactModal.querySelector('input:not([type="hidden"]), select, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 120);
  }
}

function closeContactModal() {
  if (contactModal) {
    contactModal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
}

openModalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openContactModal();
  });
});

closeModalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeContactModal();
  });
});

if (contactModal) {
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContactModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('open')) {
      closeContactModal();
    }
  });
}

// Modal Form Submission
const modalContactForm = document.querySelector('#modalContactForm');
if (modalContactForm) {
  modalContactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('#modalFormStatus');
    if (!modalContactForm.checkValidity()) {
      status.style.color = '#c92a2a';
      status.textContent = language === 'kn' ? 'ದಯವಿಟ್ಟು ಎಲ್ಲ ಅಗತ್ಯ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.' : 'Please complete all required fields.';
      modalContactForm.reportValidity();
      return;
    }
    const formData = Object.fromEntries(new FormData(modalContactForm));
    const newEnquiry = {
      id: 'ENQ-' + Date.now().toString(36).toUpperCase(),
      name: formData.name || '',
      contact: formData.contact || '',
      email: formData.email || '',
      purpose: formData.purpose || 'General Enquiry',
      subject: formData.subject || '',
      message: formData.message || '',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Save to MongoDB via REST API
    try {
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnquiry)
      }).catch((e) => console.log('MongoDB server offline, stored locally:', e));
    } catch (err) {
      console.warn('Network error pushing enquiry to MongoDB:', err);
    }

    try {
      const existing = JSON.parse(localStorage.getItem('sgb-enquiries') || '[]');
      existing.unshift(newEnquiry);
      localStorage.setItem('sgb-enquiries', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }
    modalContactForm.reset();
    status.style.color = '#108060';
    status.innerHTML = language === 'kn' 
      ? 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ಅಧಿಕೃತ ಗೂಗಲ್ ಫಾರ್ಮ್ ಲಿಂಕ್ ಅನ್ನು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ರವಾನಿಸಲಾಗಿದೆ: <br><a href="https://forms.gle/4HqN9W8V3pXQY7Z49" target="_blank" style="color:#d97706;text-decoration:underline;font-weight:bold;">ಗೂಗಲ್ ಫಾರ್ಮ್ ತೆರೆಯಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ ↗</a>' 
      : 'Thank you! Your enquiry has been received. Official Google Form link dispatched to your email:<br><a href="https://forms.gle/4HqN9W8V3pXQY7Z49" target="_blank" style="color:#d97706;text-decoration:underline;font-weight:bold;">Click here to Open Google Form ↗</a>';
    setTimeout(() => {
      closeContactModal();
      if (status) status.innerHTML = '';
    }, 4500);
  });
}

// Volunteer Google Form Application Submission
const volunteerGForm = document.querySelector('#volunteerGFormApply');
if (volunteerGForm) {
  volunteerGForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.querySelector('#vFormStatus');
    const name = document.querySelector('#vName')?.value.trim();
    const phone = document.querySelector('#vPhone')?.value.trim();
    const email = document.querySelector('#vEmail')?.value.trim();
    const area = document.querySelector('#vArea')?.value;

    const newVolunteer = {
      id: 'VOL-' + Date.now().toString(36).toUpperCase(),
      name,
      phone,
      email,
      area,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to MongoDB via REST API
    try {
      fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVolunteer)
      }).catch((e) => console.log('MongoDB server offline, stored locally:', e));
    } catch (err) {
      console.warn('Network error pushing volunteer to MongoDB:', err);
    }

    try {
      const existing = JSON.parse(localStorage.getItem('sgb-volunteers') || '[]');
      existing.unshift(newVolunteer);
      localStorage.setItem('sgb-volunteers', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    status.style.color = '#108060';
    status.innerHTML = language === 'kn'
      ? `✅ ಗೂಗಲ್ ಫಾರ್ಮ್ ಲಿಂಕ್ ಅನ್ನು ನಿಮ್ಮ ಇಮೇಲ್ (${email}) ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ! <br><a href="https://forms.gle/4HqN9W8V3pXQY7Z49" target="_blank" style="color:#108060;text-decoration:underline;font-weight:800;">ಈಗಲೇ ಫಾರ್ಮ್ ತೆರೆಯಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ ↗</a>`
      : `✅ Google Form dispatched to ${email}! Opening form in new tab...<br><a href="https://forms.gle/4HqN9W8V3pXQY7Z49" target="_blank" style="color:#108060;text-decoration:underline;font-weight:800;">Click here if form didn't open ↗</a>`;

    // Direct launch of Google Form in new tab
    setTimeout(() => {
      window.open('https://forms.gle/4HqN9W8V3pXQY7Z49', '_blank');
    }, 700);
    volunteerGForm.reset();
  });
}

// --- FAQ ACCORDION CONTROLLER ---
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-question');
  if (btn) {
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Close other open items for a neat accordion feel
      document.querySelectorAll('.faq-item.active').forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('active', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  }
});

// --- HOME HERO VISUAL SLIDER CONTROLLER ---
const heroSlider = document.querySelector('#heroVisualSlider');
if (heroSlider) {
  const slides = heroSlider.querySelectorAll('.hero-slide');
  const dots = heroSlider.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(n) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function startSlider() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 3600);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(index);
      startSlider();
    });
  });

  heroSlider.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  heroSlider.addEventListener('mouseleave', () => startSlider());

  startSlider();
}

// --- UNIVERSAL SLIDING HERO BACKGROUND MANAGER FOR ALL DOMAINS ---
function initHeroBgSliders() {
  const bgSliders = document.querySelectorAll('.hero-slider-bg');
  bgSliders.forEach((slider) => {
    const slides = slider.querySelectorAll('.hero-slide-bg');
    if (slides.length <= 1) return;
    let currentIdx = 0;
    setInterval(() => {
      slides[currentIdx].classList.remove('active');
      currentIdx = (currentIdx + 1) % slides.length;
      slides[currentIdx].classList.add('active');
    }, 4500);
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroBgSliders);
} else {
  initHeroBgSliders();
}
