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
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  InputBase
} from "@material-ui/core";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ContactPhoneTwoToneIcon from "@material-ui/icons/ContactPhoneTwoTone";
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
// import CancelIcon from "@material-ui/icons/Cancel";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getError } from "../utils/error";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useEffect } from "react";
// import db from "../utils/MongoDB";
// import Product from "../models/Product";

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

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

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
    Cookies.remove("shippinhAddress");
    Cookies.remove("paymentMethod");

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
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
              >
                <MenuIcon className={classes.navbarButton} />
              </IconButton>
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
            </Box>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem className={classes.navbar}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Image
                      src="/1280px-Nextjs-logo.svg.png"
                      alt="Next.JS"
                      width={60}
                      height={45}
                      layout="intrinsic"
                    />

                    {/* <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton> */}
                  </Box>
                </ListItem>
                <ListItem className={classes.navbar}>
                  {/* <Typography>Shopping by category</Typography> */}
                  <div>
                    <form
                      onSubmit={submitHandler}
                      className={classes.searchForm}
                    >
                      <InputBase
                        name="query"
                        className={classes.searchInput}
                        placeholder="Search products"
                        onChange={queryChangeHandler}
                      />
                      <IconButton
                        type="submit"
                        className={classes.iconButton}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </form>
                  </div>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            {/* <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.menu}>Shop</Typography>
              </Link>
            </NextLink> */}

            {/* <div className={classes.grow}></div> */}
            <div className={classes.searchSection}>
              <form onSubmit={submitHandler} className={classes.searchForm}>
                <InputBase
                  name="query"
                  className={classes.searchInput}
                  placeholder="Search products"
                  onChange={queryChangeHandler}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </div>

            <div className={classes.rightsection}>
              {/* <NextLink href="/about" passHref>
                <Link> */}
              <IconButton
                aria-label="About Me"
                color="inherit"
                href="https://jonghyun.cf"
                target="_blank"
              >
                <ContactPhoneTwoToneIcon />
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
                    <Link>
                      <Typography component="span"> Cart
                */}
              <IconButton aria-label="Cart" color="inherit" href="/cart">
                <Badge
                  color="error"
                  badgeContent={cart.cartItems.length}
                  showZero
                >
                  <ShoppingCartTwoToneIcon />
                </Badge>
              </IconButton>

              {/* </Typography> 
                </Link>
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
                    <SupervisorAccountTwoToneIcon />
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
                    <Link>
                      <Typography component="span">Login</Typography>
                    </Link>
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

// export async function getServerSideProps(context) {
//   const { props } = context;
//   await db.connect();
//   const categories = await Product.find().distinct("category").lean();
//   await db.disconnect();

//   return {
//     props: { ...props, categories: categories.map(db.convertDocToObj) }
//   };
// }

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
// export default Layout;
