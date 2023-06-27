import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
<<<<<<< HEAD

function AlarmScreen() {
  const data = [
    { title: "공지사항", content: "hi", date: "2023.04.02 오후 12:00", id: 3 },
    { id: 2, title: "알림", content: "hihi", date: "2023.04.02 오후 12:00" },
  ];

  useEffect(() => {
    async function notiHandler() {
      try {
        const response = await getAnnouncement({ page: 0, size: 10 });
        setData(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    notiHandler();
  }, []);

  const Item = ({ item }) => (
    <View style={styles.contentContainer}>
      <View style={styles.textTopContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.circle}></View>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.linkConainer}>
        <Text style={styles.date}>자세히 보기 &gt;</Text>
      </View>
    </View>
=======
import { useContext, useEffect, useState } from "react";
import { getNotification } from "../utill/http";
import { AuthContext } from "../store/auth-context";
import { HeaderContext } from "../store/header-context";
import moment from "moment";

function AlarmScreen() {
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    notiHandler();
  }, []);

  async function notiHandler() {
    try {
      const response = await getNotification({
        userId: headerId,
        page: pageNum,
        size: 10,
      });
      if (response.success) {
        setData((prev) => [...prev, ...response.data]);
        setPageNum((prev) => prev + 1);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const Item = ({ item }) => (
    <Pressable>
      <View style={styles.contentContainer}>
        <View style={styles.textTopContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{item.title}</Text>
            {!item.isRead && <View style={styles.circle}></View>}
          </View>
          <Text style={styles.date}>
            {moment(item.createdAt).format("YYYY-MM-DD A h:mm")}
          </Text>
        </View>
        <Text style={styles.content}>{item.body}</Text>
        <View style={styles.linkConainer}>
          <Text style={styles.date}>자세히 보기 &gt;</Text>
        </View>
      </View>
    </Pressable>
>>>>>>> 9667fdc25c17b3ddb35a71ae88735986e127726c
  );

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View style={{ marginTop: 40, marginBottom: 20 }}>
        <FlatList
          data={data}
          renderItem={Item}
          keyExtractor={(item) => item.id}
        />
      </View>
=======
      {/* <View style={{ marginTop: 40, marginBottom: 20 }}> */}
      <FlatList
        data={data}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        onEndReached={notiHandler}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{ marginTop: 40 }}
      />
      {/* </View> */}
>>>>>>> 9667fdc25c17b3ddb35a71ae88735986e127726c
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
  },
  textTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 20,
    color: GlobalStyles.colors.gray01,
  },
  date: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 20,
    color: GlobalStyles.colors.gray03,
  },
  content: {
    marginTop: 8,
    marginHorizontal: 16,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 20,
    color: GlobalStyles.colors.gray01,
  },
  linkText: {},
  linkConainer: {
    alignItems: "flex-end",
    marginRight: 16,
    marginBottom: 15,
    marginTop: 8,
  },
  circle: {
    backgroundColor: GlobalStyles.colors.primaryAccent,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginLeft: 3,
  },
});
