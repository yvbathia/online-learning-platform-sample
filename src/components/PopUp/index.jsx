import React from "react";
import ReactJson from "react-json-view";
import PropTypes from "prop-types";
import s from "./PopUp.module.scss";

const propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

const Popup = ({ data, onClose }) => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <button className={s.btn} onClick={onClose}>
          X
        </button>
        <ReactJson style={{ height: "100%" }} src={data} />
      </div>
    </div>
  );
};

Popup.propTypes = propTypes;
export default Popup;
