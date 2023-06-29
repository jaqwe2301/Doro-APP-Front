import React, { useState, useEffect } from "react";
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

import { GlobalStyles } from "./../constants/styles";
import FilterBox from "../components/ui/FilterBox";
import TutorBox from "../components/ui/TutorBox";
import ButtonBig from "../components/ui/ButtonBig";

function ManagerScreen() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios
      // .get("http://10.0.2.2:8080/users", {
      .get("https://api.doroapp.com/users", {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
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
                data={users}
                renderItem={(itemData) => {
                  const item = itemData.item;
                  console.log(item);
                  return (
                    <TutorBox
                      name={item.name}
                      generation={item.generation}
                      school={item.degree.school}
                      major={item.degree.major}
                    />
                  );
                }}
              />
            </View>
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
