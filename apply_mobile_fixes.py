import os

def main():
    workspace = r"c:\Users\Admin\Desktop\LYMS_Ladi_MySinhYen"
    index_path = os.path.join(workspace, "index.html")
    style_path = os.path.join(workspace, "style.css")
    app_path = os.path.join(workspace, "app.js")

    # 1. MODIFY INDEX.HTML
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            html = f.read()

        # Update brand navbar items to add helper classes phone-link and web-link
        old_nav_info = """            <div class="brand-nav-info">
                <a href="tel:0901920088" class="nav-info-item"><i class="fas fa-phone-alt"></i> <span>090.192.00.88</span></a>
                <a href="https://sibeautywellness.vn" class="nav-info-item" target="_blank"><i class="fas fa-globe"></i> <span>sibeautywellness.vn</span></a>
            </div>"""

        new_nav_info = """            <div class="brand-nav-info">
                <a href="tel:0901920088" class="nav-info-item phone-link"><i class="fas fa-phone-alt"></i> <span>090.192.00.88</span></a>
                <a href="https://sibeautywellness.vn" class="nav-info-item web-link" target="_blank"><i class="fas fa-globe"></i> <span>sibeautywellness.vn</span></a>
            </div>"""

        html = html.replace(old_nav_info, new_nav_info)

        # Inject the Promo Entry Popup HTML right before </body>
        promo_popup_html = """    <!-- PROMO ENTRY POPUP -->
    <div class="modal-overlay" id="promo-popup" style="z-index: 9999;">
        <div class="modal-card" style="width: 400px; max-width: 90%; text-align: center; padding: 25px 20px; border-radius: var(--radius-lg); border: 2.5px solid var(--brand-gold); background: linear-gradient(135deg, #FAF2EE, #ffffff); box-shadow: var(--shadow-lg); position: relative;">
            <div style="margin-bottom: 12px;">
                <img src="assets/images/logo.png" alt="SI Beauty Wellness" style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--brand-gold); background-color: white;">
            </div>
            <h3 style="font-size: 15px; font-weight: 700; color: var(--brand-green); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">SI Beauty Wellness</h3>
            
            <div class="promo-box" style="background-color: var(--brand-green); color: white; padding: 18px 12px; border-radius: var(--radius-md); margin: 15px 0; border: 1.5px dashed var(--brand-gold); box-shadow: var(--shadow-sm);">
                <h4 style="font-size: 20px; font-weight: 800; color: var(--brand-gold); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">NHẬN ƯU ĐÃI NGAY</h4>
                <p style="font-size: 15px; font-weight: 700; line-height: 1.4; color: #ffffff; letter-spacing: 0.5px;">Giảm 10% + Freeship</p>
                <p style="font-size: 11px; font-style: italic; color: #dfdfdf; margin-top: 4px;">(Áp dụng trực tiếp vào đơn đặt mua)</p>
            </div>
            
            <p style="font-size: 13px; color: var(--text-medium); margin-bottom: 20px; line-height: 1.5;">
                Ưu đãi độc quyền hôm nay dành riêng cho khách hàng mua Tổ Yến Ăn Liền MS tại SI Beauty Wellness.
            </p>
            
            <button id="promo-accept-btn" class="action-btn primary-btn pulse-animation" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 700; border-radius: var(--radius-sm); background-color: var(--brand-gold); color: #371D0F; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 10px rgba(197, 163, 118, 0.3);">
                Nhận Ưu Đãi Ngay
            </button>
            
            <div style="margin-top: 12px;">
                <a href="#" id="promo-close-link" style="font-size: 12px; color: var(--text-muted); text-decoration: underline;">Bỏ qua ưu đãi</a>
            </div>
        </div>
    </div>

    <!-- JS SCRIPTS -->"""
        
        html = html.replace("    <!-- JS SCRIPTS -->", promo_popup_html)

        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print("index.html successfully updated with helper classes and promo popup HTML")

    # 2. MODIFY STYLE.CSS
    if os.path.exists(style_path):
        with open(style_path, 'r', encoding='utf-8') as f:
            css = f.read()

        # Add responsive brand navbar styling under @media (max-width: 768px)
        old_media_768_start = "@media (max-width: 768px) {"
        
        new_media_768_start = """@media (max-width: 768px) {
    /* Responsive Brand Navbar */
    .brand-navbar-container {
        height: 65px;
        padding: 5px 12px;
    }
    .brand-nav-logo {
        height: 42px;
        width: 42px;
        border-width: 1.5px;
    }
    .brand-nav-title {
        font-size: 14px;
        letter-spacing: 0.2px;
    }
    .brand-nav-slogan {
        display: none; /* Hide subtitle slogan inside navbar on mobile to avoid overlapping */
    }
    .brand-nav-info {
        gap: 8px;
    }
    .nav-info-item.web-link {
        display: none; /* Hide website domain text on mobile navbar */
    }
    .nav-info-item.phone-link {
        background-color: var(--brand-green);
        color: #ffffff !important;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(76, 41, 23, 0.2);
    }
    .nav-info-item.phone-link i {
        color: #ffffff !important;
        font-size: 13px;
        margin: 0;
    }
    .nav-info-item.phone-link span {
        display: none; /* Hide phone number text, show only icon button */
    }"""

        css = css.replace(old_media_768_start, new_media_768_start)

        # Update mobile styles for promo strip under @media (max-width: 480px)
        old_media_480_start = "@media (max-width: 480px) {"
        
        new_media_480_start = """@media (max-width: 480px) {
    /* Mobile Promo Strip */
    .promo-strip-container {
        flex-direction: column;
        gap: 6px;
        padding: 6px 0;
    }
    .promo-text-highlight {
        font-size: 10.5px;
        line-height: 1.4;
        padding: 0 10px;
        text-align: center;
    }
    .promo-flash-badge {
        font-size: 9px;
        padding: 2px 6px;
    }"""

        css = css.replace(old_media_480_start, new_media_480_start)

        with open(style_path, 'w', encoding='utf-8') as f:
            f.write(css)
        print("style.css successfully updated with mobile navbar and promo strip responsiveness")

    # 3. MODIFY APP.JS
    if os.path.exists(app_path):
        with open(app_path, 'r', encoding='utf-8') as f:
            js = f.read()

        # Add popup modal control logic
        target_init_block = """        // Update review count dynamically
        totalReviewsCount.textContent = reviews.length;
    }"""

        popup_control_js = """        // Update review count dynamically
        totalReviewsCount.textContent = reviews.length;

        // Initialize Promo Entry Popup (runs exactly once per session)
        initPromoPopup();
    }

    function initPromoPopup() {
        const promoPopup = document.getElementById('promo-popup');
        const promoAcceptBtn = document.getElementById('promo-accept-btn');
        const promoCloseLink = document.getElementById('promo-close-link');

        if (!promoPopup) return;

        // Check session storage
        const promoShown = sessionStorage.getItem('promoShown');
        if (!promoShown) {
            // Show popup with 600ms delay for premium feel
            setTimeout(() => {
                promoPopup.classList.add('open');
                document.body.style.overflow = 'hidden';
            }, 600);
        }

        function closePromoPopup() {
            promoPopup.classList.remove('open');
            document.body.style.overflow = '';
            sessionStorage.setItem('promoShown', 'true');
        }

        if (promoAcceptBtn) {
            promoAcceptBtn.addEventListener('click', function () {
                closePromoPopup();
                // Smooth scroll to product overview to highlight discount details
                const mainProduct = document.querySelector('.product-main-container');
                if (mainProduct) {
                    window.scrollTo({
                        top: mainProduct.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        }

        if (promoCloseLink) {
            promoCloseLink.addEventListener('click', function (e) {
                e.preventDefault();
                closePromoPopup();
            });
        }

        // Close on background click
        promoPopup.addEventListener('click', function (e) {
            if (e.target === promoPopup) {
                closePromoPopup();
            }
        });
    }"""

        js = js.replace(target_init_block, popup_control_js)

        with open(app_path, 'w', encoding='utf-8') as f:
            f.write(js)
        print("app.js successfully updated with promo popup logic")

if __name__ == "__main__":
    main()
