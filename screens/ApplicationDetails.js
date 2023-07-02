import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useState, useContext } from "react";

import { GlobalStyles } from "../constants/styles";
import LectureBox from "../components/ui/LectureBox";
import axios from "axios";
import { URL } from "../utill/config";


function ApplicationDetails({ route, header }) {
  console.log(route);
  const { headerId, setHeaderId } = useContext(HeaderContext);

  const [userLecture, setUserLecture] = useState([]);
  const [finishedLecture, setFinishedLecture] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}users-lectures/users/${headerId}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUserLecture(res.data.data);
        finishLectureHandler(res.data.data);
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
    { key: "first", title: `0\n\n신청중` },
    { key: "second", title: `0\n\n배정 완료` },
    { key: "third", title: `0\n\n강의 완료` },
  ]);

  useEffect(() => {
    setRoutes([
      { key: "first", title: `${userLecture.length}\n\n신청중` },
      { key: "second", title: `02\n\n배정 완료` },
      { key: "third", title: `${finishedLecture.length}\n\n강의 완료` },
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
            data={userLecture}
            renderItem={(data) => {
              let dateTypeValue = dateControl(
                data.item.lectureDate.enrollEndDate
              );
              return (
                <LectureBox
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
            data={userLecture}
            renderItem={(data) => {
              let dateTypeValue = dateControl(
                data.item.lectureDate.enrollEndDate
              );
              return (
                <LectureBox
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
                <LectureBox
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
      {header === true ? (
        <View style={{ backgroundColor: "white", alignItems: "center" }}>
          <Text>강의신청내역</Text>
        </View>
      ) : (
        ""
      )}
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
    </>
  );
}

export default ApplicationDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
