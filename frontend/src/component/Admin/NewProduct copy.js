import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import PaletteIcon from '@material-ui/icons/Palette';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [name, setName] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [colorPreview, setColorPreview] = useState([]);

  const { loading, error, success } = useSelector((state) => state.newProduct);



  const categories = [
    "Happy Half Suits",
    "Happy Full Suits",
    "Bless Half Suits",
    "Bless Full Suits",
    "Enjoy Half Suits",
    "Enjoy Full Suits",
    "Hunar Half Suits",
    "Hunar Full Suits",
    "Fun Half Suits",
    "Fun Full Suits",
    "Lil'bee Half Suits",
    "Lil'bee Full Suits",
    "Bloke Half T-Suirt",
    "Bloke Full T-Suirt",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);


  // const handleColor = (e) => {
  //   const input = e.target.value.split(",");
  //   const colors = input.split(",").map(item => `"${item}"`).join(", ");
  //   setColor(() => {
  //     return colors;
  //   });
  // };

  const handleSize = (e) => {
    const input = e.target.value.split(",");
    const size = input.split(",").map(item => `"${item}"`).join(", ");
    setSize(() => {
      return size;
    });
  };

  // const handleColor = (e) => {
  //   const input = e.target.value;
  //   if (typeof input === "string") {
  //     const colorset = input.split(",").map(item => `"${item.trim()}"`).join(',');
  //     setColor(colorset);
  //   }
  // };

  // const handleSize = (e) => {
  //   const input = e.target.value;
  //   if (typeof input === "string") {
  //     const sizeset = input.split(",").map(item => `"${item.trim()}"`).join(',');
  //     setSize(sizeset);
  //   }
  // };


  // const handleColor = (e) => {
  //   setColor((prev) => [...prev, e.target.value.split(",")]);
  // };

  // const handleSize = (e) => {
  //   setSize((prev) => [...prev, e.target.value.split(",")]);
  // };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    size.forEach((s) => myForm.append("size", s));
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    // color.forEach((c) => myForm.append("color", c));
    color.forEach((image) => {
      myForm.set("color", image);
    });
    images.forEach((image) => {
      myForm.set("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductColorChange = (e) => {
    const files = Array.from(e.target.files);

    setColor([]);
    setColorPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setColorPreview((old) => [...old, reader.result]);
          setColor((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>
              <PaletteIcon />
              <input
                type="text"
                placeholder="Color"
                required
                onChange={handleColor}
              // onChange={(e) => setColor(e.target.value.split(",").map(item => item.join(',')))}
              // onChange={(e) => setColor(e.target.value.split(","))}
              />
            </div> */}
            <div>
              <BlurOnIcon />
              <input
                type="text"
                placeholder="Size"
                required
                onChange={handleSize}
              // onChange={(e) => setSize(e.target.value.split(",").map(item => item.join(',')))}
              // onChange={(e) => setSize(e.target.value.split(","))}
              />
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="color"
                accept="image/*"
                placeholder="Choose Image Files"
                onChange={createProductColorChange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {colorPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;















