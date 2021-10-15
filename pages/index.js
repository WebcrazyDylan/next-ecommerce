import NextLink from "next/link";
import Image from "next/image";
import { Grid, Link, Typography } from "@material-ui/core";
import Layout from "../components/Layout";
// import data from "../utils/data";
import db from "../utils/MongoDB";
import Product from "../models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";
import ProductItem from "../components/ProductItem";
import Carousel from "react-material-ui-carousel";
import useStyles from "../utils/styles";
// import HomeIcon from "@material-ui/icons/Home";

export default function Home(props) {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout>
      <Carousel
        className={classes.mt1}
        animation="fade"
        // IndicatorIcon={<HomeIcon />} // Previous Example
        indicatorIconButtonProps={{
          style: {
            padding: "1px", // 1
            color: "#8710d8" // 3
          }
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: "#008060" // 2
          }
        }}
        indicatorContainerProps={{
          style: {
            // marginTop: "50px", // 5
            textAlign: "right" // 4
          }
        }}
      >
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              {/* <Image
                src={product.featuredImage}
                alt={product.name}
                width={"100%"}
                height={"60vh"}
                layout="responsive"
                className={classes.featuredImage}
              /> */}
              <img
                src={product.featuredImage}
                alt={product.name}
                className={classes.featuredImage}
              />
            </Link>
          </NextLink>
        ))}
      </Carousel>

      <Typography variant="h2">Popular Products</Typography>
      <Grid container spacing={3}>
        {/* {data.products.map((product) => ( */}
        {topRatedProducts.map((product) => (
          <Grid item md={4} sm={6} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()
    .limit(6);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1
    })
    .limit(9);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj)
    }
  };
}
