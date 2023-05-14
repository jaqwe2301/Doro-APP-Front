import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";

import { GlobalStyles } from "../constants/styles";
import LectureBox from "../components/ui/LectureBox";

function ApplicationDetails({ route }) {
  console.log(route);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: `01\n\n신청중` },
    { key: "second", title: `02\n\n배정 완료` },
    { key: "third", title: `03\n\n강의 완료` },
  ]);

  const [test, setTest] = useState([]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <>
            <LectureBox LectureData={test}></LectureBox>
          </>
        );
      case "second":
        return <></>;
      case "third":
        return <></>;

      default:
        return <View />;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{
            backgroundColor: GlobalStyles.colors.primaryDefault,
            border: "none",
          }}
          style={{
            backgroundColor: "white",
            shadowOffset: { height: 0, width: 0 },
            shadowColor: "transparent",
          }}
          labelStyle={{
            // 폰트 컬러
            color: "black",
          }}
          pressColor={"transparent"}
        />
      )}
    />
  );
}

export default ApplicationDetails;
