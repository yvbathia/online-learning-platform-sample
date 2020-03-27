import React, { useEffect, useState } from "react";
import s from "./Home.module.scss";
// import ReactPlayer from "react-player";
import LessionIcon from "../../components/LessionIcon";
import Objectives from "../../components/Objectives";
import { objectiveStateEnum } from "../../constants";
import Video from "../../components/Video";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLession, setCurrentLession] = useState(0);
  const [objectState, setObjectState] = useState([[]]);
  const [data, setData] = useState({});
  const [currentVideoSet, setCurrentVideoSet] = useState([]);
  useEffect(() => {
    fetch("https://api.myjson.com/bins/qubzl")
      .then(res => res.json())
      .then(response => {
        const lessonDetails = [];
        const recitalTitle = response.recitalTitle;
        const instrumentTitle = response.instrumentTitle;
        const objState = [];
        response.lessonDetails.forEach(element => {
          const leassonData = {};
          const obj = [];
          element.objectiveDetails.forEach(res => {
            const data = {};
            data.title = res.title;
            data.duration = res.durationInMinutes;
            data.videoDetails = res.objectiveVideosDetails;
            obj.push(data);
          });
          objState.push(new Array(element.objectiveDetails.length).fill(0));
          leassonData.title = element.lessonTitle;
          leassonData.objects = obj;
          leassonData.status = false;
          lessonDetails.push(leassonData);
        });
        setObjectState(objState);
        setData({
          recitalTitle: recitalTitle,
          instrumentTitle: instrumentTitle,
          lessonDetails: lessonDetails
        });
        setCurrentVideoSet(lessonDetails[0].objects[0].videoDetails);
        setIsLoading(false);
      });
  }, []);
  const handleObjectChange = (index, value) => {
    let newObjectiveData = [...objectState];
    newObjectiveData[currentLession][index] = value;
    if (
      newObjectiveData[currentLession].every(val => {
        return val === 1;
      })
    ) {
      let newData = { ...data };
      newData.lessonDetails[currentLession].status = true;
      setData(newData);
    }
    setObjectState(newObjectiveData);
  };

  const handleChangeLession = index => {
    setCurrentLession(index);
    setCurrentVideoSet(
      data.lessonDetails[index].objects[0].videoDetails
    );
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        {!isLoading && (
          <>
            <div className={s.headContainer}>
              <div className={s.head}>
                <h2 className={s.title}>{data.recitalTitle}</h2>
                <h2 className={s.instrument}>{data.instrumentTitle}</h2>
              </div>
              <div className={s.leasson}>
                <h2>Lessons</h2>
                {data.lessonDetails.map((element, index) => (
                  <LessionIcon
                    key={index}
                    value={index + 1 + ""}
                    isActive={index === currentLession ? true : false}
                    isCompleted={element.status}
                    onClick={() => handleChangeLession(index)}
                  />
                ))}
              </div>
            </div>
            <div className={s.detail}>
              <div className={s.leftMenu}>
                <h3 className={s.menu}>Menu</h3>
                <hr size="2px" width="100%" />
                <div className={s.menuItem}>
                  {currentLession !== -1 &&
                    data.lessonDetails[currentLession].objects.map(
                      (element, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              setCurrentVideoSet(element.videoDetails);
                            }}
                          >
                            <Objectives
                              value={`${element.title} - ${element.duration}`}
                              theme={
                                objectiveStateEnum[
                                  objectState[currentLession][index]
                                ]
                              }
                              onClick={value =>
                                handleObjectChange(index, value)
                              }
                            />
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
              <div className={s.videoContainer}>
                <Video urls={currentVideoSet} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
