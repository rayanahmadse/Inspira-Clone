// ===== PRODUCTS =====
export const products = [{
        id: 1,
        name: "Readable Content",
        category: "Bags",
        price: 80.0,
        oldPrice: null,
        rating: 5,
        image: "/assets/products/backpack.jpg",
        badge: "NEW",
        description: "Premium leather backpack with adjustable straps and multiple compartments.",
        stock: 25,
        isFeatured: true,
        isNewArrival: false,
    },
    {
        id: 2,
        name: "Characteristic",
        category: "Shoes",
        price: 83.6,
        oldPrice: 88.0,
        rating: 4,
        image: "/assets/products/shoes-formal.jpg",
        badge: "SALE",
        discountPercent: 20,
        description: "Classic formal leather shoes, hand-stitched finish.",
        stock: 14,
        isFeatured: true,
        isNewArrival: false,
    },
    {
        id: 3,
        name: "Believable",
        category: "Wallets",
        price: 160.0,
        oldPrice: null,
        rating: 4,
        image: "/assets/products/wallet.jpg",
        badge: "NEW",
        description: "Genuine leather bifold wallet with card slots.",
        stock: 30,
        isFeatured: true,
        isNewArrival: true,
    },
    {
        id: 4,
        name: "Readable More",
        category: "Accessories",
        price: 2800.0,
        oldPrice: null,
        rating: 4,
        image: "/assets/products/sunglasses.jpg",
        badge: "NEW",
        description: "Designer sunglasses with UV protection lenses.",
        stock: 8,
        isFeatured: true,
        isNewArrival: false,
    },
    {
        id: 5,
        name: "Believable Tote",
        category: "Bags",
        price: 160.0,
        oldPrice: 200.0,
        rating: 4,
        image: "/assets/products/tote-bag.jpg",
        badge: "NEW",
        description: "Spacious leather tote bag with detachable pouch.",
        stock: 18,
        isFeatured: false,
        isNewArrival: true,
    },
    {
        id: 6,
        name: "Scrambled",
        category: "Accessories",
        price: 56.0,
        oldPrice: null,
        rating: 4,
        image: "/assets/products/belt.jpg",
        badge: "NEW",
        description: "Genuine leather belt with brass buckle.",
        stock: 40,
        isFeatured: false,
        isNewArrival: true,
    },
    {
        id: 7,
        name: "Readable Content Pack",
        category: "Bags",
        price: 80.0,
        oldPrice: null,
        rating: 5,
        image: "/assets/products/backpack2.jpg",
        badge: "NEW",
        description: "Compact daily-use leather backpack.",
        stock: 22,
        isFeatured: false,
        isNewArrival: true,
    },
    {
        id: 8,
        name: "Characteristic Oxford",
        category: "Shoes",
        price: 83.6,
        oldPrice: 88.0,
        rating: 4,
        image: "/assets/products/shoes-oxford.jpg",
        badge: "SALE",
        discountPercent: 20,
        description: "Oxford-style leather dress shoes.",
        stock: 11,
        isFeatured: false,
        isNewArrival: true,
    },
];

// ===== CATEGORIES =====
export const categories = [
    { id: 1, name: "Bags", slug: "bags", image: "/assets/categories/bags.jpg" },
    { id: 2, name: "Shoes", slug: "shoes", image: "/assets/categories/shoes.jpg" },
    { id: 3, name: "Wallets", slug: "wallets", image: "/assets/categories/wallets.jpg" },
    { id: 4, name: "Accessories", slug: "accessories", image: "/assets/categories/accessories.jpg" },
];

// ===== HOME PAGE PROMO BANNERS =====
export const banners = [
    { id: 1, title: "Women's Styles", image: "/assets/banners/womens-styles.jpg", link: "/shop?category=women", size: "wide" },
    { id: 2, title: "New Shoes", image: "/assets/banners/new-shoes.jpg", link: "/shop?category=shoes", size: "wide" },
    { id: 3, title: "Men's Accessories", image: "/assets/banners/mens-accessories.jpg", link: "/shop?category=accessories", size: "full" },
];

// ===== BLOG POSTS =====
export const blogPosts = [{
        id: 1,
        title: "When An Unknown Printer",
        date: "Mar 14, 2026",
        excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its...",
        image: "/assets/blog/blog1.jpg",
        author: "Admin",
        content: "Full blog content goes here.",
    },
    {
        id: 2,
        title: "Answers To Your Questions About...",
        date: "Mar 14, 2026",
        excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its...",
        image: "/assets/blog/blog2.jpg",
        author: "Admin",
        content: "Full blog content goes here.",
    },
    {
        id: 3,
        title: "What Is Bootstrap - The History...",
        date: "Mar 14, 2026",
        excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its...",
        image: "/assets/blog/blog3.jpg",
        author: "Admin",
        content: "Full blog content goes here.",
    },
];

// ===== ORDERS (for Admin panel) =====
export const orders = [
    { id: 1, customer: "Ali Raza", products: [1, 3], total: 240.0, status: "Pending", date: "2026-06-25" },
    { id: 2, customer: "Sara Khan", products: [2], total: 83.6, status: "Delivered", date: "2026-06-20" },
    { id: 3, customer: "Bilal Ahmed", products: [4, 5], total: 2960.0, status: "Shipped", date: "2026-06-28" },
];

// ===== CUSTOMERS (for Admin panel) =====
export const customers = [
    { id: 1, name: "Ali Raza", email: "ali@example.com", phone: "0300-1234567", address: "Lahore, Pakistan" },
    { id: 2, name: "Sara Khan", email: "sara@example.com", phone: "0301-7654321", address: "Karachi, Pakistan" },
    { id: 3, name: "Bilal Ahmed", email: "bilal@example.com", phone: "0302-9988776", address: "Islamabad, Pakistan" },
];

// ===== REVIEWS =====
export const reviews = [
    { id: 1, productId: 1, user: "Ahmed", rating: 5, comment: "Great quality, fast delivery." },
    { id: 2, productId: 2, user: "Hina", rating: 4, comment: "Good but sizing runs small." },
];