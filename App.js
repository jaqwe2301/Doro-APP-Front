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
import SignUp from "./screens/SignUp";
import AuthPhone from "./components/signUp/AuthPhone";
import Id from "./components/signUp/Id";
import Pw from "./components/signUp/Pw";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import Name from "./components/signUp/Name";
import SignContextProvider from "./store/sign-context";
import School from "./components/signUp/School";

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

//로그인 전 화면 -로그인,회원가입 등등
function AuthStack() {
  return (
    <SignContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen
          name="searchId"
          component={SearchID}
          options={{
            title: "아이디 찾기",
            headerStyle: {
              height: 150,
              justifyContent: "center",
              alignItems: "center",
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
      </Stack.Navigator>
    </SignContextProvider>
  );
}

// icon 바꿀 예정
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: GlobalStyles.colors.gray04,
        tabBarActiveTintColor: GlobalStyles.colors.primaryDefault,
        tabBarStyle: { height: 60 },
        headerTitleAlign: "center",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "홈",
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
        component={NoticeScreen}
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
        component={MyPageScreen}
        options={{
          title: "마이 페이지",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={24} />
          ),
          tabBarLabelStyle: {
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

//로그인 후 화면
function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Bottom"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  // const [isTryingLogin, setIsTryingLogin] = useState(true);

  // 자동로그인
  useEffect(() => {
    async function fetchToken() {
      // 저장된 jwt 가져오기
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      // setIsTryingLogin(false);
    }

    fetchToken();
  }, []);
  return (
    // 로그인 여부에 따른 화면
    <NavigationContainer>
      {authCtx.isAuthenticated && <AuthStack />}
      {!authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Navigation />
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
  // header: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#e1e1e1",
  // },
});
