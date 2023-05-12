import {
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { HeaderContext } from "../store/header-context";

function NoticeScreen({ navigation }) {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const DATA = [
    {
      id: "1",
      title: "용인쌤과 함께하는 폰카메라 보정 마스터 워크숍 안내",
      name: "김동규",
      date: "2023-04-02",
    },
    {
      id: "2",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      date: "2023-04-05",
    },
    {
      id: "3",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      content:
        "목적이란 어떤 것을 하는 목표를 의미한다. 어떤 국어사전에서는 목적에 대하여 다음과 같이 정의하고 있다. 일을 이루려고 하는 목표나 나아가는 방향 목적은 철학적으로도 '살아가는 목적' 등 따위로 넓게 연구되고 있다.\n이 정의들만 봐도 감이 오시죠? 목적은 실현하려는 일 또는 상태, 목표는 어떤 목적을 실현하기 위한 정량적 지표를 뜻합니다.",
      date: "2023-04-05",
    },
    {
      id: "4",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      date: "2023-04-05",
    },
    {
      id: "5",
      title: "용인쌤과 함께하는 폰카메라 보정 마스터 워크숍 안내",
      name: "김동규",
      date: "2023-04-02",
    },
    {
      id: "6",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      date: "2023-04-05",
    },
    {
      id: "7",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      date: "2023-04-05",
    },
    {
      id: "8",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      date: "2023-04-05",
    },
    {
      id: "9",
      title: "용인쌤과 함께하는 폰카메라 보정 마스터 워크숍 안내",
      name: "김동규",
      date: "2023-04-02",
    },
    {
      id: "10",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      date: "2023-04-05",
    },
    {
      id: "11",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      date: "2023-04-05",
    },
    {
      id: "12",
      title: "강사 배정에 관한 규정 변경에 대한 안내",
      name: "김동규",
      date: "2023-04-05",
    },
  ];

  function navigHandler() {
    navigation.navigate("noticeDetail", { data: DATA });
  }
  function naviAddHandler() {
    navigation.navigate("noticeAdd");
  }

  const Item = ({ title, name, date }) => (
    <View style={styles.content}>
      <Pressable onPress={navigHandler}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.subContent}>
          <Text style={styles.name}>{name} 매니저</Text>
          <Text style={styles.name}>{date}</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar} />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item title={item.title} name={item.name} date={item.date} />
        )}
        keyExtractor={(item) => item.id}
      />
      {headerRole === "ROLE_ADMIN" ? (
        <Pressable onPress={naviAddHandler}>
          <View style={styles.plusBtn}>
            <Image source={require("../assets/plus.png")} />
          </View>
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
}

export default NoticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 16,
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.5,
  },
  headerBar: {
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.8,
  },
  subContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
    color: GlobalStyles.colors.gray01,
  },
  name: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    color: GlobalStyles.colors.gray03,
  },
  plusBtn: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    bottom: 16,
  },
});
