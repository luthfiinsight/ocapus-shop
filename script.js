document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURASI ---
    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQz-eGx89LtYBROcJk3__Bu3qlooJV49VIPlxYsoQZ7m8X-8tC4XavoC3aOkhyDPoPWk4Xuc62EqSOC/pub?gid=0&single=true&output=csv';
    const SLIDESHOW_IMAGES = [
        'https://i.imgur.com/6stRqE9.jpeg', 'https://i.imgur.com/em0Re4Q.jpeg', 'https://i.imgur.com/NHDZkBa.jpeg',
        'https://i.imgur.com/LbG1KcA.jpeg', 'https://i.imgur.com/NjbJnms.jpeg'
    ];
    const PRODUCTS_PER_PAGE = 20;

    // --- VARIABEL GLOBAL ---
    let allProducts = [];
    let filteredProducts = [];
    let currentPage = 1;

    // --- ELEMEN DOM ---
    const catalog = document.getElementById('product-catalog');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const ecommerceFilter = document.getElementById('ecommerce-filter'); // Filter baru
    const paginationContainer = document.getElementById('pagination-container');
    const loader = document.getElementById('loader');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const slideshowContainer = document.querySelector('.slideshow-container');
    // Elemen Modal Video Baru
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModalBtn = document.querySelector('.modal-close');

    // --- INISIALISASI ---
    init();

    async function init() {
        setupDarkMode();
        setupSlideshow();
        setupModalListeners(); // Setup listener untuk modal
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
    
    // --- FUNGSI PENGAMBILAN DATA ---
    async function fetchData() {
        const response = await fetch(GOOGLE_SHEET_URL);
        const csvText = await response.text();
        allProducts = parseCSV(csvText);
        allProducts.reverse(); 
        filteredProducts = [...allProducts];
    }

    function parseCSV(text) {
        const rows = text.split(/\r?\n/);
        const headers = rows[0].split(',').map(h => h.trim());
        const data = [];
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue;
            // Solusi untuk CSV yang mungkin memiliki koma di dalam value
            const values = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] ? values[index].trim().replace(/^"|"$/g, '') : '';
            });
            data.push(obj);
        }
        return data;
    }

    // --- FUNGSI RENDER TAMPILAN ---
    function renderProducts() {
        catalog.innerHTML = '';
        const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

        if (paginatedProducts.length === 0) {
            catalog.innerHTML = `<p style="text-align:center;">Produk tidak ditemukan.</p>`;
            return;
        }

        paginatedProducts.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.gambar}" alt="${product.judul}" class="product-image" loading="lazy">
                    <div class="product-info">
                        <h3 class="product-title">${product.judul}</h3>
                        <div class="product-buttons">
                            ${product.shopee ? `<a href="${product.shopee}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-shopee">Beli di Shopee</a>` : ''}
                            ${product.tiktok ? `<a href="${product.tiktok}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-tiktok">Beli di TikTok</a>` : ''}
                            ${product.lazada ? `<a href="${product.lazada}" target="_blank" rel="noopener noreferrer" class="btn-buy btn-lazada">Beli di Lazada</a>` : ''}
                            ${product.video ? `<button class="btn-video" data-video-src="${product.video}">Lihat Video</button>` : ''}
                        </div>
                    </div>
                </div>`;
            catalog.insertAdjacentHTML('beforeend', productCard);
        });
    }
    
    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
        if (totalPages <= 1) return;
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.toggle('active', i === currentPage);
            button.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
                renderPagination();
                window.scrollTo({ top: slideshowContainer.offsetHeight + 50, behavior: 'smooth' });
            });
            paginationContainer.appendChild(button);
        }
    }

    // --- FUNGSI FILTER & PENCARIAN (DIPERBARUI) ---
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedEcommerce = ecommerceFilter.value; // Ambil value filter baru

        filteredProducts = allProducts.filter(product => {
            const matchesSearch = product.judul.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || product.kategori.toLowerCase() === selectedCategory;
            
            let matchesEcommerce = true; // Default true untuk 'Semua E-commerce'
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
        const categories = [...new Set(allProducts.map(p => p.kategori).filter(Boolean))];
        categories.sort().forEach(category => {
            categoryFilter.insertAdjacentHTML('beforeend', `<option value="${category}">${category}</option>`);
        });
    }
    
    // --- FITUR TAMBAHAN ---
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
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000);
        }
        showSlides();
    }
    
    // FUNGSI BARU UNTUK MODAL VIDEO
    function setupModalListeners() {
        // Event delegation untuk membuka modal
        catalog.addEventListener('click', function(event) {
            if (event.target.matches('.btn-video')) {
                const videoSrc = event.target.dataset.videoSrc;
                if (videoSrc) {
                    videoFrame.src = videoSrc;
                    videoModal.style.display = 'flex';
                }
            }
        });

        // Menutup modal saat klik tombol close (x)
        closeModalBtn.addEventListener('click', () => {
            videoModal.style.display = 'none';
            videoFrame.src = ''; // Hentikan video
        });

        // Menutup modal saat klik di luar area video
        window.addEventListener('click', (event) => {
            if (event.target == videoModal) {
                videoModal.style.display = 'none';
                videoFrame.src = ''; // Hentikan video
            }
        });
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        searchInput.addEventListener('input', applyFilters);
        categoryFilter.addEventListener('change', applyFilters);
        ecommerceFilter.addEventListener('change', applyFilters); // Listener untuk filter baru
    }

    // --- UTILITIES ---
    function showLoader(show) {
        loader.style.display = show ? 'block' : 'none';
    }
});
