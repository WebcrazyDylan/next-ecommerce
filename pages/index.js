import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NextLink from "next/link";
import Layout from "../components/Layout";
// import data from "../utils/data";
import db from "../utils/MongoDB";
import Product from "../models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Rating from "@material-ui/lab/Rating";

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;

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
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {/* {data.products.map((product) => ( */}
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography>{product.name}</Typography>
                        </Grid>
                        <Grid item xs={4} align="right">
                          <Rating
                            value={product.rating}
                            readOnly
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            size="small"
                          ></Rating>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>&nbsp;&nbsp;${product.price}</Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => addToCartHandler(product)}
                      >
                        Add to cart
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  };
}
