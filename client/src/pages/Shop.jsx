import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data";
import { useCart } from "../context/CartContext";
import "../styles/shop.css";

export default function Shop() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Reading filters directly from URL search parameters
  const selectedCategory = searchParams.get("category") || "All";
  const selectedColor = searchParams.get("color") || "All";
  const selectedTag = searchParams.get("tag") || "All";
  const searchQuery = searchParams.get("search") || "";

  const sortBy = searchParams.get("sort") || "default";
  const viewMode = searchParams.get("view") || "grid";
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = Number(searchParams.get("show")) || 12;

  // Local state for smooth slider dragging, synced with URL search parameter
  const urlPrice = Number(searchParams.get("price")) || 350;
  const [priceRange, setPriceRange] = useState(urlPrice);
  const appliedPriceRange = urlPrice;

  // Keep local price slider state synced with URL changes (e.g. on Reset Filters)
  useEffect(() => {
    setPriceRange(urlPrice);
  }, [urlPrice]);

  // Setters updating search parameters
  const handleCategoryClick = (name) => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedCategory.toLowerCase() === name.toLowerCase()) {
      newParams.delete("category");
    } else {
      newParams.set("category", name);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleColorClick = (name) => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedColor.toLowerCase() === name.toLowerCase()) {
      newParams.delete("color");
    } else {
      newParams.set("color", name);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleTagClick = (tag) => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedTag.toLowerCase() === tag.toLowerCase()) {
      newParams.delete("tag");
    } else {
      newParams.set("tag", tag);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleFilterPrice = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("price", priceRange.toString());
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleSortChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
  };

  const handleShowChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("show", value.toString());
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleViewChange = (mode) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("view", mode);
    setSearchParams(newParams);
  };

  const handlePageChange = (pageNumber) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", pageNumber.toString());
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  // ── Dynamic category counts from the categories[] array ──
  const categoryList = useMemo(() => {
    const counts = {};
    const shopItems = products.filter(p => p.isShopItem);
    shopItems.forEach((p) => {
      (p.categories || [p.category]).forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    const order = ["Accessories", "Men", "Women"];
    return order.map((name) => ({ name, count: counts[name] || 0 }));
  }, []);

  // ── Dynamic color counts ──
  const colorList = useMemo(() => {
    const counts = {};
    const shopItems = products.filter(p => p.isShopItem);
    shopItems.forEach((p) => {
      if (p.color) counts[p.color] = (counts[p.color] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
  }, []);

  // ── Top rated items for sidebar ──
  const topRatedProducts = useMemo(() =>
    products.filter((p) => p.isShopItem && p.rating >= 4).slice(0, 2), []);

  const allTags = ["Blazer", "Clothes", "Fashion", "Handbag", "Laptop"];

  // ── Filtered & Sorted products ──
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.isShopItem);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "All") {
      list = list.filter((p) =>
        (p.categories || [p.category]).some(
          (c) => c.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    if (selectedColor !== "All") {
      list = list.filter(
        (p) => p.color && p.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    if (selectedTag !== "All") {
      list = list.filter(
        (p) => p.tags && p.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      );
    }

    list = list.filter((p) => p.price <= appliedPriceRange);

    if (sortBy === "popularity") list.sort((a, b) => b.stock - a.stock);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [selectedCategory, selectedColor, selectedTag, appliedPriceRange, sortBy, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="shop-page-wrapper">
      {/* ── Banner ── */}
      <div
        className="shop-banner"
        style={{ backgroundImage: "url('/assets/shop/shop-banner-1.jpg')" }}
      >
        <div className="shop-banner-overlay" />
        <div className="shop-banner-content">
          <h1>Shop</h1>
          <nav className="shop-breadcrumb" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">&gt;</span>
            <span className="current">Shop</span>
          </nav>
        </div>
      </div>

      <div className="shop-main-layout container">
        {/* ── Sidebar ── */}
        <aside className="shop-sidebar">
          {/* Categories */}
          <div className="shop-widget">
            <h3 className="widget-title">Product Categories</h3>
            <ul className="widget-list">
              {categoryList.map((cat) => (
                <li key={cat.name} className={selectedCategory.toLowerCase() === cat.name.toLowerCase() ? "active" : ""}>
                  <button onClick={() => handleCategoryClick(cat.name)}>
                    <span className="bullet">▸</span> {cat.name}
                  </button>
                  <span className="wcount">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Color */}
          <div className="shop-widget">
            <h3 className="widget-title">Color</h3>
            <ul className="widget-list">
              {colorList.map((col) => (
                <li key={col.name} className={selectedColor.toLowerCase() === col.name.toLowerCase() ? "active" : ""}>
                  <button onClick={() => handleColorClick(col.name)}>
                    <span className="bullet">▸</span> {col.name}
                  </button>
                  <span className="wcount">({col.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="shop-widget">
            <h3 className="widget-title">Filter by Price</h3>
            <div className="price-filter-container">
              <input
                type="range"
                min="10"
                max="350"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-info">
                <span>Range: $10 — ${priceRange}</span>
                <button
                  className="btn-filter"
                  onClick={handleFilterPrice}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Top Rated */}
          <div className="shop-widget">
            <h3 className="widget-title">Top Rated Products</h3>
            <div className="top-rated-list">
              {topRatedProducts.map((p) => (
                <div key={p.id} className="top-rated-item">
                  <Link to={`/product/${p.id}`} className="top-rated-img">
                    <img src={p.image} alt={p.name} />
                  </Link>
                  <div className="top-rated-info">
                    <h4>
                      <Link to={`/product/${p.id}`}>{p.name}</Link>
                    </h4>
                    <div className="stars">
                      {"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}
                    </div>
                    <div className="tr-price">
                      {p.oldPrice && <span className="old">${p.oldPrice.toFixed(2)}</span>}
                      <span className="now">${p.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compare */}
          <div className="shop-widget">
            <h3 className="widget-title">Compare</h3>
            <p className="compare-text">No products to compare</p>
            <button className="btn-compare">Compare</button>
          </div>

          {/* Tags */}
          <div className="shop-widget">
            <h3 className="widget-title">Product Tags</h3>
            <div className="tags-container">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-pill ${selectedTag.toLowerCase() === tag.toLowerCase() ? "active" : ""}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Content ── */}
        <main className="shop-content">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="toolbar-left">
              <div className="sort-group">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                  <option value="default">Default sorting</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="price-low">Sort by price: low to high</option>
                  <option value="price-high">Sort by price: high to low</option>
                </select>
              </div>
              <div className="show-group">
                <label>Show:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleShowChange(Number(e.target.value))}
                >
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                  <option value={18}>18</option>
                  <option value={24}>24</option>
                </select>
              </div>
            </div>
            <div className="toolbar-right">
              <button
                className={`layout-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => handleViewChange("grid")}
                aria-label="Grid view"
                title="Grid view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="0" y="0" width="7" height="7"/><rect x="9" y="0" width="7" height="7"/>
                  <rect x="0" y="9" width="7" height="7"/><rect x="9" y="9" width="7" height="7"/>
                </svg>
              </button>
              <button
                className={`layout-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => handleViewChange("list")}
                aria-label="List view"
                title="List view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="0" y="0" width="16" height="3"/><rect x="0" y="6" width="16" height="3"/>
                  <rect x="0" y="12" width="16" height="3"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {(selectedCategory !== "All" || selectedColor !== "All" || selectedTag !== "All" || searchQuery) && (
            <div className="active-filters">
              {searchQuery && (
                <span className="filter-chip">
                  Search: "{searchQuery}"
                  <button onClick={() => {
                    const p = new URLSearchParams(searchParams);
                    p.delete("search");
                    p.set("page", "1");
                    setSearchParams(p);
                  }}>×</button>
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="filter-chip">
                  {selectedCategory}
                  <button onClick={() => handleCategoryClick(selectedCategory)}>×</button>
                </span>
              )}
              {selectedColor !== "All" && (
                <span className="filter-chip">
                  {selectedColor}
                  <button onClick={() => handleColorClick(selectedColor)}>×</button>
                </span>
              )}
              {selectedTag !== "All" && (
                <span className="filter-chip">
                  {selectedTag}
                  <button onClick={() => handleTagClick(selectedTag)}>×</button>
                </span>
              )}
              <button className="clear-all" onClick={resetFilters}>Clear all</button>
            </div>
          )}

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found for the selected filters.</p>
              <button className="btn-reset" onClick={resetFilters}>Reset Filters</button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "shop-grid" : "shop-list"}>
              {paginatedProducts.map((p) => (
                <div key={p.id} className="spc">
                  {/* Image area */}
                  <div className="spc-img">
                    <Link to={`/product/${p.id}`}>
                      <img src={p.image} alt={p.name} />
                    </Link>
                    {p.badge && (
                      <span className={`spc-badge ${p.badge === "SALE" ? "sale" : "new"}`}>
                        {p.badge === "SALE" ? "-20%" : p.badge}
                      </span>
                    )}
                    <div className="spc-hover">
                      <button className="spc-cart-btn" onClick={() => addToCart(p)}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  {/* Info area */}
                  <div className="spc-info">
                    <h3 className="spc-name">
                      <Link to={`/product/${p.id}`}>{p.name}</Link>
                    </h3>
                    <div className="spc-stars">
                      {"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}
                    </div>
                    <div className="spc-price">
                      {p.oldPrice && (
                        <span className="spc-old">${p.oldPrice.toFixed(2)}</span>
                      )}
                      <span className="spc-now">${p.price.toFixed(2)}</span>
                    </div>
                    {viewMode === "list" && (
                      <p className="spc-desc">{p.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="shop-pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pnum ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  className="pnext"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  ›
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}