import {
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Pressable,
  Image,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { HeaderContext } from "../store/header-context";
import { getAnnouncement } from "../utill/http";
import moment from "moment";

import Add from "../assets/addNotice.svg";
import Home from "../assets/home.svg";

function NoticeScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { isNoticeUpdate, setIsNoticeUpdate } = useContext(HeaderContext);
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    notiHandler();
  }, []);

  useEffect(() => {
    refreshHandler();
  }, [isNoticeUpdate]);

  async function refreshHandler() {
    try {
      const response = await getAnnouncement({ page: 0, size: 10 });
      if (response) {
        setData(response);
        setPageNum(1);
        console.log("공지사항 전체 출력");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // let pageNum = 0;
  async function notiHandler() {
    try {
      const response = await getAnnouncement({ page: pageNum, size: 10 });
      if (response) {
        if (pageNum !== 0) {
          setData((prev) => [...prev, ...response]);
          setPageNum((prev) => prev + 1);
        } else {
          setData(response);
          setPageNum(1);
        }
        // pageNum++;

        console.log(pageNum);
        console.log("공지사항 전체 출력");
        console.log(response);
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={() => navigation.navigate("Home")}>
            <View>
              <Home width={24} height={24} />
            </View>
          </Pressable>
        );
      },
    });
  }, []);

  const navigHandler = (item) => {
    setSelectedId(item.id);
    navigation.navigate("noticeDetail", {
      data: item,
    });
    console.log(selectedId + "선택");
  };
  function naviAddHandler() {
    navigation.navigate("noticeAdd");
  }

  const [selectedId, setSelectedId] = useState();

  const Item = ({ item }) => (
    <View style={styles.content}>
      <Pressable onPress={() => navigHandler(item)}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.subContent}>
          <Text style={styles.name}>{item.writer} 매니저</Text>
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
        extraData={selectedId}
        keyExtractor={(item) => item.id}
        onEndReached={notiHandler}
        onEndReachedThreshold={0.5}
        onRefresh={() => {
          refreshHandler();
        }}
        refreshing={false}
      />
      {headerRole === "ROLE_ADMIN" ? (
        <View style={styles.plusBtnContainer}>
          <Pressable onPress={naviAddHandler}>
            <View style={styles.plusBtn}>
              <Add width={24} height={24} />
            </View>
          </Pressable>
        </View>
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
    fontWeight: "400",
    lineHeight: 20,
    color: GlobalStyles.colors.gray01,
  },
  name: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 17,
    color: GlobalStyles.colors.gray03,
  },
  plusBtnContainer: {
    position: "absolute",
    right: 10,
    bottom: 17,
  },
  plusBtn: {
    backgroundColor: GlobalStyles.colors.primaryDefault,
    borderRadius: 100,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
