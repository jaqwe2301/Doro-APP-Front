import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useState, useContext } from "react";
import { HeaderContext } from "../store/header-context";
import { URL } from "../utill/config";
import axios from "axios";

import { GlobalStyles } from "../constants/styles";
import ApplyingLectureBox from "../components/ui/ApplyingLectureBox";

function ApplicationDetails({ route }) {
  const { headerId, setHeaderId } = useContext(HeaderContext);

  const [userLecture, setUserLecture] = useState([]);
  const [recruiting, setRecruiting] = useState([]);
  const [allocation, setAllocation] = useState([]);
  const [finishedLecture, setFinishedLecture] = useState([]);

  useEffect(() => {
    console.log(headerId);
    axios
      .get(`${URL}users-lectures/users/${headerId}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data.data);
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
          // console.log(data);
          return data;
        });
        // finishLectureHandler(() => {
        //   const data = res.data.data.filter(
        //     (item) => item.status === "ALLOCATION_COMP"
        //   );
        //   console.log(data);
        //   return data;
        // });
        // console.log("성공");
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  const controlFinishedLecture = (data) => {
    setFinishedLecture(data);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "first", title: `신청중` },
    { key: "second", title: `배정 완료` },
    { key: "third", title: `강의 완료` },
  ]);

  useEffect(() => {
    setRoutes([
      { key: "first", title: `신청중` },
      { key: "second", title: `배정 완료` },
      { key: "third", title: `강의 완료` },
    ]);
  }, [userLecture.length, finishedLecture.length]);

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
    controlFinishedLecture(finished);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <FlatList
            style={styles.container}
            data={recruiting}
            renderItem={(data) => {
              // console.log(data);
              let dateTypeValue = dateControl(
                data.item.lectureDate.enrollEndDate
              );
              return (
                <ApplyingLectureBox
                  colors={GlobalStyles.indicationColors[data.index % 4]}
                  subTitle={data.item.subTitle}
                  date={data.item.lectureDates}
                  time={data.item.time}
                  lectureIdHandler={() => {}}
                  id=""
                  dateTypeValue={dateTypeValue}
                  mainTutor={data.item.mainTutor}
                  place={data.item.place}
                  tutorRole={data.item.tutorRole}
                />
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
              return (
                <ApplyingLectureBox
                  colors={GlobalStyles.indicationColors[data.index % 4]}
                  subTitle={data.item.subTitle}
                  date={data.item.lectureDates}
                  time={data.item.time}
                  lectureIdHandler={() => {}}
                  id=""
                  dateTypeValue={dateTypeValue}
                  mainTutor={data.item.mainTutor}
                  place={data.item.place}
                  tutorRole={data.item.tutorRole}
                />
              );
            }}
          />
        );
      case "third":
        return (
          <FlatList
            style={styles.container}
            data={finishedLecture}
            renderItem={(data) => {
              return (
                <ApplyingLectureBox
                  colors={GlobalStyles.indicationColors[data.index % 4]}
                  subTitle={data.item.subTitle}
                  date={data.item.lectureDates}
                  time={data.item.time}
                  lectureIdHandler={() => {}}
                  id=""
                  dateTypeValue="강의 완료"
                  mainTutor={data.item.mainTutor}
                  place={data.item.place}
                  tutorRole="값을 받아야해요"
                  boxColor={GlobalStyles.colors.gray06}
                />
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
      <View style={{ backgroundColor: "white", height: 30 }} />
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
