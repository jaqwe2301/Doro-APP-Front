import { useState, useEffect } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  Alert,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import ButtonOneThird from "../components/ui/ButtonOneThird";
import { getProfile } from "../utill/http";
import { GlobalStyles } from "../constants/styles";
import LectureTop from "../components/ui/LectureTop";

function DetailLectureScreen({ route }) {
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
    content: "",
  });

  const [tutor, setTutor] = useState([]);

  // async function profileHandler() {
  //   try {
  //     const response = await getProfile({ id: 7 });
  //     setData(response);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/lectures/${route.params.data}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let nonSaveId = res.data.data.lectureDto;
        nonSaveId["id"] = route.params.data;
        setLectureBasicInfo(nonSaveId);
        setLectureContent(res.data.data.lectureContentDto);
        // console.log("성공");
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
    console.log(route.params.data);

    axios
      .get(
        `http://10.0.2.2:8080/users-lectures/lectures/${route.params.data}`,
        {
          headers: {
            // 헤더에 필요한 데이터를 여기에 추가
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTutor(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
    // profileHandler();
  }, []);

  const applyingTutor = (role) => {
    axios
      .post(
        `http://10.0.2.2:8080/users-lectures/lectures/${route.params.data}`,
        {
          tutorRole: role,
          userId: 1,
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

  const choiceTutor = (value, name) => {
    // 강사 배청 확인창
    let role =
      value === "MAIN_TUTOR"
        ? "주 강사"
        : value === "SUB_TUTOR"
        ? "보조강사"
        : "스태프";

    Alert.alert(
      lectureBasicInfo.subTitle,
      role + " '" + name + "' 확정하겠습니까 ?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "확인",
          onPress: () => {
            console.log("강사 배정 완료");
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "second", title: "기본정보" },
    { key: "first", title: "강의 관련 정보" },
    { key: "third", title: "신청 강사" },
  ]);

  // Use a custom renderScene function instead
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View>
            <View></View>
          </View>
        );
      case "second":
        return <></>;
      case "third":
        return (
          <View>
            <Text>신청 강사</Text>
            {tutor.map((item, i) => {
              return (
                <Pressable
                  key={i}
                  onPress={() => choiceTutor(item.tutorRole, item.name)}
                >
                  <View>
                    <Text>{item.name}</Text>
                    <Text>
                      {item.tutorRole === "MAIN_TUTOR"
                        ? "주강사"
                        : item.tutorRole === "SUB_TUTOR"
                        ? "보조강사"
                        : ""}
                    </Text>
                    <Text>{item.major}</Text>
                  </View>
                </Pressable>
              );
            })}
            <View></View>
          </View>
        );

      default:
        return <View />;
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <LectureTop
        subTitle={lectureBasicInfo.subTitle}
        payment={lectureBasicInfo.mainPayment}
        city={lectureBasicInfo.city}
        date={lectureBasicInfo.lectureDates}
        time={lectureBasicInfo.time}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: GlobalStyles.colors.primaryDefault,
              border: "none",
            }}
            style={{
              backgroundColor: "white",
              shadowOffset: { height: 0, width: 0 },
              shadowColor: "transparent",
            }}
            labelStyle={{
              // 폰트 컬러
              color: "black",
            }}
            pressColor={"transparent"}
          />
        )}
      />

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

      {/* {data.role === "ROLE_ADMIN" ? ( */}
      <Pressable
        onPress={() =>
          navigation.navigate("UpdateLectureScreen", {
            data: {
              lectureContentDto: lectureContent,
              lectureDto: lectureBasicInfo,
            },
            option: "update",
          })
        }
      >
        <View style={styles.BottomButton}></View>
      </Pressable>
      {/* ) : (
        ""
      )} */}
    </View>
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
