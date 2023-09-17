import React, { useState, useEffect, useContext } from "react";
import {
  useWindowDimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  Pressable,
  Keyboard,
  TextInput,
  Alert,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Interceptor from "../utill/Interceptor";
import { URL } from "../utill/config";
import { AuthContext } from "../store/auth-context";
import Search from "../assets/search.svg";
import { GlobalStyles } from "./../constants/styles";
import FilterBox from "../components/ui/FilterBox";
import TutorBox from "../components/ui/TutorBox";
import ButtonBig from "../components/ui/ButtonBig";
import LectureBox from "../components/ui/LectureBox";
import BottomModal from "../components/ui/BottomModal";

import { getProfile, logout, pushNotification } from "../utill/http";
import { KRRegular } from "../constants/fonts";
import FilterModal from "../components/ui/FilterModal";

// import messaging from "@react-native-firebase/messaging";

function ManagerScreen() {
  // async function getToken() {
  //   try {
  //     const token = await messaging().getToken();
  //     // await AsyncStorage.setItem("fcmToken", token);
  //     setBody(token);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const [userData, setUserData] = useState([]);
  // const [filterUser, setFilterUser] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const authCtx = useContext(AuthContext);
  // const { lectures } = useLectures();
  // const [lecturesData, setLectureData] = useState([]);
  const instance = Interceptor();

  useEffect(() => {
    instance
      .get(`${URL}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        let tmp = [];
        const data = res.data.data;

        // Map each user to a Promise
        const promises = data.map((user) =>
          instance
            .get(`${URL}/users-lectures/users/${user.id}`, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              user.lectures = [];

              if (res.data.data !== []) {
                let lectures = res.data.data
                  .filter((item) => item.tutorStatus === "ASSIGNED")
                  .reverse();

                for (let j = 0; j < lectures.length; j++) {
                  const lecture = lectures[j];

                  user.lectures.push({
                    subTitle: lecture.subTitle,
                    tutorRole: lecture.tutorRole,
                  });
                }
              }

              tmp.push(user);
            })
            .catch((error) => {
              console.log("에러");
              console.log(error);
            })
        );

        // Wait for all Promises to resolve
        await Promise.all(promises);

        setUserData(tmp); // 유저 데이터
        // setFilterUser(tmp);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });

    // getToken();
  }, []);

  // useEffect(() => {
  //   getToken();
  // }, []);

  const addAlarm = async () => {
    try {
      const response = await pushNotification({
        title: title,
        body: body,
      });
      // setBody(JSON.stringify(response));
      if (response.success) {
        Alert.alert("알림 전송 성공", `제목 : ${title}\n내용 : ${body}`);
        // setBody("");
        // setTitle("");
      }
    } catch (error) {
      Alert.alert("알림 전송 실패", `제목 : ${title}\n내용 : ${body}`);
      console.log(error);
      if (error.response) {
        // 서버가 응답을 반환한 경우
        console.log("Error response:", error.response.data);
      } else if (error.request) {
        // 요청이 만들어졌지만, 응답을 받지 못한 경우
        console.log("Error request:", error.request);
      } else {
        // 그 외의 에러
        console.log("Error", error.message);
      }
    }
  };

  async function detailTutor(id) {
    try {
      const response = await getProfile({
        id: id,
      });
      if (response.success) {
        navigation.navigate("tutorScreen", { id: response.data, headerId: id });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addAlarmHandler() {
    Alert.alert("알림을 발송 하시겠습니까 ?", undefined, [
      {
        text: "취소",
      },
      { text: "확인", onPress: addAlarm },
    ]);
  }

  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "강사 목록" },
    // { key: "second", title: "강의 목록" },
    { key: "third", title: "알림 발송" },
  ]);

  async function logoutApi() {
    try {
      const response = await logout();
      if (response.status === 200) {
        authCtx.logout();
      }
    } catch (error) {
      authCtx.logout();
      console.log(error);
      console.log("에러났쪄염");
    }
  }
  function logoutHandler() {
    Alert.alert("'DORO EDU'", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
      },
      { text: "확인", onPress: logoutApi },
    ]);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={logoutHandler}>
            <Text
              style={[
                // KRRegular.Body,
                {
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 17,
                  fontWeight: "400",
                },
              ]}
            >
              로그아웃
            </Text>
          </Pressable>
        );
      },
      title: "매니저 페이지",
    });
  }, [logoutHandler]);

  const [num, setNum] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [numLength, setNumLength] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [gfilter, setGFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [filter, setFilter] = useState(false);
  const [onFilter, setOnFilter] = useState(false);

  const [filterData, setFilterData] = useState();

  const filterByGeneration = (userData, generations) => {
    const filteredData = userData.filter((item) => {
      return generations.includes(item.generation);
    });

    return filteredData;
  };

  const filteredData = filterByGeneration(userData, gfilter);

  useEffect(() => {
    console.log(gfilter);
    setFilterData(gfilter.length === 0 ? userData : filteredData);
    setOnFilter(gfilter.length !== 0);
  }, [gfilter, userData]);

  const countGeneration = (userData) => {
    const generationCounts = [];

    userData.forEach((item) => {
      const generation = item.generation;

      if (generationCounts[generation]) {
        generationCounts[generation]++;
      } else {
        generationCounts[generation] = 1;
      }
    });

    return generationCounts;
  };

  useEffect(() => {
    const generationCounts = countGeneration(userData);
    const updatedNum = num.map((value, index) => {
      return `${index + 1}기 (${generationCounts[index + 1] || 0})`;
    });
    setNum(updatedNum);
  }, [userData]);

  const namefilterHandler = (text) => {
    setNameFilter(text);
    const filteredNames = userData.filter((item) => item.name.includes(text));
    setFilterData(filteredNames);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
            <FlatList
              data={filterData}
              ListHeaderComponent={
                <View
                  style={{
                    marginTop: 15,
                    marginLeft: 20,
                    marginBottom: 29,
                    flexDirection: "row",
                  }}
                >
                  <Pressable onPress={() => setFilter(true)}>
                    <FilterBox text="기수 선택" on={onFilter} />
                  </Pressable>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 20,
                      marginLeft: 7,
                      flexDirection: "row",
                      backgroundColor: "white",
                      alignItems: "center",
                      borderRadius: 45,
                      paddingLeft: 10,
                    }}
                  >
                    <Search />
                    <TextInput
                      style={{
                        height: 32,
                        width: "100%",
                        flex: 1,
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 5,
                        // backgroundColor: GlobalStyles.colors.gray01,
                      }}
                      placeholderTextColor={GlobalStyles.colors.gray05}
                      placeholder="검색"
                      value={nameFilter}
                      onChangeText={namefilterHandler}
                    />
                  </View>
                </View>
              }
              keyExtractor={(item) => item.id.toString()}
              renderItem={(itemData) => {
                const item = itemData.item;

                return (
                  <Pressable onPress={() => detailTutor(item.id)}>
                    <TutorBox
                      name={item.name}
                      generation={item.generation}
                      school={item.degree.school}
                      major={item.degree.major}
                      lectures={item.lectures}
                    />
                  </Pressable>
                );
              }}
              extraData={userData}
            />

            {/* <Pressable onPress={() => authCtx.logout()}>
              <Text>매니저 로그아웃</Text>
            </Pressable> */}
          </View>
        );

      // case "second":
      //   return (
      //     <ScrollView style={styles.lectureListContainer}>
      //       <View
      //         style={{
      //           flexDirection: "row",
      //           gap: 7,
      //           marginTop: 15,
      //           marginBottom: 5,
      //         }}
      //       >
      //         <FilterBox text="교육 지역" />
      //         <FilterBox text="교육 날짜" />
      //       </View>
      //       {lecturesElements}
      //     </ScrollView>
      //   );

      case "third":
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: "#F5F5F5",
            }}
          >
            <ScrollView>
              <Pressable onPress={() => Keyboard.dismiss()}>
                <View style={styles.titleContainer}>
                  <TextInput
                    placeholder="제목"
                    style={styles.title}
                    placeholderTextColor={GlobalStyles.colors.gray03}
                    multiline
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                  ></TextInput>
                </View>
                <View style={styles.contentContainer}>
                  <TextInput
                    placeholder="내용을 입력하세요."
                    style={styles.content}
                    multiline
                    value={body}
                    onChangeText={(text) => setBody(text)}
                    placeholderTextColor={GlobalStyles.colors.gray03}
                  ></TextInput>
                </View>
              </Pressable>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <ButtonBig text="알림 발송" onPress={addAlarmHandler} />
            </View>
          </View>
        );
      default:
        return <View />;
    }
  };

  return (
    <>
      <View style={{ marginTop: 20 }} />
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
            // labelStyle={{
            //   // 폰트 스타일
            //   margin: 0,
            //   fontSize: 15,
            //   color: "black",
            // }}
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
            tabStyle={{
              flexDirection: "row",
              alignItems: "flex-start",
              padding: 0,
            }}
            pressColor={"transparent"}
          />
        )}
      />

      <FilterModal
        visible={filter}
        inVisible={() => setFilter(false)}
        title="기수 선택"
        data={num}
        status="GENERATION"
        setCity={setGFilter}
      />
    </>
  );
}

export default React.memo(ManagerScreen);

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  content: {
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.8,
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 21,
  },
  lectureListContainer: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  mainTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: "bold",
  },
});
