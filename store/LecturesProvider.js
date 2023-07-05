import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { URL } from "../utill/config";

// create context
const LecturesContext = createContext();

// create context provider
export const LecturesProvider = ({ children }) => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    axios
      .get(URL + "/lectures/", {
        params: {
          city: "",
          endDate: "",
          startDate: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLectures(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  return (
    <LecturesContext.Provider value={{ lectures, setLectures }}>
      {children}
    </LecturesContext.Provider>
  );
};

// create custom hook to use this context
export const useLectures = () => useContext(LecturesContext);
