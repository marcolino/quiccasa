import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  //Slide,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
  //useScrollTrigger,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { /*BrowserRouter, Route, Switch,*/ Link } from "react-router-dom";

// importing icons
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
//import AccountBox from "@material-ui/icons/AccountBox";
import SignInIcon from "@material-ui/icons/ExitToApp";
//import SignUpIcon from "@material-ui/icons/AccountBox";
import LogoutIcon from "@material-ui/icons/LockOpen";

import { AuthContext } from "../providers/AuthProvider";

// // importing views
// import Home from "./Home";
// import News from "./News";
// import Blog from "./Blog";
// import SignIn from "./Auth/SignIn";
// import SignUp from "./Auth/SignUp";

const appName = "quiccasa";

// local styling
const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbarButtons: {
    marginRight: 'auto',
  },
  offset: theme.mixins.toolbar,
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    padding: theme.spacing(2),
  },
}));

function HideOnScroll(props) {
  // const { children } = props;
  // const trigger = !useScrollTrigger();

  return props.children;
  // return (
  //   <Slide appear={false} direction={"down"} in={trigger} timeout={{enter:250, exit:250}}>
  //     {children}
  //   </Slide>
  // );
}

const Header = (props) => {
  //const [auth, setAuth] = React.useState(false);
  //const auth = React.useContext();
  const { auth } = useContext(AuthContext);

  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const menuItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      href: "/",
    },
    {
      label: "Searches",
      icon: <SearchIcon />,
      href: "/searches",
    },
  ];
  if (!auth.isAuthenticated) menuItems.push({
    label: "Sign In",
    icon: <SignInIcon />,
    href: "/signin",
  });
  if (auth.isAuthenticated) menuItems.push({
    label: "Sign out",
    icon: <LogoutIcon />,
    href: "/signout",
  });
  
  return (
    <div className={classes.root}>
      <HideOnScroll >
        <AppBar elevation={10} position="fixed">
          <Toolbar>
            <Typography
              variant="h5"
              component="p"
              color="textSecondary"
              className={classes.title}
            >
              {appName}
            </Typography>
            {!isMobile ? (
              <div>
                {menuItems.map((item, index) => {
                  return (
                    <Button
                      variant="text"
                      component={Link}
                      to={item.href}
                      color="default"
                      key={index}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  )
                })}
              </div>
            ) : (
              <>
                <IconButton
                  color="default"
                  className={classes.menuButton}
                  edge="start"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchor}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  KeepMounted={true}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                >
                  {menuItems.map((item, index) => {
                    return (
                      <MenuItem
                        onClick={() => setAnchor(null)}
                        component={Link}
                        to={item.href}
                        key={index}
                      >
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <Typography variant="h6"> {item.label} </Typography>
                      </MenuItem>
                    )
                  })}
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
    </div>
  );
};

export default Header;
