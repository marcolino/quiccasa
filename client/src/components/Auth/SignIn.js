import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import Input from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import Lock from "@material-ui/icons/Lock";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // fix IE 11 issue
    marginTop: theme.spacing(1),
    autocomplete: "off",
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
    color: 'white',
    textTransform: 'none',
    fontSize: '1.4em',
  },

  textField: {
    /*width: "25ch",*/
    fontSize: "1.0em",
    color: "#333",
    backgroundColor: "#fff !important",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#444",
      backgroundColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
    },
    // form: {
    //   autocomplete: "off",
    // },
  },
  startAdornment: {
    backgroundColor: "#eaedf0",
    height: "2.5rem",
    maxHeight: "3rem",
    marginLeft: -15,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRight: "1px solid #c5c5c5"
  }
});
const useStyles = makeStyles((theme) => (styles(theme)));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    Auth.signIn({
      username: email,
      password,
    })
      .then((user) => {
        setEmail("");
        setPassword("");
        console.log("user:", user);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const federatedSignIn = (e, provider) => {
    e.preventDefault();

    Auth.federatedSignIn({
      provider,
    })
      .then((user) => {
        setEmail("");
        console.log("user:", user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Grid>
        </Grid>

        <form className={classes.form} noValidate autoComplete="off">

          <TextField
            required
            autoFocus
            autoComplete="false"
            variant="outlined"
            fullWidth
            id="email"
            //label={"Email"}
            size="small"
            className={classes.textField}
            placeholder={"Email"}
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  className={classes.startAdornment}
                  position="start"
                >
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            required
            autoComplete="false"
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            //name="password"
            //label="Password"
            size="small"
            className={classes.textField}
            placeholder={"Password"}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  className={classes.startAdornment}
                  position="start"
                >
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          {/*
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => signIn(e)}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            {/*
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <br />
          <hr />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => federatedSignIn(e, 'Google')}
          >
            Google Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="right">
      {'Copyright © '} {new Date().getFullYear()}, {' '}
      <Link color="inherit" href="https://material-ui.com/">
        SistemiSolari
      </Link>{' '}
    </Typography>
  );
}

export default SignIn;


/*
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import FormElement from "../FormElement";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    Auth.signIn({
      username: email,
      password,
    })
      .then((user) => {
        setEmail("");
        setPassword("");
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const federatedSignIn = (e, provider) => {
    e.preventDefault();

    Auth.federatedSignIn({
      provider,
    })
      .then((user) => {
        setEmail("");
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form>
          <div className="form-group">
            <FormElement label="Email" forId="sign-in-email">
              <input
                id="sign-in-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                autoComplete="email"
              />
            </FormElement>
          </div>
          <FormElement label="Password" forId="sign-in-password">
            <input
              id="sign-in-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              autoComplete="current-password"
            />
          </FormElement>
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
          <hr />
          <button type="submit" onClick={(e) => federatedSignIn(e, 'Google')}>
            Google Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
*/