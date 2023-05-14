import { useState, useEffect } from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import ButtonOneThird from "../components/ui/ButtonOneThird";

import axios from "axios";

function DetailLectureScreen({ lectureId, screenBackButton }) {
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

  const ApplyingTutor = (role) => {
    axios
      .post(
        `http://10.0.2.2:8080/users-lectures/lectures/${lectureId}`,
        {
          tutorRole: role,
          userId: 16,
        },
        {
          headers: {
            // 헤더에 필요한 데이터를 여기에 추가
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        // console.log("성공");
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  };

  return (
    <>
      <Pressable onPress={screenBackButton}>
        <Text>백버튼</Text>
      </Pressable>
      <Text>{lectureBasicInfo.subTitle}</Text>
      <Text>강사 급여</Text>
      <Text>주강사: {lectureBasicInfo.mainPayment}</Text>
      <Text>보조강사: {lectureBasicInfo.subPayment}</Text>
      <View style={styles.buttonContainer}>
        {/* 튜터 역할 [MAIN_TUTOR, SUB_TUTOR, STAFF] */}
        <ButtonOneThird
          onPress={() => ApplyingTutor("MAIN_TUTOR")}
          text="주 강사 신청"
        />
        <ButtonOneThird
          onPress={() => ApplyingTutor("SUB_TUTOR")}
          text="보조 강사 신청"
        />
        <ButtonOneThird
          onPress={() => ApplyingTutor("STAFF")}
          text="스태프 신청"
        />
      </View>
    </>
  );
}

export default DetailLectureScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
});
