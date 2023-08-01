import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  refreshToken: "",
  fcmToken: "",
  // 사용자의 로그인 여부
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  setUnsubscriber: () => {}, // unsubscribe 함수를 관리하는 메서드
  unsubscriber: null, // unsubscribe 함수를 저장하는 state
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [reToken, setReToken] = useState();
  const [fcmToken, setFcmToken] = useState();
  const [unsubscriber, setUnsubscriber] = useState(null); // unsubscribe 함수를 관리하는 state

  async function authenticate(token, refreshToken, unsubscribe) {
    setAuthToken(token);
    setReToken(refreshToken);
    setUnsubscriber(unsubscribe); // unsubscribe 함수를 상태로 설정
    // 데이터 저장, 첫번째인자는 key 두번쨰 인자는 데이터(반드시 문자열이어야함 아니면 변환하셈)
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  }

  async function pushtoken(fcmToken) {
    setFcmToken(fcmToken);
    await AsyncStorage.setItem("fcmToken", fcmToken);
  }

  async function logout() {
    unsubscriber && unsubscriber(); // 로그아웃시 unsubscriber 실행 (FCM 리스너 제거)
    setAuthToken(null);
    setReToken(null);
    setFcmToken(null);
    setUnsubscriber(null); // unsubscriber 상태 초기화
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("fcmToken");
    await AsyncStorage.clear();
  }

  const value = {
    token: authToken,
    refreshToken: reToken,
    fcmToken: fcmToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    pushtoken: pushtoken,
    logout: logout,
    setUnsubscriber: setUnsubscriber,
    unsubscriber: unsubscriber,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
