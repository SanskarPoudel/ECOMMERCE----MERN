import { Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../../more/Loader";
import { fetchProducts } from "../../slices/ProductSlice";
import ProductCard from "./ProductCard";
import "./Products.css";
const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.product
  );
  const categoryyy = [
    "Laptops",
    "Mens Fashion",
    "Womens Fashion",
    "Mobile Phones",
    "Kitchen Utensils",
  ];
  const categories = categoryyy;
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");

  console.log(categoryyy);

  const { keyword } = useParams();

  const setCurrentPageNo = (event, value) => {
    setCurrentPage(value);
  };

  const details = {
    category,
    keyword,
    currentPage,
  };

  const handleAllProduct = () => {
    dispatch(fetchProducts({ category: "", keyword: "", currentPage }));
  };

  useEffect(() => {
    dispatch(fetchProducts(details));
  }, [dispatch, keyword, currentPage, category]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            {products.length === 0 ? (
              ""
            ) : (
              <h2
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid rgba(21,21,21,0.5)",
                  width: "20vmax",
                  fontSize: "1.4vmax",
                  fontFamily: "Poppins,sans-serif",
                  margin: "3vmax auto",
                  color: "rgb(0, 0, 0, 0.7)",
                }}
              >
                Featured Products
              </h2>
            )}
            <div
              className="sidebar__product"
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              <div
                className="sidebar__products"
                style={{
                  border: "1px solid #999",
                  margin: "1vmax",
                  flex: ".177",
                }}
              >
                <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  CHOOSE CATEGORIES
                </Typography>
                <ul className="categoryBox">
                  <li
                    type="checkbox"
                    className="category-link"
                    onClick={handleAllProduct}
                  >
                    ALL PRODUCTS
                  </li>

                  {categories.map((categoryy) => (
                    <li
                      className="category-link"
                      onClick={() => {
                        setCategory(() => categoryy);
                      }}
                      type="checkbox"
                    >
                      {categoryy}
                    </li>
                  ))}
                </ul>
                <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  QUICK LINKS
                </Typography>
                <Link to="/cart">
                  <li className="category-link">My Carts</li>
                </Link>

                <Link to="/favourite">
                  {" "}
                  <li className="category-link">Favourites Items</li>
                </Link>
                <Link to="/checkout">
                  <li className="category-link">Go to Checkout</li>
                </Link>
              </div>

              {products.length === 0 ? (
                <span
                  style={{
                    display: "block",
                    padding: "30px 0",
                    fontSize: "1.5rem",
                    flex: ".9",
                    textAlign: "center",
                  }}
                >
                  No Product Found ....
                </span>
              ) : (
                <div
                  className="products"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    flex: ".9",
                  }}
                >
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              )}
            </div>

            <div
              className="pagination__box"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "6vmax",
              }}
            >
              <Pagination
                count={Math.ceil(productCount / resultPerPage)}
                page={currentPage}
                itemsCountPerPage={resultPerPage}
                // totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                cls="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
