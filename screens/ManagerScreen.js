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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Interceptor from "../utill/Interceptor";
import { URL } from "../utill/config";
import { AuthContext } from "../store/auth-context";
import { useLectures } from "../store/LecturesProvider";

import { GlobalStyles } from "./../constants/styles";
import FilterBox from "../components/ui/FilterBox";
import TutorBox from "../components/ui/TutorBox";
import ButtonBig from "../components/ui/ButtonBig";
import LectureBox from "../components/ui/LectureBox";

import { getProfile, logout, pushNotification } from "../utill/http";
import { KRRegular } from "../constants/fonts";

function ManagerScreen() {
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const authCtx = useContext(AuthContext);
  const { lectures } = useLectures();
  const [lecturesData, setLectureData] = useState([]);
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

        setUserData(tmp);
        setUsers(data);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  async function addAlarm() {
    try {
      const response = await pushNotification({
        body: body,
        title: title,
      });
      if (response.success) {
        setBody("");
        setTitle("");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    setLectureData(lectures);
  }, [lectures]);

  const lecturesTitle = [
    ...new Set(lecturesData.map((item) => item.mainTitle)),
  ];

  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  let lecturesElements = [];

  for (let i = 0; i < lecturesTitle.length; i++) {
    let SelectedColor = GlobalStyles.indicationColors[i % 4];

    lecturesElements.push(
      <View key={i}>
        <Text style={[styles.mainTitle, { color: SelectedColor }]}>
          {lecturesTitle[i]}
        </Text>

        {lecturesData
          .filter((item) => item.mainTitle === lecturesTitle[i])
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

  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "강사 목록" },
    { key: "second", title: "강의 목록" },
    { key: "third", title: "알림 발송" },
  ]);

  async function logoutApi() {
    try {
      const response = await logout();

      console.log(response);
      if (response.status === 200) {
        authCtx.logout();
      }
    } catch (error) {
      // navigation.navigate("login");

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
                  fontWeight: 400,
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

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
            <View style={{ marginTop: 15, marginLeft: 20 }}>
              <FilterBox text="기수 선택" />
            </View>
            <View
              style={{
                marginTop: 27,
                flex: 1,
              }}
            >
              <FlatList
                data={userData}
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
            </View>
            {/* <Pressable onPress={() => authCtx.logout()}>
              <Text>매니저 로그아웃</Text>
            </Pressable> */}
          </View>
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
            {lecturesElements}
          </ScrollView>
        );

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
