document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURASI ---
    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQz-eGx89LtYBROcJk3__Bu3qlooJV49VIPlxYsoQZ7m8X-8tC4XavoC3aOkhyDPoPWk4Xuc62EqSOC/pub?gid=0&single=true&output=csv';
    const SLIDESHOW_IMAGES = [
        'https://i.imgur.com/6stRqE9.jpeg', 'https://i.imgur.com/em0Re4Q.jpeg', 'https://i.imgur.com/NHDZkBa.jpeg',
        'https://i.imgur.com/LbG1KcA.jpeg', 'https://i.imgur.com/NjbJnms.jpeg'
    ];
    const PRODUCTS_PER_PAGE = 20;

    // --- KAMUS TERJEMAHAN BARU ---
    const translations = {
        'id': {
            site_description: 'Rekomendasi produk pilihan dari platform e-commerce terbaik. Cepat, mudah, dan terpercaya.',
            search_placeholder: 'Cari nama produk...',
            all_categories: 'Semua Kategori',
            all_ecommerce: 'Semua E-commerce',
            loading_products: 'Memuat Produk...',
            no_products_found: 'Produk tidak ditemukan.',
            buy_on_shopee: 'Beli di Shopee',
            buy_on_tiktok: 'Beli di TikTok',
            buy_on_lazada: 'Beli di Lazada',
            watch_video: 'Lihat Video',
            watch_on_shopee: 'Tonton di Shopee',
            home_button: '« Home',
            last_button: 'Last »',
            lang_name: 'Indonesia',
            flag_code: 'id'
        },
        'en': {
            site_description: 'Selected product recommendations from the best e-commerce platforms. Fast, easy, and reliable.',
            search_placeholder: 'Search product name...',
            all_categories: 'All Categories',
            all_ecommerce: 'All E-commerce',
            loading_products: 'Loading Products...',
            no_products_found: 'No products found.',
            buy_on_shopee: 'Buy on Shopee',
            buy_on_tiktok: 'Buy on TikTok',
            buy_on_lazada: 'Buy on Lazada',
            watch_video: 'Watch Video',
            watch_on_shopee: 'Watch on Shopee',
            home_button: '« Home',
            last_button: 'Last »',
            lang_name: 'English',
            flag_code: 'gb'
        },
        'zh': {
            site_description: '来自最佳电子商务平台的精选产品推荐。快捷、方便、可靠。',
            search_placeholder: '搜索产品名称...',
            all_categories: '所有类别',
            all_ecommerce: '所有电商',
            loading_products: '正在加载产品...',
            no_products_found: '未找到产品。',
            buy_on_shopee: '在Shopee购买',
            buy_on_tiktok: '在TikTok购买',
            buy_on_lazada: '在Lazada购买',
            watch_video: '观看视频',
            watch_on_shopee: '在Shopee观看',
            home_button: '« 首页',
            last_button: '末页 »',
            lang_name: '中文',
            flag_code: 'cn'
        },
        'es': {
            site_description: 'Recomendaciones de productos seleccionados de las mejores plataformas de comercio electrónico. Rápido, fácil y confiable.',
            search_placeholder: 'Buscar nombre de producto...',
            all_categories: 'Todas las categorías',
            all_ecommerce: 'Todo el E-commerce',
            loading_products: 'Cargando productos...',
            no_products_found: 'No se encontraron productos.',
            buy_on_shopee: 'Comprar en Shopee',
            buy_on_tiktok: 'Comprar en TikTok',
            buy_on_lazada: 'Comprar en Lazada',
            watch_video: 'Ver video',
            watch_on_shopee: 'Ver en Shopee',
            home_button: '« Inicio',
            last_button: 'Último »',
            lang_name: 'Español',
            flag_code: 'es'
        },
        'ar': {
            site_description: 'توصيات منتجات مختارة من أفضل منصات التجارة الإلكترونية. سريعة وسهلة وموثوقة.',
            search_placeholder: 'البحث عن اسم المنتج...',
            all_categories: 'جميع الفئات',
            all_ecommerce: 'جميع المتاجر',
            loading_products: 'جاري تحميل المنتجات...',
            no_products_found: 'لم يتم العثور على منتجات.',
            buy_on_shopee: 'شراء على Shopee',
            buy_on_tiktok: 'شراء على TikTok',
            buy_on_lazada: 'شراء على Lazada',
            watch_video: 'مشاهدة الفيديو',
            watch_on_shopee: 'مشاهدة على Shopee',
            home_button: '« البداية',
            last_button: 'النهاية »',
            lang_name: 'العربية',
            flag_code: 'sa'
        },
        'fr': {
            site_description: 'Recommandations de produits sélectionnés des meilleures plateformes de commerce électronique. Rapide, facile et fiable.',
            search_placeholder: 'Rechercher un nom de produit...',
            all_categories: 'Toutes catégories',
            all_ecommerce: 'Tout l\'E-commerce',
            loading_products: 'Chargement des produits...',
            no_products_found: 'Aucun produit trouvé.',
            buy_on_shopee: 'Acheter sur Shopee',
            buy_on_tiktok: 'Acheter sur TikTok',
            buy_on_lazada: 'Acheter sur Lazada',
            watch_video: 'Regarder la vidéo',
            watch_on_shopee: 'Regarder sur Shopee',
            home_button: '« Accueil',
            last_button: 'Dernier »',
            lang_name: 'Français',
            flag_code: 'fr'
        },
        'de': {
            site_description: 'Ausgewählte Produktempfehlungen von den besten E-Commerce-Plattformen. Schnell, einfach und zuverlässig.',
            search_placeholder: 'Produktnamen suchen...',
            all_categories: 'Alle Kategorien',
            all_ecommerce: 'Alle E-commerce',
            loading_products: 'Lade Produkte...',
            no_products_found: 'Keine Produkte gefunden.',
            buy_on_shopee: 'Auf Shopee kaufen',
            buy_on_tiktok: 'Auf TikTok kaufen',
            buy_on_lazada: 'Auf Lazada kaufen',
            watch_video: 'Video ansehen',
            watch_on_shopee: 'Auf Shopee ansehen',
            home_button: '« Anfang',
            last_button: 'Ende »',
            lang_name: 'Deutsch',
            flag_code: 'de'
        }
    };

    // --- VARIABEL GLOBAL ---
    let allProducts = [];
    let filteredProducts = [];
    let currentPage = 1;
    let currentLang = localStorage.getItem('lang') || 'id'; // Bahasa default

    // --- ELEMEN DOM ---
    const langCurrentBtn = document.getElementById('lang-current-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    // ... sisa elemen DOM lainnya ...
    const catalog = document.getElementById('product-catalog');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const ecommerceFilter = document.getElementById('ecommerce-filter');
    const paginationContainer = document.getElementById('pagination-container');
    const loader = document.getElementById('loader');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModalBtn = document.querySelector('.modal-close');


    // --- INISIALISASI ---
    init();

    async function init() {
        setLanguage(currentLang); // Terapkan bahasa saat pertama kali load
        setupLanguageSwitcher();
        setupDarkMode();
        setupSlideshow();
        setupModalListeners();
        showLoader(true);
        try {
            await fetchData();
            setupCategoryFilter();
            applyFilters();
        } catch (error) {
            console.error("Error initializing app:", error);
            catalog.innerHTML = `<p style="text-align:center; color:red;">Gagal memuat data. Periksa URL Google Sheet.</p>`;
        } finally {
            showLoader(false);
        }
        setupEventListeners();
    }

    // --- FUNGSI BAHASA BARU ---
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang; // Update atribut lang di <html>
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; // Set arah tulisan untuk Bahasa Arab

        // Update tombol bahasa saat ini
        const langData = translations[lang];
        langCurrentBtn.querySelector('img').src = `https://flagcdn.com/${langData.flag_code}.svg`;
        langCurrentBtn.querySelector('span').innerText = langData.lang_name;

        // Terjemahkan semua elemen dengan atribut data-translate-key
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            el.innerText = translations[lang][key];
        });

        // Terjemahkan placeholder
        document.querySelectorAll('[data-translate-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-key-placeholder');
            el.placeholder = translations[lang][key];
        });
        
        // Render ulang produk untuk update teks tombol
        renderProducts();
        renderPagination();
    }

    function setupLanguageSwitcher() {
        langDropdown.addEventListener('click', (e) => {
            e.preventDefault();
            const langOption = e.target.closest('.language-option');
            if (langOption) {
                const lang = langOption.dataset.lang;
                setLanguage(lang);
            }
        });
    }

    // --- FUNGSI PENGAMBILAN DATA ---
    async function fetchData() {
        // ... (fungsi ini tidak berubah) ...
        const response = await fetch(GOOGLE_SHEET_URL);
        const csvText = await response.text();
        allProducts = parseCSV(csvText);
        allProducts.reverse(); 
        filteredProducts = [...allProducts];
    }
    
    function parseCSV(text) {
        // ... (fungsi ini tidak berubah) ...
        const rows = text.split(/\r?\n/);
        const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
        const data = [];
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue;
            const values = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] ? values[index].trim().replace(/^"|"$/g, '') : '';
            });
            data.push(obj);
        }
        return data;
    }
    
    // --- FUNGSI RENDER TAMPILAN (DIPERBARUI) ---
    function renderProducts() {
        catalog.innerHTML = '';
        const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

        if (paginatedProducts.length === 0) {
            catalog.innerHTML = `<p style="text-align:center;">${translations[currentLang].no_products_found}</p>`;
            return;
        }

        paginatedProducts.forEach(product => {
            let videoButtonHTML = '';
            if (product.youtube_video || product.tiktok_video) {
                const videoSrc = product.youtube_video || product.tiktok_video;
                videoButtonHTML = `<button class="btn-video" data-video-src="${videoSrc}">${translations[currentLang].watch_video}</button>`;
            } else if (product.shopee_video) {
                videoButtonHTML = `<a href="${product.shopee_video}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-video">${translations[currentLang].watch_on_shopee}</a>`;
            }

            const productCard = `
                <div class="product-card">
                    <img src="${product.gambar}" alt="${product.judul}" class="product-image" loading="lazy">
                    <div class="product-info">
                        <h3 class="product-title">${product.judul}</h3>
                        <div class="product-buttons">
                            ${product.shopee ? `<a href="${product.shopee}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-shopee">${translations[currentLang].buy_on_shopee}</a>` : ''}
                            ${product.tiktok ? `<a href="${product.tiktok}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-tiktok">${translations[currentLang].buy_on_tiktok}</a>` : ''}
                            ${product.lazada ? `<a href="${product.lazada}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-lazada">${translations[currentLang].buy_on_lazada}</a>` : ''}
                            ${videoButtonHTML}
                        </div>
                    </div>
                </div>`;
            catalog.insertAdjacentHTML('beforeend', productCard);
        });
    }

    // --- FUNGSI NAVIGASI HALAMAN (DIPERBARUI) ---
    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
        if (totalPages <= 1) return;

        const homeButton = document.createElement('button');
        homeButton.innerText = translations[currentLang].home_button;
        homeButton.disabled = currentPage === 1;
        homeButton.addEventListener('click', () => { currentPage = 1; renderProducts(); renderPagination(); window.scrollTo(0, 0); });
        paginationContainer.appendChild(homeButton);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.toggle('active', i === currentPage);
            button.addEventListener('click', () => { currentPage = i; renderProducts(); renderPagination(); window.scrollTo(0, 0); });
            paginationContainer.appendChild(button);
        }

        const lastButton = document.createElement('button');
        lastButton.innerText = translations[currentLang].last_button;
        lastButton.disabled = currentPage === totalPages;
        lastButton.addEventListener('click', () => { currentPage = totalPages; renderProducts(); renderPagination(); window.scrollTo(0, 0); });
        paginationContainer.appendChild(lastButton);
    }
    
    // --- FUNGSI FILTER & PENCARIAN ---
    function applyFilters() {
        // ... (fungsi ini tidak berubah) ...
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedEcommerce = ecommerceFilter.value;

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
    
    // --- FUNGSI PEMBUATAN FILTER KATEGORI ---
    function setupCategoryFilter() {
        // ... (fungsi ini tidak berubah) ...
        const currentSelection = categoryFilter.value;
        categoryFilter.innerHTML = `<option value="all" data-translate-key="all_categories">${translations[currentLang].all_categories}</option>`;
        const allIndividualCategories = allProducts.flatMap(p => 
            p.kategori ? p.kategori.split(',').map(cat => cat.trim()) : []
        );
        const uniqueCategories = [...new Set(allIndividualCategories.filter(Boolean))];

        uniqueCategories.sort().forEach(category => {
            categoryFilter.insertAdjacentHTML('beforeend', `<option value="${category.toLowerCase()}">${category}</option>`);
        });
        categoryFilter.value = currentSelection;
    }

    // --- Sisa fungsi lainnya (tidak berubah) ---
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
        slideshowContainer.innerHTML = SLIDESHOW_IMAGES.map(src => `<div class="slide fade"><img src="${src}" alt="Promotional image"></div>`).join('');
        let slideIndex = 0;
        const slides = slideshowContainer.children;
        if (slides.length === 0) return;
        const showSlides = () => {
            for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1; }
            if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000);
        }
        showSlides();
    }
    function setupModalListeners() {
        catalog.addEventListener('click', function(event) {
            if (event.target.matches('.btn-video')) {
                const videoSrc = event.target.dataset.videoSrc;
                if (videoSrc) {
                    videoFrame.src = videoSrc;
                    videoModal.style.display = 'flex';
                }
            }
        });
        closeModalBtn.addEventListener('click', () => {
            videoModal.style.display = 'none';
            videoFrame.src = '';
        });
        window.addEventListener('click', (event) => {
            if (event.target == videoModal) {
                videoModal.style.display = 'none';
                videoFrame.src = '';
            }
        });
    }
    function setupEventListeners() {
        searchInput.addEventListener('input', applyFilters);
        categoryFilter.addEventListener('change', applyFilters);
        ecommerceFilter.addEventListener('change', applyFilters);
    }
    function showLoader(show) {
        loader.style.display = show ? 'block' : 'none';
        loader.querySelector('p').innerText = translations[currentLang].loading_products;
    }
});
