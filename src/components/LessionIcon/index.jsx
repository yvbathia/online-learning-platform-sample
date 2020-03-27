import React from "react";
import PropTypes from "prop-types";
import s from "./LessionIcon.module.scss";

const propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  isCompleted: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

const defaultProps = {
  isCompleted: false,
  isActive: false,
  value: "1",
  className: "",
  onClick: () => {}
};

const LessionIcon = ({ value, isActive, isCompleted, onClick, className }) => {
  const handleOnClick = () => {
    onClick();
  };
  return (
    <button
      className={[
        s.btn,
        className,
        isCompleted ? s.complete : "",
        isActive ? s.active : ""
      ].join(" ")}
      onClick={handleOnClick}
    >
      {value}
    </button>
  );
};

LessionIcon.defaultProps = defaultProps;
LessionIcon.propTypes = propTypes;
export default LessionIcon;
