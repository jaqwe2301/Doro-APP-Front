import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import moment from "moment";
import { deleteAnnouncement } from "../utill/http";
import { WithLocalSvg } from "react-native-svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";

function NoticeDetailScreen({ navigation, route }) {
  const data = route.params.data;
  const headerRole = route.params.role;
  console.log(data);

  function editHandler() {
    navigation.navigate("noticeEdit", { data: data });
  }

  async function deleteAnnouncementHandler() {
    try {
      const response = await deleteAnnouncement({ id: data.id });
      // console.log(data.id);
      console.log(response);
      if (response.success) {
        navigation.replace("noticeScreen");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function deleteHandler() {
    Alert.alert("삭제하시겠습니까?", undefined, [
      {
        text: "취소",
      },
      { text: "확인", onPress: deleteAnnouncementHandler },
    ]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerBar} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>김동규 매니저</Text>
            <Text style={styles.name}>
              {moment(data.createdAt).format("YYYY-MM-DD")}
            </Text>
          </View>

          <Text style={styles.subcontentContainer}>{data.body}</Text>
        </View>
      </ScrollView>
      {headerRole === "ROLE_ADMIN" ? (
        <View style={styles.btnContainer}>
          <Pressable onPress={editHandler}>
            {/* <Image
              source={require("../assets/editBtn.png")}
              style={{ marginRight: 5 }}
            /> */}
            <View style={{ marginRight: 4 }}>
              <WithLocalSvg asset={Edit} />
            </View>
          </Pressable>
          <Pressable onPress={deleteHandler}>
            {/* <Image source={require("../assets/deleteBtn.png")} /> */}
            <WithLocalSvg asset={Delete} />
          </Pressable>
        </View>
      ) : (
        <View />
      )}
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
    bottom: 12,
    right: 12,
  },
});
