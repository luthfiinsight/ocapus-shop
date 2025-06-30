document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURASI ---
    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQz-eGx89LtYBROcJk3__Bu3qlooJV49VIPlxYsoQZ7m8X-8tC4XavoC3aOkhyDPoPWk4Xuc62EqSOC/pub?gid=0&single=true&output=csv';
    const SLIDESHOW_IMAGES = [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9e?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1585155784229-aff921ccfa10?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1525425134246-a45903823427?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop'
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
    const paginationContainer = document.getElementById('pagination-container');
    const loader = document.getElementById('loader');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const slideshowContainer = document.querySelector('.slideshow-container');

    // --- INISIALISASI ---
    init();

    async function init() {
        setupDarkMode();
        setupSlideshow();
        showLoader(true);
        try {
            await fetchData();
            setupCategoryFilter();
            applyFilters();
        } catch (error) {
            console.error("Error initializing app:", error);
            catalog.innerHTML = `<p style="text-align:center; color:red;">Gagal memuat data produk. Pastikan URL Google Sheet CSV sudah benar dan dipublikasikan.</p>`;
        } finally {
            showLoader(false);
        }
        setupEventListeners();
    }
    
    // --- FUNGSI PENGAMBILAN DATA (SUDAH DIPERBARUI) ---
    async function fetchData() {
        if (GOOGLE_SHEET_URL === 'PASTE_YOUR_GOOGLE_SHEET_CSV_URL_HERE') {
            throw new Error("URL Google Sheet belum diatur.");
        }
        const response = await fetch(GOOGLE_SHEET_URL);
        const csvText = await response.text();
        allProducts = parseCSV(csvText);
        // Baris ini membalik urutan array, sehingga data terbaru (paling bawah di sheet) akan muncul pertama
        allProducts.reverse(); 
        filteredProducts = [...allProducts];
    }

    function parseCSV(text) {
        const rows = text.split(/\r?\n/);
        const headers = rows[0].split(',').map(h => h.trim());
        const data = [];
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue;
            const values = rows[i].split(',');
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] ? values[index].trim() : '';
            });
            data.push(obj);
        }
        return data;
    }

    // --- FUNGSI RENDER TAMPILAN ---
    function renderProducts() {
        catalog.innerHTML = '';
        const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;
        const paginatedProducts = filteredProducts.slice(start, end);

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
                        </div>
                    </div>
                </div>
            `;
            catalog.innerHTML += productCard;
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

    // --- FUNGSI FILTER & PENCARIAN ---
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        filteredProducts = allProducts.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.kategori.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch = product.judul.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        
        currentPage = 1;
        renderProducts();
        renderPagination();
    }

    function setupCategoryFilter() {
        const categories = [...new Set(allProducts.map(p => p.kategori))];
        categories.sort().forEach(category => {
            if (category) {
                const option = document.createElement('option');
                option.value = category;
                option.innerText = category;
                categoryFilter.appendChild(option);
            }
        });
    }
    
    // --- FITUR TAMBAHAN (DARK MODE & SLIDESHOW) ---
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
        slideshowContainer.innerHTML = SLIDESHOW_IMAGES.map(src => 
            `<div class="slide fade"><img src="${src}" alt="Promotional image"></div>`
        ).join('');
        
        let slideIndex = 0;
        const slides = slideshowContainer.getElementsByClassName("slide");
        if (slides.length === 0) return;

        const showSlides = () => {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000); // Ganti gambar setiap 4 detik
        }
        showSlides();
    }
    
    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        searchInput.addEventListener('input', applyFilters);
        categoryFilter.addEventListener('change', applyFilters);
    }

    // --- UTILITIES ---
    function showLoader(show) {
        loader.style.display = show ? 'block' : 'none';
    }
});