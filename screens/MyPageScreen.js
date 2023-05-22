import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";

import { getProfile } from "../utill/http";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderContext } from "../store/header-context";
import ManagerSend from "./ManagerSend";
import { deleteUser, reToken } from "../utill/auth";

function MyPageScreen({ navigation }) {
  // const [birth, setBirth] = useState("");
  // const [generation, setGeneration] = useState("");
  // const [major, setMajor] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [school, setSchool] = useState("");
  // const [studentId, setStudentId] = useState("");
  // const [studentStatus, setStudentStatus] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);

  useEffect(() => {
    profileHandler();
  }, []);

  async function profileHandler() {
    try {
      const response = await getProfile({ id: headerId });
      setData(response);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }

  async function tokenHandler() {
    const token = await AsyncStorage.getItem("token");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    console.log("전 토큰" + token);
    console.log("리프레쉬 토큰" + refreshToken);

    try {
      const response = await reToken({
        accessToken: `Bearer ${token}`,
        refreshToken: refreshToken,
      });
      console.log("되는듯" + response);
      authCtx.authenticate(response, refreshToken);
    } catch (error) {
      console.log("error발생" + error);
      // console.log(error)
    }
  }

  function ManagerScreen() {
    return <ManagerSend />;
  }

  function UserScreen() {
    function logoutHandler() {
      authCtx.logout();
    }

    async function deleteHandler() {
      try {
        const response = await deleteUser();
        console.log("삭제?" + response);
      } catch (error) {
        console.log("error발생" + error);
        // console.log(error)
      }
    }

    function navi() {
      navigation.navigate("searchPw");
    }

    // if (Object.keys(data).length === 0) {
    if (isLoading) {
      return (
        <View style={{ marginBottom: 33 }}>
          <Pressable onPress={logoutHandler}>
            <Text
              style={[styles.contentTitle, { borderBottomWidth: 1, width: 57 }]}
            >
              로그아웃
            </Text>
          </Pressable>
        </View>
      );
    } else {
      const status =
        data.degree.studentStatus === "ATTENDING" ? "재학" : "휴학";
      console.log(data.profileImg);
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {data.profileImg !== "" ? (
                <Image
                  style={styles.image}
                  source={{
                    uri: data.profileImg,
                  }}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../assets/profile.png")}
                />
              )}
              <View style={styles.statusContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>강의 신청</Text>
                  <Text style={styles.textNum}>02</Text>
                </View>
                <View style={[styles.textContainer, { marginHorizontal: 26 }]}>
                  <Text style={styles.text}>배정 완료</Text>
                  <Text style={styles.textNum}>02</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>강의 완료</Text>
                  <Text style={styles.textNum}>02</Text>
                </View>
              </View>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 6 }}>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.title}>DORO {data.generation}기</Text>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={[styles.btnContainer, { marginRight: 10 }]}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("profileEdit", {
                      data: data,
                    })
                  }
                >
                  <Text style={styles.btn}>프로필 편집</Text>
                </Pressable>
              </View>
              <View style={styles.btnContainer}>
                <Pressable onPress={tokenHandler}>
                  <Text style={styles.btn}>강의신청내역</Text>
                </Pressable>
              </View>
            </View>
            <View>
              <Text style={[styles.contentTitle, { marginTop: 45 }]}>
                기본정보
              </Text>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>생년월일</Text>
                <Text style={styles.contentText}>{data.birth}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>휴대전화번호</Text>
                <Text style={styles.contentText}>{data.phone}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>학교</Text>
                <Text style={styles.contentText}>{data.degree.school}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>전공</Text>
                <Text style={styles.contentText}>{data.degree.major}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>학번</Text>
                <Text style={styles.contentText}>{data.degree.studentId}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>재학 유무</Text>
                <Text style={styles.contentText}>{status}</Text>
              </View>
              <View style={styles.border}></View>
            </View>
            <View>
              <Text style={styles.contentTitle}>로그인 정보</Text>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>아이디</Text>
                <Text style={styles.contentText}>{data.name}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>비밀번호</Text>
                <Pressable onPress={navi}>
                  <Text style={[styles.contentText, { borderBottomWidth: 1 }]}>
                    비밀번호 수정
                  </Text>
                </Pressable>
              </View>
              <View style={styles.border}></View>
            </View>
            <View>
              <Pressable onPress={logoutHandler}>
                <Text
                  style={[
                    styles.contentTitle,
                    { borderBottomWidth: 1, width: 57 },
                  ]}
                >
                  로그아웃
                </Text>
              </Pressable>
              <View style={styles.border}></View>
            </View>
            <View style={{ marginBottom: 33 }}>
              <Pressable onPress={deleteHandler}>
                <Text
                  style={[
                    styles.contentTitle,
                    { borderBottomWidth: 1, width: 61 },
                  ]}
                >
                  회원 탈퇴
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  return headerRole === "ROLE_USER" ? <UserScreen /> : <ManagerScreen />;
}

export default MyPageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: 78,
    margin: 11,
    height: 78,
    borderRadius: 50,
    marginLeft: 31,
  },
  text: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
  },
  textNum: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
    marginTop: 17,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  statusContainer: {
    flexDirection: "row",
    marginLeft: 30,
  },
  name: {
    fontWeight: 600,
    fontSize: 17,
    lineHeight: 22,
  },
  title: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    width: 70,
    color: GlobalStyles.colors.gray03,
  },
  btnContainer: {
    height: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.gray05,
    borderWidth: 0.5,
    borderRadius: 5.41,
    backgroundColor: "white",
    elevation: 3,
  },
  btn: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 20,
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 33,
    marginHorizontal: 20,
  },
  contentText: {
    marginLeft: 45,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
  },
  contentTitle: {
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 20,
  },
  border: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 33,
  },
});
