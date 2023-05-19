import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import moment from "moment";
import { useEffect, useState } from "react";
import { editAnnouncement } from "../utill/http";

function EditNoticeScreen({ navigation, route }) {
  const data = route.params.data;
  const [body, setBody] = useState(data.body);
  const [title, setTitle] = useState(data.title);

  async function completeHandler() {
    try {
      const response = await editAnnouncement({
        title: title,
        body: body,
        picture: "",
        id: data.id,
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
        <View style={styles.contentContainer}>
          <TextInput
            value={title}
            style={styles.title}
            multiline
            onChangeText={(text) => setTitle(text)}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>김동규 매니저</Text>
            <Text style={styles.name}>
              {moment(data.createdAt).format("YYYY-MM-DD")}
            </Text>
          </View>
          <TextInput
            value={body}
            onChangeText={(text) => setBody(text)}
            style={styles.subcontentContainer}
            multiline
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default EditNoticeScreen;

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
    fontWeight: "600",
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
    fontWeight: "400",
    lineHeight: 22,
    color: GlobalStyles.colors.gray03,
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    right: 16,
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
