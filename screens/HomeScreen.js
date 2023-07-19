import { useState, useEffect, useContext, ActivityIndicator } from "react";
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
  FlatList,
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
// import { useLectures } from "../store/LecturesProvider";
import Swiper from "react-native-swiper";
import { getAnnouncement } from "../utill/http";
import Interceptor from "../utill/Interceptor";
const instance = Interceptor();

const HomeScreen = ({ lectureIdProps, navigation }) => {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const [response, setResponse] = useState([]);

  const [rlectureData, setRLectureData] = useState([]);
  const [alectureData, setALectureData] = useState([]);
  const [recruitingTitles, setRecruitingTitles] = useState([]);
  const [allocationTitles, setAllocationTitles] = useState([]);
  const [lectureData, setLectureData] = useState([
    {
      lectureDates: [],
    },
  ]);

  const [lectureData2, setLectureData2] = useState([
    {
      lectureDates: [],
    },
  ]);
  // const { lectures } = useLectures(null);

  // if (lectureData.lectureDates === []) {
  //   // 로딩
  //   return (
  //     <ActivityIndicator
  //       size="large"
  //       color={GlobalStyles.colors.primaryDefault}
  //     />
  //   ); // or any other loading indicator
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAnnouncement({ page: 0, size: 3 });
        setResponse(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     axios
  //       .get(URL + "/lectures/", {
  //         params: {
  //           city: "",
  //           endDate: "",
  //           startDate: "",
  //           page: 0,
  //           size: 5,
  //         },
  //         headers: {
  //           // 헤더에 필요한 데이터를 여기에 추가
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         // console.log(res.data.data);
  //         console.log("여기인가?");
  //         setLectureData(res.data.data);
  //       })
  //       .catch((error) => {
  //         console.log("에러");
  //         console.log(error);
  //       });
  //   });
  //   return unsubscribe;
  //   // Clean up the event listener on component unmount
  // }, [navigation]); // navigation을 종속성 배열에 추가합니다

  // useEffect(() => {
  //   lectureHandler();
  //   // lectureHandler2();
  // }, []);

  const [pageNum, setPageNum] = useState(0);
  const [pageNum2, setPageNum2] = useState(0);

  async function lectureHandler() {
    instance
      .get("/lectures/", {
        params: {
          city: "",
          endDate: "",
          startDate: "",
          page: pageNum,
          size: 10,
        },
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        console.log("여기인가? 여긴 모집중인코드");
        const recruitingData = res.data.data.filter(
          (item) => item.status === "RECRUITING"
        );
        setRLectureData((prev) => {
          const uniqueTitlesSet = new Set([
            ...prev.map((item) => item.mainTitle),
          ]);
          const newRecruitingData = recruitingData.filter(
            (item) => !uniqueTitlesSet.has(item.mainTitle)
          );

          // Update recruitingTitles state with new unique titles
          setRecruitingTitles((prevTitles) => [
            ...prevTitles,
            ...newRecruitingData.map((item) => item.mainTitle),
          ]);

          return [...prev, ...newRecruitingData];
        });

        console.log(recruitingData + "모집중ㄱ");
        setPageNum((prev) => prev + 1);
        console.log(pageNum);
      })
      .catch((error) => {
        console.log("에러 모집중");
        console.log(error);
      });
  }
  async function lectureHandler2() {
    instance
      .get("/lectures/", {
        params: {
          city: "",
          endDate: "",
          startDate: "",
          page: pageNum2,
          size: 10,
        },
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        console.log("여기인가? 여긴 모집중인코드");
        const allocationgData = res.data.data.filter(
          (item) => item.status === "ALLOCATION_COMP"
        );
        setALectureData((prev) => {
          const uniqueTitlesSet = new Set([
            ...prev.map((item) => item.mainTitle),
          ]);
          const newAllocationData = allocationgData.filter(
            (item) => !uniqueTitlesSet.has(item.mainTitle)
          );

          // Update recruitingTitles state with new unique titles
          setAllocationTitles((prevTitles) => [
            ...prevTitles,
            ...newAllocationData.map((item) => item.mainTitle),
          ]);

          return [...prev, ...newAllocationData];
        });

        console.log(allocationgData + "모집중ㄱ");
        setPageNum2((prev) => prev + 1);
        console.log(pageNum);
      })
      .catch((error) => {
        console.log("에러 진행중");
        console.log(error);
      });
  }

  // useEffect(() => {
  //   setRecruitingCity(recruitingCityList);
  // }, [lectureData]);

  // useEffect(() => {
  //   setAllocationCity(allocationCityList);
  // }, [lectureData2]);

  const [filterDate, setFilterDate] = useState([
    [
      new Date(new Date().setMonth(new Date().getMonth() - 6)),
      new Date(new Date().setMonth(new Date().getMonth() + 6)),
    ],
    [
      new Date(new Date().setMonth(new Date().getMonth() - 6)),
      new Date(new Date().setMonth(new Date().getMonth() + 6)),
    ],
  ]);

  // const recruitingCityList = lectureData
  //   .filter((item) => item.status === "RECRUITING")
  //   .map((item) => {
  //     return item.city;
  //   });

  // const [recruitingCity, setRecruitingCity] = useState(recruitingCityList);

  // const recruitingData = lectureData.filter((item) => {
  //   const dateCheck = item.lectureDates.every((dateStr) => {
  //     const date = new Date(dateStr);

  //     return date >= filterDate[0][0] && date <= filterDate[0][1];
  //   });
  //   return (
  //     item.status === "RECRUITING" &&
  //     recruitingCity.includes(item.city) &&
  //     dateCheck
  //   );
  // });

  // const recruitingTitle = [
  //   ...new Set(recruitingData.map((item) => item.mainTitle)),
  // ];

  const allocationCityList = lectureData2
    .filter((item) => item.status === "ALLOCATION_COMP")
    .map((item) => {
      return item.city;
    });

  // const [allocationCity, setAllocationCity] = useState(allocationCityList);

  // const allocationDate = lectureData2.filter((item) => {
  //   const dateCheck = item.lectureDates.every((dateStr) => {
  //     const date = new Date(dateStr);
  //     return date >= filterDate[1][0] && date <= filterDate[1][1];
  //   });

  //   return (
  //     item.status === "ALLOCATION_COMP" &&
  //     allocationCity.includes(item.city) &&
  //     dateCheck
  //   );
  // });

  // const allocationTitle = [
  //   ...new Set(allocationDate.map((item) => item.mainTitle)),
  // ];

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  // let recruitingElements = [];

  // for (let i = 0; i < recruitingTitle.length; i++) {
  //   let SelectedColor = GlobalStyles.indicationColors[i % 4];

  //   recruitingElements.push(
  //     <View key={i}>
  //       <Text style={[styles.mainTitle, { color: SelectedColor }]}>
  //         {recruitingTitle[i]}
  //       </Text>

  //       {recruitingData
  //         .filter((item) => item.mainTitle === recruitingTitle[i])
  //         .map((filteringItem, i) => {
  //           let dateTypeValue = dateControl(filteringItem.enrollEndDate);
  //           // console.log(filteringItem.staff);
  //           // console.log(filteringItem.status);
  //           return (
  //             <LectureBox
  //               key={filteringItem.id}
  //               colors={SelectedColor}
  //               subTitle={filteringItem.subTitle}
  //               date={filteringItem.lectureDates}
  //               time={filteringItem.time}
  //               // lectureIdHandler={() => lectureIdHomeScreen(filteringItem.id)}
  //               id={filteringItem.id}
  //               dateTypeValue={dateTypeValue}
  //               mainTutor={filteringItem.mainTutor}
  //               subTutor={filteringItem.subTutor}
  //               staff={filteringItem.staff}
  //               place={filteringItem.place}
  //               lectureIdHandler={() =>
  //                 navigation.navigate("DetailLecture", {
  //                   id: filteringItem.id,
  //                   status: filteringItem.status,
  //                 })
  //               }
  //             />
  //           );
  //         })}
  //       {i === recruitingTitle.length - 1 && <View style={{ height: 20 }} />}
  //     </View>
  //   );
  // }

  // let allocationElements = [];

  // for (let i = 0; i < allocationTitle.length; i++) {
  //   let SelectedColor = GlobalStyles.indicationColors[i % 4];

  //   allocationElements.push(
  //     <View key={i}>
  //       <Text style={[styles.mainTitle, { color: SelectedColor }]}>
  //         {allocationTitle[i]}
  //       </Text>

  //       {allocationDate
  //         .filter((item) => item.mainTitle === allocationTitle[i])
  //         .map((filteringItem, i) => {
  //           let dateTypeValue = dateControl(filteringItem.enrollEndDate);
  //           // console.log(filteringItem.staff);
  //           return (
  //             <LectureBox
  //               key={filteringItem.id}
  //               colors={SelectedColor}
  //               subTitle={filteringItem.subTitle}
  //               date={filteringItem.lectureDates}
  //               time={filteringItem.time}
  //               // lectureIdHandler={() => lectureIdHomeScreen(filteringItem.id)}
  //               id={filteringItem.id}
  //               dateTypeValue={dateTypeValue}
  //               mainTutor={filteringItem.mainTutor}
  //               subTutor={filteringItem.subTutor}
  //               staff={filteringItem.staff}
  //               place={filteringItem.place}
  //               lectureIdHandler={() =>
  //                 navigation.navigate("DetailLecture", {
  //                   id: filteringItem.id,
  //                   status: filteringItem.status,
  //                 })
  //               }
  //               // date={dateText}
  //             />
  //           );
  //         })}
  //     </View>
  //   );
  // }

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

  const applyDateFilter = (date) => {
    status === "recruitingDate"
      ? setFilterDate((prev) => [date, prev[1]])
      : setFilterDate((prev) => [prev[0], date]);
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
          <View style={styles.lectureListContainer}>
            <FlatList
              data={recruitingTitles}
              keyExtractor={(item, index) => `${item}-${index}`}
              onEndReached={lectureHandler}
              onEndReachedThreshold={0.2}
              ListHeaderComponent={
                <View
                  style={{
                    flexDirection: "row",
                    gap: 7,
                    marginTop: 15,
                    marginBottom: 5,
                    marginHorizontal: 20,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      onFilter("교육 지역", "RECRUITING");
                    }}
                  >
                    <FilterBox
                      text="교육 지역"
                      on={status === "RECRUITING" ? true : false}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      onFilter("교육 날짜", "recruitingDate");
                    }}
                  >
                    <FilterBox
                      text="교육 날짜"
                      on={status === "recruitingDate" ? true : false}
                    />
                  </Pressable>
                </View>
              }
              ListFooterComponent={<View style={{ height: 20 }} />}
              renderItem={({ item: title, index }) => {
                const filteredRecruitingData = rlectureData.filter(
                  (item) => item.mainTitle === title
                );
                return (
                  <View key={index} style={{ marginHorizontal: 20 }}>
                    <Text
                      style={[
                        styles.mainTitle,
                        { color: GlobalStyles.indicationColors[index % 4] },
                      ]}
                    >
                      {title}
                    </Text>
                    <FlatList
                      data={filteredRecruitingData}
                      keyExtractor={(item) => item.id}
                      // keyExtractor={(item, index) => `${item}_${index}`}
                      renderItem={({ item: filteringItem }) => (
                        <LectureBox
                          key={filteringItem.id}
                          colors={GlobalStyles.indicationColors[index % 4]}
                          subTitle={filteringItem.subTitle}
                          date={filteringItem.lectureDates}
                          time={filteringItem.time}
                          id={filteringItem.id}
                          dateTypeValue={dateControl(
                            filteringItem.enrollEndDate
                          )}
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
                        />
                      )}
                    />
                  </View>
                );
              }}
            />
          </View>
        );
      case "second":
        return (
          <View style={styles.lectureListContainer}>
            <FlatList
              data={allocationTitles}
              keyExtractor={(item, index) => `${item}-${index}`}
              onEndReached={lectureHandler2}
              onEndReachedThreshold={0.2}
              ListHeaderComponent={
                <View
                  style={{
                    flexDirection: "row",
                    gap: 7,
                    marginTop: 15,
                    marginBottom: 5,
                    marginHorizontal: 20,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      onFilter("교육 지역", "ALLOCATION_COMP");
                    }}
                  >
                    <FilterBox
                      text="교육 지역"
                      on={status === "ALLOCATION_COMP" ? true : false}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      onFilter("교육 날짜", "allocationDate");
                    }}
                  >
                    <FilterBox
                      text="교육 날짜"
                      on={status === "allocationDate" ? true : false}
                    />
                  </Pressable>
                </View>
              }
              ListFooterComponent={<View style={{ height: 20 }} />}
              renderItem={({ item: title, index }) => {
                const filteredAllocationgData = alectureData.filter(
                  (item) => item.mainTitle === title
                );
                let SelectedColor = GlobalStyles.indicationColors[index % 4];

                return (
                  <View key={index} style={{ marginHorizontal: 20 }}>
                    <Text style={[styles.mainTitle, { color: SelectedColor }]}>
                      {title}
                    </Text>
                    <FlatList
                      data={filteredAllocationgData}
                      keyExtractor={(item, index) => `${item}_${index}`}
                      renderItem={({ item: filteringItem }) => (
                        <LectureBox
                          key={filteringItem.id}
                          colors={SelectedColor}
                          subTitle={filteringItem.subTitle}
                          date={filteringItem.lectureDates}
                          time={filteringItem.time}
                          id={filteringItem.id}
                          dateTypeValue={dateControl(
                            filteringItem.enrollEndDate
                          )}
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
                        />
                      )}
                    />
                  </View>
                );
              }}
            />
          </View>
        );

      default:
        return <View />;
    }
  };

  return (
    <>
      <View style={styles.noticeContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Megaphone width={24} height={24} />
          {/* <View> */}
          <Swiper
            autoplay={true}
            autoplayTimeout={3}
            autoplayDirection={true}
            horizontal={false}
            showsPagination={false}
            width={250}
            height={25}
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
                      marginTop: 2,
                      marginLeft: 16,
                      fontStyle: GlobalStyles.gray01,
                      fontSize: 15,
                      fontWeight: "bold",
                      textAlignVertical: "center",
                      lineHeight: 20,
                    }}
                  >
                    {data.title}
                  </Text>
                </Pressable>
              );
            })}
          </Swiper>
          {/* </View> */}
          <Right width={24} height={24} />
        </View>
        {/* <Pressable
          onPress={() => {
            navigation.navigate("Notice");
          }}
          // style={{ flex: 1 }}
        > */}

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
              height: 30,
              borderBottomWidth: 0.5,
              borderBottomColor: GlobalStyles.colors.gray04,
            }}
            tabStyle={{
              flexDirection: "row",
              alignItems: "flex-start",
              padding: 0,
            }}
            pressColor={"transparent"}
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
            : status === "recruitingDate"
            ? filterDate[0]
            : status === "allocationDate"
            ? filterDate[1]
            : allocationCityList
        }
        status={status}
        onPress={
          status === "recruitingDate" || status === "allocationDate"
            ? applyDateFilter
            : applyCityFilter
        }
      />

      {headerRole === "ROLE_ADMIN" ? (
        <Pressable
          onPress={() => navigation.push("UpdateLectureScreen", { data: "" })}
          style={[styles.BottomButtonContainer]}
        >
          <View style={styles.BottomButton}>
            <CreactingLecture width={28} height={28} />
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
    // marginHorizontal: 20,
    backgroundColor: GlobalStyles.colors.gray07,
  },
  BottomButtonContainer: {
    position: "absolute",
    height: 76,
    width: 76,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: GlobalStyles.colors.green,
    bottom: 17,
    right: 10,
  },
  BottomButton: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
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
    // height: 44,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 5.41,
  },
});
