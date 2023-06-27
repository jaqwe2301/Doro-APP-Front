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
import { WithLocalSvg } from "react-native-svg";
import CreactingLecture from "../assets/creatingLecture.svg";
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
        console.log(res.data.data.lectureDto);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
    // console.log(route.params.data);

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
        // console.log(res.data.data);
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

  const day = ["일", "월", "화", "수", "목", "금", "토"];

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "기본정보" },
    { key: "second", title: "강의 관련 정보" },
    { key: "third", title: "신청 강사" },
  ]);

  // Use a custom renderScene function instead
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={{ marginTop: 40, flex: 1 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
              >
                기본정보
              </Text>
              <View style={styles.infoContatiner}>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>주최 및 주관</Text>
                  <Text style={styles.infoText}>
                    {lectureBasicInfo.institution}
                  </Text>
                </View>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>일자</Text>
                  {lectureBasicInfo.lectureDates.map((item) => {
                    const date = new Date(item);
                    const month =
                      date.getMonth() >= 9
                        ? date.getMonth() + 1
                        : "0" + (date.getMonth() + 1);

                    return (
                      <Text key={item} style={styles.infoText}>
                        {date.getFullYear()}.{month}.{date.getDate()} (
                        {day[date.getDay()]})
                      </Text>
                    );
                  })}
                </View>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>시간</Text>
                  <Text style={styles.infoText}>{lectureBasicInfo.time}</Text>
                </View>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>지역</Text>
                  <Text style={styles.infoText}>{lectureBasicInfo.city}</Text>
                </View>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>장소</Text>
                  <Text style={styles.infoText}>{lectureBasicInfo.place}</Text>
                </View>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>강의 대상</Text>
                  <Text style={styles.infoText}>
                    {lectureBasicInfo.studentGrade}
                  </Text>
                </View>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>인원수</Text>
                  <Text style={styles.infoText}>
                    {lectureBasicInfo.studentNumber}명
                  </Text>
                </View>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>모집 인원</Text>
                  <Text style={styles.infoText}>
                    {lectureBasicInfo.mainTutor}
                  </Text>
                </View>
                <View style={styles.infoTextContatiner}>
                  <Text style={styles.infoTitle}>강사 급여</Text>
                  <View>
                    <Text style={styles.infoText}>
                      주 강사 : {lectureBasicInfo.mainPayment}원
                    </Text>
                    {lectureBasicInfo.subPayment ? (
                      <Text style={styles.infoText}>
                        보조 강사 : {lectureBasicInfo.subPayment}원
                      </Text>
                    ) : (
                      ""
                    )}
                    {lectureBasicInfo.staffPayment ? (
                      <Text style={styles.infoText}>
                        스태프 : {lectureBasicInfo.staffPayment}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 0.5,
                width: layout.width,
                backgroundColor: GlobalStyles.colors.gray04,
                marginBottom: 9,
              }}
            />
          </View>
        );
      case "second":
        return <View style={{ flex: 1 }}></View>;
      case "third":
        return (
          <View style={{ flex: 1 }}>
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
    // <View style={{ flex: 1 }}>
    // <ScrollView
    //   style={{ backgroundColor: "white", flex: 1 }}
    //   contentContainerStyle={{ flexGrow: 1 }}
    // >
    <>
      <LectureTop
        subTitle={lectureBasicInfo.subTitle}
        mainPayment={lectureBasicInfo.mainPayment}
        subPayment={lectureBasicInfo.subPayment}
        staffPayment={lectureBasicInfo.staffPayment}
        city={lectureBasicInfo.city}
        date={lectureBasicInfo.lectureDates}
        time={lectureBasicInfo.time}
      />

      <TabView
        style={{ marginTop: 50, flex: 1 }}
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
              height: 30,
              borderBottomWidth: 0.5,
              borderBottomColor: GlobalStyles.colors.gray04,
            }}
            labelStyle={{
              // 폰트 스타일
              margin: 0,
              color: "black",
            }}
            tabStyle={{
              flexDirection: "row",
              alignItems: "flex-start",
              padding: 0,
            }}
            pressColor={"transparent"}
          />
        )}
      />

      {/* <View style={styles.buttonContainer}>
        튜터 역할 [MAIN_TUTOR, SUB_TUTOR, STAFF]
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
      </View> */}

      {/* {data.role === "ROLE_ADMIN" ? (
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
        <View style={styles.BottomButton}>
        <WithLocalSvg asset={CreactingLecture} />
        </View>
        </Pressable>
        ) : (
          ""
        )} */}
    </>
    // </ScrollView>
    // </View>
  );
}

export default DetailLectureScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginBottom: 14,
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  BottomButton: {
    position: "relative",
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    bottom: 27,
    right: 20,
  },
  infoContatiner: {
    gap: 18,
    marginBottom: 56,
    // paddingBottom: 56,
    // borderBottomColor: GlobalStyles.colors.gray04,
    // borderBottomWidth: 0.5,
  },
  infoTextContatiner: {
    flexDirection: "row",
  },
  infoTitle: {
    width: 114,
    fontSize: 15,
    color: GlobalStyles.colors.gray03,
  },
  infoText: {
    fontSize: 15,
  },
});
