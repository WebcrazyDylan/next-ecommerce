import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
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
  Switch,
  Badge,
  Menu,
  MenuItem,
  Zoom,
  useScrollTrigger,
  Fab,
  IconButton
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ContactsTwoToneIcon from "@material-ui/icons/ContactsTwoTone";
import { SupervisorAccountTwoTone } from "@material-ui/icons";

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrolltop}
      >
        {children}
      </div>
    </Zoom>
  );
}

function Layout(props) {
  const { title, description, children } = props;
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
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
        main: "#8710d8"
      },
      error: {
        main: "#f44336"
      },
      warning: {
        main: "#ff9800"
      },
      info: {
        main: "#2196f3"
      },
      success: {
        main: "#4caf50"
      }
    }
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
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
        <AppBar position="sticky" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                {/* <Typography className={classes.brand}>Next.JS</Typography> */}
                <Image
                  src="/1280px-Nextjs-logo.svg.png"
                  alt="Next.JS"
                  width={60}
                  height={45}
                  layout="intrinsic"
                />
              </Link>
            </NextLink>
            {/* <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.menu}>Shop</Typography>
              </Link>
            </NextLink> */}
            <div className={classes.grow}></div>
            <div className={classes.rightsection}>
              {/* <NextLink href="/about" passHref>
                <Link> */}
              <IconButton
                aria-label="About Me"
                color="inherit"
                href="https://jonghyun.cf"
                target="_blank"
              >
                <ContactsTwoToneIcon />
              </IconButton>

              {/* <Typography className={classes.menu}>ME</Typography> */}
              {/* </Link>
              </NextLink> */}
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
                color="secondary"
                name="darkMode-Checkbox"
                inputProps={{ "aria-label": "secondary darkMode-Checkbox" }}
              ></Switch>
              {/* <NextLink href="/cart" passHref>
                <Link> */}
              <IconButton aria-label="Cart" color="inherit" href="/cart">
                <Badge
                  color="error"
                  badgeContent={cart.cartItems.length}
                  showZero
                >
                  <ShoppingCartTwoToneIcon />
                </Badge>
              </IconButton>

              {/* </Link>
              </NextLink> */}
              {userInfo ? (
                <>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={loginClickHandler}
                  >
                    <SupervisorAccountTwoTone />
                  </IconButton>
                  {/* <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button> */}
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={(e) => loginMenuCloseHandler(e, "")}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      Order Hisotry
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/dashboard")
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <NextLink href="/login" passHref>
                    <Link>Login</Link>
                  </NextLink>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" className={classes.scrolltopanchor} />
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>© 2021 Dylan Park. Next E-Commerce.</Typography>
        </footer>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
