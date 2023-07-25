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
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Pressable,
  Text,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import axios, { Axios } from "axios";
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

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import messaging from "@react-native-firebase/messaging";

async function getToken() {
  const token = await messaging().getToken();
  Alert.alert("디바이스 토큰", token);
}

getToken();

const HomeScreen = ({ lectureIdProps, navigation }) => {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const [response, setResponse] = useState([]);

  const [lectureData, setLectureData] = useState([
    {
      lectureDates: [],
    },
  ]);
  // const { lectures } = useLectures(null);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
      setDevice((await Notifications.getDevicePushTokenAsync()).data);
      // console.log("토큰토큰: " + token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  registerForPushNotificationsAsync();

  const FCM_KEY =
    "AAAAs89zQ-0:APA91bGlbWBNgIet1nCBkBu5_O1A4u32gx6nlWpyLW5iJumxPR5E0s3PPrZFq16cHx8eeCguJchZBIcc7l1WZEQET61C5dVdLTx5dE_8BCqbrgosef5f7AROG8premMKuER1q8k9oHbt";

  const notice = async () => {
    try {
      const pushToken = (await Notifications.getDevicePushTokenAsync()).data;
      const res = await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          to: pushToken,
          data: {
            title: "도로 앱 첫 출시!",
            message: "도로 앱이 출시되었습니다!",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${FCM_KEY}`,
          },
        }
      );
      if (res.data.results[0].error === "MismatchSenderId") {
        Alert.alert("알림 전송 실패", "MismatchSenderId 에러");
      } else if (res.data) {
        setAAA(res.data);
        // Alert.alert("알림 전송 되었나?", res.data.results);
      } else {
        Alert.alert("알림 전송 완료", "완료");
      }
    } catch (err) {
      Alert.alert("알림 전송 실패", "실패");
    }
  };

  const [aaa, setAAA] = useState();

  const noticeExpo = async () => {
    try {
      const pushToken = (await Notifications.getDevicePushTokenAsync()).data;
      const res = await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          to: pushToken,
          data: {
            experienceId: "@si2238/doro",
            scopeKey: "@si2238/doro",
            title: "도로 앱 첫 출시!",
            message: "도로 앱이 출시되었습니다!",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${FCM_KEY}`,
          },
        }
      );
      // console.log(res);
      if (res.data.results[0].error === "MismatchSenderId") {
        Alert.alert("알림 전송 실패", "MismatchSenderId 에러");
      } else if (res.data) {
        setAAA(res.data);
        // Alert.alert("알림 전송 되었나?", res.data.results);
      } else {
        Alert.alert("알림 전송 완료", "완료");
      }
    } catch (err) {
      Alert.alert("알림 전송 실패", "실패");
    }
  };

  if (lectureData.lectureDates === []) {
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
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get(URL + "/lectures/", {
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
          // console.log(res.data.data);
          setLectureData(res.data.data.lecturesInfos);
        })
        .catch((error) => {
          console.log("강의 불러오기 에러");
          console.log(error);
        });
    });
    // Clean up the event listener on component unmount
    return unsubscribe;
  }, [navigation]); // navigation을 종속성 배열에 추가합니다

  useEffect(() => {
    setRecruitingCity(recruitingCityList);
    setAllocationCity(allocationCityList);
  }, [lectureData]);

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

  const recruitingCityList = lectureData
    .filter((item) => item.status === "RECRUITING")
    .map((item) => {
      return item.city;
    });

  const [recruitingCity, setRecruitingCity] = useState(recruitingCityList);

  const recruitingData = lectureData.filter((item) => {
    const dateCheck = item.lectureDates.every((dateStr) => {
      const date = new Date(dateStr);

      return date >= filterDate[0][0] && date <= filterDate[0][1];
    });
    return (
      item.status === "RECRUITING" &&
      recruitingCity.includes(item.city) &&
      dateCheck
    );
  });

  const recruitingTitle = [
    ...new Set(recruitingData.map((item) => item.mainTitle)),
  ];

  const allocationCityList = lectureData
    .filter((item) => item.status === "ALLOCATION_COMP")
    .map((item) => {
      return item.city;
    });

  const [allocationCity, setAllocationCity] = useState(allocationCityList);

  const allocationDate = lectureData.filter((item) => {
    const dateCheck = item.lectureDates.every((dateStr) => {
      const date = new Date(dateStr);
      return date >= filterDate[1][0] && date <= filterDate[1][1];
    });

    return (
      item.status === "ALLOCATION_COMP" &&
      allocationCity.includes(item.city) &&
      dateCheck
    );
  });

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
              />
            );
          })}
        {i === recruitingTitle.length - 1 && <View style={{ height: 20 }} />}
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
            <Pressable onPress={notice}>
              <View style={{ backgroundColor: "red", padding: 10 }}>
                <Text>알림 expo 불포함</Text>
              </View>
            </Pressable>
            <Pressable style={{ marginTop: 20 }} onPress={noticeExpo}>
              <View style={{ backgroundColor: "blue", padding: 10 }}>
                <Text>알림 expo 포함</Text>
              </View>
            </Pressable>
            <Text>{aaa}</Text>
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
    paddingHorizontal: 20,
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
