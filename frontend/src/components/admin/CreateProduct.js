import React, { Fragment, useEffect, useRef, useState } from "react";
import "./CreateProduct.css";
import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/LocalOffer";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateProductError,
  clearCreateProductMessage,
  fetchCreateProduct,
} from "../../slices/admin/CreateProductSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const { messageCreateProduct, errorCreateProduct } = useSelector(
    (state) => state.createProduct
  );

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const stockRef = useRef();
  const offerPriceRef = useRef();
  const imageRef = useRef();

  const categories = [
    "Personal",
    "cloth",
    "Ladies Cloth",
    "Gift",
    "Food",
    "Electronics",
    "Sports",
    "Others",
  ];

  const handleCreate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("stock", stockRef.current.value);
    formData.append("image", imageRef.current.files[0]);

    dispatch(fetchCreateProduct(formData));
    nameRef.current.value = "";
    priceRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
    stockRef.current.value = "";
    imageRef.current.files[0] = "";
  };

  useEffect(() => {
    if (errorCreateProduct) {
      toast.error(errorCreateProduct);
      dispatch(clearCreateProductError());
    } else if (messageCreateProduct === "Product Created Successfully") {
      toast.success(messageCreateProduct);
      dispatch(clearCreateProductMessage());
    }
  }, [dispatch, errorCreateProduct, messageCreateProduct]);
  return (
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={handleCreate}
        >
          <h1>Create Product</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Product Name"
              required
              ref={nameRef}
            />
          </div>

          <div>
            <DiscountIcon />
            <input type="String" placeholder="Discount Percent *optional" />
          </div>

          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Product Price"
              required
              ref={priceRef}
            />
          </div>

          <div>
            <DescriptionIcon />
            <textarea
              placeholder="Product Description"
              cols="30"
              rows="1"
              ref={descriptionRef}
            ></textarea>
          </div>

          <div>
            <AccountTreeIcon />
            <input placeholder="Category" ref={categoryRef} />
          </div>
          <div>
            <StorageIcon />
            <input type="number" placeholder="Stock" required ref={stockRef} />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              multiple
              ref={imageRef}
            />
          </div>

          <div id="createProductFormImage"></div>

          <Button id="createProductBtn" type="submit">
            Create
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateProduct;
