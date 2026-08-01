document.addEventListener('DOMContentLoaded', function () {

    

    // ==========================================================================

    // STATE VARIABLES

    // ==========================================================================

    let mediaData = {

        logo: "assets/images/logo.png",

        video: "assets/video/product_video.mp4",

        images: []

    };

    let activeImageIndex = 0;

    let selectedVariantIndex = 0; // Default: Túi lẻ 3g

    let currentQuantity = 1;

    let checkoutTimerInterval = null;

    let checkoutTimeRemaining = 300; // 5 minutes in seconds

    // Product Variants Data

    const variants = [

        {

            name: "Hộp 8 túi (24g)",

            price: 720000, // 800.000đ minus 10%

            originalPrice: 800000,

            imageIndex: 0

        }

    ];

    // Mock Customer Reviews Data

    const reviews = [

        {

            author: "Nguyễn Hương",

            avatar: "assets/images/avatars/avatar_2.jpg",

            rating: 5,

            date: "2026-07-15 14:32",

            variant: "Hộp 8 túi (24g)",

            comment: "Sản phẩm đóng gói rất cẩn thận, hộp yến nhìn sang trọng lắm. Mình mua làm quà biếu bố mẹ. Yến nở đều, thơm ngon, chỉ mất 10p ngâm nước sôi là có chén yến nóng hổi rồi. Sẽ ủng hộ shop tiếp!",

            images: [

                "assets/images/1784798205764_4777732569151823463_g310897016621598074_5c9e541f862261fbc96b89628719647b.jpg"

            ]

        },

        {

            author: "Trần Minh",

            avatar: "assets/images/avatars/avatar_1.jpg",

            rating: 5,

            date: "2026-07-20 09:15",

            variant: "Hộp 8 túi (24g)",

            comment: "Yến ăn liền siêu tiện lợi cho dân văn phòng bận rộn như mình. Chỉ cần đổ nước sôi vào là xong. Có cả táo đỏ kỷ tử hoa cúc đi kèm ngọt thanh tự nhiên. Rất hài lòng với chất lượng yến của shop.",

            images: [

                "assets/images/1784798308097_4777732569151823463_g310897016621598074_00169964426e220d1658e6c492f94fd6.jpg"

            ]

        },

        {

            author: "Phan Linh",

            avatar: "assets/images/avatars/avatar_3.jpg",

            rating: 5,

            date: "2026-07-22 18:04",

            variant: "Hộp 8 túi (24g)",

            comment: "Giao hàng siêu nhanh, đóng gói kỹ càng. Tổ yến nở nhiều, dai ngon chứ không bị nát hay nhũn. Mua túi lẻ ăn thử thấy rất ngon, lần sau sẽ mua hộp to làm quà biếu.",

            images: [

                "assets/images/1784798308079_4777732569151823463_g310897016621598074_d1b881bfbd38bf77a90e4fcc9c3f4742.jpg"

            ]

        },

        {

            author: "Lê Na",

            avatar: "assets/images/avatars/avatar_4.jpg",

            rating: 5,

            date: "2026-07-18 11:20",

            variant: "Hộp 8 túi (24g)",

            comment: "Bé nhà mình rất thích ăn yến này, có táo đỏ kỷ tử thơm ngọt bé ăn tì tì. Rất tiện không phải lách cách nhặt lông chưng cất cả tiếng như trước. Đánh giá 5 sao cho chất lượng sản phẩm.",

            images: [

                "assets/images/1784798308059_4777732569151823463_g310897016621598074_0db2ebdab3c63be5bc96099b8b41a633.jpg"

            ]

        },

        {

            author: "Vũ Tuấn",

            avatar: "assets/images/avatars/avatar_5.jpg",

            rating: 4,

            date: "2026-07-10 16:45",

            variant: "Hộp 8 túi (24g)",

            comment: "Sản phẩm chất lượng tốt, yến nở đều, vị ngọt nhẹ rất dễ ăn. Ship hàng hơi chậm 1 ngày do bên vận chuyển, nhưng shop tư vấn nhiệt tình nên vẫn cho 5 sao.",

            images: [

                "assets/images/1784798205787_4777732569151823463_g310897016621598074_a6e40caef0ec503c79e499263286582d.jpg"

            ]

        }

    ];

    // ==========================================================================

    // DOM ELEMENTS

    // ==========================================================================

    const mainProductImg = document.getElementById('main-product-img');

    const thumbnailsList = document.getElementById('thumbnails-list');

    const prevBtn = document.querySelector('.prev-btn');

    const nextBtn = document.querySelector('.next-btn');

    const priceOriginalDisplay = document.getElementById('price-original-display');

    const priceCurrentDisplay = document.getElementById('price-current-display');

    const discountTag = document.querySelector('.discount-tag');

    

    const variantsContainer = document.getElementById('variants-container');

    const qtyInput = document.getElementById('qty-input');

    const qtyMinus = document.getElementById('qty-minus');

    const qtyPlus = document.getElementById('qty-plus');

    const addToCartBtn = document.getElementById('add-to-cart-btn');

    const buyNowBtn = document.getElementById('buy-now-btn');

    const cartBadge = document.querySelector('.cart-badge');

    // Reviews Elements

    const reviewsList = document.getElementById('reviews-list');

    const filterTabs = document.querySelectorAll('.filter-tab');

    const totalReviewsCount = document.getElementById('total-reviews-count');

    // Checkout Modal Elements

    const checkoutModal = document.getElementById('checkout-modal');

    const modalCloseBtn = document.getElementById('modal-close-btn');

    const checkoutProductImage = document.getElementById('checkout-product-image');

    const checkoutProductVariant = document.getElementById('checkout-product-variant');

    const checkoutProductPrice = document.getElementById('checkout-product-price');

    const checkoutProductQty = document.getElementById('checkout-product-qty');

    const orderForm = document.getElementById('order-form');

    const summarySubtotal = document.getElementById('summary-subtotal');

    const summaryShipping = document.getElementById('summary-shipping');

    const summaryDiscountRow = document.getElementById('summary-discount-row');

    const summaryDiscount = document.getElementById('summary-discount');

    const summaryTotal = document.getElementById('summary-total');

    const shippingNoticeText = document.getElementById('shipping-notice-text');

    const remainingForFreeship = document.getElementById('remaining-for-freeship');

    // Success Modal Elements

    const successModal = document.getElementById('success-modal');

    const successCloseBtn = document.getElementById('success-close-btn');

    const sCustName = document.getElementById('s-cust-name');

    const sCustPhone = document.getElementById('s-cust-phone');

    const sCustProduct = document.getElementById('s-cust-product');

    const sCustTotal = document.getElementById('s-cust-total');

    // ==========================================================================

    // INITIALIZATION & DYNAMIC MEDIA LOADING

    // ==========================================================================

    function init() {

        // Fetch media list generated by asset_manager.py

        fetch('assets/media_list.json')

            .then(response => {

                if (!response.ok) {

                    throw new Error('Không thể tải media_list.json, sử dụng dữ liệu mặc định.');

                }

                return response.json();

            })

            .then(data => {

                mediaData = data;

                renderGallery();

                updateVariantDisplay();

                renderReviews('all');

            })

            .catch(error => {

                console.warn(error.message);

                // Fallback to manual hardcoded images list if script failed or json not found

                mediaData.images = [

                    "assets/images/logo.jpg",

                    "assets/images/DSC07640.jpg",

                    "assets/images/DSC07641.jpg",

                    "assets/images/DSC07642.jpg",

                    "assets/images/DSC07643.jpg",

                    "assets/images/DSC07644.jpg",

                    "assets/images/DSC07645.jpg",

                    "assets/images/DSC07646.jpg",

                    "assets/images/DSC07647.jpg",

                    "assets/images/DSC07649.jpg",

                    "assets/images/DSC07650.jpg",

                    "assets/images/DSC07651.jpg",

                    "assets/images/DSC07652.jpg",

                    "assets/images/DSC07653.jpg",

                    "assets/images/DSC07654.jpg",

                    "assets/images/DSC07753.jpg"

                ];

                renderGallery();

                updateVariantDisplay();

                renderReviews('all');

            });

        setupGalleryListeners();

        setupVariantListeners();

        setupQuantityListeners();

        setupCheckoutModalListeners();

        setupReviewsListeners();

        

        // Update review count dynamically

        totalReviewsCount.textContent = reviews.length;

        // Initialize Promo Entry Popup (runs exactly once per session)

        initPromoPopup();

    }

    function initPromoPopup() {

        const promoPopup = document.getElementById('promo-popup');

        const promoAcceptBtn = document.getElementById('promo-accept-btn');

        const promoCloseLink = document.getElementById('promo-close-link');

        if (!promoPopup) return;

        let countdownTimer;

        let timeLeft = 300; // 5 minutes in seconds

        function startCountdown() {

            const countdownEl = document.getElementById('promo-countdown');

            if (!countdownEl) return;

            clearInterval(countdownTimer);

            countdownTimer = setInterval(() => {

                if (timeLeft <= 0) {

                    clearInterval(countdownTimer);

                    countdownEl.textContent = "00:00";

                    return;

                }

                timeLeft--;

                const mins = Math.floor(timeLeft / 60);

                const secs = timeLeft % 60;

                countdownEl.textContent = 

                    (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

            }, 1000);

        }

        // Check session storage

        const promoShown = sessionStorage.getItem('promoShown');

        if (!promoShown) {

            // Show popup with 600ms delay for premium feel

            setTimeout(() => {

                promoPopup.classList.add('open');

                document.body.style.overflow = 'hidden';

                startCountdown();

            }, 600);

        }

        function closePromoPopup() {

            promoPopup.classList.remove('open');

            document.body.style.overflow = '';

            sessionStorage.setItem('promoShown', 'true');

            clearInterval(countdownTimer);

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

    }

    // ==========================================================================

    // GALLERY CONTROLLER

    // ==========================================================================

    function renderGallery() {

        if (!mediaData.images || mediaData.images.length === 0) return;

        const videoEl = document.getElementById('product-video');

        if (activeImageIndex === 0) {

            if (videoEl) {

                videoEl.style.display = 'block';

                videoEl.play().catch(err => console.log('Autoplay play execution deferred:', err));

            }

            mainProductImg.style.display = 'none';

        } else {

            if (videoEl) videoEl.style.display = 'none';

            mainProductImg.style.display = 'block';

            mainProductImg.src = mediaData.images[activeImageIndex];

        }

        // Generate thumbnails HTML

        thumbnailsList.innerHTML = '';

        mediaData.images.forEach((imgSrc, idx) => {

            const thumb = document.createElement('div');

            thumb.className = `thumbnail-item ${idx === activeImageIndex ? 'active' : ''}`;

            thumb.setAttribute('data-index', idx);

            

            if (idx === 0) {

                // Video thumbnail

                thumb.style.position = 'relative';

                thumb.innerHTML = `

                    <img src="${imgSrc}" alt="Video Thumbnail">

                    <div class="video-overlay-icon" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.45); color: white; font-size: 14px;">

                        <i class="fas fa-play"></i>

                    </div>

                `;

            } else {

                thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${idx}">`;

            }

            

            thumb.addEventListener('click', function () {

                setActiveImage(idx);

            });

            

            thumbnailsList.appendChild(thumb);

        });

    }

    function setActiveImage(index) {

        if (index < 0 || index >= mediaData.images.length) return;

        activeImageIndex = index;

        const videoEl = document.getElementById('product-video');

        if (activeImageIndex === 0) {

            if (videoEl) {

                videoEl.style.display = 'block';

                videoEl.play().catch(err => console.log('Autoplay play execution deferred:', err));

            }

            mainProductImg.style.display = 'none';

        } else {

            if (videoEl) {

                videoEl.style.display = 'none';

                videoEl.pause();

            }

            mainProductImg.style.display = 'block';

            mainProductImg.src = mediaData.images[activeImageIndex];

        }

        // Update active thumbnail border

        const thumbs = thumbnailsList.querySelectorAll('.thumbnail-item');

        thumbs.forEach((thumb, idx) => {

            if (idx === activeImageIndex) {

                thumb.classList.add('active');

                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

            } else {

                thumb.classList.remove('active');

            }

        });

    }

    function setupGalleryListeners() {

        prevBtn.addEventListener('click', function () {

            let prevIdx = activeImageIndex - 1;

            if (prevIdx < 0) prevIdx = mediaData.images.length - 1;

            setActiveImage(prevIdx);

        });

        nextBtn.addEventListener('click', function () {

            let nextIdx = activeImageIndex + 1;

            if (nextIdx >= mediaData.images.length) nextIdx = 0;

            setActiveImage(nextIdx);

        });

    }

    // ==========================================================================

    // VARIANTS & PRICING CONTROLLER

    // ==========================================================================

    function setupVariantListeners() {

        const variantButtons = variantsContainer.querySelectorAll('.variant-btn');

        variantButtons.forEach(btn => {

            btn.addEventListener('click', function () {

                // Remove active class from all buttons

                variantButtons.forEach(b => b.classList.remove('active'));

                

                // Add active class to clicked button

                this.classList.add('active');

                

                selectedVariantIndex = parseInt(this.getAttribute('data-index'));

                updateVariantDisplay();

                // Switch gallery to representative image for this variant

                const targetImgIdx = variants[selectedVariantIndex].imageIndex;

                if (mediaData.images && mediaData.images.length > targetImgIdx) {

                    setActiveImage(targetImgIdx);

                }

            });

        });

    }

    function updateVariantDisplay() {

        const variant = variants[selectedVariantIndex];

        

        // Format price to currency

        const formatPrice = (num) => num.toLocaleString('vi-VN') + '₫';

        priceCurrentDisplay.textContent = formatPrice(variant.price);

        priceOriginalDisplay.textContent = formatPrice(variant.originalPrice);

        // Calculate discount percentage

        const discountPct = Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);

        discountTag.textContent = `Giảm ${discountPct}%`;

    }

    // ==========================================================================

    // QUANTITY SELECTOR CONTROLLER

    // ==========================================================================

    function setupQuantityListeners() {

        qtyMinus.addEventListener('click', function () {

            let val = parseInt(qtyInput.value);

            if (val > 1) {

                currentQuantity = val - 1;

                qtyInput.value = currentQuantity;

            }

        });

        qtyPlus.addEventListener('click', function () {

            let val = parseInt(qtyInput.value);

            currentQuantity = val + 1;

            qtyInput.value = currentQuantity;

        });

        qtyInput.addEventListener('change', function () {

            let val = parseInt(this.value);

            if (isNaN(val) || val < 1) {

                this.value = 1;

                currentQuantity = 1;

            } else {

                currentQuantity = val;

            }

        });

    }

    // ==========================================================================

    // REVIEWS CONTROLLER

    // ==========================================================================

    function renderReviews(filter) {

        reviewsList.innerHTML = '';

        

        let filteredReviews = reviews;

        if (filter === '5') {

            filteredReviews = reviews.filter(r => r.rating === 5);

        } else if (filter === '4') {

            filteredReviews = reviews.filter(r => r.rating === 4);

        } else if (filter === 'image') {

            filteredReviews = reviews.filter(r => r.images && r.images.length > 0);

        }

        if (filteredReviews.length === 0) {

            reviewsList.innerHTML = `

                <div class="no-reviews" style="text-align: center; padding: 40px; color: var(--text-muted);">

                    <i class="far fa-comments" style="font-size: 40px; margin-bottom: 10px;"></i>

                    <p>Chưa có đánh giá nào phù hợp với bộ lọc này.</p>

                </div>

            `;

            return;

        }

        filteredReviews.forEach(r => {

            const reviewCard = document.createElement('div');

            reviewCard.className = 'review-item';

            

            // Build stars html

            let starsHtml = '';

            for (let i = 0; i < 5; i++) {

                if (i < r.rating) {

                    starsHtml += '<i class="fas fa-star"></i>';

                } else {

                    starsHtml += '<i class="far fa-star"></i>';

                }

            }

            // Build review photos html

            let photosHtml = '';

            if (r.images && r.images.length > 0) {

                photosHtml = '<div class="review-media-gallery">';

                r.images.forEach(img => {

                    photosHtml += `

                        <div class="review-media-thumbnail">

                            <img src="${img}" alt="Đánh giá từ khách hàng">

                        </div>

                    `;

                });

                photosHtml += '</div>';

            }

            const initials = r.author.split(' ').map(n => n[0]).join('');

            const avatarColor = getHashColor(r.author);

            reviewCard.innerHTML = `

                <div class="review-avatar-wrapper">

                    <img src="${r.avatar}" alt="Khách hàng" class="review-avatar" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--brand-gold); display: block;">

                </div>

                <div class="review-main">

                    <div class="review-author">${r.author} <span style="font-size: 11px; background-color: var(--brand-green-light); color: var(--brand-green); padding: 1px 4px; border-radius: 2px; margin-left: 5px;"><i class="fas fa-check-circle"></i> Đã mua hàng</span></div>

                    <div class="review-stars">${starsHtml}</div>

                    <div class="review-meta">Phân loại: ${r.variant} | ${r.date}</div>

                    <div class="review-comment">${r.comment}</div>

                    ${photosHtml}

                </div>

            `;

            // Simple media zoom effect inside reviews

            const thumbnails = reviewCard.querySelectorAll('.review-media-thumbnail img');

            thumbnails.forEach(img => {

                img.addEventListener('click', function () {

                    // Open a simple zoom overlay or temporarily enlarge

                    const isZoomed = this.style.transform === 'scale(2.5)';

                    thumbnails.forEach(i => {

                        i.style.transform = '';

                        i.style.zIndex = '';

                        i.style.position = '';

                    });

                    if (!isZoomed) {

                        this.style.transform = 'scale(2.5)';

                        this.style.zIndex = '10';

                        this.style.position = 'relative';

                        this.style.transition = 'transform 0.3s ease';

                    }

                });

            });

            reviewsList.appendChild(reviewCard);

        });

    }

    function setupReviewsListeners() {

        filterTabs.forEach(tab => {

            tab.addEventListener('click', function () {

                filterTabs.forEach(t => t.classList.remove('active'));

                this.classList.add('active');

                

                const filter = this.getAttribute('data-filter');

                renderReviews(filter);

            });

        });

    }

    // Helper to generate consistent colors based on author name for mock avatars

    function getHashColor(str) {

        let hash = 0;

        for (let i = 0; i < str.length; i++) {

            hash = str.charCodeAt(i) + ((hash << 5) - hash);

        }

        const colors = ['#075E4D', '#c69c55', '#ee4d2d', '#2b580c', '#3f72af', '#6f42c1', '#fd7e14', '#20c997'];

        return colors[Math.abs(hash) % colors.length];

    }

    // ==========================================================================

    // CHECKOUT MODAL & ORDER FORM CONTROLLER

    // ==========================================================================

    function setupCheckoutModalListeners() {

        // Open Modal Trigger

        buyNowBtn.addEventListener('click', function () {

            openCheckoutModal();

        });

        addToCartBtn.addEventListener('click', function () {

            // Shopee style feedback: add directly or open checkout.

            // As a landing page, we want maximum sales, so opening modal is ideal.

            openCheckoutModal();

        });

        // Close Modal Trigger

        modalCloseBtn.addEventListener('click', function () {

            closeCheckoutModal();

        });

        checkoutModal.addEventListener('click', function (e) {

            if (e.target === checkoutModal) {

                closeCheckoutModal();

            }

        });

        // Form Submit

        orderForm.addEventListener('submit', function (e) {

            e.preventDefault();

            if (validateForm()) {

                submitOrder();

            }

        });

        // Reset error formatting on keypress

        const inputs = orderForm.querySelectorAll('.form-input');

        inputs.forEach(input => {

            input.addEventListener('input', function () {

                const group = this.closest('.form-group');

                if (group) group.classList.remove('has-error');

            });

        });

        // Bottom CTA Button trigger

        const bottomBuyBtn = document.getElementById('bottom-buy-btn');

        if (bottomBuyBtn) {

            bottomBuyBtn.addEventListener('click', function () {

                openCheckoutModal();

            });

        }

    }

    function openCheckoutModal() {

        const variant = variants[selectedVariantIndex];

        

        // Sync product details in modal

        checkoutProductVariant.textContent = `Phân loại: ${variant.name}`;

        checkoutProductPrice.textContent = variant.price.toLocaleString('vi-VN') + '₫';

        checkoutProductQty.textContent = `x ${currentQuantity}`;

        // Sync product image

        if (mediaData.images && mediaData.images.length > variant.imageIndex) {

            checkoutProductImage.src = mediaData.images[variant.imageIndex];

        } else {

            checkoutProductImage.src = mediaData.logo;

        }

        // Calculate and update prices

        calculateTotals();

        // Show Modal

        checkoutModal.classList.add('open');

        document.body.style.overflow = 'hidden'; // Lock background scrolling

        startCheckoutCountdown();

    }

    function closeCheckoutModal() {

        checkoutModal.classList.remove('open');

        document.body.style.overflow = ''; // Restore scroll

        resetFormErrors();

        pauseCheckoutCountdown();

    }

    function startCheckoutCountdown() {
        const timerDisplay = document.getElementById("checkout-countdown");
        if (!timerDisplay) return;

        if (checkoutTimeRemaining <= 0) {
            checkoutTimeRemaining = 300;
        }

        if (checkoutTimerInterval) {
            clearInterval(checkoutTimerInterval);
        }

        function updateTimer() {
            const minutes = Math.floor(checkoutTimeRemaining / 60);
            const seconds = checkoutTimeRemaining % 60;
            
            const minutesStr = String(minutes).padStart(2, '0');
            const secondsStr = String(seconds).padStart(2, '0');
            
            timerDisplay.textContent = `${minutesStr}:${secondsStr}`;
            
            if (checkoutTimeRemaining <= 0) {
                clearInterval(checkoutTimerInterval);
                checkoutTimerInterval = null;
            } else {
                checkoutTimeRemaining--;
            }
        }

        updateTimer();
        checkoutTimerInterval = setInterval(updateTimer, 1000);
    }

    function pauseCheckoutCountdown() {
        if (checkoutTimerInterval) {
            clearInterval(checkoutTimerInterval);
            checkoutTimerInterval = null;
        }
    }

    function calculateTotals() {

        const variant = variants[selectedVariantIndex];

        const subtotal = variant.price * currentQuantity;

        

        // Always free shipping as per uu-dai.txt

        const shippingFee = 0;

        const total = subtotal;

        // Update displays

        summarySubtotal.textContent = subtotal.toLocaleString('vi-VN') + '₫';

        summaryShipping.textContent = "Miễn phí";

        summaryTotal.textContent = total.toLocaleString('vi-VN') + '₫';

        // Update Free Shipping progress notice

        shippingNoticeText.innerHTML = `<span class="text-green"><i class="fas fa-check-circle"></i> Đơn hàng của bạn được <strong>Miễn Phí Vận Chuyển</strong>!</span>`;

    }

    function validateForm() {

        let isValid = true;

        

        const nameInput = document.getElementById('customer-name');

        const phoneInput = document.getElementById('customer-phone');

        const citySelect = document.getElementById('customer-city');

        const addressInput = document.getElementById('customer-address');

        // Reset errors

        resetFormErrors();

        // Validate name

        if (nameInput.value.trim() === '') {

            nameInput.closest('.form-group').classList.add('has-error');

            isValid = false;

        }

        // Validate phone (Vietnamese phone number: 10 digits, starts with 0 or +84)

        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;

        if (!phoneRegex.test(phoneInput.value.trim())) {

            phoneInput.closest('.form-group').classList.add('has-error');

            isValid = false;

        }

        // Validate city text input

        if (citySelect.value.trim() === '') {

            citySelect.closest('.form-group').classList.add('has-error');

            isValid = false;

        }

        // Validate address

        if (addressInput.value.trim() === '') {

            addressInput.closest('.form-group').classList.add('has-error');

            isValid = false;

        }

        return isValid;

    }

    function resetFormErrors() {

        const groups = orderForm.querySelectorAll('.form-group');

        groups.forEach(g => g.classList.remove('has-error'));

    }

    function submitOrder() {

        const variant = variants[selectedVariantIndex];

        const subtotal = variant.price * currentQuantity;

        const shippingFee = 0;

        const total = subtotal;

        const customerName = document.getElementById('customer-name').value.trim();

        const customerPhone = document.getElementById('customer-phone').value.trim();

        const customerCity = document.getElementById('customer-city').value;

        const customerAddress = document.getElementById('customer-address').value.trim();

        const customerNotes = document.getElementById('customer-notes').value.trim();

        // Prepare order data

        const order = {

            id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),

            name: customerName,

            phone: customerPhone,

            city: customerCity,

            address: customerAddress,

            notes: customerNotes,

            variant: variant.name,

            quantity: currentQuantity,

            totalAmount: total,

            date: new Date().toISOString()

        };

        // ==========================================================================
        // GỬI ĐƠN HÀNG LÊN GOOGLE FORM (ĐÃ KẾT NỐI THÀNH CÔNG)
        // ==========================================================================
        const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScQTkiqK7akxeoaGdHAM1WS7i7iF7ZeghX2gxSZYRHNZPKNig/formResponse";
        if (GOOGLE_FORM_ACTION_URL) {
            const formBody = new URLSearchParams();
            formBody.append("entry.1852048993", order.name);        // Họ và tên
            formBody.append("entry.1898514720", order.phone);       // Số điện thoại
            formBody.append("entry.24795508", order.city);         // Tỉnh / Thành phố
            formBody.append("entry.1914885", order.address);       // Địa chỉ cụ thể
            formBody.append("entry.723577657", order.notes);        // Ghi chú đơn hàng
            formBody.append("entry.603655137", order.variant);      // Phân loại sản phẩm
            formBody.append("entry.746366047", order.quantity);     // Số lượng đặt mua
            formBody.append("entry.1149922479", order.totalAmount);  // Tổng tiền thanh toán

            fetch(GOOGLE_FORM_ACTION_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formBody.toString()
            }).then(() => {
                console.log("Đã gửi đơn hàng lên Google Form thành công!");
            }).catch((err) => {
                console.error("Lỗi gửi lên Google Form:", err);
            });
        }

        // Save order data to local storage for persistence

        let ordersList = JSON.parse(localStorage.getItem('orders_list')) || [];

        ordersList.push(order);

        localStorage.setItem('orders_list', JSON.stringify(ordersList));

        // Update cart badge dynamically if exists

        if (cartBadge) {

            cartBadge.textContent = parseInt(cartBadge.textContent) + currentQuantity;

        }

        // Populate Success Modal Details

        sCustName.textContent = order.name;

        sCustPhone.textContent = order.phone;

        sCustProduct.textContent = `${order.variant} x ${order.quantity}`;

        sCustTotal.textContent = order.totalAmount.toLocaleString('vi-VN') + '₫';

        // Transition from Checkout Modal to Success Modal

        closeCheckoutModal();

        openSuccessModal();

        

        // Reset form

        orderForm.reset();

        currentQuantity = 1;

        qtyInput.value = 1;

    }

    function openSuccessModal() {

        successModal.classList.add('open');

        document.body.style.overflow = 'hidden';

    }

    function closeSuccessModal() {

        successModal.classList.remove('open');

        document.body.style.overflow = '';

    }

    // Success Modal Close Listeners

    successCloseBtn.addEventListener('click', function () {

        closeSuccessModal();

    });

    successModal.addEventListener('click', function (e) {

        if (e.target === successModal) {

            closeSuccessModal();

        }

    });

    // Universal Modal Helper Function

    function setupPolicyModal(modalId, linkIds, closeBtnIds) {

        const modal = document.getElementById(modalId);

        if (!modal) return;

        linkIds.forEach(id => {

            const link = document.getElementById(id);

            if (link) {

                link.addEventListener('click', function(e) {

                    e.preventDefault();

                    modal.classList.add('open');

                    document.body.style.overflow = 'hidden';

                });

            }

        });

        closeBtnIds.forEach(id => {

            const btn = document.getElementById(id);

            if (btn) {

                btn.addEventListener('click', function() {

                    modal.classList.remove('open');

                    document.body.style.overflow = '';

                });

            }

        });

        modal.addEventListener('click', function(e) {

            if (e.target === modal) {

                modal.classList.remove('open');

                document.body.style.overflow = '';

            }

        });

    }

    // Set up all 4 policy modals

    setupPolicyModal('privacy-modal', ['privacy-policy-link', 'footer-privacy-link'], ['privacy-modal-close-btn', 'privacy-policy-close-btn']);

    setupPolicyModal('rules-modal', ['footer-rules-link'], ['rules-modal-close-btn', 'rules-policy-close-btn']);

    setupPolicyModal('shipping-modal', ['footer-shipping-link'], ['shipping-modal-close-btn', 'shipping-policy-close-btn']);

    setupPolicyModal('refund-modal', ['footer-refund-link'], ['refund-modal-close-btn', 'refund-policy-close-btn']);

    // ==========================================================================

    // PROMO POPUP CONTROLLER

    // ==========================================================================

    function initPromoPopup() {

        const promoPopup = document.getElementById('promo-popup');

        const promoAcceptBtn = document.getElementById('promo-accept-btn');

        const promoCloseLink = document.getElementById('promo-close-link');

        if (!promoPopup) return;

        let countdownTimer;

        let timeLeft = 300; // 5 minutes in seconds

        function startCountdown() {

            const countdownEl = document.getElementById('promo-countdown');

            if (!countdownEl) return;

            clearInterval(countdownTimer);

            countdownTimer = setInterval(() => {

                if (timeLeft <= 0) {

                    clearInterval(countdownTimer);

                    countdownEl.textContent = "00:00";

                    return;

                }

                timeLeft--;

                const mins = Math.floor(timeLeft / 60);

                const secs = timeLeft % 60;

                countdownEl.textContent = 

                    (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

            }, 1000);

        }

        // Check session storage

        const promoShown = sessionStorage.getItem('promoShown');

        if (!promoShown) {

            // Show popup with 600ms delay for premium feel

            setTimeout(() => {

                promoPopup.classList.add('open');

                document.body.style.overflow = 'hidden';

                startCountdown();

            }, 600);

        }

        function closePromoPopup() {

            promoPopup.classList.remove('open');

            document.body.style.overflow = '';

            sessionStorage.setItem('promoShown', 'true');

            clearInterval(countdownTimer);

        }

        if (promoAcceptBtn) {

            promoAcceptBtn.addEventListener('click', function () {

                closePromoPopup();

                // Smooth scroll to product overview

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

    }

    // ==========================================================================

    // INITIAL SYSTEM STARTUP

    // ==========================================================================

    init();

});

