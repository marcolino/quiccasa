//import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	searches: {
	},
}));

export default function Searches() {
	const classes = useStyles();

  return (
    <div className={classes.searches}>
      Your searches...
    </div>
  );
}