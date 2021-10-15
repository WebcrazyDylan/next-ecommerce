import { makeStyles } from "@material-ui/core";
import { Height } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  scrolltop: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  scrolltopanchor: {
    minHeight: "0vh"
  },
  navbar: {
    backgroundColor: "#008060",
    "& a": {
      color: "#ffffff",
      marginLeft: 10
    }
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem"
  },
  menu: {
    paddingLeft: 8,
    fontWeight: "bold",
    fontSize: "1.3rem"
  },
  grow: {
    flexGrow: 1
  },
  rightsection: {
    width: "auto"
  },
  main: {
    minHeight: "80vh"
  },
  footer: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10
  },
  section: {
    marginTop: 10,
    marginBottom: 10
  },
  form: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto"
  },
  navbarButton: {
    color: "#ffffff",
    textTransform: "initial"
  },
  transparentBackgroud: {
    backgroundColor: "transparent"
  },
  fullWidth: {
    width: "100%",
    textAlign: "center",
    "& > * + *": {
      marginTop: theme.spacing(0.2)
    }
  },
  error: {
    color: "#f04040"
  },
  reviewForm: {
    maxWidth: 800,
    width: "100%"
  },
  reviewItem: {
    marginRight: "1rem",
    borderRight: "1px #808080 solid",
    paddingRight: "1rem"
  },
  toolbar: {
    justifyContent: "space-between"
  },
  menuButton: { padding: 0 },
  mt1: { marginTop: "1rem" },
  // search
  searchSection: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  searchForm: {
    border: "1px solid #ffffff",
    backgroundColor: "#ffffff",
    borderRadius: 5
  },
  searchInput: {
    paddingLeft: 5,
    color: "#000000",
    "& ::placeholder": {
      color: "#606060"
    }
  },
  iconButton: {
    backgroundColor: "#8710D8",
    padding: 5,
    borderRadius: "0 5px 5px 0",
    "& span": {
      color: "#eaeaea"
    }
  },
  sort: {
    marginRight: 5
  },
  featuredImage: {
    width: "100%",
    maxHeight: "60vh"
  },
  fullContainer: { height: "100vh" },
  mapInputBox: {
    position: "absolute",
    display: "flex",
    left: 0,
    right: 0,
    margin: "10px auto",
    width: 300,
    height: 40,
    "& input": {
      width: 250
    }
  }
}));

export default useStyles;
