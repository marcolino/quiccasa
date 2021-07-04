import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const styles = theme => ({
	footer: {
    margin: '0.3em',
    fontStyle: 'italic',
	},
});

const Footer = () => {
  return (
    <Container style={styles().footer}>
      <Grid container justify="center">
        <Copyright color={"textSecondary"} />
      </Grid>
    </Container>
  );
}

const Copyright = (props) => {
  return (
    <Typography variant="body2" color={props.color}>
      {'Copyright © '} {new Date().getFullYear()}, {' '}
      <Link color="inherit" href="https://material-ui.com/">
        {"Sistemi Solari"}
      </Link>{' '}
    </Typography>
  );
}

export default Footer;
