import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useState } from "react";

import { GlobalStyles } from "../constants/styles";
import LectureBox from "../components/ui/LectureBox";
import axios from "axios";

function ApplicationDetails({ route }) {
  // console.log(route);

  const [userLecture, setUserLecture] = useState([]);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/users-lectures/users/${8}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUserLecture(res.data.data);
        // console.log(res.data.data)
        // console.log("성공");
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: `01\n\n신청중` },
    { key: "second", title: `02\n\n배정 완료` },
    { key: "third", title: `03\n\n강의 완료` },
  ]);

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <FlatList
            style={styles.container}
            data={userLecture}
            renderItem={(data, index) => {
              let dateTypeValue = dateControl(
                data.item.lectureDate.enrollEndDate
              );
              return (
                <LectureBox
                  colors={GlobalStyles.indicationColors[data.index % 4]}
                  subTitle={data.item.subTitle}
                  date={data.item.lectureDates}
                  time={data.item.time}
                  lectureIdHandler={() => console.log()}
                  id=""
                  dateTypeValue={dateTypeValue}
                  mainTutor={data.item.mainTutor}
                  place={data.item.place}
                />
              );
            }}
          >
            {/* {userLecture
              ? userLecture.map((item, i) => {
                  let dateTypeValue = dateControl(item.enrollEndDate);
                  console.log(item);
                  return (
                    <LectureBox
                      colors={GlobalStyles.indicationColors[i % 4]}
                      subTitle={item.subTitle}
                      date={item.lectureDates}
                      time={item.time}
                      lectureIdHandler={() => console.log()}
                      id=""
                      dateTypeValue={dateTypeValue}
                      mainTutor={item.mainTutor}
                      place={item.place}
                    />
                  );
                })
              : ""} */}
          </FlatList>
        );
      case "second":
        return <></>;
      case "third":
        return <></>;

      default:
        return <View />;
    }
  };

  return (
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
  );
}

export default ApplicationDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
