import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { GlobalStyles } from "../constants/styles";
import moment from "moment";

function NoticeDetailScreen({ navigation, route }) {
  const data = route.params.data;
  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.headerBar} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>김동규 매니저</Text>
            <Text style={styles.name}>
              {moment(data.date).format("YYYY-MM-DD")}
            </Text>
          </View>

          <Text style={styles.subcontentContainer}>{data.body}</Text>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Image
          source={require("../assets/editBtn.png")}
          style={{ marginRight: 5 }}
        />
        <Image source={require("../assets/deleteBtn.png")} />
      </View>
    </View>
  );
}

export default NoticeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBar: {
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.8,
  },
  contentContainer: {
    margin: 20,
  },
  title: {
    fontWeight: 600,
    fontSize: 22,
    lineHeight: 28,
    color: GlobalStyles.colors.gray01,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    color: GlobalStyles.colors.gray03,
  },
  subcontentContainer: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 22,
    color: GlobalStyles.colors.gray03,
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
