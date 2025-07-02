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
        const headers = rows[0].split(',').map(h => h.trim().toLowerCase()); // lowercasing headers for consistency
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

    // --- FUNGSI RENDER TAMPILAN ---
    function renderProducts() {
        catalog.innerHTML = '';
        const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

        if (paginatedProducts.length === 0) {
            catalog.innerHTML = `<p style="text-align:center;">Produk tidak ditemukan.</p>`;
            return;
        }

        paginatedProducts.forEach(product => {
            let videoButtonHTML = '';
            if (product.youtube_video) {
                videoButtonHTML = `<button class="btn-video" data-video-src="${product.youtube_video}">Lihat Video</button>`;
            } else if (product.tiktok_video) {
                videoButtonHTML = `<button class="btn-video" data-video-src="${product.tiktok_video}">Lihat Video</button>`;
            } else if (product.shopee_video) {
                videoButtonHTML = `<a href="${product.
