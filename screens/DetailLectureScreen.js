import { useState, useEffect } from "react";
import { Text, Pressable } from "react-native";

import axios from "axios";

function DetailLectureScreen({ lectureId, detailLectureBackButton }) {
  const [lectureBasicInfo, setLectureBasicInfo] = useState({
    city: "",
    enrollEndDate: "",
    enrollStartDate: "",
    institution: "",
    lectureDates: [],
    mainPayment: "",
    mainTitle: "",
    mainTutor: "",
    place: "",
    staff: "",
    staffPayment: "",
    studentGrade: ",",
    studentNumber: "",
    subPayment: "",
    subTitle: "",
    subTutor: "",
    time: "",
  });
  const [lectureContent, setLectureContent] = useState({
    detail: "",
    kit: "",
    remark: "",
    requirement: "",
  });

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/lectures/${lectureId}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLectureBasicInfo(res.data.data.lectureDto);
        setLectureContent(res.data.data.lectureContentDto);
        console.log(res.data.data.lectureContentDto);
        // console.log("성공");
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  return (
    <>
      <Pressable onPress={detailLectureBackButton}>
        <Text>백버튼</Text>
      </Pressable>
      <Text>{lectureBasicInfo.subTitle}</Text>
      <Text>강사 급여</Text>
      <Text>주강사: {lectureBasicInfo.mainPayment}</Text>
      <Text>보조강사: {lectureBasicInfo.subPayment}</Text>
    </>
  );
}

export default DetailLectureScreen;
