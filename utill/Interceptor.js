import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "./config";

function Interceptor() {
  const instance = axios.create({
    baseURL: URL,
    timeout: 2000,
  });

  instance.interceptors.request.use(
    async function (config) {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );

  let isTokenRefreshing = false;
  let refreshQueue = [];

  const onTokenRefreshed = (accessToken) => {
    isTokenRefreshing = false;
    refreshQueue.map((callback) => callback(accessToken));
    refreshQueue = [];
  };

  const addRefreshSubscriber = (callback) => {
    refreshQueue.push(callback);
  };

  instance.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      const originalConfig = error.config;
      if (error.response.status === 401) {
        try {
          if (!isTokenRefreshing) {
            isTokenRefreshing = true;
            const token = await AsyncStorage.getItem("token");
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            console.log("hi refresh 할꺼염");

            const response = await axios.post(`${URL}/reissue`, {
              accessToken: `Bearer ${token}`,
              refreshToken: refreshToken,
            });

            const newToken = response.headers.authorization;
            await AsyncStorage.setItem("token", newToken);
            console.log("새로운 토큰이얌" + newToken);

            isTokenRefreshing = false;
            onTokenRefreshed(newToken);
          }
          const retryOriginalRequest = new Promise((resolve) => {
            addRefreshSubscriber((token) => {
              originalConfig.headers["Authorization"] = "Bearer " + token;
              resolve(instance(originalConfig));
            });
          });
          return retryOriginalRequest;
        } catch (error) {
          console.log("error발생" + error);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default Interceptor;
