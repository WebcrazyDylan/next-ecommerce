import { makeStyles } from "@material-ui/core";

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
    maxWidth: 800,
    margin: "0 auto"
  },
  navbarButton: {
    color: "#ffffff",
    textTransform: "initial"
  }
}));

export default useStyles;
