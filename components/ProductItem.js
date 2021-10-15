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
import React from "react";
import NextLink from "next/link";
import Rating from "@material-ui/lab/Rating";

export default function ProductItem({ product, addToCartHandler }) {
  return (
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
  );
}
