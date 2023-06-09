import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  console.log(color);
  console.log(size);



  // const handleColorChange = (event) => {
  //   setColor(event.target.value);
  // };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity, color, size));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  // const colorarr = product.color?.split(",")?.map(item => `"${item.trim()}"`)?.join(",");
  // console.log(colorarr);

  // const sizearr = product.size?.split(",")?.map(item => `"${item.trim()}"`)?.join(",");
  // console.log(sizearr);

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">

                <h1>{`₹${product.price}`}</h1>

                <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
                  {/* <label>
                    Color:
                    <div onClick={handleColorChange}>
                      {product.color?.split(",")?.map((item, index) => (
                        <button key={index} >{item}</button>
                      ))}
                    </div>
                  </label> */}
                  {/* <div className="colors"> */}
                  <label>
                    Color:
                    {product.color?.split(",")?.map(curColor => {
                      return (
                        <button
                          style={{ backgroundColor: curColor, height: '20px', width: '20px', borderRadius: '50%', margin: '0px 3px 0px 2px', alignItems: 'center', justifyContent: 'center' }}
                          className={color === curColor ? "btnStyle active" : "btnStyle"}
                          onClick={() => setColor(curColor)}>

                        </button>
                      );
                    })}
                  </label>
                  {/* </div> */}
                  {/* <label>
                    Color:
                    <select
                      value={color}
                      onChange={handleColorChange}
                      style={{
                        margin: "0px 0px 9px 10px",
                        width: "181px",
                        height: "35px",
                        borderRadius: "7px",
                        border: "2px inset tomato"
                      }}>
                      <option className="FilterColor" title='color'>Select Color</option>
                      {product.color?.split(",")?.map(item => (
                        <option className="FilterColor" title={item}>{item}</option>
                      ))}
                    </select>
                  </label> */}
                  <label>
                    Size:
                    <select value={size} onChange={handleSizeChange} style={{
                      margin: "0px 0px 9px 20px",
                      width: "181px",
                      height: "35px",
                      borderRadius: "7px",
                      border: "2px inset tomato"
                    }}>
                      {/* {product.size?.map((size) => ( */}
                      {/* {sizearr?.map((size) => (
                        <option title={size}>{size}</option>
                      ))} */}
                      <option className="FilterColor" title='size'>Select Size</option>
                      {product.size?.split(",")?.map(item => (
                        <option title={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
