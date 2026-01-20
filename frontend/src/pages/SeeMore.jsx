import React, { useState, useMemo, useEffect } from "react";
import Footer from "../components/Footer";
import { Heart } from "lucide-react";
import { useSearchParams } from "react-router-dom";
// import axios from "axios";
import api from "../api/axios";



/* ================= COMPONENT ================= */

export default function ProductPage() {
  // products = [],
  // totalPages = 1,
  // onPageChange = () => { },

  // const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [favorites, setFavorites] = useState({});
  // const toggleFavorite = (productId) => {
  //   setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
  // };


  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [inStock, setInStock] = useState(false);
const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
    const [wishlistIds, setWishlistIds] = useState(new Set());

  const [searchParams] = useSearchParams();
  const categoryName = decodeURIComponent(searchParams.get("category"));

  



  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    rating: true,
    availability: true,
  });



  // const data = useMemo(() => {
  //   return products.length ? products : MOCK_PRODUCTS;
  // }, [products]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    // if (selectedCategories.length > 0) {
    //   result = result.filter((p) => selectedCategories.includes(p.category));
    // }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Filter by ratings
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);

      result = result.filter(
        (p) => (p.rating || 0) >= minRating
      );
    }


    // Filter by stock
    if (inStock) {
      result = result.filter((p) => p.countInStock > 0);
    }


    // Sort
    switch (sortOption) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Highest Rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Best Discount":
        result.sort((a, b) => b.originalPrice - b.price - (a.originalPrice - a.price));
        break;
      case "Name: A to Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [
    // data
    products,
    searchQuery,
    sortOption,
    selectedCategories,
    priceRange,
    selectedRatings,
    inStock,
  ]);

  // const handleNext = useCallback(() => {
  //   if (page < totalPages) {
  //     const next = page + 1;
  //     setPage(next);
  //     onPageChange(next);
  //   }
  // }, [page, totalPages, onPageChange]);

  // useEffect(() => {
  //   const onScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 200
  //     ) {
  //       handleNext();
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [handleNext]);


  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const { data } = await api.get("/api/categories");

        const matched = data.find(
          (cat) => cat.name === categoryName
        );

        if (matched) {
          setCategoryId(matched._id);
        }
      } catch (err) {
        console.error("Failed to fetch category", err);
      }
    };

    if (categoryName) fetchCategoryId();
  }, [categoryName]);



useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/products", {
        params: { category: categoryId },
      });
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  if (categoryId) fetchProducts();
}, [categoryId]);


  // wishList Fetch
  useEffect(() => {
    api
      .get("/api/wishlist")
      .then((res) => {
        const ids = new Set(res.data.wishlist.map((p) => p._id));
        setWishlistIds(ids);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setWishlistIds(new Set()); // not logged in
        }
      });
  }, [])

const toggleWishlist = async (productId) => {
  try {
    await api.post("/api/wishlist/toggle", { productId });

    setWishlistIds((prev) => {
      const updated = new Set(prev);
      updated.has(productId)
        ? updated.delete(productId)
        : updated.add(productId);
      return updated;
    });
  } catch (err) {
    alert("Please login");
  }
};


  const moveToCart = async (productId) => {
    try {
      await api.post("/api/wishlist/move-to-cart", { productId });

      setWishlistIds((prev) => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to move items to cart");
      }
    }
  };


  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 5000 });
    setSelectedRatings([]);
    setInStock(false);
    setSearchQuery("");
  };

  return (
    <>
      <div className="page">
        {/* ================= FILTER SIDEBAR ================= */}
        {showFilters && <div className="filterOverlay" />}
        {showFilters && (
          <div className="filterSidebar">
            <div className="filterHeader">
              <h2>Filter</h2>
              <button
                className="closeBtn"
                onClick={() => {
                  const el = document.querySelector(".filterSidebar");
                  el.classList.add("closing");
                  setTimeout(() => setShowFilters(false), 300);
                }}
              >
                ✕
              </button>
            </div>

            <button className="clearAllBtn" onClick={clearAllFilters}>
              Clear All Filters
            </button>

            {/* Categories */}
            <div className="filterSection">
              <button
                className="filterSectionHeader"
                onClick={() =>
                  setOpenSections((p) => ({ ...p, categories: !p.categories }))
                }
              >
                <span>Categories</span>
                <span className="arrow">
                  {openSections.categories ? "–" : "+"}
                </span>
              </button>

              {openSections.categories && (
                <div className="filterContent">
                  <label className="checkboxLabel">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Protein Bars")}
                      onChange={() => toggleCategory("Protein Bars")}
                    />
                    <span>Protein Bars</span>
                  </label>

                  <label className="checkboxLabel">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Peanut Butter")}
                      onChange={() => toggleCategory("Peanut Butter")}
                    />
                    <span>Peanut Butter</span>
                  </label>

                  <label className="checkboxLabel">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Wafers")}
                      onChange={() => toggleCategory("Wafers")}
                    />
                    <span>Wafers</span>
                  </label>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="filterSection">
              <button
                className="filterSectionHeader"
                onClick={() =>
                  setOpenSections((p) => ({ ...p, price: !p.price }))
                }
              >
                <span>Price</span>
                <span className="arrow">{openSections.price ? "–" : "+"}</span>
              </button>

              {openSections.price && (
                <div className="filterContent">
                  <div className="priceInputRow">
                    <input
                      type="number"
                      placeholder="0"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="priceInput"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="5000"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="priceInput"
                    />
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    className="priceSlider"
                  />
                </div>
              )}
            </div>

            {/* Customer Rating */}
            <div className="filterSection">
              <button
                className="filterSectionHeader"
                onClick={() =>
                  setOpenSections((p) => ({ ...p, rating: !p.rating }))
                }
              >
                <span>Customer Rating</span>
                <span className="arrow">{openSections.rating ? "–" : "+"}</span>
              </button>

              {openSections.rating && (
                <div className="filterContent">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="checkboxLabel">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleRating(rating)}
                      />
                      <span>{rating}★ & above</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="filterSection">
              <button
                className="filterSectionHeader"
                onClick={() =>
                  setOpenSections((p) => ({
                    ...p,
                    availability: !p.availability,
                  }))
                }
              >
                <span>Availability</span>
                <span className="arrow">
                  {openSections.availability ? "–" : "+"}
                </span>
              </button>

              {openSections.availability && (
                <div className="filterContent">
                  <label className="checkboxLabel">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={() => setInStock(!inStock)}
                    />
                    <span>In Stock</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= MAIN CONTENT ================= */}
        <div className={`mainContent ${showFilters ? "withSidebar" : ""}`}>
          {/* ================= TOP SECTION ================= */}
          <div className="topSection">
            <h1 className="topTitle">{categoryName}</h1>

            <div className="topControls">
              <div className="left">
                <h2>ALL PRODUCTS</h2>
                <p>
                  Showing {filteredAndSortedData.length} of {products.length}{" "}
                  products
                </p>

                <div className="actionsRow">
                  <button
                    className="filterBtn"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <FilterIcon />
                    Filters
                  </button>

                  <select
                    className="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highest Rated</option>
                    <option>Best Discount</option>
                    <option>Name: A to Z</option>
                  </select>

                  <span className="count">
                    {filteredAndSortedData.length} products
                  </span>
                </div>
              </div>

              <div className="right">
                <div className="searchBox">
                  <SearchIcon />
                  <input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="products">
            {filteredAndSortedData.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div> */}

          {loading ? (
            <p style={{ textAlign: "center", marginTop: 100 }}>
              Loading products...
            </p>
          ) : (
            <div className="products">
              {filteredAndSortedData.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  wishlistIds={wishlistIds}
                  toggleWishlist={toggleWishlist}
                />

              ))}
            </div>
          )}


        </div>
      </div>

      {/* ================= INTERNAL CSS ================= */}
      <style jsx>{`
        body {
          margin: 0;
          background: rgba(24, 23, 23, 1);
          font-family: Inter, system-ui, sans-serif;
        }

        .page {
          background: rgba(24, 23, 23, 1);
          color: #fff;
          min-height: 100vh;
          display: flex;
          position: relative;
        }

        /* ================= FILTER SIDEBAR ================= */

        .filterOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 900;
        }

        .filterSidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 374px;
          height: 100vh;
          background: #ffeb00;
          color: #000;
          overflow-y: auto;
          z-index: 1000;
          padding: 20px;
          animation: slideIn 0.3s ease;
          overflow-y: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .filterSidebar.closing {
          animation: slideOut 0.3s ease forwards;
        }

        .filterHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filterHeader h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        .closeBtn {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #000;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clearAllBtn {
          width: 100%;
          background: transparent;
          border: 2px solid #000;
          color: #000;
          padding: 12px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 20px;
          text-decoration: underline;
          font-size: 16px;
        }

        .filterSection {
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          padding-bottom: 15px;
        }

        .filterSectionHeader {
          width: 100%;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          font-weight: 700;
          padding: 10px 0;
          cursor: pointer;
          color: #000;
        }

        .arrow {
          font-size: 12px;
        }

        .filterContent {
          padding: 10px 0;
        }

        .checkboxLabel {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 16px;
        }

        .checkboxLabel input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #000;
        }

        .priceInputRow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .priceInput {
          flex: 1;
          padding: 10px;
          border: 2px solid #000;
          background: #ffeb00;
          color: #000;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
        }

        .priceSlider {
          width: 100%;
          height: 8px;
          background: #000;
          outline: none;
          -webkit-appearance: none;
        }

        .priceSlider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #000;
          cursor: pointer;
          border-radius: 50%;
        }

        .priceSlider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #000;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }

        /* ================= MAIN CONTENT ================= */

        .mainContent {
          flex: 1;
          transition: margin-left 0.3s ease;
        }

        .mainContent.withSidebar {
          margin-left: 374px;
        }

        /* ================= TOP SECTION ================= */

        .topSection {
          background: rgba(24, 23, 23, 1);
          padding: 40px 0 30px;
          color: #fff;
        }

        .topTitle {
          font-family: "Jersey 25", cursive;
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 400;
          text-align: center;
          margin-bottom: 40px;
        }

        .topControls {
          max-width: 1260px;
          margin: auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          flex-wrap: wrap;
        }

        .topControls .left h2 {
          font-family: "Jersey 25", cursive;
          color: #ffeb00;
          font-size: 28px;
          margin-bottom: 6px;
        }

        .topControls .left p {
          font-size: 14px;
          color: #9fb3c8;
          margin-bottom: 14px;
        }

        .actionsRow {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .filterBtn {
          background: #ffeb00;
          color: #000;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-family: "Jersey 25", cursive;
          transition: all 0.3s ease;
        }

        .filterBtn:hover {
          background: #ffd700;
        }

        .sort {
          background: transparent;
          border: 2px solid #ffeb00;
          color: #fff;
          padding: 10px 16px;
          border-radius: 6px;
          font-family: "Jersey 25", cursive;
          cursor: pointer;
        }
        .sort option {
          background: #151515;
          color: #fff;
        }

        .count {
          font-size: 15px;
          color: #fff;
        }

        .topControls .right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .searchBox {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 2px solid #ffeb00;
          padding: 10px 14px;
          border-radius: 6px;
          min-width: 260px;
        }

        .searchBox input {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          width: 100%;
        }

        /* ================= PRODUCTS ================= */

        .products {
          display: grid;
          grid-template-columns: repeat(auto-fill, 291.51px);
          gap: 18px;
          justify-content: center;
          max-width: 1380px;
          margin: 30px auto;
          padding: 0 8px;
        }

        /* ===== CARD ===== */
        .card {
          width: 291.51px;
          height: 635.17px;
          background: #151515;
          border: 1.34px solid #ffeb00;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .imageWrap {
          position: relative;
          height: 360px;
          overflow: hidden;
        }

        .imageWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .card:hover img {
          transform: scale(1.06);
        }

        .discount {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ff4d4f;
          color: #fff;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 700;
          z-index: 2;
        }

        .fav {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #ffeb00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .fav:hover {
          background: rgba(255, 235, 0, 0.2);
          transform: scale(1.1);
        }

        /* default icon */
        .fav svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: #ffeb00;
          stroke-width: 2;
        }

        /* active button */
        .fav.active {
          background: #ffeb00;
        }

        /* active icon */
        .fav.active svg {
          fill: #ff0000;
          stroke: #ff0000;
        }

        /* non-active icon */
        .fav:not(.active) svg {
          fill: none;
          stroke: #ffeb00;
        }


        .info {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .info h3 {
          font-size: 14px;
          font-weight: 800;
          line-height: 1.3;
        }

        .specs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .specs span {
          font-size: 10px;
          border: 1px solid #ffeb00;
          padding: 3px 6px;
          border-radius: 4px;
          color: #ffeb00;
          white-space: nowrap;
        }

        .rating {
          color: #ffeb00;
          font-size: 12px;
          font-weight: 600;
        }

        .rating span {
          color: #aaa;
          margin-left: 6px;
        }

        .price {
          font-size: 12px;
          color: #888;
          line-height: 1.2;
        }

        .price strong {
          color: #ffeb00;
          font-size: 18px;
          display: block;
        }

        .price .off {
          color: #4caf50;
          font-size: 12px;
          font-weight: 600;
        }

        .qty {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
        }

        .qty button {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #ffeb00;
          background: transparent;
          color: #ffeb00;
          cursor: pointer;
          font-weight: 700;
        }

        .actions {
          margin-top: auto;
          display: flex;
          gap: 8px;
        }

        .cartBtn,
        .buyBtn {
          flex: 1;
          padding: 10px;
          border-radius: 6px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .cartBtn {
          background: transparent;
          border: 1px solid #ffeb00;
          color: #fff;
          font-family: "Jersey 25", cursive;
        }

        .cartBtn:hover {
          background: #ffeb00;
          color: #000;
        }

        .buyBtn {
          background: #111;
          border: 1px solid #ffeb00;
          color: #ffeb00;
          font-family: "Jersey 25", cursive;
        }

        .buyBtn:hover {
          background: #ffeb00;
          color: #000;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .filterSidebar {
            width: 100%;
          }

          .mainContent.withSidebar {
            margin-left: 0;
          }

          .topSection {
            padding: 30px 0;
          }

          .topControls {
            align-items: flex-start;
          }

          .searchBox {
            min-width: 200px;
          }
        }

        /* ================= RESPONSIVE OVERRIDES ================= */

        /* -------- Tablets & below (<=1024px) -------- */
        @media (max-width: 1024px) {
          .mainContent.withSidebar {
            margin-left: 0;
          }

          .filterSidebar {
            width: 320px;
          }

          .products {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          }

          .card {
            width: 100%;
            height: auto;
          }

          .imageWrap {
            height: 260px;
          }
        }

        /* -------- Mobile & small tablets (<=768px) -------- */
        @media (max-width: 768px) {
          .page {
            flex-direction: column;
          }

          .filterSidebar {
            width: 100%;
            height: 100vh;
            padding-bottom: 120px;
          }

          .topControls {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .actionsRow {
            justify-content: space-between;
          }

          .searchBox {
            width: 100%;
            min-width: unset;
          }

          .products {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }

          .imageWrap {
            height: 230px;
          }

          .card {
            height: auto;
          }
        }

        /* -------- Small phones (<=480px) -------- */
        @media (max-width: 480px) {
          .topTitle {
            font-size: 36px;
            margin-bottom: 24px;
          }

          .topControls .left h2 {
            font-size: 22px;
          }

          .products {
            grid-template-columns: 1fr;
          }

          .priceInputRow {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .priceInput {
            width: 100%;
          }

          .qty {
            justify-content: space-between;
          }

          .actions {
            flex-direction: column;
          }

          .cartBtn,
          .buyBtn {
            width: 100%;
          }
        }
      `}</style>
      <Footer />
    </>
  );
}

/* ================= CARD ================= */

// const ProductCard = ({ product }) => {
//   const [qty, setQty] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [wishlistIds, setWishlistIds] = useState(new Set());



//    const toggleWishlist = async (productId) => {
//     try {
//       await api.post("/api/wishlist/toggle", { productId });

//       setWishlistIds(prev => {
//         const updated = new Set(prev);
//         updated.has(productId)
//           ? updated.delete(productId)
//           : updated.add(productId);
//         return updated;
//       });
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert("Please login");
//       }
//     }
//   };

//   return (
//     <div className="card">
//       <div className="imageWrap">
//         {/* <span className="discount">`{product.discountPercent}% OFF`</span> */}
//         {product.discountPercent && (
//           <span className="discount">{product.discountPercent}% OFF</span>
//         )}

//         {/* <img src={product.image} alt={product.title} /> */}
//         <img
//           src={product.images?.[0]?.url || "/images/Product1.png"}
//           alt={product.name}
//         />
//         <button
//           className={`fav ${wishlistIds.has(product._id) ? "active" : ""}`}
//           onClick={() => toggleWishlist(product._id)}
//         >
//           <Heart />
//         </button>

//       </div>

//       <div className="info">
//         <h3>{product.name}</h3>

//         <div className="specs">
//           {product.highlights?.map((s, i) => (
//             <span key={i}>{s}</span>
//           ))}
//         </div>

//         {/* <div className="rating">
//           ★★★★☆ <span>({product.numReviews})</span>
//         </div> */}
//         <div className="rating">
//           {"★".repeat(Math.round(product.rating || 0))}
//           {"☆".repeat(5 - Math.round(product.rating || 0))}
//           <span>({product.numReviews || 0})</span>
//         </div>


//         <div className="price">
//           {/* <del>₹{product.orginalPrice}</del> */}
//           {product.originalPrice && <del>₹{product.originalPrice}</del>}
//           <strong>₹{product.price}</strong>
//           <span className="off">{product.discountPercent}</span>
//         </div>

//         <div className="qty">
//           <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
//           <span>{qty}</span>
//           <button onClick={() => setQty(qty + 1)}>+</button>
//         </div>

//         <div className="actions">
//           <button className="cartBtn">Add to Cart</button>
//           <button className="buyBtn">BUY NOW</button>
//         </div>
//       </div>
//     </div>
//   );
// };
/* ================= CARD ================= */

const ProductCard = ({ product, wishlistIds, toggleWishlist }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="card">
      <div className="imageWrap">
        {product.discountPercent && (
          <span className="discount">{product.discountPercent}% OFF</span>
        )}

        <img
          src={product.images?.[0]?.url || "/images/Product1.png"}
          alt={product.name}
        />

        <button
          className={`fav ${wishlistIds.has(product._id) ? "active" : ""}`}
          onClick={() => toggleWishlist(product._id)}
        >
          <Heart />
        </button>
      </div>

      <div className="info">
        <h3>{product.name}</h3>


           <div className="specs">
                      {product.highlights?.map((spec, i) => (
                        <span className="spec" key={i}>
                          {spec}
                        </span>
                      ))}
                    </div>

        <div className="rating">
          {"★".repeat(Math.round(product.rating || 0))}
          {"☆".repeat(5 - Math.round(product.rating || 0))}
          <span>({product.numReviews || 0})</span>
        </div>

        <div className="price">
          {product.originalPrice && <del>₹{product.originalPrice}</del>}
          <strong>₹{product.price}</strong>
        </div>

        <div className="qty">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        <div className="actions">
          <button className="cartBtn">Add to Cart</button>
          <button className="buyBtn">BUY NOW</button>
        </div>
      </div>
    </div>
  );
};


/* ================= ICONS ================= */

const FilterIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="10" y1="18" x2="14" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9fb3c8"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
