import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  DefaultTheme,
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from "./constants/styles";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import NoticeScreen from "./screens/NoticeScreen";
import HomeScreen from "./screens/HomeScreen";
import MyPageScreen from "./screens/MyPageScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchID from "./screens/SearchID";
import SearchPW from "./screens/SearchPW";
import DetailLectureScreen from "./screens/DetailLectureScreen";
import Back from "./assets/backBtn.svg";
import Logo from "./assets/Logo_main.svg";
import AlarmAfter from "./assets/alarm_before.svg";
import Right from "./assets/rightBlack.svg";
import Left from "./assets/left.svg";
import AuthPhone from "./components/signUp/AuthPhone";
import Id from "./components/signUp/Id";
import Pw from "./components/signUp/Pw";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import Name from "./components/signUp/Name";
import SignContextProvider from "./store/sign-context";
import School from "./components/signUp/School";
import Code from "./components/signUp/Code";
import AgreeInfo from "./components/signUp/AgreeInfo";
import Finish from "./components/signUp/Finish";
import FindId from "./components/signUp/FindId";
import NotFindId from "./components/signUp/NotFindId";
import ChangePw from "./components/signUp/ChangePw";
import ProfileEdit from "./screens/ProfileEdit";
import ApplicationDetails from "./screens/ApplicationDetails";
import UpdateLectureScreen from "./screens/UpdateLectureScreen";
import ManagerScreen from "./screens/ManagerScreen";
import NoticeDetailScreen from "./screens/NoticeDetailScreen";
import AddNoticeScreen from "./screens/AddNoticeScreen";
import jwtDecode from "jwt-decode";
import HeaderContextProvider, { HeaderContext } from "./store/header-context";
import EditNoticeScreen from "./screens/EditNoticeScreen";
import AlarmScreen from "./screens/AlarmScreen";
import Splash from "./assets/splash.svg";
import DoroHorizontal from "./assets/doroHorizontal.svg";
import Home from "./assets/home.svg";
import Main from "./assets/main.svg";
import MainFill from "./assets/main_fill.svg";
import Megaphone from "./assets/megaphone.svg";
import MegaphoneFill from "./assets/megaphone_fill.svg";
import Tray from "./assets/tray.svg";
import TrayFill from "./assets/tray_fill.svg";
import Profile from "./assets/profile.svg";
import ProfileFill from "./assets/profile_fill.svg";
import FinishPw from "./components/signUp/FinishPw";
import DeleteUser from "./screens/DeleteUser";
import AgreeInfo2 from "./components/signUp/AgreeInfo2";
import TutorScreen from "./screens/TutorScreen";
import * as SplashScreen from "expo-splash-screen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <SafeAreaView>
      <View style={{ height: Platform.OS === "android" ? 174.81 : undefined }}>
        <View style={{ marginTop: 86.81, marginLeft: 20 }}>
          <DoroHorizontal width={173.49} height={52} />
        </View>
      </View>
    </SafeAreaView>
  );
}

//로그인 전 화면 -로그인,회원가입 등등
function AuthStack({ notificationAgreement }) {
  return (
    <SignContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 17,
          },
          headerBackTitleVisible: false,
          headerTintColor: "#000000",
        }}
      >
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            header: (props) => <LogoTitle {...props} />,
            headerBackVisible: false,

            // headerTitleAlign: "left",
          }}
        />
        <Stack.Screen
          name="searchId"
          component={SearchID}
          options={{
            title: "아이디 찾기",
          }}
        />
        <Stack.Screen
          name="searchPw"
          component={SearchPW}
          options={{
            title: "비밀번호 찾기",
          }}
        />
        <Stack.Screen
          name="authPhone"
          component={AuthPhone}
          options={{
            title: "회원가입",
          }}
        />
        <Stack.Screen
          name="id"
          component={Id}
          options={{
            title: "회원가입",
          }}
        />
        <Stack.Screen
          name="pw"
          component={Pw}
          options={{
            title: "회원가입",
          }}
        />
        <Stack.Screen
          name="name"
          component={Name}
          options={{
            title: "회원가입",
          }}
        />
        <Stack.Screen
          name="school"
          component={School}
          options={{
            title: "회원가입",
          }}
        />
        <Stack.Screen
          name="code"
          component={Code}
          options={{
            title: "회원가입",
          }}
          initialParams={{ notificationAgreement: notificationAgreement }}
        />
        <Stack.Screen
          name="agreeInfo"
          component={AgreeInfo}
          options={{
            title: "이용약관",
          }}
        />
        <Stack.Screen
          name="agreeInfo2"
          component={AgreeInfo2}
          options={{
            title: "개인정보 수집 및 이용 동의",
          }}
        />
        <Stack.Screen
          name="finish"
          component={Finish}
          options={{
            title: "회원가입",
          }}
        />
        <Stack.Screen
          name="findId"
          component={FindId}
          options={{
            title: "아이디 찾기",
          }}
        />
        <Stack.Screen
          name="notFindId"
          component={NotFindId}
          options={{
            title: "아이디 찾기",
          }}
        />
        <Stack.Screen
          name="changePw"
          component={ChangePw}
          options={{
            title: "비밀번호 변경",
          }}
        />
        <Stack.Screen
          name="finishPw"
          component={FinishPw}
          options={{
            title: "비밀번호 변경",
          }}
        />
      </Stack.Navigator>
    </SignContextProvider>
  );
}

function HomeNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        // headerShown: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 17,
          // lineHeight: 22,
        },
        headerBackTitleVisible: false,
        headerTintColor: "#000000",
      }}
    >
      <Stack.Screen
        name="HomePage"
        component={HomeScreen}
        options={{
          header: () => {
            return (
              <SafeAreaView style={{}}>
                <View style={styles.HomeHeader}>
                  <View style={styles.headerTopContainer}>
                    <Logo width={94} height={21} />
                    <Pressable
                      onPress={() => navigation.navigate("alarm")}
                      style={{
                        // backgroundColor: "#F5F5F5",
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      <AlarmAfter width={24} height={25} />
                    </Pressable>
                  </View>
                </View>
              </SafeAreaView>
            );
          },
        }}
      />
      <Stack.Screen
        name="DetailLecture"
        component={DetailLectureScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="UpdateLectureScreen"
        component={UpdateLectureScreen}
        options={{ title: "강의 생성 및 수정" }}
      />
      <Stack.Screen
        name="alarm"
        component={AlarmScreen}
        options={{
          title: "알림",
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="noticeDetail"
        component={NoticeDetailScreen}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
}

function MyPageNavigator({ route, navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 17,
        },
        headerBackTitleVisible: false,
        headerTintColor: "#000000",
        ///  headerBackImageSource: <Back width={24} height={24} />,
      }}
    >
      <Stack.Screen
        name="myPageScreen"
        component={MyPageScreen}
        options={{ title: "마이 페이지", headerBackVisible: false }}
      />
      <Stack.Screen
        name="profileEdit"
        component={ProfileEdit}
        options={{
          title: "프로필 수정",
          headerRight: () => {
            return <Text style={styles.completeText}>완료</Text>;
          },
          headerLeft: () => {
            return <Text style={styles.cancelText}>취소</Text>;
          },
        }}
      />
      <Stack.Screen
        name="searchPw"
        component={SearchPW}
        options={{
          title: "비밀번호 찾기",
        }}
      />
      <Stack.Screen
        name="changePw"
        component={ChangePw}
        options={{
          title: "비밀번호 변경",
        }}
      />
      <Stack.Screen
        name="finishPw"
        component={FinishPw}
        options={{
          title: "비밀번호 변경",
        }}
      />
      <Stack.Screen
        name="deleteUser"
        component={DeleteUser}
        options={{
          title: "회원탈퇴",
        }}
      />
      <Stack.Screen
        name="ManagerPage"
        component={ManagerScreen}
        options={{ title: "매니저 페이지" }}
      />
      <Stack.Screen
        name="tutorScreen"
        component={TutorScreen}
        options={{ title: "매니저 페이지" }}
      />
      {/* <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          header: (props) => <LogoTitle {...props} />,
          headerBackVisible: false,
          // headerTitleAlign: "left",
        }}
      /> */}
    </Stack.Navigator>
  );
}

function NoticeNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 17,
          // lineHeight: 22,
        },
        headerBackTitleVisible: false,
        headerTintColor: "#000000",
      }}
      initialRouteName="noticeScreen"
    >
      <Stack.Screen
        name="noticeScreen"
        component={NoticeScreen}
        options={{
          title: "공지사항",
          // headerRight: () => {

          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="noticeDetail"
        component={NoticeDetailScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="noticeAdd"
        component={AddNoticeScreen}
        options={{
          title: "글쓰기",
          headerRight: () => {
            return <Text style={styles.completeText2}>완료</Text>;
          },
        }}
      />
      <Stack.Screen
        name="noticeEdit"
        component={EditNoticeScreen}
        options={{
          title: "글쓰기",
          headerRight: () => {
            return <Text style={styles.completeText2}>완료</Text>;
          },
        }}
      />
    </Stack.Navigator>
  );
}

function HistoryNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 17,
          // lineHeight: 22,
        },
        headerBackTitleVisible: false,
        headerTintColor: "#000000",
      }}
      initialRouteName="historyScreen"
    >
      <Stack.Screen
        name="historyScreen"
        component={HistoryScreen}
        options={{
          title: "강의 목록",
        }}
      />
      <Stack.Screen
        name="applicationDetail"
        component={ApplicationDetails}
        options={{
          title: "강의신청내역역",
        }}
      />
      <Stack.Screen
        name="DetailLecture"
        component={DetailLectureScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="UpdateLectureScreen"
        component={UpdateLectureScreen}
        options={{ title: "강의 생성 및 수정" }}
      />
    </Stack.Navigator>
  );
}

// icon 바꿀 예정
// 로그인 후 화면
function BottomTabNavigator() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [homeScreenState, setHomeScreenState] = useState("home");
  const [lectureIdState, setLectureIdState] = useState([0, "home"]);

  const detailLectureVisibleHandler = (id) => {
    console.log("아이디", id);
    setLectureIdState([id, "detailLecture"]);
    // setHomeScreenState("detailLecture");
    setHeaderVisible(false);
  };

  const createLectureVisibleHandler = () => {
    setLectureIdState([0, "createLecture"]);
    // setHomeScreenState("createLecture");
    setHeaderVisible(false);
  };

  const screenBackHandler = () => {
    setLectureIdState([0, "home"]);
    setHomeScreenState("home");
    setHeaderVisible(true);
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: GlobalStyles.colors.gray04,
        tabBarActiveTintColor: GlobalStyles.colors.primaryDefault,
        ...(Platform.OS === "android" && { tabBarStyle: { height: 60 } }),
        tabBarHideOnKeyboard: true,
        headerShown: false,
        unmountOnBlur: true,
      }}
      initialRouteName="Home"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          title: "홈",
          headerShown: false,
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (routeName === "noticeDetail" || routeName === "alarm") {
              return { display: "none" };
            }
            return Platform.OS === "android" && { height: 60 };
          })(route),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MainFill width={30} height={30} />
            ) : (
              <Main width={30} height={30} />
            ),
          tabBarIconStyle: {
            marginTop: 7,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginBottom: Platform.OS === "android" ? 9 : 0,
          },
        })}
      />
      <BottomTab.Screen
        name="Notice"
        component={NoticeNavigator}
        options={({ route }) => ({
          title: "공지사항",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MegaphoneFill width={30} height={30} />
            ) : (
              <Megaphone width={30} height={30} />
            ),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (
              routeName === "noticeDetail" ||
              routeName === "noticeAdd" ||
              routeName === "noticeEdit"
            ) {
              return { display: "none" };
            }
            return Platform.OS === "android" && { height: 60 };
          })(route),
          tabBarIconStyle: {
            marginTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginBottom: Platform.OS === "android" ? 9 : 0,
          },
        })}
      />
      <BottomTab.Screen
        name="History"
        // children={() => <ApplicationDetails header={true} />}
        component={HistoryNavigator}
        options={{
          title: "신청 내역",
          headerShown: false,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "600",
          },

          tabBarIcon: ({ focused }) =>
            focused ? (
              <TrayFill width={30} height={30} />
            ) : (
              <Tray width={30} height={30} />
            ),
          tabBarIconStyle: {
            marginTop: 7,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginBottom: Platform.OS === "android" ? 9 : 0,
          },
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageNavigator}
        options={({ route }) => ({
          title: "마이 페이지",
          header: () => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: "white",
                  paddingTop: 22.73,
                }}
              >
                <Text style={{ fontSize: 22 }}>매니저</Text>
              </View>
            );
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ProfileFill width={30} height={30} />
            ) : (
              <Profile width={30} height={30} />
            ),
          tabBarIconStyle: {
            marginTop: 6,
          },
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (
              routeName === "searchPw" ||
              routeName === "changePw" ||
              routeName === "finishPw" ||
              routeName === "deleteUser"
            ) {
              return { display: "none" };
            }
            return Platform.OS === "android" && { height: 60 };
          })(route),
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginBottom: Platform.OS === "android" ? 9 : 0,
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

function Navigation({ notificationAgreement }) {
  const authCtx = useContext(AuthContext);
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  const { headerId, setHeaderId } = useContext(HeaderContext);
  const { headerAccount, setHeaderAccount } = useContext(HeaderContext);
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  // 자동로그인
  useEffect(() => {
    async function fetchToken() {
      // 저장된 jwt 가져오기
      const storedToken = await AsyncStorage.getItem("token");
      const storedReToken = await AsyncStorage.getItem("refreshToken");
      // console.log();

      if (storedToken) {
        authCtx.authenticate(storedToken, storedReToken);
        const decoded = jwtDecode(storedToken);
        console.log(decoded);
        setHeaderRole(decoded.roles[0].authority);
        setHeaderId(decoded.id);
        setHeaderAccount(decoded.sub);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  if (isTryingLogin) {
    return (
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      //   <Splash width={100} height={106} />
      // </View>
      <Image
        source={require("./assets/splash3.png")}
        resizeMode="contain"
        backgroundColor="#FFFFFF"
      />
    );
  }
  return (
    // 로그인 여부에 따른 화면
    <NavigationContainer theme={navTheme}>
      {!authCtx.isAuthenticated && (
        <AuthStack notificationAgreement={notificationAgreement} />
      )}
      {authCtx.isAuthenticated && <BottomTabNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  const [noti, setNoti] = useState(true);

  // useEffect(() => {
  //   //push notification permission 요청
  //   requestUserPermission();

  //   // 포그라운드에서 푸시메시지 수신
  //   return messaging().onMessage(async (remoteMessage) => {
  //     const title = remoteMessage?.notification?.title;
  //     const body = remoteMessage?.notification?.body;
  //     await onDisplayNotification({ title, body });
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <HeaderContextProvider>
          {/* <LecturesProvider> */}
          <Navigation notificationAgreement={noti} />
          {/* </LecturesProvider> */}
        </HeaderContextProvider>
      </AuthContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: getStatusBarHeight(),
    backgroundColor: "white",
  },

  bottomtab: {
    marginBottom: 9,
    fontSize: 10,
    fontWeight: "600",
  },
  HomeHeader: {
    // paddingTop: 45,
    // // paddingBottom: Platform.OS === "android" ? 54 : 30,
    // paddingBottom: Platform.OS === "android" ? 20 : 0,
    // marginBottom: -40,
    // paddingHorizontal: 20,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 45,
    marginBottom: Platform.OS === "android" ? 10 : -30,
    backgroundColor: "white",
  },
  headerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 40,
  },

  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    backgroundColor: "#F4F4F4",
    paddingLeft: 16,
    borderRadius: 5.41,
    justifyContent: "space-between",
  },
  completeText: {
    fontWeight: "400",
    fontSize: 15,
    // lineHeight: 20,
    color: GlobalStyles.colors.primaryDefault,
    marginRight: 10,
  },
  completeText2: {
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
  cancelText: {
    fontWeight: "400",
    fontSize: 15,
    color: GlobalStyles.colors.gray05,
    marginLeft: 10,
  },
});
