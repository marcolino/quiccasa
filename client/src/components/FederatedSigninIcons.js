import { ReactComponent as FacebookSvg } from '../assets/facebook.svg';
import { ReactComponent as TwitterSvg } from '../assets/twitter.svg';
import { ReactComponent as GoogleSvg } from '../assets/google.svg';

const style = {
  display: 'flex',
  width: 25,
  height: 25,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 5,
  marginRight: 5,
};

const FacebookIcon = () => (
  <div style={style}>
    <FacebookSvg />
  </div>
);
const TwitterIcon = () => (
  <div style={style}>
    <TwitterSvg />
  </div>
);
const GoogleIcon = () => (
  <div style={style}>
    <GoogleSvg />
  </div>
);

export { FacebookIcon, TwitterIcon, GoogleIcon };