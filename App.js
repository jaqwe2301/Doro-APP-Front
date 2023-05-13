import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NoticeScreen from "./screens/NoticeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/HomeScreen";
import MyPageScreen from "./screens/MyPageScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchID from "./screens/SearchID";
import SearchPW from "./screens/SearchPW";
import DetailLectureScreen from "./screens/DetailLectureScreen";
import SignUp from "./screens/SignUp";
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
import NoticeDetailScreen from "./screens/NoticeDetailScreen";
import AddNoticeScreen from "./screens/AddNoticeScreen";
import jwtDecode from "jwt-decode";
import HeaderContextProvider, { HeaderContext } from "./store/header-context";
import EditNoticeScreen from "./screens/EditNoticeScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <View
      style={{
        height: 190,
      }}
    >
      <Image
        style={{ width: 174, height: 52, marginTop: 100, marginLeft: 20 }}
        source={require("./assets/doroLogo.png")}
      />
    </View>
  );
}

function HeaderStyle({ title }) {
  return (
    <View style={{ height: 60 }}>
      <Text>{title}</Text>
    </View>
  );
}

//로그인 전 화면 -로그인,회원가입 등등
function AuthStack() {
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
        }}
      >
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerBackVisible: false,
            headerTitleAlign: "left",
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
          name="signUp"
          component={SignUp}
          options={{
            title: "회원가입",
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
        />
        <Stack.Screen
          name="agreeInfo"
          component={AgreeInfo}
          options={{
            title: "회원가입",
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
      </Stack.Navigator>
    </SignContextProvider>
  );
}

function MyPageNavigator() {
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
      }}
    >
      <Stack.Screen
        name="myPage"
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
    </Stack.Navigator>
  );
}
function NoticeNavigator() {
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
      }}
    >
      <Stack.Screen
        name="noticeScreen"
        component={NoticeScreen}
        options={{
          title: "공지사항",
          headerRight: () => {
            return <Ionicons name="home-outline" size={20} />;
          },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="noticeDetail"
        component={NoticeDetailScreen}
        options={{ title: "" }}
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

// icon 바꿀 예정
// 로그인 후 화면
function BottomTabNavigator() {
  const [detailLetureVisible, setDetailLetureVisible] = useState(true);
  const [lectureIdState, setLectureIdState] = useState();

  const detailLectureVisibleHandler = (id) => {
    console.log(id);
    setLectureIdState(id);
    setDetailLetureVisible(false);
  };

  const detailLectureBackHandler = () => {
    setDetailLetureVisible(true);
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: GlobalStyles.colors.gray04,
        tabBarActiveTintColor: GlobalStyles.colors.primaryDefault,
        tabBarStyle: { height: 60 },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        children={() =>
          detailLetureVisible ? (
            <HomeScreen lectureIdProps={detailLectureVisibleHandler} />
          ) : (
            <DetailLectureScreen
              detailLectureBackButton={detailLectureBackHandler}
              lectureId={lectureIdState}
            />
          )
        }
        // component={NoticeScreen}
        options={{
          headerShown: detailLetureVisible,
          header: () => {
            return (
              <View style={styles.HomeHeader}>
                <View style={styles.headerTopContainer}>
                  <Image
                    source={require("./assets/doroLogoMain.png")}
                    style={styles.Logo}
                  />
                  <Image
                    source={require("./assets/icons/alarm_after.png")}
                    style={styles.iconSize}
                  />
                </View>
                <View style={styles.noticeContainer}>
                  <Image
                    source={require("./assets/icons/megaphone.png")}
                    style={styles.iconSize}
                  />
                  <Text
                    style={{
                      marginLeft: 16,
                      fontStyle: GlobalStyles.gray01,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    메이커 스페이스 사용 안내
                  </Text>
                </View>
              </View>
            );
          },
          // title: "홈",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
          tabBarLabelStyle: {
            marginBottom: 9,
            fontSize: 10,
            fontWeight: 600,
            marginTop: -10,
          },
        }}
      />
      <BottomTab.Screen
        name="Notice"
        component={NoticeNavigator}
        options={{
          title: "공지사항",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" color={color} size={24} />
          ),
          tabBarLabelStyle: {
            marginBottom: 9,
            fontSize: 10,
            fontWeight: 600,
            marginTop: -10,
          },
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "신청 내역",
          tabBarIcon: ({ color }) => (
            <Ionicons name="file-tray-outline" color={color} size={24} />
          ),
          tabBarLabelStyle: {
            marginBottom: 9,
            fontSize: 10,
            fontWeight: 600,
            marginTop: -10,
          },
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageNavigator}
        options={{
          // title: "마이 페이지",
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={24} />
          ),
          tabBarLabelStyle: {
            justifyContent: "center",
            marginBottom: 9,
            fontSize: 10,
            fontWeight: 600,
            marginTop: -10,
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  // const [isTryingLogin, setIsTryingLogin] = useState(true);

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
        setHeaderRole(decoded.roles[0].authority);
      }

      // setIsTryingLogin(false);
    }

    fetchToken();
  }, []);
  return (
    // 로그인 여부에 따른 화면
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <BottomTabNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <HeaderContextProvider>
          <Navigation />
        </HeaderContextProvider>
      </AuthContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: getStatusBarHeight(),
  },

  bottomtab: {
    marginBottom: 9,
    fontSize: 10,
    fontWeight: 600,
  },
  HomeHeader: {
    paddingTop: 45,
    paddingBottom: 54,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  headerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  Logo: {
    height: 20,
    width: 93.35,
  },
  iconSize: {
    height: 24,
    width: 24,
  },
  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    backgroundColor: "#F4F4F4",
    paddingLeft: 16,
    borderRadius: 5.41,
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
    fontWeight: 400,
    fontSize: 15,
    color: GlobalStyles.colors.gray05,
    marginLeft: 10,
  },
});
