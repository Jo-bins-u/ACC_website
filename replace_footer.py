import os
import re

new_footer = '''  <footer>
    <div class="container py-5">
      <div class="row fttr justify-content-between">
        <!-- Brand & Address Column -->
        <div class="col-lg-4 col-md-12 mb-5 mb-lg-0 text-start pr-lg-5">
          <div class="mb-4 d-flex align-items-center">
            <span class="footer-brand-name">Association of Christian Christites</span>
            <a href="admin/index.html" id="admin-hidden-trigger"
              style="opacity: 0.15; margin-left: 8px; color: inherit; text-decoration: none;"
              aria-label="Admin Portal"><i class="fas fa-lock" style="font-size: 0.8rem;"></i></a>
          </div>
          
          <a id="lcft" href="https://g.co/kgs/7q6tTKC" target="_blank" rel="noopener noreferrer" class="mb-4">
            <i class="fas fa-map-marker-alt mt-1"></i>
            <span>CHRIST (Deemed to be University), Kengeri Campus, Bengaluru, 560074.</span>
          </a>

          <!-- Map for Desktop -->
          <div class="footer-map-card d-none d-lg-block">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.4602952788982!2d77.43629971030114!3d12.863339128212573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae472f365fe219%3A0xcae219b3b46324db!2sCHRIST%20(Deemed%20to%20be%20University)%20Bangalore%20Kengeri%20Campus!5e0!3m2!1sen!2sin!4v1719460544242!5m2!1sen!2sin"
              width="100%" height="170" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" aria-label="Google Map Location"></iframe>
          </div>
        </div>

        <!-- Links Columns Wrapper -->
        <div class="col-lg-8 col-md-12 pl-lg-5">
          <div class="row">
            <!-- Quick Links -->
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h5>Quick Links</h5>
              <ul class="list-unstyled mb-0">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="prayer.html">Prayers</a></li>
                <li><a href="calendar.html">Calendar</a></li>
                <li><a href="media.html">Media</a></li>
                <li><a href="contactus.html">Contact Us</a></li>
              </ul>
            </div>

            <!-- Domains -->
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h5>Domains</h5>
              <ul class="list-unstyled mb-0">
                <li><a href="domains.html#animation">Animation</a></li>
                <li><a href="domains.html#liturgy">Liturgy</a></li>
                <li><a href="domains.html#outreach">Outreach</a></li>
                <li><a href="domains.html#audiovisual">Audio &amp; Visual</a></li>
                <li><a href="domains.html#logistic">Logistics</a></li>
                <li><a href="domains.html#mediadoc">Media &amp; Doc</a></li>
              </ul>
            </div>

            <!-- Campuses -->
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h5>Campuses</h5>
              <ul class="list-unstyled mb-0">
                <li><a href="https://www.instagram.com/acc_christ/" target="_blank">Central</a></li>
                <li><a href="https://www.instagram.com/acc_kengeri/" target="_blank">Kengeri</a></li>
                <li><a href="https://www.instagram.com/acc_bgr/" target="_blank">Bannerghatta</a></li>
                <li><a href="https://www.instagram.com/acc_byc/" target="_blank">Yeshwanthpur</a></li>
                <li><a href="https://www.instagram.com/acc_christ_ncr/" target="_blank">Delhi NCR</a></li>
              </ul>
            </div>

            <!-- Social Media & Logo -->
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h5>Connect</h5>
              <div class="social-links mb-4">
                <a href="https://www.instagram.com/acc_kengeri/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://chat.whatsapp.com/KoTpbOt0HZB8Uq0PbNUqrj" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
              </div>
              <a href="https://christuniversity.in/" target="_blank" class="d-inline-block mt-2">
                <img class="img-fluid fim uni-logo" src="Images/University_logo_WH.png" alt="University Logo">
              </a>
            </div>
          </div>
        </div>

        <!-- Map for Mobile -->
        <div class="col-12 mt-4 d-flex justify-content-center d-lg-none">
          <div class="footer-map-card w-100" style="max-width: 400px; margin-top: 0;">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.4602952788982!2d77.43629971030114!3d12.863339128212573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae472f365fe219%3A0xcae219b3b46324db!2sCHRIST%20(Deemed%20to%20be%20University)%20Bangalore%20Kengeri%20Campus!5e0!3m2!1sen!2sin!4v1719460544242!5m2!1sen!2sin"
              width="100%" height="170" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" aria-label="Google Map Location"></iframe>
          </div>
        </div>
      </div>

      <!-- Copyright Row -->
      <div class="footer-bottom mt-5 pt-4">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <p class="mb-0">&copy; 2026 Association of Christian Christites. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>'''

files = [f for f in os.listdir('.') if f.endswith('.html')]
files.append('admin/index.html')

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Find <footer>...</footer> block
        new_content = re.sub(r'<footer>.*?</footer>', new_footer, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Updated {f}')
