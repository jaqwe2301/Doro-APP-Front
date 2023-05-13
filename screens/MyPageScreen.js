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
import { useNavigation } from "@react-navigation/native";
import { getProfile } from "../utill/http";

function MyPageScreen() {
  // const [birth, setBirth] = useState("");
  // const [generation, setGeneration] = useState("");
  // const [major, setMajor] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [school, setSchool] = useState("");
  // const [studentId, setStudentId] = useState("");
  // const [studentStatus, setStudentStatus] = useState("");
  const [data, setData] = useState([]);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const status = data.studentStatus === "ATTENDING" ? "재학" : "휴학";

  function logoutHandler() {
    authCtx.logout();
  }

  function navi() {
    navigation.navigate("searchPw");
  }

  async function profileHandler() {
    try {
      const response = await getProfile({ id: 7 });
      setData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    profileHandler();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={styles.image}
            source={require("../assets/profile.png")}
          />
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
              onPress={() => navigation.navigate("profileEdit", { data: data })}
            >
              <Text style={styles.btn}>프로필 편집</Text>
            </Pressable>
          </View>
          <View style={styles.btnContainer}>
            <Pressable>
              <Text style={styles.btn}>강의신청내역</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={[styles.contentTitle, { marginTop: 45 }]}>기본정보</Text>
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
            <Text style={styles.contentText}>{data.school}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>전공</Text>
            <Text style={styles.contentText}>{data.major}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>학번</Text>
            <Text style={styles.contentText}>{data.studentId}</Text>
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
            <Text style={styles.contentText}>hynnk0</Text>
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
        <View style={{ marginBottom: 33 }}>
          <Pressable onPress={logoutHandler}>
            <Text
              style={[styles.contentTitle, { borderBottomWidth: 1, width: 57 }]}
            >
              로그아웃
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default MyPageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: 99,
    marginLeft: 20,
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