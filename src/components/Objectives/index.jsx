import React from "react";
import PropTypes from "prop-types";
import s from "./Objectives.module.scss";
import Check from "../../Images/check.png";
import Cross from "../../Images/cross.png";
import Class from "../../Images/class.png";
import { objectiveStateEnum } from "../../constants";

const propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(objectiveStateEnum),
  onClick: PropTypes.func.isRequired
};

const defaultProps = {
  theme: "",
  value: "Time Signture",
  className: ""
};

const Objectives = ({ value, theme, className, onClick }) => {
  const handleOnClick = value => {
    onClick(value);
  };
  return (
    <div className={s.root}>
      <div className={[s.container, className, s[theme]].join(" ")}>
        <h3 className={s.title}>{value}</h3>
      </div>
      <div className={s.btn}>
        <button onClick={() => handleOnClick(1)}>
          <img alt="Objective" className={s.img} src={Check} />
        </button>
        <button onClick={() => handleOnClick(2)}>
          <img alt="Objective" className={s.img} src={Cross} />
        </button>
        <button onClick={() => handleOnClick(3)}>
          <img alt="Objective" className={s.img} src={Class} />
        </button>
      </div>
    </div>
  );
};

Objectives.defaultProps = defaultProps;
Objectives.propTypes = propTypes;
export default Objectives;
