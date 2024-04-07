import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect, useState } from "react";
import {
  getAnnouncementId,
  getNotification,
  readNotification,
} from "../utill/http";
import { AuthContext } from "../store/auth-context";
import { HeaderContext } from "../store/header-context";
import Down from "../assets/smalldown.svg";
import Right from "../assets/smallright.svg";
import Up from "../assets/smallup.svg";
function AlarmScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [expandedItems, setExpandedItems] = useState([]);
  const [clickedItems, setClickedItems] = useState([]);
  async function notiHandler() {
    try {
      const response = await getNotification({
        page: pageNum,
        size: 10,
      });
      if (response.success) {
        setData((prev) => [...prev, ...response.data]);
        setPageNum((prev) => prev + 1);
      }
    } catch (error) {
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
    }
  }
  async function refreshHandler() {
    try {
      const response = await getNotification({
        userId: headerId,
        page: 0,
        size: 10,
      });
      if (response.success) {
        setData(response.data);
        setPageNum(1);
      }
    } catch (error) {}
  }

  async function readHandler(notificationId) {
    try {
      const response = await readNotification({
        notificationId: notificationId,
      });
    } catch (error) {
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
    }
  }

  function formatDateTime(timestamp) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    let hour = dateObj.getHours();
    const period = hour >= 12 ? "오후" : "오전";

    // 12시간 형식으로 변환
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }

    const minute = String(dateObj.getMinutes()).padStart(2, "0");
    const formattedTime = `${year}.${month}.${day} ${period} ${hour}:${minute}`;

    return formattedTime;
  }

  async function naviNotice(id) {
    try {
      const response = await getAnnouncementId({
        id: id,
      });
      if (response !== undefined) {
        navigation.navigate("noticeDetail", { data: response });
      } else {
        Alert.alert("삭제된 공지 입니다.");
      }
    } catch (error) {
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
    }
  }

  const Item = ({
    item,
    expandedItems,
    setExpandedItems,
    clickedItems,
    setClickedItems,
  }) => {
    const isExpanded = expandedItems.includes(item.notification.id);

    const isClicked = clickedItems.includes(item.notification.id);
    return item.notification.notificationType === "NOTIFICATION" ? (
      <Pressable
        onPress={() => {
          if (isExpanded) {
            setExpandedItems(
              expandedItems.filter((id) => id !== item.notification.id)
            );
          } else {
            setExpandedItems([...expandedItems, item.notification.id]);
          }
          if (!item.isRead) {
            readHandler(item.notification.id);
          }
          if (!clickedItems.includes(item.notification.id)) {
            setClickedItems([...clickedItems, item.notification.id]);
          }
        }}
      >
        <View
          style={
            item.isRead || isClicked
              ? [styles.contentContainer, { backgroundColor: "#F6F6F6" }]
              : styles.contentContainer
          }
        >
          <View style={styles.textTopContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>알림</Text>
              {!item.isRead && !isClicked && (
                <View style={styles.circle}></View>
              )}
            </View>
            <Text style={styles.date}>
              {/* {moment(item.createdAt).format("YYYY-MM-DD A h:mm")} */}
              {formatDateTime(item.notification.createdAt)}
            </Text>
          </View>
          <Text style={styles.content}>{item.notification.title}</Text>
          {isExpanded && (
            <Text style={styles.content2}>{item.notification.body}</Text>
          )}

          <View style={styles.linkConainer}>
            <Text style={styles.date}>
              {isExpanded ? "닫기" : "자세히 보기"}{" "}
            </Text>
            <View style={styles.svg}>
              {/* <Image
                source={
                  isExpanded
                    ? require("../assets/smallup.png")
                    : require("../assets/smalldown.png")
                }
              /> */}
              {isExpanded ? (
                <Up width={10} height={10} />
              ) : (
                <Down width={10} height={10} />
              )}
            </View>
          </View>
        </View>
      </Pressable>
    ) : (
      // 공지사항 부분
      <Pressable
        onPress={() => {
          naviNotice(item.notification.targetId);
          if (!item.isRead) {
            readHandler(item.notification.id);
          }
          if (!clickedItems.includes(item.notification.id)) {
            setClickedItems([...clickedItems, item.notification.id]);
          }
        }}
      >
        <View
          style={
            item.isRead || isClicked
              ? [styles.contentContainer, { backgroundColor: "#F6F6F6" }]
              : styles.contentContainer
          }
        >
          <View style={styles.textTopContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>공지사항</Text>
              {!item.isRead && !isClicked && (
                <View style={styles.circle}></View>
              )}
            </View>
            <Text style={styles.date}>
              {/* {moment(item.createdAt).format("YYYY-MM-DD A h:mm")} */}
              {formatDateTime(item.notification.createdAt)}
            </Text>
          </View>
          <Text style={styles.content}>{item.body}</Text>

          <View style={styles.linkConainer}>
            <Text style={styles.date}>게시글 이동 </Text>
            <View>
              {/* <Image source={require("../assets/smallright.png")} /> */}
              <Right width={10} height={10} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={{ marginTop: 40, marginBottom: 20 }}> */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            item={item}
            expandedItems={expandedItems}
            setExpandedItems={setExpandedItems}
            clickedItems={clickedItems}
            setClickedItems={setClickedItems}
          />
        )}
        keyExtractor={(item) => item.notification.id}
        onEndReached={notiHandler}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{ marginTop: 40 }}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ marginBottom: 40 }}
        onRefresh={() => {
          refreshHandler();
        }}
        refreshing={false}
      />
      {/* </View> */}
    </View>
  );
}

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    borderRadius: 5.41,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray03,
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.6, // 그림자의 투명도
    shadowRadius: 1, // 그
  },
  textTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 20,
    color: GlobalStyles.colors.gray01,
  },
  date: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 20,
    color: GlobalStyles.colors.gray03,
  },
  content: {
    marginTop: 8,
    marginHorizontal: 16,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 20,
    color: GlobalStyles.colors.gray01,
  },
  content2: {
    marginTop: 7,
    marginHorizontal: 16,
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 15,
    color: GlobalStyles.colors.gray01,
  },
  linkText: {},
  linkConainer: {
    alignItems: "center",
    marginRight: 16,
    marginBottom: 15,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  circle: {
    backgroundColor: GlobalStyles.colors.primaryAccent,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginLeft: 3,
  },
  svg: {
    marginLeft: 2,
  },
});
