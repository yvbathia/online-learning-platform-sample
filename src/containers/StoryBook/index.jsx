import React from "react";
import Objectives from "../../components/Objectives";
import LessionIcon from "../../components/LessionIcon";

const StoryBook = () => {
  return (
    <div>
      <LessionIcon />
      <LessionIcon theme="active" />
      <LessionIcon theme="complete" />
      <Objectives />
      <Objectives theme="done" />
      <Objectives theme="notDone" />
      <Objectives theme="nextClass" />
    </div>
  );
};
export default StoryBook;
