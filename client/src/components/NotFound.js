//import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
	notFound: {
	},
}));

export default function NotFound() {
	const classes = useStyles();

  return (
    <div className={classes.notFound}>
      <h2>Page not found, sorry.</h2>
    
      <Link href="/" variant="body2" className={classes.notFound}>
        <h3>Go back to home page</h3>
      </Link>
    </div>
  );
}