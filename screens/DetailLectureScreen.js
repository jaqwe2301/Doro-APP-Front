import { useState, useEffect } from "react";
import { Text, Pressable, StyleSheet, View, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import ButtonOneThird from "../components/ui/ButtonOneThird";
import { getProfile } from "../utill/http";
import { GlobalStyles } from "../constants/styles";

function DetailLectureScreen({ lectureId, screenBackButton, route }) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
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

  async function profileHandler() {
    try {
      const response = await getProfile({ id: 7 });
      setData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/lectures/${route}`, {
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

    profileHandler();
  }, []);

  const applyingTutor = (role) => {
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
      <ScrollView>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>백버튼</Text>
        </Pressable>
        <Text>{lectureBasicInfo.subTitle}</Text>
        <Text>강사 급여</Text>
        <Text>주강사: {lectureBasicInfo.mainPayment}</Text>
        <Text>보조강사: {lectureBasicInfo.subPayment}</Text>

        <View style={styles.buttonContainer}>
          {/* 튜터 역할 [MAIN_TUTOR, SUB_TUTOR, STAFF] */}
          <ButtonOneThird
            onPress={() => applyingTutor("MAIN_TUTOR")}
            text="주 강사 신청"
          />
          <ButtonOneThird
            onPress={() => applyingTutor("SUB_TUTOR")}
            text="보조 강사 신청"
          />
          <ButtonOneThird
            onPress={() => applyingTutor("STAFF")}
            text="스태프 신청"
          />
        </View>
      </ScrollView>
      {data.role === "ROLE_ADMIN" ? (
        <Pressable onPress>
          <View style={styles.BottomButton}></View>
        </Pressable>
      ) : (
        ""
      )}
    </>
  );
}

export default DetailLectureScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  BottomButton: {
    position: "absolute",
    height: 56,
    width: 56,
    backgroundColor: GlobalStyles.colors.primaryDefault,
    bottom: 27,
    right: 20,
  },
});
