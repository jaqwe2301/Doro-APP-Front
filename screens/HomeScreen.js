import { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Pressable,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { GlobalStyles } from "../constants/styles";
import { WithLocalSvg } from "react-native-svg";
import CreactingLecture from "../assets/creatingLecture.svg";

import LectureBox from "./../components/ui/LectureBox";
import FilterBox from "../components/ui/FilterBox";
import { HeaderContext } from "../store/header-context";
import { URL } from "../utill/config";
import { useLectures } from "../store/LecturesProvider";

const HomeScreen = ({ lectureIdProps }) => {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const [data, setData] = useState([]);
  const [lectureData, setLectureData] = useState([]);
  const navigation = useNavigation();
  const { lectures } = useLectures();

  useEffect(() => {
    setLectureData(lectures);

    // axios
    //   .get(URL + "/lectures/", {
    //     params: {
    //       city: "",
    //       endDate: "",
    //       startDate: "",
    //     },
    //     headers: {
    //       // 헤더에 필요한 데이터를 여기에 추가
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     // setLectureData(res.data.data);
    //     // console.log(res.data.data)
    //     // console.log("성공");
    //   })
    //   .catch((error) => {
    //     console.log("에러");
    //     console.log(error);
    //   });

    // profileHandler();
  }, [lectures]);

  const recruitingData = lectureData.filter(
    (item) => item.status === "RECRUITING"
  );
  const recruitingTitle = [
    ...new Set(recruitingData.map((item) => item.mainTitle)),
  ];

  const allocationDate = lectureData.filter(
    (item) => item.status === "ALLOCATION_COMP"
  );
  const allocationTitle = [
    ...new Set(allocationDate.map((item) => item.mainTitle)),
  ];

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  let recruitingElements = [];

  for (let i = 0; i < recruitingTitle.length; i++) {
    let SelectedColor = GlobalStyles.indicationColors[i % 4];

    recruitingElements.push(
      <View key={i}>
        <Text style={[styles.mainTitle, { color: SelectedColor }]}>
          {recruitingTitle[i]}
        </Text>

        {recruitingData
          .filter((item) => item.mainTitle === recruitingTitle[i])
          .map((filteringItem, i) => {
            let dateTypeValue = dateControl(filteringItem.enrollEndDate);
            // console.log(filteringItem.staff);
            return (
              <LectureBox
                key={filteringItem.id}
                colors={SelectedColor}
                subTitle={filteringItem.subTitle}
                date={filteringItem.lectureDates}
                time={filteringItem.time}
                // lectureIdHandler={() => lectureIdHomeScreen(filteringItem.id)}
                id={filteringItem.id}
                dateTypeValue={dateTypeValue}
                mainTutor={filteringItem.mainTutor}
                subTutor={filteringItem.subTutor}
                staff={filteringItem.staff}
                place={filteringItem.place}
                lectureIdHandler={() =>
                  navigation.navigate("DetailLecture", {
                    data: filteringItem.id,
                  })
                }
                // date={dateText}
              />
            );
          })}
      </View>
    );
  }

  let allocationElements = [];

  for (let i = 0; i < allocationTitle.length; i++) {
    let SelectedColor = GlobalStyles.indicationColors[i % 4];

    allocationElements.push(
      <View key={i}>
        <Text style={[styles.mainTitle, { color: SelectedColor }]}>
          {allocationTitle[i]}
        </Text>

        {allocationDate
          .filter((item) => item.mainTitle === allocationTitle[i])
          .map((filteringItem, i) => {
            let dateTypeValue = dateControl(filteringItem.enrollEndDate);
            // console.log(filteringItem.staff);
            return (
              <LectureBox
                key={filteringItem.id}
                colors={SelectedColor}
                subTitle={filteringItem.subTitle}
                date={filteringItem.lectureDates}
                time={filteringItem.time}
                // lectureIdHandler={() => lectureIdHomeScreen(filteringItem.id)}
                id={filteringItem.id}
                dateTypeValue={dateTypeValue}
                mainTutor={filteringItem.mainTutor}
                subTutor={filteringItem.subTutor}
                staff={filteringItem.staff}
                place={filteringItem.place}
                lectureIdHandler={() =>
                  navigation.navigate("DetailLecture", {
                    data: filteringItem.id,
                  })
                }
                // date={dateText}
              />
            );
          })}
      </View>
    );
  }

  const lectureIdHomeScreen = (id) => {
    // 강의 클릭하면 id 값 state로 넘어옴
    lectureIdProps(id);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: `모집중` },
    { key: "second", title: "진행중" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <ScrollView style={styles.lectureListContainer}>
            <View
              style={{
                flexDirection: "row",
                gap: 7,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <FilterBox text="교육 지역" />
              <FilterBox text="교육 날짜" />
            </View>
            {recruitingElements}
          </ScrollView>
        );
      case "second":
        return (
          <ScrollView style={styles.lectureListContainer}>
            <View
              style={{
                flexDirection: "row",
                gap: 7,
                marginTop: 15,
                marginBottom: 5,
              }}
            >
              <FilterBox text="교육 지역" />
              <FilterBox text="교육 날짜" />
            </View>
            {allocationElements}
          </ScrollView>
        );

      default:
        return <View />;
    }
  };

  return (
    <>
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
              // Style to apply to the container view for the indicator.
              backgroundColor: GlobalStyles.colors.primaryDefault,
              height: 2,
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
            tabStyle={{
              flexDirection: "row",
              alignItems: "flex-start",
              padding: 0,
            }}
            pressColor={"transparent"}
            // 탭바(tap bar) 텍스트 스타일링
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
          />
        )}
      />
      {headerRole === "ROLE_ADMIN" ? (
        <Pressable
          onPress={() =>
            navigation.navigate("UpdateLectureScreen", { data: "" })
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
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    bottom: 27,
    right: 20,
  },
  mainTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: "bold",
  },
  lectureListContainer: {
    paddingHorizontal: 20,
  },
});
