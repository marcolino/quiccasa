import React from "react";
import PropTypes from "prop-types";
//import LogoMain from "../assets/logo-main.png";

const requestImageFile = require.context("../assets/images", true, /\.png$/);

const IconCustom = (props) => (
  <img src={requestImageFile(`./${props.name}.png`).default} style={props.style} width={props.size} height={props.size} alt={`${props.name}`} />
);

IconCustom.propTypes = {
  name: PropTypes.oneOf([
    'logo-main',
  ]).isRequired,
  size: PropTypes.number,
  style: PropTypes.object,
  alt: PropTypes.string,
};

IconCustom.defaultProps = {
  size: 32,
  style: {},
  alt: "icon",
};

export default IconCustom;
