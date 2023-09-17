import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./config";
// import { errorHandler } from "./etc";
import { Alert } from "react-native";

function Interceptor() {
  const instance = axios.create({
    baseURL: URL,
    timeout: 2000,
  });

  instance.interceptors.request.use(
    async function (config) {
      console.log("config 콘솔: ", config);
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      console.log("instance 에러: ", error);
      return Promise.reject(error);
    }
  );

  let refreshQueue = [];
  let isRefreshingPromise = null;

  const onTokenRefreshed = (accessToken) => {
    refreshQueue.map((callback) => callback(accessToken));
  };

  const addRefreshSubscriber = (callback) => {
    refreshQueue.push(callback);
  };

  const refreshToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    try {
      console.log("hi refresh 할꺼염");
      const response = await axios.post(`${URL}/reissue`, {
        accessToken: `Bearer ${token}`,
        refreshToken: refreshToken,
      });

      const newToken = response.headers.authorization;
      await AsyncStorage.setItem("token", newToken);
      console.log("새로운 토큰이얌" + newToken);
      onTokenRefreshed(newToken);
    } catch (error) {
      console.log("error발생 리프래시" + error);
      Alert.alert("에러", "로그아웃 후 다시 로그인을 해주세요");
    }

    isRefreshingPromise = null;
  };

  instance.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      // errorHandler(error, "인스턴스 에러");
      console.log("인스턴스 에러: " + error);
      const originalConfig = error.config;
      if (error.response.status === 401) {
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalConfig.headers["Authorization"] = "Bearer " + token;
            resolve(instance(originalConfig));
          });
        });

        if (!isRefreshingPromise) {
          isRefreshingPromise = refreshToken();
        }

        return isRefreshingPromise.then(() => retryOriginalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

export default Interceptor;
