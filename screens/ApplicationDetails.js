import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Alert,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { HeaderContext } from "../store/header-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { URL } from "../utill/config";
import Interceptor from "../utill/Interceptor";

import { GlobalStyles } from "../constants/styles";
import ApplyingLectureBox from "../components/ui/ApplyingLectureBox";
import { KRRegular } from "../constants/fonts";

function ApplicationDetails({ route }) {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const { historyIndex, setHistoryIndex } = useContext(HeaderContext);

  const [userLecture, setUserLecture] = useState([]);
  const [recruiting, setRecruiting] = useState([]);
  const [allocation, setAllocation] = useState([]);
  const [finished, setFinished] = useState([]);

  const instance = Interceptor();

  useEffect(() => {
    setIndex(historyIndex);
  }, [historyIndex]);

  const getMyLectures = () => {
    instance
      .get(`${URL}/users-lectures/users/${headerId}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRecruiting(() => {
          const data = res.data.data.filter(
            (item) => item.status === "RECRUITING"
          );
          return data;
        });
        setAllocation(() => {
          const data = res.data.data.filter(
            (item) => item.status === "ALLOCATION_COMP"
          );
          return data;
        });
        setFinished(() => {
          const data = res.data.data.filter((item) => item.status === "FINISH");
          return data;
        });
      })
      .catch((error) => {
        if (error.isRefreshError) {
          authCtx.logout();
        }
      });
  };

  useEffect(() => {
    getMyLectures();
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "first", title: "신청중(0)" },
    { key: "second", title: "배정 완료(0)" },
    { key: "third", title: "강의 완료(0)" },
  ]);

  useEffect(() => {
    setRoutes([
      {
        key: "first",
        title: `신청중(${
          // recruiting.length < 10 ? "0" + recruiting.length :
          recruiting.length
        })`,
      },
      {
        key: "second",
        title: `배정 완료(${
          // allocation.length < 10 ? "0" + allocation.length :
          allocation.length
        })`,
      },
      {
        key: "third",
        title: `강의 완료(${
          // finished.length < 10 ? "0" + finished.length :
          finished.length
        })`,
      },
    ]);
  }, [recruiting, allocation, finished]);

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  const finishLectureHandler = (data) => {
    let finished = data.filter((item) => {
      for (const value of item.lectureDates) {
        let changedDays = new Date(value);
        changedDays.setDate(changedDays.getDate() + 1);
        // 강의 날짜에서 1일 추가 (3월 9일 -> 3월 10일)
        // 시간 다루지 않기 때문에 이렇게 함
        if (changedDays < new Date()) {
          return true;
        }
      }
    });
    controlfinished(finished);
  };

  const deleteLecture = (id, subTitle, role) => {
    Alert.alert(
      subTitle,
      `${role} 신청을 취소하시겠습니까?`,
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "확인",
          onPress: () => {
            instance
              .delete(`${URL}/users-lectures/lectures/${id}`, {
                headers: {
                  // 헤더에 필요한 데이터를 여기에 추가
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                getMyLectures();
              })
              .catch((error) => {
                if (error.isRefreshError) {
                  authCtx.logout();
                }
              });
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

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <FlatList
            style={styles.container}
            data={recruiting}
            renderItem={(data) => {
              const date = new Date(data.item.lectureDate.enrollEndDate);
              let dateTypeValue = `${date.getMonth() + 1}월 ${
                date.getDate() + 1
              }일`;
              const isLastItem = data.index === recruiting.length - 1;
              const roles = data.item.tutorRole;
              const role =
                roles === "MAIN_TUTOR"
                  ? "주강사"
                  : roles === "SUB_TUTOR"
                  ? "보조강사"
                  : roles === "STAFF"
                  ? "스태프"
                  : "";
              return (
                <View style={isLastItem && { marginBottom: 30 }}>
                  <ApplyingLectureBox
                    colors={GlobalStyles.indicationColors[data.index % 4]}
                    subTitle={data.item.subTitle}
                    date={data.item.lectureDates}
                    time={data.item.time}
                    lectureIdHandler={() =>
                      navigation.navigate("DetailLecture", {
                        id: data.item.lectureId,
                      })
                    }
                    id=""
                    dateTypeValue={dateTypeValue}
                    mainTutor={data.item.mainTutor}
                    place={data.item.place}
                    tutorRole={role + " 신청"}
                    onPressX={() =>
                      deleteLecture(data.item.id, data.item.subTitle, role)
                    }
                  />
                </View>
              );
            }}
          />
        );
      case "second":
        return (
          <FlatList
            style={styles.container}
            data={allocation}
            renderItem={(data) => {
              let dateTypeValue = dateControl(
                data.item.lectureDate.enrollEndDate
              );
              const backgroundColor =
                data.item.tutorStatus === "WAITING"
                  ? GlobalStyles.colors.gray06
                  : "white";
              const isLastItem = data.index === allocation.length - 1;
              return (
                <View style={isLastItem && { marginBottom: 30 }}>
                  <ApplyingLectureBox
                    colors={GlobalStyles.indicationColors[data.index % 4]}
                    subTitle={data.item.subTitle}
                    date={data.item.lectureDates}
                    time={data.item.time}
                    lectureIdHandler={() =>
                      navigation.navigate("DetailLecture", {
                        id: data.item.lectureId,
                      })
                    }
                    id=""
                    mainTutor={data.item.mainTutor}
                    place={data.item.place}
                    backgroundColor={backgroundColor}
                    matchingText={
                      data.item.tutorStatus === "WAITING"
                        ? "매칭 실패"
                        : "매칭 성공"
                    }
                  />
                </View>
              );
            }}
          />
        );
      case "third":
        return (
          <FlatList
            style={styles.container}
            data={finished}
            renderItem={(data) => {
              const backgroundColor =
                data.item.tutorStatus === "WAITING"
                  ? GlobalStyles.colors.gray06
                  : "white";
              const isLastItem = data.index === finished.length - 1;
              const roles = data.item.tutorRole;
              const role =
                roles === "MAIN_TUTOR"
                  ? "주강사"
                  : roles === "SUB_TUTOR"
                  ? "보조강사"
                  : roles === "STAFF"
                  ? "스태프"
                  : "";
              return (
                <View style={isLastItem && { marginBottom: 30 }}>
                  <ApplyingLectureBox
                    colors={GlobalStyles.indicationColors[data.index % 4]}
                    subTitle={data.item.subTitle}
                    date={data.item.lectureDates}
                    time={data.item.time}
                    lectureIdHandler={() => {
                      navigation.navigate("DetailLecture", {
                        id: data.item.lectureId,
                      });
                    }}
                    id=""
                    // dateTypeValue="강의 완료"
                    mainTutor={data.item.mainTutor}
                    place={data.item.place}
                    tutorRole={role + " 신청"}
                    boxColor={GlobalStyles.colors.gray06}
                    matchingText={
                      data.item.tutorStatus === "WAITING"
                        ? "매칭 실패"
                        : "매칭 성공"
                    }
                    backgroundColor={backgroundColor}
                  />
                </View>
              );
            }}
          />
        );

      default:
        return <View />;
    }
  };

  return (
    <>
      <View style={{ backgroundColor: "white", height: 20 }} />
      <TabView
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
              height: 30,
              borderBottomWidth: 0.5,
              borderBottomColor: GlobalStyles.colors.gray04,
            }}
            renderLabel={({ route, focused, color }) => (
              <Text
                style={
                  focused
                    ? [
                        KRRegular.Subheadline,
                        { color: GlobalStyles.colors.gray01 },
                      ]
                    : [
                        KRRegular.Subheadline,
                        { color: GlobalStyles.colors.gray05 },
                      ]
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
    </>
  );
}

export default ApplicationDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    paddingHorizontal: 20,
    backgroundColor: GlobalStyles.colors.gray07,
  },
});
