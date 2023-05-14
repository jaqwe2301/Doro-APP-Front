import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import axios from "axios";

import { GlobalStyles } from "../constants/styles";
import LectureBox from "./../components/ui/LectureBox";

const HomeScreen = ({ lectureIdProps, createLectureVisibleProps }) => {
  const [lectureData, setLectureData] = useState([]);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8080/lectures", {
        params: {
          city: "",
          endDate: "",
          startDate: "",
        },
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLectureData(res.data.data);
        // console.log("성공");
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  const recruitingData = lectureData.filter(
    (item) => item.status === "RECRUITING"
  );

  const allTitleArray = [
    ...new Set(recruitingData.map((item) => item.mainTitle)),
  ];

  let LectureElements = [];

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  const lectureDateControl = (date) => {
    let result = dateControl(date[0]).getMonth() + 1 + "월 ";
    for (let i = 0; i < date.length; i++) {
      if (i === date.length - 1) {
        result += dateControl(date[i]).getDate() + "일";
      } else {
        result += dateControl(date[i]).getDate() + "일 / ";
      }
    }
    return result;
  };

  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  for (let i = 0; i < allTitleArray.length; i++) {
    let SelectedColor = GlobalStyles.indicationColors[i % 4];

    LectureElements.push(
      <View key={i}>
        <Text style={[styles.mainTitle, { color: SelectedColor }]}>
          {allTitleArray[i]}
        </Text>

        {recruitingData
          .filter((item) => item.mainTitle === allTitleArray[i])
          .map((filteringItem, i) => {
            let dateTypeValue = dateControl(filteringItem.enrollEndDate);

            let dateHours =
              dateControl(filteringItem.lectureDates[0]).getHours() > 10
                ? dateControl(filteringItem.lectureDates[0]).getHours()
                : "0" + dateControl(filteringItem.lectureDates[0]).getHours();

            let dateMinutes =
              dateControl(filteringItem.lectureDates[0]).getMinutes().length >
              10
                ? dateControl(filteringItem.lectureDates[0]).getMinutes()
                : "0" + dateControl(filteringItem.lectureDates[0]).getMinutes();

            let EndTime =
              Number(dateHours) + Number(filteringItem.time) >= 10
                ? Number(dateHours) + Number(filteringItem.time)
                : "0" + (Number(dateHours) + Number(filteringItem.time));

            let dateText =
              // 날짜 텍스트
              filteringItem.lectureDates.length > 1
                ? // 날짜가 하나 혹은 여러 개에 따라 다르게 주기
                  `${lectureDateControl(filteringItem.lectureDates)} ${
                    filteringItem.time
                  }`
                : `${
                    dateControl(filteringItem.lectureDates[0]).getMonth() + 1
                  }월 ${dateControl(
                    filteringItem.lectureDates[0]
                  ).getDate()}일 (${
                    days[dateControl(filteringItem.lectureDates[0]).getDay()]
                  }) ${filteringItem.time}`;

            return (
              <LectureBox
                lectureIdHandler={() => lectureIdHomeScreen(filteringItem.id)}
                id={filteringItem.id}
                colors={SelectedColor}
                subTitle={filteringItem.subTitle}
                dateTypeValue={dateTypeValue}
                mainTutor={filteringItem.mainTutor}
                place={filteringItem.place}
                date={dateText}
              ></LectureBox>
            );
          })}
      </View>
    );
  }

  const lectureIdHomeScreen = (id) => {
    // 강의 클릭하면 id 값 state로 넘어옴
    lectureIdProps(id);
  };

  const FirstRoute = () => (
    <ScrollView style={styles.lectureListContainer}>
      {LectureElements}
    </ScrollView>
  );
  const SecondRoute = () => (
    <View style={styles.lectureListContainer}>
      <Text>진행중</Text>
    </View>
  );

  let underwayCount = 20;

  let fristTapState = {
    index: 0,
    routes: [
      { key: "first", title: `모집중 (${recruitingData.length})` },
      { key: "second", title: `진행중 (${underwayCount})` },
    ],
  };

  const [firstTapUse, setFirstTapUse] = useState(true);

  const [tapState, setTapState] = useState({
    index: 0,
    routes: [
      { key: "first", title: `모집중 (${recruitingData.length})` },
      { key: "second", title: `진행중 (${underwayCount})` },
    ],
  });

  const indexChange = (index) => {
    firstTapUse
      ? setTapState({ ...fristTapState, index })
      : setTapState({ ...tapState, index });
    setFirstTapUse(false);
  };

  _tabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) =>
                inputIndex === i ? 1 : 0.5
              ),
            });

            return (
              <TouchableOpacity
                key={route.key}
                style={styles.tabItem}
                onPress={() => props.jumpTo(route.key)}
              >
                <Animated.Text
                  style={{
                    opacity,
                    borderBottomColor: GlobalStyles.colors.primaryAccent,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontSize: 15,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <>
      <TabView
        navigationState={firstTapUse ? fristTapState : tapState}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        renderTabBar={_tabBar}
        onIndexChange={(index) => indexChange(index)}
        initialLayout={{ width: Dimensions.get("window").width }}
        style={styles.container}
      />
      <Pressable onPress={createLectureVisibleProps}>
        <View style={styles.BottomButton}></View>
      </Pressable>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  lectureListContainer: {
    paddingHorizontal: 20,
  },
  BottomButton: {
    position: "absolute",
    height: 56,
    width: 56,
    backgroundColor: GlobalStyles.colors.primaryDefault,
    bottom: 27,
    right: 20,
  },
  mainTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  lectureListContainer: {
    paddingHorizontal: 20,
  },
});
