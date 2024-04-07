import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import moment from "moment";
import { deleteAnnouncement } from "../utill/http";
import Left from "../assets/left.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import { HeaderContext } from "../store/header-context";
import { AuthContext } from "../store/auth-context";
import { useContext, useEffect } from "react";
import Image from "react-native-scalable-image";

function NoticeDetailScreen({ navigation, route }) {
  const data = route.params.data;
  const authCtx = useContext(AuthContext);
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const randomKey = Math.random().toString();
  function editHandler() {
    navigation.navigate("noticeEdit", { data: data });
  }

  async function deleteAnnouncementHandler() {
    try {
      const response = await deleteAnnouncement({ id: data.id });
      if (response.success) {
        navigation.replace("noticeScreen");
      }
    } catch (error) {
      if (error.isRefreshError) {
        // RefreshToken 관련 에러 시 로그아웃
        authCtx.logout();
      }
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerBar} />
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{data.writer} 매니저</Text>
              <Text style={styles.name}>
                {moment(data.createdAt).format("YYYY-MM-DD")}
              </Text>
            </View>

            <Text style={styles.subcontentContainer}>{data.body}</Text>

            <View style={{ paddingTop: 10, paddingBottom: 40 }}>
              {data.picture && (
                <Image
                  key={randomKey}
                  source={{ uri: data.picture }}
                  width={Dimensions.get("window").width - 40}
                />
              )}
            </View>
          </View>
        </ScrollView>
        {headerRole === "ROLE_ADMIN" ? (
          <View style={styles.btnContainer}>
            <Pressable onPress={editHandler}>
              {/* <Image
              source={require("../assets/editBtn.png")}
              style={{ marginRight: 5 }}
            /> */}
              <View style={[styles.btn, { marginRight: 2 }]}>
                <Edit width={24} height={24} />
              </View>
            </Pressable>
            <Pressable onPress={deleteHandler}>
              {/* <Image source={require("../assets/deleteBtn.png")} /> */}
              <View style={styles.btn}>
                <Delete width={24} height={24} />
              </View>
            </Pressable>
          </View>
        ) : (
          <View />
        )}
      </View>
    </SafeAreaView>
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
    fontWeight: "400",
    lineHeight: 17,
    color: GlobalStyles.colors.gray03,
  },
  subcontentContainer: {
    marginTop: 20,
    // marginBottom: 10,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    color: GlobalStyles.colors.gray03,
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 6,
    right: 6,
  },
  btn: {
    backgroundColor: GlobalStyles.colors.primaryDefault,
    borderRadius: 100,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
