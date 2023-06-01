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
import { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../store/header-context";
import { getAnnouncement, getNotification } from "../utill/http";
import moment from "moment";
import { WithLocalSvg } from "react-native-svg";
import Add from "../assets/addNotice.svg";
import Home from "../assets/home.svg";

function NoticeScreen({ navigation }) {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    notiHandler();
  }, []);

  // let pageNum = 0;
  async function notiHandler() {
    try {
      const response = await getAnnouncement({ page: pageNum, size: 10 });
      if (response) {
        setData((prev) => [...prev, ...response]);
        setPageNum((prev) => prev + 1);
        // pageNum++;

        console.log(pageNum);
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={naviAlarmHandler}>
            <View>
              <WithLocalSvg asset={Home} />
            </View>
          </Pressable>
        );
      },
    });
  }, [naviAlarmHandler]);

  function naviAlarmHandler() {
    navigation.navigate("alarm");
  }

  const navigHandler = (item) => {
    navigation.navigate("noticeDetail", { data: item, role: headerRole });
  };
  function naviAddHandler() {
    navigation.navigate("noticeAdd");
  }

  const Item = ({ item }) => (
    <View style={styles.content}>
      <Pressable onPress={() => navigHandler(item)}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.subContent}>
          <Text style={styles.name}>김동규 매니저</Text>
          <Text style={styles.name}>
            {moment(item.createdAt).format("YYYY-MM-DD")}
          </Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar} />
      <FlatList
        data={data}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        onEndReached={notiHandler}
        onEndReachedThreshold={0.5}
      />
      {headerRole === "ROLE_ADMIN" ? (
        <Pressable onPress={naviAddHandler}>
          <View style={styles.plusBtn}>
            {/* <Image source={require("../assets/plus.png")} /> */}
            <WithLocalSvg asset={Add} />
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
    right: 16,
    bottom: 12,
  },
});
