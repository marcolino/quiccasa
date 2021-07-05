import React, {useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
	listings: {
	},
}));

export default function Listings() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);

  return (
    <div className={classes.listings}>
      {`Listings for ${auth.isAuthenticated ? 'authenticated' : 'guest'} user`}
   </div>
  );
}