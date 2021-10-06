import React, { useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0"
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0"
      }
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f2103a"
      },
      secondary: {
        main: "#208080"
      }
    }
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Next E-Commerce` : "Next E-Commerce"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                {/* <Typography className={classes.brand}>Next.JS</Typography> */}
                <Image
                  src="/1280px-Nextjs-logo.svg.png"
                  alt="Next.JS"
                  width={80}
                  height={50}
                  layout="intrinsic"
                />
              </Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.menu}>Shop</Typography>
              </Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.menu}>About</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>© 2021 Dylan Park. Next E-Commerce.</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
