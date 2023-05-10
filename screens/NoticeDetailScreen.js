import { View, Text, StyleSheet, ScrollView } from "react-native";
import { GlobalStyles } from "../constants/styles";

function NoticeDetailScreen({ navigation, route }) {
  const data = route.params.data;
  const targetData = data.find((item) => item.id === "3");
  return (
    <View style={styles.container}>
      <View style={styles.headerBar} />
      <ScrollView>
        <Text>{targetData.title}</Text>
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
});
