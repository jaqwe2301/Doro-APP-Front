import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GlobalStyles } from "../constants/styles";

function NoticeDetailScreen({ navigation, route }) {
  const data = route.params.data;
  const targetData = data.find((item) => item.id === "3");
  return (
    <View style={styles.container}>
      <View style={styles.headerBar} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{targetData.title}</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{targetData.name} 매니저</Text>
            <Text style={styles.name}>{targetData.date}</Text>
          </View>

          <Text style={styles.subcontentContainer}>{targetData.content}</Text>
        </View>
      </ScrollView>
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
});
