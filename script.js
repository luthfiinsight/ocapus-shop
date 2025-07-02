document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURASI ---
    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQz-eGx89LtYBROcJk3__Bu3qlooJV49VIPlxYsoQZ7m8X-8tC4XavoC3aOkhyDPoPWk4Xuc62EqSOC/pub?gid=0&single=true&output=csv';
    const SLIDESHOW_IMAGES = [
        'https://i.imgur.com/6stRqE9.jpeg', 'https://i.imgur.com/em0Re4Q.jpeg', 'https://i.imgur.com/NHDZkBa.jpeg',
        'https://i.imgur.com/LbG1KcA.jpeg', 'https://i.imgur.com/NjbJnms.jpeg'
    ];
    const PRODUCTS_PER_PAGE = 20;

    // --- KAMUS TERJEMAHAN (DIPERBARUI) ---
    const translations = {
        'id': { site_description: 'Rekomendasi produk pilihan dari platform e-commerce terbaik. Cepat, mudah, dan terpercaya.', search_placeholder: 'Cari nama produk...', all_categories: 'Semua Kategori', all_ecommerce: 'Semua E-commerce', loading_products: 'Memuat Produk...', no_products_found: 'Produk tidak ditemukan.', buy_on_shopee: 'Beli di Shopee', buy_on_tiktok: 'Beli di TikTok', buy_on_lazada: 'Beli di Lazada', buy_on_aliexpress: 'Beli di AliExpress', watch_video: 'Lihat Video', watch_on_shopee: 'Tonton di Shopee', home_button: '« Home', last_button: 'Last »', lang_name: 'Indonesia', flag_code: 'id', link_copied: 'Link disalin!' },
        'en': { site_description: 'Selected product recommendations from the best e-commerce platforms. Fast, easy, and reliable.', search_placeholder: 'Search product name...', all_categories: 'All Categories', all_ecommerce: 'All E-commerce', loading_products: 'Loading Products...', no_products_found: 'No products found.', buy_on_shopee: 'Buy on Shopee', buy_on_tiktok: 'Buy on TikTok', buy_on_lazada: 'Buy on Lazada', buy_on_aliexpress: 'Buy on AliExpress', watch_video: 'Watch Video', watch_on_shopee: 'Watch on Shopee', home_button: '« Home', last_button: 'Last »', lang_name: 'English', flag_code: 'gb', link_copied: 'Link copied!' },
        'zh': { site_description: '来自最佳电子商务平台的精选产品推荐。快捷、方便、可靠。', search_placeholder: '搜索产品名称...', all_categories: '所有类别', all_ecommerce: '所有电商', loading_products: '正在加载产品...', no_products_found: '未找到产品。', buy_on_shopee: '在Shopee购买', buy_on_tiktok: '在TikTok购买', buy_on_lazada: '在Lazada购买', buy_on_aliexpress: '在速卖通购买', watch_video: '观看视频', watch_on_shopee: '在Shopee观看', home_button: '« 首页', last_button: '末页 »', lang_name: '中文', flag_code: 'cn', link_copied: '链接已复制！' },
        'es': { site_description: 'Recomendaciones de productos seleccionados de las mejores plataformas de comercio electrónico. Rápido, fácil y confiable.', search_placeholder: 'Buscar nombre de producto...', all_categories: 'Todas las categorías', all_ecommerce: 'Todo el E-commerce', loading_products: 'Cargando productos...', no_products_found: 'No se encontraron productos.', buy_on_shopee: 'Comprar en Shopee', buy_on_tiktok: 'Comprar en TikTok', buy_on_lazada: 'Comprar en Lazada', buy_on_aliexpress: 'Comprar en AliExpress', watch_video: 'Ver video', watch_on_shopee: 'Ver en Shopee', home_button: '« Inicio', last_button: 'Último »', lang_name: 'Español', flag_code: 'es', link_copied: '¡Enlace copiado!' },
        'ar': { site_description: 'توصيات منتجات مختارة من أفضل منصات التجارة الإلكترونية. سريعة وسهلة وموثوقة.', search_placeholder: 'البحث عن اسم المنتج...', all_categories: 'جميع الفئات', all_ecommerce: 'جميع المتاجر', loading_products: 'جاري تحميل المنتجات...', no_products_found: 'لم يتم العثور على منتجات.', buy_on_shopee: 'شراء على Shopee', buy_on_tiktok: 'شراء على TikTok', buy_on_lazada: 'شراء على Lazada', buy_on_aliexpress: 'شراء على AliExpress', watch_video: 'مشاهدة الفيديو', watch_on_shopee: 'مشاهدة على Shopee', home_button: '« البداية', last_button: 'النهاية »', lang_name: 'العربية', flag_code: 'sa', link_copied: 'تم نسخ الرابط!' },
        'fr': { site_description: 'Recommandations de produits sélectionnés des meilleures plateformes de commerce électronique. Rapide, facile et fiable.', search_placeholder: 'Rechercher un nom de produit...', all_categories: 'Toutes catégories', all_ecommerce: 'Tout l\'E-commerce', loading_products: 'Chargement des produits...', no_products_found: 'Aucun produit trouvé.', buy_on_shopee: 'Acheter sur Shopee', buy_on_tiktok: 'Acheter sur TikTok', buy_on_lazada: 'Acheter sur Lazada', buy_on_aliexpress: 'Acheter sur AliExpress', watch_video: 'Regarder la vidéo', watch_on_shopee: 'Regarder sur Shopee', home_button: '« Accueil', last_button: 'Dernier »', lang_name: 'Français', flag_code: 'fr', link_copied: 'Lien copié !' },
        'de': { site_description: 'Ausgewählte Produktempfehlungen von den besten E-Commerce-Plattformen. Schnell, einfach und zuverlässig.', search_placeholder: 'Produktnamen suchen...', all_categories: 'Alle Kategorien', all_ecommerce: 'Alle E-commerce', loading_products: 'Lade Produkte...', no_products_found: 'Keine Produkte gefunden.', buy_on_shopee: 'Auf Shopee kaufen', buy_on_tiktok: 'Auf TikTok kaufen', buy_on_lazada: 'Auf Lazada kaufen', buy_on_aliexpress: 'Auf AliExpress kaufen', watch_video: 'Video ansehen', watch_on_shopee: 'Auf Shopee ansehen', home_button: '« Anfang', last_button: 'Ende »', lang_name: 'Deutsch', flag_code: 'de', link_copied: 'Link kopiert!' }
    };

    let allProducts = [], filteredProducts = [], currentPage = 1, currentLang = localStorage.getItem('lang') || 'id';

    const catalog = document.getElementById('product-catalog'), searchInput = document.getElementById('search-input'),
          categoryFilter = document.getElementById('category-filter'), ecommerceFilter = document.getElementById('ecommerce-filter'),
          paginationContainer = document.getElementById('pagination-container'), loader = document.getElementById('loader'),
          darkModeToggle = document.getElementById('dark-mode-toggle'), slideshowContainer = document.querySelector('.slideshow-container'),
          videoModal = document.getElementById('video-modal'), videoFrame = document.getElementById('video-frame'),
          closeModalBtn = document.querySelector('.modal-close'), langCurrentBtn = document.getElementById('lang-current-btn'),
          langDropdown = document.getElementById('lang-dropdown');

    async function init() {
        setLanguage(currentLang); setupLanguageSwitcher(); setupDarkMode(); setupSlideshow();
        setupModalListeners(); showLoader(true);
        try {
            await fetchData(); setupCategoryFilter(); applyFilters();
        } catch (error) {
            console.error("Error initializing app:", error);
            catalog.innerHTML = `<p style="text-align:center; color:red;">Gagal memuat data. Periksa URL Google Sheet.</p>`;
        } finally {
            showLoader(false);
        }
        setupEventListeners();
    }

    function setLanguage(lang) {
        currentLang = lang; localStorage.setItem('lang', lang); document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        const langData = translations[lang];
        langCurrentBtn.querySelector('img').src = `https://flagcdn.com/${langData.flag_code}.svg`;
        langCurrentBtn.querySelector('span').innerText = langData.lang_name;
        document.querySelectorAll('[data-translate-key]').forEach(el => el.innerText = translations[lang][el.getAttribute('data-translate-key')]);
        document.querySelectorAll('[data-translate-key-placeholder]').forEach(el => el.placeholder = translations[lang][el.getAttribute('data-translate-key-placeholder')]);
        if (allProducts.length > 0) {
            setupCategoryFilter(); renderProducts(); renderPagination(); 
        }
    }

    function setupLanguageSwitcher() {
        langDropdown.addEventListener('click', e => {
            e.preventDefault(); const langOption = e.target.closest('.language-option');
            if (langOption) setLanguage(langOption.dataset.lang);
        });
    }

    async function fetchData() {
        const response = await fetch(GOOGLE_SHEET_URL); const csvText = await response.text();
        allProducts = parseCSV(csvText); allProducts.reverse(); filteredProducts = [...allProducts];
    }

    function parseCSV(text) {
        const rows = text.split(/\r?\n/), headers = rows[0].split(',').map(h => h.trim().toLowerCase()), data = [];
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue;
            const values = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/), obj = {};
            headers.forEach((header, index) => obj[header] = values[index] ? values[index].trim().replace(/^"|"$/g, '') : '');
            data.push(obj);
        }
        return data;
    }

    // --- RENDER PRODUCTS (DIPERBARUI) ---
    function renderProducts() {
        catalog.innerHTML = '';
        const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
        if (paginatedProducts.length === 0) {
            catalog.innerHTML = `<p style="text-align:center;">${translations[currentLang].no_products_found}</p>`; return;
        }
        paginatedProducts.forEach(product => {
            let videoButtonHTML = '';
            if (product.youtube_video || product.tiktok_video) {
                const videoSrc = product.youtube_video || product.tiktok_video;
                videoButtonHTML = `<button class="btn-video" data-video-src="${videoSrc}">${translations[currentLang].watch_video}</button>`;
            } else if (product.shopee_video) {
                videoButtonHTML = `<a href="${product.shopee_video}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-video">${translations[currentLang].watch_on_shopee}</a>`;
            }
            const productPageUrl = encodeURIComponent(window.location.href);
            const shareText = encodeURIComponent(`Lihat produk ini: ${product.judul} - ${window.location.href}`);
            const shareImage = encodeURIComponent(product.gambar);
            const shareButtonsHTML = `<div class="share-container"><div class="share-buttons"><a href="https://www.facebook.com/sharer/sharer.php?u=${productPageUrl}" target="_blank" class="btn-share btn-facebook" aria-label="Share to Facebook"><svg viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></a><a href="https://twitter.com/intent/tweet?url=${productPageUrl}&text=${shareText}" target="_blank" class="btn-share btn-x" aria-label="Share to X"><svg viewBox="0 0 512 512"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></a><a href="https://api.whatsapp.com/send?text=${shareText}" target="_blank" class="btn-share btn-whatsapp" aria-label="Share to WhatsApp"><svg viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.2-96.7-25.4l-7.1-4.2-71.7 18.9L99.8 352l-4.5-7.3C81.7 315 71.5 281.3 71.5 246.6c0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg></a><a href="https://www.pinterest.com/pin/create/button/?url=${productPageUrl}&media=${shareImage}&description=${shareText}" target="_blank" class="btn-share btn-pinterest" aria-label="Share to Pinterest"><svg viewBox="0 0 384 512"><path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-62.9 0-54 44.7-99.5 96.6-99.5 53.3 0 91.7 35.4 91.7 82.9 0 82.9-68.5 162-170.9 162-106.6 0-143.2-75-143.2-162.9 0-49.4 34.4-86.4 79.5-86.4 39.1 0 54.4 24.9 54.4 49.5 0 49.5-34.4 125.7-34.4 125.7 0 31.8 28.1 58.1 60.3 58.1 72.5 0 121.7-87.3 121.7-187.3 0-75.3-51.7-133.5-151.7-133.5z"/></svg></a><button class="btn-share btn-instagram btn-copy-link" data-link-to-copy="${window.location.href}" aria-label="Copy link for Instagram"><svg viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></button></div></div>`;
            const productCard = `<div class="product-card"><img src="${product.gambar}" alt="${product.judul}" class="product-image" loading="lazy"><div class="product-info"><h3 class="product-title">${product.judul}</h3><div class="product-buttons">${product.shopee ? `<a href="${product.shopee}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-shopee">${translations[currentLang].buy_on_shopee}</a>` : ''}${product.tiktok ? `<a href="${product.tiktok}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-tiktok">${translations[currentLang].buy_on_tiktok}</a>` : ''}${product.lazada ? `<a href="${product.lazada}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-lazada">${translations[currentLang].buy_on_lazada}</a>` : ''}${product.aliexpress ? `<a href="${product.aliexpress}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-aliexpress">${translations[currentLang].buy_on_aliexpress}</a>` : ''}${videoButtonHTML}</div>${shareButtonsHTML}</div></div>`;
            catalog.insertAdjacentHTML('beforeend', productCard);
        });
    }

    // --- RENDER PAGINATION ---
    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
        if (totalPages <= 1) return;
        const maxVisiblePages = 7;
        const halfVisible = Math.floor(maxVisiblePages / 2);
        let startPage = currentPage - halfVisible;
        let endPage = currentPage + halfVisible;
        if (startPage <= 0) { startPage = 1; endPage = Math.min(maxVisiblePages, totalPages); }
        if (endPage > totalPages) { endPage = totalPages; startPage = Math.max(1, totalPages - maxVisiblePages + 1); }
        const createButton = (page, text, isDisabled = false) => {
            const button = document.createElement('button');
            button.innerText = text; button.disabled = isDisabled;
            if (page === currentPage) button.classList.add('active');
            button.addEventListener('click', () => { currentPage = page; renderProducts(); renderPagination(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
            return button;
        };
        const createEllipsis = () => { const ellipsis = document.createElement('span'); ellipsis.innerText = '...'; return ellipsis; };
        paginationContainer.appendChild(createButton(1, translations[currentLang].home_button, currentPage === 1));
        if (startPage > 1) paginationContainer.appendChild(createEllipsis());
        for (let i = startPage; i <= endPage; i++) paginationContainer.appendChild(createButton(i, i));
        if (endPage < totalPages) paginationContainer.appendChild(createEllipsis());
        paginationContainer.appendChild(createButton(totalPages, translations[currentLang].last_button, currentPage === totalPages));
    }
    
    // --- APPLY FILTERS (DIPERBARUI) ---
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase(), selectedCategory = categoryFilter.value, selectedEcommerce = ecommerceFilter.value;
        filteredProducts = allProducts.filter(product => {
            const matchesSearch = product.judul.toLowerCase().includes(searchTerm);
            const productCategories = product.kategori ? product.kategori.toLowerCase().split(',').map(cat => cat.trim()) : [];
            const matchesCategory = selectedCategory === 'all' || productCategories.includes(selectedCategory);
            let matchesEcommerce = true;
            if (selectedEcommerce !== 'all') {
                matchesEcommerce = product[selectedEcommerce] && product[selectedEcommerce].trim() !== '';
            }
            return matchesSearch && matchesCategory && matchesEcommerce;
        });
        currentPage = 1;
        renderProducts();
        renderPagination();
    }

    function setupCategoryFilter() {
        const currentSelection = categoryFilter.value;
        categoryFilter.innerHTML = `<option value="all" data-translate-key="all_categories">${translations[currentLang].all_categories}</option>`;
        const allIndividualCategories = allProducts.flatMap(p => p.kategori ? p.kategori.split(',').map(cat => cat.trim()) : []);
        const uniqueCategories = [...new Set(allIndividualCategories.filter(Boolean))];
        uniqueCategories.sort().forEach(category => {
            categoryFilter.insertAdjacentHTML('beforeend', `<option value="${category.toLowerCase()}">${category}</option>`);
        });
        if(categoryFilter.querySelector(`[value="${currentSelection}"]`)) categoryFilter.value = currentSelection;
    }

    function setupDarkMode() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
        }
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    function setupSlideshow() {
        if (!slideshowContainer || SLIDESHOW_IMAGES.length === 0) return;
        slideshowContainer.innerHTML = SLIDESHOW_IMAGES.map(src => `<div class="slide fade"><img src="${src}" alt="Promotional image"></div>`).join('');
        let slideIndex = 0; const slides = slideshowContainer.children;
        const showSlides = () => {
            for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
            slideIndex++; if (slideIndex > slides.length) slideIndex = 1;
            if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000);
        };
        showSlides();
    }
    
    function setupModalListeners() {
        catalog.addEventListener('click', e => {
            const videoButton = e.target.closest('.btn-video');
            if (videoButton && videoButton.dataset.videoSrc) {
                const videoSrc = videoButton.dataset.videoSrc;
                videoFrame.src = videoSrc;
                videoModal.style.display = 'flex';
            }
        });
        closeModalBtn.addEventListener('click', () => { videoModal.style.display = 'none'; videoFrame.src = ''; });
        window.addEventListener('click', e => {
            if (e.target == videoModal) { videoModal.style.display = 'none'; videoFrame.src = ''; }
        });
    }

    function setupEventListeners() {
        searchInput.addEventListener('input', applyFilters);
        categoryFilter.addEventListener('change', applyFilters);
        ecommerceFilter.addEventListener('change', applyFilters);
        catalog.addEventListener('click', function(event) {
            const copyButton = event.target.closest('.btn-copy-link');
            if (copyButton) {
                const linkToCopy = copyButton.dataset.linkToCopy;
                navigator.clipboard.writeText(linkToCopy).then(() => {
                    showCopyNotification();
                }).catch(err => {
                    console.error('Gagal menyalin link: ', err);
                });
            }
        });
    }

    function showCopyNotification() {
        let notification = document.querySelector('.copy-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'copy-notification';
            document.body.appendChild(notification);
        }
        notification.innerText = translations[currentLang].link_copied;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    function showLoader(show) {
        loader.style.display = show ? 'block' : 'none';
        if (show) loader.querySelector('p').innerText = translations[currentLang].loading_products;
    }
    
    init();
});
