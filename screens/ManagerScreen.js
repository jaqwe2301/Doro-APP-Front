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
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { URL } from "../utill/config";
import { AuthContext } from "../store/auth-context";

import { GlobalStyles } from "./../constants/styles";
import FilterBox from "../components/ui/FilterBox";
import TutorBox from "../components/ui/TutorBox";
import ButtonBig from "../components/ui/ButtonBig";

function ManagerScreen() {
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios
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
          axios
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

  function addAlarm() {}

  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "강사 목록" },
    { key: "second", title: "강의 목록" },
    { key: "third", title: "알림 발송" },
  ]);

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
                  // console.log(item.lectures[0].subTitle);
                  return (
                    <TutorBox
                      name={item.name}
                      generation={item.generation}
                      school={item.degree.school}
                      major={item.degree.major}
                      lectures={item.lectures}
                    />
                  );
                }}
                extraData={userData}
              />
            </View>
            <Pressable onPress={() => authCtx.logout()}>
              <Text>매니저 로그아웃</Text>
            </Pressable>
          </View>
        );

      case "second":
        return <View></View>;

      case "third":
        return (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
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
              <ButtonBig text="알림 발송" onPress={addAlarm} />
            </View>
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
});
