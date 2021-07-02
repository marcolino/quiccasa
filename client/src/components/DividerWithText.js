import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "0.2em",
    paddingRight: "0.2em",
    marginTop: "1.5em",
    marginBottom: "1.5em",
  },
  border: {
    borderBottom: "1px solid #888",
    paddingLeft: "1em", //
    width: "90%",
  },
  content: {
    fontSize: "1.1em",
    color: "#888",
    padding: "0 0.5em 0 0.5em",
  },
});
const useStyles = makeStyles((theme) => (styles(theme)));

const DividerWithText = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.border} />
      {children && <span className={classes.content}>
        {children}
      </span>}
      <div className={classes.border} />
    </div>
  );
};

export default DividerWithText;