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
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [reToken, setReToken] = useState();
  const [fcmToken, setFcmToken] = useState();

  async function authenticate(token, refreshToken) {
    setAuthToken(token);
    setReToken(refreshToken);
    // 데이터 저장, 첫번째인자는 key 두번쨰 인자는 데이터(반드시 문자열이어야함 아니면 변환하셈)
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  }

  async function pushtoken(fcmToken) {
    setFcmToken(fcmToken);
    await AsyncStorage.setItem("fcmToken", fcmToken);
  }

  async function logout() {
    setAuthToken(null);
    setReToken(null);
    setFcmToken(null);
    // AsyncStorage.removeItem("token");
    // AsyncStorage.removeItem("refreshToken");
    // AsyncStorage.removeItem("fcmToken");
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
