import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { GlobalStyles } from "./constants/styles";
import NoticeScreen from "./screens/NoticeScreen";
import { Ionicons } from "@expo/vector-icons";
import HistoryScreen from "./screens/HistoryScreen";
import MyPageScreen from "./screens/MypageScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

//로그인 전 화면 -로그인,회원가입 등등
function AuthStack() {
  return <Stack.Navigator></Stack.Navigator>;
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

// 로그인 후 화면
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
  return (
    <NavigationContainer>
      {/* {isLogin && <AuthStack />} */}
      {/* {!isLogin && <AuthenticatedStack />} */}
      <AuthenticatedStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomtab: {
    marginBottom: 9,
    fontSize: 10,
    fontWeight: 600,
  },
});
