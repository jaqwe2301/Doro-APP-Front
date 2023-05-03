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
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import axios from "axios";

import { GlobalStyles } from "../constants/styles";
import LectureBox from "./../components/ui/LectureBox";
import Code from "../components/signUp/Code";

const HomeScreen = (props,{ onPressLecture }) => {
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

  let recruitingData = lectureData.filter(
    (item) => item.lectureStatus === null
  );

  const lectureIdHomeScreen = (id) => {
    // 강의 클릭하면 id 값 state로 넘어옴
    props.lectureIdProps(id)
  }

  const FirstRoute = () => <LectureBox LectureData={lectureData} onPresslectureId={lectureIdHomeScreen}></LectureBox>;
  const SecondRoute = () => (
    <View style={styles.lectureListContainer}>
      <Pressable onPress={onPressLecture}>
        <Text>클릭해보세요</Text>
      </Pressable>
    </View>
  );

  let recruitingCount = 11;
  let underwayCount = 20;

  // console.log(recruitingData.length);

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
      { key: "first", title: `모집중 (r)` },
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
    // height: 0,
    // width: 0,
    backgroundColor: "white",
    flexDirection: "row",
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  lectureListContainer: {
    paddingHorizontal: 20,
  },
  colorCover: {
    marginTop: 8,
    // marginBottom: 8,
    paddingLeft: 5,
    overflow: "hidden",
    height: 120,
    // width: 335,
    backgroundColor: "#41C19F",
    borderRadius: 5.41,
    shadowColor: "Black",
    elevation: 2,
  },
  whieBox: {
    paddingLeft: 15,
    paddingRight: 11,
    backgroundColor: "white",
    height: 120,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SubTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: GlobalStyles.gray01,
  },
  enrollEndDate: {
    marginTop: 10,
    color: "#7C7C80",
    fontSize: 10,
  },
  tutor: {
    fontSize: 10,
    color: GlobalStyles.gray03,
  },
  placeDateContainer: {
    marginTop: 7.61,
    alignItems: "flex-end",
  },
  place: {
    color: GlobalStyles.gray03,
    fontSize: 10,
  },
  date: {
    color: "#41C19F",
    fontSize: 12,
  },
});
