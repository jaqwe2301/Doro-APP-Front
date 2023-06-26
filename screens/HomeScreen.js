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
import { getProfile } from "../utill/http";

const HomeScreen = ({ lectureIdProps }) => {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const [data, setData] = useState([]);
  const [lectureData, setLectureData] = useState([]);
  const navigation = useNavigation();

  // async function profileHandler() {
  //   try {
  //     const response = await getProfile({ id: 18 });
  //     setData(response);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8080/lectures", {
        // .get("https://api.doroapp.com/lectures", {
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
        // console.log(res.data.data);
        // console.log("성공");
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });

    profileHandler();
  }, []);

  const recruitingData = lectureData.filter(
    (item) => item.status === "RECRUITING"
  );

  // const underwayDate = lectureData.filter(
  //   (item) => item.status === "RECRUITING"
  // );

  const allTitleArray = [
    ...new Set(recruitingData.map((item) => item.mainTitle)),
  ];

  let LectureElements = [];

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

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

            // let dateHours =
            //   dateControl(filteringItem.lectureDates[0]).getHours() > 10
            //     ? dateControl(filteringItem.lectureDates[0]).getHours()
            //     : "0" + dateControl(filteringItem.lectureDates[0]).getHours();

            // let dateMinutes =
            //   dateControl(filteringItem.lectureDates[0]).getMinutes().length >
            //   10
            //     ? dateControl(filteringItem.lectureDates[0]).getMinutes()
            //     : "0" + dateControl(filteringItem.lectureDates[0]).getMinutes();

            // let EndTime =
            //   Number(dateHours) + Number(filteringItem.time) >= 10
            //     ? Number(dateHours) + Number(filteringItem.time)
            //     : "0" + (Number(dateHours) + Number(filteringItem.time));

            // let dateText =
            //   // 날짜 텍스트
            //   filteringItem.lectureDates.length > 1
            //     ? // 날짜가 하나 혹은 여러 개에 따라 다르게 주기
            //       `${lectureDateControl(filteringItem.lectureDates)} ${
            //         filteringItem.time
            //       }`
            //     : `${
            //         dateControl(filteringItem.lectureDates[0]).getMonth() + 1
            //       }월 ${dateControl(
            //         filteringItem.lectureDates[0]
            //       ).getDate()}일 (${
            //         days[dateControl(filteringItem.lectureDates[0]).getDay()]
            //       }) ${filteringItem.time}`;

            return (
              <LectureBox
                key={filteringItem.id}
                colors={SelectedColor}
                subTitle={filteringItem.subTitle}
                date={filteringItem.lectureDates}
                time={filteringItem.time}
                // lectureIdHandler={() => lectureIdHomeScreen(filteringItem.id)}
                lectureIdHandler={() =>
                  navigation.navigate("DetailLecture", {
                    data: filteringItem.id,
                  })
                }
                id={filteringItem.id}
                dateTypeValue={dateTypeValue}
                mainTutor={filteringItem.mainTutor}
                place={filteringItem.place}
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
            {LectureElements}
          </ScrollView>
        );
      case "second":
        return (
          <View style={styles.lectureListContainer}>
            <Text>진행중</Text>
          </View>
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
              height: 30,
              borderBottomWidth: 0.5,
              borderBottomColor: GlobalStyles.colors.gray04,
            }}
            labelStyle={{
              // 폰트 스타일
              margin: 0,
              fontSize: 15,
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
