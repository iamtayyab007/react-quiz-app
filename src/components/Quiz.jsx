import React, { useRef } from "react";
import "./Quiz.css";
import { useState } from "react";
import { data } from "../assets/data.js";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [questions, setQuestions] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [count, setCount] = useState(0);
  let [result, setResult] = useState("");

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const ul = useRef(null);

  const optionsArray = [option1, option2, option3, option4];

  const handleItems = (e, value) => {
    if (lock === false) {
      if (value === questions.ans) {
        e.target.classList.add("correct");
        setLock(true);
        setCount((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        optionsArray[questions.ans - 1].current.classList.add("correct");
        setLock(true);
      }
    }
  };

  const handleNext = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }

      setIndex(++index);
      setQuestions(data[index]);
      ul.current.childNodes.forEach((child) => {
        child.classList.remove("correct");
        child.classList.remove("wrong");
        return null;
      });
    }
    setLock(false);
  };

  const handleReset = () => {
    setIndex(0);
    setQuestions(data[0]);
    setCount(0);
    setLock(false);
    setResult(false);
  };
  return (
    <>
      {result ? (
        <div className="container">
          {" "}
          <h2>
            Welcome to result: You have secured {count} out of {data.length}
          </h2>{" "}
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <div className="container">
          <h2>
            {index + 1}. {questions.question}
          </h2>
          <hr />

          <ul ref={ul}>
            <li onClick={(e) => handleItems(e, 1)} ref={option1}>
              {questions.option1}
            </li>
            <li onClick={(e) => handleItems(e, 2)} ref={option2}>
              {questions.option2}
            </li>
            <li onClick={(e) => handleItems(e, 3)} ref={option3}>
              {questions.option3}
            </li>
            <li onClick={(e) => handleItems(e, 4)} ref={option4}>
              {questions.option4}
            </li>
          </ul>

          <button onClick={handleNext}>Next</button>
          <div className="index-result">
            {index + 1} out {data.length}
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
