import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Keyboard,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

function AddNoticeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerBar} />
      <ScrollView>
        <Pressable onPress={() => Keyboard.dismiss()}>
          <View style={styles.titleContainer}>
            <TextInput
              placeholder="제목"
              style={styles.title}
              placeholderTextColor={GlobalStyles.colors.gray03}
              multiline
            ></TextInput>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              placeholder="내용을 입력하세요."
              style={styles.content}
              multiline
              placeholderTextColor={GlobalStyles.colors.gray03}
            ></TextInput>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default AddNoticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBar: {
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.8,
  },
  title: {
    fontSize: 22,
  },
  content: {
    fontSize: 17,
  },
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 15,
    borderBottomColor: GlobalStyles.colors.gray04,
    borderBottomWidth: 0.8,
  },
  contentContainer: {
    margin: 20,
  },
});
