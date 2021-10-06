import React from "react";
import Head from "next/head";
import { AppBar, Toolbar, Container, Typography } from "@material-ui/core";
import useStyles from "../utils/styles";

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Next E-Commerce</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>E-Commerce</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved. Next E-Commerce.</Typography>
      </footer>
    </div>
  );
}
