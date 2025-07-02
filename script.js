document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURASI ---
    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQz-eGx89LtYBROcJk3__Bu3qlooJV49VIPlxYsoQZ7m8X-8tC4XavoC3aOkhyDPoPWk4Xuc62EqSOC/pub?gid=0&single=true&output=csv';
    const SLIDESHOW_IMAGES = [
        'https://i.imgur.com/6stRqE9.jpeg', 'https://i.imgur.com/em0Re4Q.jpeg', 'https://i.imgur.com/NHDZkBa.jpeg',
        'https://i.imgur.com/LbG1KcA.jpeg', 'https://i.imgur.com/NjbJnms.jpeg'
    ];
    const PRODUCTS_PER_PAGE = 20;

    // --- KAMUS TERJEMAHAN ---
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
        setupModalListeners(); setupWhatsAppPopup(); showLoader(true);
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
            const shareButtonsHTML = `<div class="share-container"><div class="share-buttons"><a href="https://www.facebook.com/sharer/sharer.php?u=${productPageUrl}" target="_blank" class="btn-share btn-facebook" aria-label="Share to Facebook"><svg viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></a><a href="https://twitter.com/intent/tweet?url=${productPageUrl}&text=${shareText}" target="_blank" class="btn-share btn-x" aria-label="Share to X"><svg viewBox="0 0 512 512"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></a><a href="https://api.whatsapp.com/send?text=${shareText}" target="_blank" class="btn-share btn-whatsapp" aria-label="Share to WhatsApp"><svg viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l11
