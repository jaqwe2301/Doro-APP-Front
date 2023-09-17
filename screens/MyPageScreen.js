import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import Profile from "../assets/defaultProfile.svg";
import { alarmEdit, getProfile, logout } from "../utill/http";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderContext } from "../store/header-context";
import ManagerSend from "./ManagerSend";
import { deleteUser, reToken } from "../utill/auth";
import axios from "axios";
import ManagerScreen from "./ManagerScreen";
import { CommonActions, StackActions } from "@react-navigation/native";
import Interceptor from "../utill/Interceptor";

function MyPageScreen({ navigation }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const { headerAccount, setHeaderAccount } = useContext(HeaderContext);
  const { historyIndex, setHistoryIndex } = useContext(HeaderContext);

  const [recruiting, setRecruiting] = useState([]);
  const [allocation, setAllocation] = useState([]);
  const [finished, setFinished] = useState([]);
  const instance = Interceptor();

  // function ManagerScreen() {
  //   return <ManagerScreen />;
  // }
  useEffect(() => {
    profileHandler();
  }, []);

  useEffect(() => {
    getMyLectures();
  }, []);

  async function profileHandler() {
    try {
      const response = await getProfile({ id: headerId });

      setData(response.data);
      console.log(JSON.stringify(response) + "여기임");
      setIsLoading(false);
    } catch (error) {
      console.log("프로필 핸들러 에러" + error);
      setIsLoading(true);
    }
  }
  const getMyLectures = () => {
    instance
      .get(`/users-lectures/users/${headerId}`, {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setRecruiting(() => {
          const data = res.data.data.filter(
            (item) => item.status === "RECRUITING"
          );
          return data;
        });
        setAllocation(() => {
          const data = res.data.data.filter(
            (item) => item.status === "ALLOCATION_COMP"
          );
          // console.log(data);
          return data;
        });
        setFinished(() => {
          const data = res.data.data.filter((item) => item.status === "FINISH");
          // console.log(data);
          return data;
        });
        console.log("성공");
      })
      .catch((error) => {
        console.log("왜 에러나니");
        console.log("에러");
        console.log(error);
      });
  };
  function UserScreen() {
    async function alarmEditHandler({ notificationAgreement }) {
      try {
        const response = await alarmEdit({
          id: headerId,
          notificationAgreement: notificationAgreement,
        });
      } catch (error) {
        console.log("알림 수정 콘솔 : ", error);
      }
    }

    function alarmHandler() {
      Alert.alert(
        "'DORO'에서 알림을 보내고자 합니다.",
        "경고, 사운드 및 아이콘 배지가 알림에 포함될 수 있습니다. 설정에서 이를 구성할 수 있습니다.",
        [
          {
            text: Platform.OS === "ios" ? "허용             " : "허용",
            onPress: () => alarmEditHandler({ notificationAgreement: true }),
          },
          {
            text: Platform.OS === "ios" ? "허용 안함            " : "허용 안함",
            onPress: () => alarmEditHandler({ notificationAgreement: false }),
          },
        ]
      );
    }
    function logoutHandler() {
      Alert.alert("'DORO EDU'", "로그아웃 하시겠습니까?", [
        {
          text: "취소",
        },
        { text: "확인", onPress: logoutApi },
      ]);
    }

    async function logoutApi() {
      try {
        const response = await logout();

        // console.log(response);
        if (response.status === 200) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          );
          authCtx.logout();
        }
      } catch (error) {
        // navigation.navigate("login");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
        authCtx.logout();
        console.log("로그아웃 에러 콘솔: ", error);
        console.log("에러났쪄염");
      }
    }

    // if (Object.keys(data).length === 0) {
    if (
      isLoading ||
      data === undefined
      // (data !== undefined || data !== null || data.degree !== undefined)
    ) {
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

      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {data.profileImg !== null ? (
                <Image
                  style={styles.image}
                  source={{
                    uri: data.profileImg,
                  }}
                />
              ) : (
                // <Image
                //   style={styles.image}
                //   source={require("../assets/profile.png")}
                // />
                <View style={{ margin: 11, marginLeft: 31 }}>
                  <Profile />
                </View>
              )}
              <View style={styles.statusContainer}>
                <Pressable
                  onPress={() => {
                    navigation.jumpTo("History");
                    setHistoryIndex(0);
                  }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>강의 신청</Text>
                    <Text style={styles.textNum}>
                      {recruiting.length < 10
                        ? "0" + recruiting.length
                        : recruiting.length}
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.jumpTo("History");
                    setHistoryIndex(1);
                  }}
                >
                  <View
                    style={[styles.textContainer, { marginHorizontal: 26 }]}
                  >
                    <Text style={styles.text}>배정 완료</Text>
                    <Text style={styles.textNum}>
                      {allocation.length < 10
                        ? "0" + allocation.length
                        : allocation.length}
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.jumpTo("History");
                    setHistoryIndex(2);
                  }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>강의 완료</Text>
                    <Text style={styles.textNum}>
                      {finished.length < 10
                        ? "0" + finished.length
                        : finished.length}
                    </Text>
                  </View>
                </Pressable>
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
              <Pressable
                onPress={() =>
                  navigation.navigate("profileEdit", {
                    data: data,
                  })
                }
                style={{ flex: 1 }}
              >
                <View style={[styles.btnContainer, { marginRight: 10 }]}>
                  <Text style={styles.btn}>프로필 편집</Text>
                </View>
              </Pressable>
              {/* <View style={{ flex: 1 }}> */}
              <Pressable onPress={alarmHandler} style={{ flex: 1 }}>
                <View style={styles.btnContainer}>
                  <Text style={styles.btn}>알림 설정</Text>
                </View>
              </Pressable>
            </View>
            <View>
              <Text style={[styles.contentTitle, { marginTop: 45 }]}>
                기본정보
              </Text>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>생년월일</Text>
                {data.birth === "1950-01-01" ? (
                  <Text
                    style={[
                      styles.contentText,
                      { color: GlobalStyles.colors.gray03 },
                    ]}
                  >
                    미입력
                  </Text>
                ) : (
                  <Text style={styles.contentText}>{data.birth}</Text>
                )}
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
                <Text style={styles.contentText}>{headerAccount}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>비밀번호</Text>
                <Pressable onPress={() => navigation.navigate("searchPw")}>
                  <View style={styles.contentView}>
                    <Text style={[styles.contentText, { marginLeft: 0 }]}>
                      비밀번호 수정
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.border}></View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={logoutHandler}>
                <View style={styles.contentTitleView}>
                  <Text style={[styles.contentTitle, { marginHorizontal: 0 }]}>
                    로그아웃
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.border}></View>
            <View style={{ marginBottom: 33, flexDirection: "row" }}>
              <Pressable
                onPress={() =>
                  navigation.navigate("deleteUser", { account: headerAccount })
                }
              >
                <View style={styles.contentTitleView}>
                  <Text style={[styles.contentTitle, { marginHorizontal: 0 }]}>
                    회원 탈퇴
                  </Text>
                </View>
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
    fontWeight: "400",
    lineHeight: 17,
  },
  textNum: {
    fontSize: 15,
    fontWeight: "400",
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
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 22,
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
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
    // shadowColor: GlobalStyles.colors.gray03,
    // shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    // shadowOpacity: 0.6, // 그림자의 투명도
    // shadowRadius: 1, // 그
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.3, // 그림자의 투명도
    shadowRadius: 0.7, // 그
  },
  btn: {
    fontSize: 10,
    fontWeight: "400",
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
    fontWeight: "400",
    lineHeight: 17,
  },
  contentView: {
    marginLeft: 45,
    borderBottomColor: GlobalStyles.colors.gray01,
    borderBottomWidth: 0.8,
  },
  contentTitle: {
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  contentTitleView: {
    marginHorizontal: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  border: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 33,
  },
});
