import {
  useState,
  useEffect,
  useContext,
  ActivityIndicator,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Right from "../assets/rightBlack.svg";
import Megaphone from "../assets/megaphoneBlack.svg";
import { GlobalStyles } from "../constants/styles";

import CreactingLecture from "../assets/creatingLecture.svg";

import LectureBox from "./../components/ui/LectureBox";
import FilterBox from "../components/ui/FilterBox";
import { HeaderContext } from "../store/header-context";
import { KRRegular } from "../constants/fonts";
import Swiper from "react-native-swiper";
import { AuthContext } from "../store/auth-context";
import { getAnnouncement, getCityList, getLectureList } from "../utill/http";
import { errorHandler } from "../utill/etc";
import FilterModal from "../components/ui/FilterModal";

const HomeScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { isLectureUpdate, setIsLectureUpdate } = useContext(HeaderContext);
  const [response, setResponse] = useState([]);

  // 강의 모집 중 : RECRUITING - r
  // 강의 진행 중 : ALLOCATION_COMP - a

  const [rlectureData, setRLectureData] = useState([]);
  const [alectureData, setALectureData] = useState([]);

  const [rCityList, setRCityList] = useState("");
  const [aCityList, setACityList] = useState("");

  const [rCities, setRCities] = useState("");
  const [onRCities, setOnRCities] = useState(false);
  const [onRDate, setOnRDate] = useState(false);
  const [rStartDate, setRStartDate] = useState("");
  const [rEndDate, setREndDate] = useState("");

  const [aCities, setACities] = useState("");
  const [onACities, setOnACities] = useState(false);
  const [onADate, setOnADate] = useState(false);
  const [aStartDate, setAStartDate] = useState("");
  const [aEndDate, setAEndDate] = useState("");

  const [filter, setFilter] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const [rNum, setRNum] = useState(0);
  const [aNum, setANum] = useState(0);

  const [rPageNum, setRPageNum] = useState(0);
  const [aPageNum, setAPageNum] = useState(0);

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
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAnnouncement({ page: 0, size: 3 });
        setResponse(result);
        // console.log(result);
      } catch (error) {
        console.error(error);
        if (error.isRefreshError) {
          // RefreshToken 관련 에러 시 로그아웃
          authCtx.logout();
        }
      }
    }

    fetchData();
  }, []);

  async function getCity(status) {
    try {
      const result = await getCityList({ status: status });

      if (status === "RECRUITING") {
        setRCityList(result);
      }

      if (status === "ALLOCATION_COMP") {
        setACityList(result);
      }

      // const rResult = await getCityList({ status: "RECRUITING" });
      // const aResult = await getCityList({ status: "ALLOCATION_COMP" });
      // setRCityList(rResult);
      // setACityList(aResult);
    } catch (error) {
      errorHandler(error, "강의 도시 조회 오류");
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
    }
  }

  useEffect(() => {
    lectureHandler("RECRUITING");
    lectureHandler("ALLOCATION_COMP");
    getCity("RECRUITING");
    getCity("ALLOCATION_COMP");
  }, []);

  async function lectureHandler(status) {
    const cities = status === "RECRUITING" ? rCities : aCities;
    const endDate = status === "RECRUITING" ? rEndDate : aEndDate;
    const startDate = status === "RECRUITING" ? rStartDate : aStartDate;
    const pageNum = status === "RECRUITING" ? rPageNum : aPageNum;

    try {
      const result = await getLectureList({
        city: cities,
        endDate: endDate,
        startDate: startDate,
        page: pageNum,
        size: 10,
        lectureStatus: status,
      });

      const recruitingData = result.lecturesInfos;

      const data = groupDataByMainTitle(recruitingData);

      if (status === "RECRUITING") {
        if (pageNum === 0) {
          setRLectureData(data);
          setRPageNum(1);
        } else {
          setRLectureData((prev) => [...prev, ...data]);
          setRPageNum(rPageNum + 1);
        }

        if (recruitingData.length !== 0) {
          setRNum(result.totalCount);
        } else if (recruitingData.length === 0 && rPageNum === 0) {
          setRNum(0);
        }
      } else {
        if (pageNum === 0) {
          setALectureData(data);
          setAPageNum(1);
        } else {
          setALectureData((prev) => [...prev, ...data]);
          setAPageNum(rPageNum + 1);
        }

        if (recruitingData.length !== 0) {
          setANum(result.totalCount);
        } else if (recruitingData.length === 0 && aPageNum === 0) {
          setANum(0);
        }
      }
    } catch (error) {
      errorHandler(error, "강의 조회 에러");
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
    }
  }

  async function useFilter(
    filter,
    status,
    selectedCities,
    selectedStartDate,
    selectedEndDate
  ) {
    let cities = "";
    let startDate = "";
    let endDate = "";

    if (status === "RECRUITING") {
      if (filter === "city") {
        cities = selectedCities;
        startDate = rStartDate;
        endDate = rEndDate;
      }
      if (filter === "date") {
        cities = rCities;
        startDate = selectedStartDate;
        endDate = selectedEndDate;
        console.log("date 맞음");
      }
    }
    if (status === "ALLOCATION_COMP") {
      if (filter === "city") {
        cities = selectedCities;
        startDate = aStartDate;
        endDate = aEndDate;
      }
      if (filter === "date") {
        cities = aCities;
        startDate = selectedStartDate;
        endDate = selectedEndDate;
      }
    }

    // console.log(startDate);
    // console.log(endDate);

    try {
      const result = await getLectureList({
        city: cities,
        endDate: endDate,
        startDate: startDate,
        page: 0,
        size: 10,
        lectureStatus: status,
      });

      const recruitingData = result.lecturesInfos;

      const data = groupDataByMainTitle(recruitingData);

      if (status === "RECRUITING") {
        setRLectureData(data);
        setRPageNum(1);

        if (recruitingData.length !== 0) {
          setRNum(result.totalCount);
        } else if (recruitingData.length === 0 && rPageNum === 0) {
          setRNum(0);
        }
      } else {
        setALectureData(data);
        setAPageNum(1);

        if (recruitingData.length !== 0) {
          setANum(result.totalCount);
        } else if (recruitingData.length === 0 && aPageNum === 0) {
          setANum(0);
        }
      }
    } catch (error) {
      errorHandler(error, "강의 조회 에러");
    }
  }

  async function refreshHandler(status) {
    /** 강의 새로고침 */

    try {
      const result = await getLectureList({
        city: "",
        endDate: "",
        startDate: "",
        page: 0,
        size: 10,
        lectureStatus: status,
      });

      const recruitingData = result.lecturesInfos;

      const data = groupDataByMainTitle(recruitingData);

      if (status === "RECRUITING") {
        setRCities("");
        setRStartDate("");
        setREndDate("");
        setRLectureData(data);
        setRPageNum(1);

        if (recruitingData.length !== 0) {
          setRNum(result.totalCount);
        } else if (recruitingData.length === 0 && rPageNum === 0) {
          setRNum(0);
        }
      }
      if (status === "ALLOCATION_COMP") {
        setACities("");
        setAStartDate("");
        setAEndDate("");
        setALectureData(data);
        setAPageNum(1);

        if (recruitingData.length !== 0) {
          setANum(result.totalCount);
        } else if (recruitingData.length === 0 && aPageNum === 0) {
          setANum(0);
        }
      }

      getCity(status);
    } catch (error) {
      errorHandler(error, "강의 새로고침 오류");
    }
  }

  useEffect(() => {
    setRoutes([
      {
        key: "first",
        title: `모집중(${rNum})`,
      },
      {
        key: "second",
        title: `진행중(${aNum})`,
      },
    ]);
  }, [rNum, aNum]);

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "first", title: `모집중(0)` },
    { key: "second", title: `진행중(0)` },
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
              // onEndReached={lectureHandler}
              // 끝부분에 도달했을 때 실행
              onEndReachedThreshold={0.5}
              // 끝부분에서 얼마나 떨어져있을 때 onEndReached을 실행할 건지
              onRefresh={() => {
                // 위로 당겼을 때 실행 - 새로고침
                refreshHandler("RECRUITING");
              }}
              refreshing={false}
              // true인 경우 onRefresh 함수 실행
              ListHeaderComponent={
                // 데이터를 받아와 출력하는 곳 위에 보여줄 곳
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
                      setTitle("날짜");
                      setStatus("recruitingDate");
                      setFilter(true);
                    }}
                  >
                    <FilterBox text="교육 날짜" on={onRDate} />
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
              // onEndReached={lectureHandler2}
              onEndReachedThreshold={0.2}
              onRefresh={() => {
                refreshHandler("ALLOCATION_COMP");
              }}
              refreshing={false}
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
                      setTitle("날짜");
                      setStatus("allocationDate");
                      setFilter2(true);
                    }}
                  >
                    <FilterBox text="교육 날짜" on={onADate} />
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
        data={rCityList}
        status={status}
        selectedCities={rCities}
        setCity={setRCities}
        setStartDate={setRStartDate}
        setEndDate={setREndDate}
        useFilter={useFilter}
      />

      <FilterModal
        visible={filter2}
        inVisible={() => setFilter2(false)}
        title={title}
        data={aCityList}
        status={status}
        selectedCities={aCities}
        setCity={setACities}
        setStartDate={setAStartDate}
        setEndDate={setAEndDate}
        useFilter={useFilter}
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
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 5.41,
  },
});
