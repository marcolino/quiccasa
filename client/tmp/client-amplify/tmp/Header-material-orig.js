import /*React, */{ useState, useEffect } from "react";
import { /*NavLink, */Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
//import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";

const headersData = [
  {
    label: "Searches",
    href: "/searches",
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    flexGrow: 1,
  },

  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    //marginRight: theme.spacing(2),
},
  menuButtonMobile: { // TODO
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function Header() {
  const classes = useStyles();
  //const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();


  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const logo = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      Logo
    </Typography>
  );
  
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            key: label,
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
          }}
        >
          <MenuItem>
            {label}
          </MenuItem>
        </Link>
      );
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <>{getMenuButtons()}</>
{/*
          <Typography variant="h6" className={classes.title}>
            <HeaderNavItem exact to="/searches" name="Searches" />
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <HeaderNavItem exact to="/news" name="News" />
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <HeaderNavItem exact to="/blog" name="Blog" />
          </Typography>
          {/* <Typography variant="h6" className={classes.title}>
            <HeaderNavItem exact to="/posts" name="Posts" />
          </Typography>
*/}
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );

  // function HeaderNavItem(props) {
  //   return (
  //     <NavLink
  //       to={props.to}
  //       className="nav-item"
  //       exact={props.exact ? true : false}
  //       activeClassName="active"
  //     >
  //       {props.name}
  //     </NavLink>
  //   );
  // }

}
