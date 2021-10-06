import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#ff8800",
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
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: "1.5rem"
  },
  grow: {
    flexGrow: 1
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
  }
});

export default useStyles;
