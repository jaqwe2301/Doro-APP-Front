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
  SafeAreaView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Logo from "../assets/Logo_main.svg";
import AlarmAfter from "../assets/alarm_before.svg";
import Right from "../assets/rightBlack.svg";
import Megaphone from "../assets/megaphoneBlack.svg";
import { GlobalStyles } from "../constants/styles";

import CreactingLecture from "../assets/creatingLecture.svg";

import LectureBox from "./../components/ui/LectureBox";
import FilterBox from "../components/ui/FilterBox";
import BottomModal from "../components/ui/BottomModal";
import { HeaderContext } from "../store/header-context";
import { URL } from "../utill/config";
import { KRRegular } from "../constants/fonts";
import { useLectures } from "../store/LecturesProvider";
import Swiper from "react-native-swiper";
import { getAnnouncement } from "../utill/http";

const HomeScreen = ({ lectureIdProps, navigation }) => {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const [response, setResponse] = useState([]);

  const [lectureData, setLectureData] = useState([]);
  const { lectures } = useLectures();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAnnouncement({ page: 0, size: 3 });
        setResponse(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setLectureData(lectures);
    // console.log(lectures);
    setRecruitingCity(recruitingCityList);
    setAllocationCity(allocationCityList);
  }, [lectures]);

  const recruitingCityList = lectures
    .filter((item) => item.status === "RECRUITING")
    .map((item) => {
      return item.city;
    });

  const [recruitingCity, setRecruitingCity] = useState(recruitingCityList);

  const recruitingData = lectureData.filter(
    (item) => item.status === "RECRUITING" && recruitingCity.includes(item.city)
  );
  const recruitingTitle = [
    ...new Set(recruitingData.map((item) => item.mainTitle)),
  ];

  const allocationCityList = lectures
    .filter((item) => item.status === "ALLOCATION_COMP")
    .map((item) => {
      return item.city;
    });

  const [allocationCity, setAllocationCity] = useState(allocationCityList);

  const allocationDate = lectureData.filter(
    (item) =>
      item.status === "ALLOCATION_COMP" && allocationCity.includes(item.city)
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
            // console.log(filteringItem.status);
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
                    id: filteringItem.id,
                    status: filteringItem.status,
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
                    id: filteringItem.id,
                    status: filteringItem.status,
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

  const [filter, setFilter] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState();

  const onFilter = (title, status) => {
    setFilter(true);
    setStatus(status);
    setTitle(title);
  };

  const applyCityFilter = (city) => {
    status === "RECRUITING" ? setRecruitingCity(city) : setAllocationCity(city);
    setFilter(false);
  };

  const applyDateFilter = () => {
    setFilter(false);
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
              <Pressable
                onPress={() => {
                  onFilter("교육 지역", "RECRUITING");
                }}
              >
                <FilterBox text="교육 지역" />
              </Pressable>
              <Pressable
                onPress={() => {
                  onFilter("교육 날짜", "date");
                }}
              >
                <FilterBox text="교육 날짜" />
              </Pressable>
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
              <Pressable
                onPress={() => {
                  onFilter("교육 지역", "ALLOCATION_COMP");
                }}
              >
                <FilterBox text="교육 지역" />
              </Pressable>
              <Pressable
                onPress={() => {
                  onFilter("교육 날짜", "date");
                }}
              >
                <FilterBox text="교육 날짜" />
              </Pressable>
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
      <View style={styles.noticeContainer}>
        <View style={{ flexDirection: "row" }}>
          <Megaphone width={24} height={24} />
          <View>
            <Swiper
              autoplay={true}
              autoplayTimeout={3}
              horizontal={false}
              showsPagination={false}
              width={250}
              // height={2}
            >
              {response.map((data) => {
                return (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("noticeDetail", { data: data })
                    }
                    key={data.id}
                    style={{ justifyContent: "center" }}
                  >
                    <Text
                      key={data.id}
                      style={{
                        marginLeft: 16,
                        fontStyle: GlobalStyles.gray01,
                        fontSize: 15,
                        fontWeight: "bold",
                        textAlignVertical: "center",
                      }}
                    >
                      {data.title}
                    </Text>
                  </Pressable>
                );
              })}
            </Swiper>
          </View>
        </View>
        {/* <Pressable
          onPress={() => {
            navigation.navigate("Notice");
          }}
          // style={{ flex: 1 }}
        > */}
        {/* <View style={{ marginRight: 16 }}> */}
        <Right width={24} height={24} />
        {/* </View> */}
        {/* </Pressable> */}
      </View>

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
            // renderLabel={({ route, focused, color }) => (
            //   <Text
            //     style={
            //       focused
            //         ? {
            //             margin: 0,
            //             fontSize: 15,
            //             color: "black",
            //             fontWeight: "bold",
            //           }
            //         : { margin: 0, fontSize: 15, color: "black" }
            //     }
            //   >
            //     {route.title}
            //   </Text>
            // )}
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
          />
        )}
      />

      <BottomModal
        visible={filter}
        inVisible={() => setFilter(false)}
        title={title}
        data={
          status === "RECRUITING"
            ? recruitingCityList
            : status === "date"
            ? ["", ""]
            : allocationCityList
        }
        status={status}
        onPress={status === "Date" ? applyDateFilter : applyCityFilter}
      />

      {headerRole === "ROLE_ADMIN" ? (
        <View style={styles.BottomButton}>
          <Pressable
            onPress={() => navigation.push("UpdateLectureScreen", { data: "" })}
          >
            <CreactingLecture width={28} height={28} />
          </Pressable>
        </View>
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
    backgroundColor: GlobalStyles.colors.gray07,
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
  noticeContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 54,
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    height: 44,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 5.41,
  },
});
