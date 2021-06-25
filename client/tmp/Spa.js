import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "none"
  }
}));

export default function SpaWrapper({ children }) {
  const classes = useStyle();
  return <div className={classes.root}>{children}</div>;
}
