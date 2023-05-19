import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

function AlarmScreen() {
  const data = [
    { title: "공지사항", content: "hi", date: "2023.04.02 오후 12:00", id: 3 },
    { id: 2, title: "알림", content: "hihi", date: "2023.04.02 오후 12:00" },
  ];

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
  );

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40, marginBottom: 20 }}>
        <FlatList
          data={data}
          renderItem={Item}
          keyExtractor={(item) => item.id}
        />
      </View>
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
