import { useState, useEffect, useContext } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  Alert,
  LayoutChangeEvent,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { getProfile } from "../utill/http";
import { GlobalStyles } from "../constants/styles";
import { WithLocalSvg } from "react-native-svg";
import { URL } from "../utill/config";
import { HeaderContext } from "../store/header-context";
import ApplyingTutorBox from "../components/ui/ApplyingTutorBox";
import ButtonOneThird from "../components/ui/ButtonOneThird";
import FilterBox from "../components/ui/FilterBox";
import LectureTop from "../components/ui/LectureTop";
import CreactingLecture from "../assets/creatingLecture.svg";

function DetailLectureScreen({ route }) {
  const navigation = useNavigation();
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);

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
    // 기본 정보
    axios
      .get(`${URL}/lectures/${route.params.data}`, {
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

    if (headerRole === "ROLE_ADMIN") {
      // 신청 강사 불러오기
      axios
        .get(`${URL}/users-lectures/lectures/${route.params.data}`, {
          headers: {
            // 헤더에 필요한 데이터를 여기에 추가
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log("신청 강사 불러옴");
          setTutor(res.data.data);
        })
        .catch((error) => {
          console.log("에러");
          console.log("신청 강사 못 불러옴");
          console.log(error);
        });
    }
  }, []);

  /** 강의 신청 */
  const applyingTutor = (roles) => {
    const role =
      roles === "MAIN_TUTOR"
        ? "주 강사"
        : roles === "SUB_TUTOR"
        ? "보조강사"
        : "스태프";

    Alert.alert(
      lectureBasicInfo.subTitle,
      `'${role}' 신청하시겠습니까?`,
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "확인",
          onPress: () => {
            console.log("강사 신청 완료");
            axios
              .post(
                `${URL}/users-lectures/lectures/${route.params.data}`,
                {
                  tutorRole: roles,
                  userId: headerId,
                },
                {
                  headers: {
                    // 헤더에 필요한 데이터를 여기에 추가
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                // console.log(res);
                // console.log("성공");
              })
              .catch((error) => {
                console.log("에러");
                console.log(error);
              });

            Alert.alert(
              lectureBasicInfo.subTitle,
              `${role} 신청이 완료되었습니다.`,
              [
                {
                  text: "확인",
                  onPress: () => {
                    // console.log("강사 신청 완료");
                  },
                  style: "destructive",
                },
              ],
              {
                cancelable: true,
                onDismiss: () => {},
              }
            );
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
  const [routes] = useState(
    headerRole === "ROLE_ADMIN"
      ? [
          { key: "first", title: "기본정보" },
          { key: "second", title: "강의 관련 정보" },
          { key: "third", title: "신청 강사" },
        ]
      : [
          { key: "first", title: "기본정보" },
          { key: "second", title: "강의 관련 정보" },
        ]
  );

  const onLayout = (e) => {
    const { layout } = e.nativeEvent; // layout 추출
    // console.log("onLayout", layout); // layout 출력
  };

  /** 강사 배정 */
  const assignment = (roles, role, id, name) => {
    Alert.alert(
      lectureBasicInfo.subTitle,
      `'${role}' 주 강사 ${name} 확정하겠습니까?`,
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "확인",
          onPress: () => {
            console.log("강사 신청 완료");
            axios
              .patch(
                `${URL}/users-lectures/lectures/${route.params.data}`,
                {
                  tutorRole: roles,
                  userId: id,
                },
                {
                  headers: {
                    // 헤더에 필요한 데이터를 여기에 추가
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                // console.log(res);
              })
              .catch((error) => {
                console.log("에러");
                console.log(error);
              });

            Alert.alert(
              lectureBasicInfo.subTitle,
              `${role} '${name}' 확정이 완료되었습니다.`,
              [
                {
                  text: "확인",
                  onPress: () => {
                    // console.log("강사 신청 완료");
                  },
                  style: "destructive",
                },
              ],
              {
                cancelable: true,
                onDismiss: () => {},
              }
            );
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

  // Use a custom renderScene function instead
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={{ marginTop: 40, flex: 1 }} onLayout={onLayout}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
              >
                기본정보
              </Text>
              <View style={styles.infoContainer}>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>주최 및 주관</Text>
                  <Text style={styles.infoText}>
                    {lectureBasicInfo.institution}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>일자</Text>
                  <View>
                    {lectureBasicInfo.lectureDates.map((item, i) => {
                      const date = new Date(item);
                      const month =
                        date.getMonth() >= 9
                          ? date.getMonth() + 1
                          : "0" + (date.getMonth() + 1);
                      const days =
                        date.getDate() > 9
                          ? date.getDate()
                          : "0" + date.getDate();

                      return (
                        <Text key={i} style={styles.infoText}>
                          {date.getFullYear()}.{month}.{days} (
                          {day[date.getDay()]})
                        </Text>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>시간</Text>
                  <Text style={styles.infoText}>{lectureBasicInfo.time}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>지역</Text>
                  <Text style={styles.infoText}>{lectureBasicInfo.city}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>장소</Text>
                  <Text style={styles.infoText}>{lectureBasicInfo.place}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>강의 대상</Text>
                  <Text style={styles.infoText}>
                    {lectureBasicInfo.studentGrade}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>인원수</Text>
                  <Text style={styles.infoText}>
                    {lectureBasicInfo.studentNumber}명
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>모집 인원</Text>
                  <Text style={styles.infoText}>
                    주강사 {lectureBasicInfo.mainTutor}
                    {lectureBasicInfo.subTutor === "0"
                      ? ""
                      : ", 보조강사 " + lectureBasicInfo.subTutor}
                    {lectureBasicInfo.staff === "0"
                      ? ""
                      : ", 스태프 " + lectureBasicInfo.staff}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>강사 급여</Text>
                  <View>
                    <Text style={styles.infoText}>
                      주 강사 : {lectureBasicInfo.mainPayment}원
                    </Text>
                    {lectureBasicInfo.subPayment === "0" ? (
                      ""
                    ) : (
                      <Text style={styles.infoText}>
                        보조 강사 : {lectureBasicInfo.subPayment}원
                      </Text>
                    )}
                    {lectureBasicInfo.staffPayment === "0" ? (
                      ""
                    ) : (
                      <Text style={styles.infoText}>
                        스태프 : {lectureBasicInfo.staffPayment}원
                      </Text>
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
        return (
          <View style={{ marginTop: 40, flex: 1 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
              >
                강의 관련 정보
              </Text>
              <View style={styles.infoContainer}>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>교육 내용</Text>
                  <Text style={styles.infoText}>{lectureContent.content}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>키트</Text>
                  <Text style={styles.infoText}>{lectureContent.kit}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>기본 강의 구성</Text>
                  <Text style={styles.infoText}>{lectureContent.detail}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>기타 특이사항</Text>
                  <Text style={styles.infoText}>{lectureContent.remark}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.infoTitle}>자격 요건</Text>
                  <Text style={styles.infoText}>
                    {lectureContent.requirement}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      case "third":
        return (
          <View style={{ marginTop: 40, flex: 1 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "bold", marginBottom: 32 }}
              >
                신청 강사
              </Text>
              <View
                style={[styles.flexDirectionRow, { gap: 8, marginBottom: 28 }]}
              >
                <FilterBox text="강사 타입" color="black" />
                <FilterBox text="정렬 순서" color="black" />
              </View>
              {tutor.map((item) => {
                // console.log(item)
                const role =
                  item.tutorRole === "MAIN_TUTOR"
                    ? "주강사"
                    : item.tutorRole === "SUB_TUTOR"
                    ? "보조강사"
                    : "스태프";
                return (
                  <ApplyingTutorBox
                    key={item.id}
                    name={item.name}
                    role={role}
                    major={item.major}
                    onPress={() => assignment(item.tutorRole, role)}
                  />
                );
              })}
            </View>
          </View>
        );
    }
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white", flex: 1 }}
        // contentContainerStyle={{ flexGrow: 1 }}
      >
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
          style={{
            marginTop: 50,
            flex: 1,
            height:
              layout["height"] - (headerRole === "ROLE_ADMIN" ? 188 : 174),
          }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              // 밑에 막대기(line) 스타일링
              indicatorStyle={{
                backgroundColor: GlobalStyles.colors.primaryDefault,
                border: "none",
              }}
              style={{
                backgroundColor: "white",
                shadowOffset: { height: 0, width: 0 },
                shadowColor: "transparent",
                height: 34,
                borderBottomWidth: 0.5,
                borderBottomColor: GlobalStyles.colors.gray04,
              }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={
                    focused
                      ? {
                          margin: 0,
                          fontSize: 15,
                          color: "black",
                          fontWeight: "bold",
                        }
                      : { margin: 0, fontSize: 15, color: "black" }
                  }
                >
                  {route.title}
                </Text>
              )}
              tabStyle={{
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 0,
              }}
              pressColor={"transparent"}
            />
          )}
        />
        {headerRole === "ROLE_ADMIN" ? (
          ""
        ) : (
          <View style={styles.buttonContainer}>
            {/* 강사 신청 [MAIN_TUTOR, SUB_TUTOR, STAFF] */}
            {lectureBasicInfo.mainTutor === "0" ? (
              ""
            ) : (
              <ButtonOneThird
                onPress={() => applyingTutor("MAIN_TUTOR")}
                text="주 강사 신청"
              />
            )}
            {lectureBasicInfo.subTutor === "0" ? (
              ""
            ) : (
              <ButtonOneThird
                onPress={() => applyingTutor("SUB_TUTOR")}
                text="보조 강사 신청"
              />
            )}
            {lectureBasicInfo.staff === "0" ? (
              ""
            ) : (
              <ButtonOneThird
                onPress={() => applyingTutor("STAFF")}
                text="스태프 신청"
              />
            )}
          </View>
        )}
      </ScrollView>

      {headerRole === "ROLE_ADMIN" ? (
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
      )}
    </>

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
    position: "absolute",
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    bottom: 27,
    right: 20,
  },
  infoContainer: {
    gap: 18,
    marginBottom: 56,
    // paddingBottom: 56,
    // borderBottomColor: GlobalStyles.colors.gray04,
    // borderBottomWidth: 0.5,
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  infoTitle: {
    width: 130,
    fontSize: 15,
    color: GlobalStyles.colors.gray03,
  },
  infoText: {
    fontSize: 15,
  },
});
