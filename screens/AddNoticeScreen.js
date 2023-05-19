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
import { createAnnouncement, pushNotification } from "../utill/http";
import { useEffect, useState } from "react";

function AddNoticeScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function completeHandler() {
    try {
      const response = await createAnnouncement({
        title: title,
        body: body,
        // picture: "",
      });

      console.log(response);
      if (response.success) {
        navigation.replace("noticeScreen");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={completeHandler}>
            <Text style={styles.completeText}>완료</Text>
          </Pressable>
        );
      },
    });
  }, [completeHandler]);

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
              onChangeText={(text) => setTitle(text)}
              value={title}
            ></TextInput>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              placeholder="내용을 입력하세요."
              style={styles.content}
              multiline
              value={body}
              onChangeText={(text) => setBody(text)}
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
  completeText: {
    fontWeight: "400",
    fontSize: 15,
    // lineHeight: 20,
    width: 50,
    height: 30,
    borderRadius: 5.41,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    // marginLeft: -4,
    backgroundColor: GlobalStyles.colors.primaryDefault,

    lineHeight: 20,
  },
});
