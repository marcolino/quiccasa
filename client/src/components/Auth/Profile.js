import React, {useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../providers/AuthProvider";

const useStyles = makeStyles(theme => ({
	profile: {
	},
}));

export default function Profile() {
	const classes = useStyles();
  const { auth } = useContext(AuthContext);

  return (
    <div className={classes.profile}>
      {`Profile for ${auth.isAuthenticated ? 'authenticated' : 'guest'} user`}
   </div>
  );
}