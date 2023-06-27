import React, { useState, useEffect } from "react";
import {
  useWindowDimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { GlobalStyles } from "./../constants/styles";
import FilterBox from "../components/ui/FilterBox";
import TutorBox from "../components/ui/TutorBox";

function ManagerScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8080/users", {
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
          <View>
            <FilterBox text="기수 선택" />
            <FlatList
              data={users}
              renderItem={(itemData) => {
                const item = itemData.item
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
        );

      case "second":
        return <View></View>;

      case "third":
        return <View></View>;
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
