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
import { getAnnouncement, getCityList } from "../utill/http";
import Interceptor from "../utill/Interceptor";
import FilterModal from "../components/ui/FilterModal";
const instance = Interceptor();

const HomeScreen = ({ navigation }) => {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const [response, setResponse] = useState([]);

  const [rlectureData, setRLectureData] = useState([]);
  const [alectureData, setALectureData] = useState([]);

  const [cityList, setCityList] = useState("");

  const [rCities, setRCities] = useState("");
  const [onRCities, setOnRCities] = useState(false);
  const [rStartDate, setRStartDate] = useState("");
  const [rEndDate, setREndDate] = useState("");

  const [aCities, setACities] = useState("");
  const [onACities, setOnACities] = useState(false);
  const [aStartDate, setAStartDate] = useState("");
  const [aEndDate, setAEndDate] = useState("");

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
  const [filter, setFilter] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const groupDataByMainTitle = (data) => {
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.mainTitle]) {
        acc[item.mainTitle] = [item];
      } else {
        acc[item.mainTitle].push(item);
      }
      return acc;
    }, {});

    return Object.keys(groupedData).map((key) => ({
      mainTitle: key,
      data: groupedData[key],
    }));
  };

  if (rlectureData === []) {
    // 로딩
    return (
      <ActivityIndicator
        size="large"
        color={GlobalStyles.colors.primaryDefault}
      />
    ); // or any other loading indicator
  }

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

  useEffect(() => {
    async function getCity() {
      try {
        const result = await getCityList();
        setCityList(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

    getCity();
  }, []);

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

  const [pageNum, setPageNum] = useState(0);
  const [pageNum2, setPageNum2] = useState(0);

  useEffect(() => {
    setPageNum(0);
    setRLectureData([]);
    lectureHandler();
    if (rCities !== "") {
      setOnRCities(true);
    } else {
      setOnRCities(false);
    }

    console.log(rCities);
  }, [rCities]);

  useEffect(() => {
    setPageNum2(0);
    setALectureData([]);
    lectureHandler2();
    if (aCities !== "") {
      setOnACities(true);
    } else {
      setOnACities(false);
    }

    console.log(aCities);
  }, [aCities]);

  async function lectureHandler() {
    instance
      .get("/lectures/", {
        params: {
          city: rCities,
          endDate: "",
          startDate: "",
          page: pageNum,
          size: 10,
          lectureStatus: "RECRUITING",
        },
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const recruitingData = res.data.data.lecturesInfos;

        const data = groupDataByMainTitle(recruitingData);
        console.log("불러왔니?");
        setRLectureData((prev) => [...prev, ...data]);

        setPageNum((prev) => prev + 1);
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
          city: aCities,
          endDate: "",
          startDate: "",
          page: pageNum2,
          size: 10,
          lectureStatus: "ALLOCATION_COMP",
        },
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        console.log("여기인가? 여긴 진행중인코드");
        const allocatingData = res.data.data.lecturesInfos;
        console.log(allocatingData);

        const data = groupDataByMainTitle(allocatingData);

        setALectureData((prev) => [...prev, ...data]);
        console.log(data);
        setPageNum2((prev) => prev + 1);
        console.log(pageNum2);
      })
      .catch((error) => {
        console.log("에러 진행중");
        console.log(error);
      });
  }

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

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
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
              data={rlectureData}
              // extraData={[rCities, rlectureData]}
              keyExtractor={(item, index) => index.toString()}
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
                      setTitle("교육 지역");
                      setStatus("RECRUITING");
                      setFilter(true);
                    }}
                  >
                    <FilterBox text="교육 지역" on={onRCities} />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      // onFilter("교육 날짜", "recruitingDate");
                    }}
                  >
                    <FilterBox
                      text="교육 날짜"
                      // on={status === "recruitingDate" ? true : false}
                    />
                  </Pressable>
                </View>
              }
              ListFooterComponent={<View style={{ height: 23 }} />}
              renderItem={({ item, index }) => (
                <View style={{ marginHorizontal: 20 }}>
                  <Text
                    style={[
                      styles.mainTitle,
                      { color: GlobalStyles.indicationColors[index % 4] },
                    ]}
                  >
                    {item.mainTitle}
                  </Text>
                  <FlatList
                    data={item.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <LectureBox
                        key={item.id}
                        colors={GlobalStyles.indicationColors[index % 4]}
                        subTitle={item.subTitle}
                        date={item.lectureDates}
                        time={item.time}
                        id={item.id}
                        dateTypeValue={dateControl(item.enrollEndDate)}
                        mainTutor={item.mainTutor}
                        subTutor={item.subTutor}
                        staff={item.staff}
                        place={item.place}
                        lectureIdHandler={() =>
                          navigation.navigate("DetailLecture", {
                            id: item.id,
                            status: item.status,
                          })
                        }
                      />
                    )}
                  />
                </View>
              )}
            />
          </View>
        );
      case "second":
        return (
          <View style={styles.lectureListContainer}>
            <FlatList
              data={alectureData}
              keyExtractor={(item, index) => index.toString()}
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
                      setTitle("교육 지역");
                      setStatus("ALLOCATION_COMP");
                      setFilter2(true);
                    }}
                  >
                    <FilterBox text="교육 지역" on={onACities} />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      // onFilter("교육 날짜", "recruitingDate");
                    }}
                  >
                    <FilterBox
                      text="교육 날짜"
                      // on={status === "recruitingDate" ? true : false}
                    />
                  </Pressable>
                </View>
              }
              ListFooterComponent={<View style={{ height: 23 }} />}
              renderItem={({ item, index }) => (
                <View style={{ marginHorizontal: 20 }}>
                  <Text
                    style={[
                      styles.mainTitle,
                      { color: GlobalStyles.indicationColors[index % 4] },
                    ]}
                  >
                    {item.mainTitle}
                  </Text>
                  <FlatList
                    data={item.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <LectureBox
                        key={item.id}
                        colors={GlobalStyles.indicationColors[index % 4]}
                        subTitle={item.subTitle}
                        date={item.lectureDates}
                        time={item.time}
                        id={item.id}
                        dateTypeValue={dateControl(item.enrollEndDate)}
                        mainTutor={item.mainTutor}
                        subTutor={item.subTutor}
                        staff={item.staff}
                        place={item.place}
                        lectureIdHandler={() =>
                          navigation.navigate("DetailLecture", {
                            id: item.id,
                            status: item.status,
                          })
                        }
                      />
                    )}
                  />
                </View>
              )}
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

      {/* visible은 모달 여부
  inVisible은 ()=>isVisible(false) 같은것
  title은 모달 제목
  data는 모달안의 요소들 status는 날짜면 date형식 넘겨주기 
  status는 지역인지 날짜인지
  onPress는 고른 아이템 넣어주는 함수 같음 

*/}
      <FilterModal
        visible={filter}
        inVisible={() => setFilter(false)}
        title={title}
        data={status === "RECRUITING" ? cityList : cityList}
        status={status}
        setCity={status === "RECRUITING" ? setRCities : setACities}
      />

      <FilterModal
        visible={filter2}
        inVisible={() => setFilter2(false)}
        title={title}
        data={cityList}
        status={status}
        setCity={setACities}
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
    backgroundColor: GlobalStyles.colors.gray07,
    flex: 1,
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
    marginTop: 10,
    marginBottom: 5,
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
