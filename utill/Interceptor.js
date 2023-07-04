import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { reToken } from "./auth";

function Interceptor() {
  const instance = axios.create({
    baseURL: "http://10.0.2.2:8080",
    // baseURL: "https://api.doroapp.com",

    timeout: 1000,
  });

  instance.interceptors.request.use(
    async function (config) {
      const token = await AsyncStorage.getItem("token");
      console.log(token);

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

  instance.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      const originalConfig = error.config;
      if (error.response.status === 401) {
        const token = await AsyncStorage.getItem("token");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        console.log("hi refresh 할꺼염 \t");

        try {
          const response = await axios.post("http://10.0.2.2:8080/reissue", {
          // const response = await axios.post("https://api.doroapp.com/reissue", {
            accessToken: `Bearer ${token}`,
            refreshToken: refreshToken,
          });
          const newToken = response.headers.authorization;
          console.log("새로운 토큰이얌" + newToken);
          await AsyncStorage.setItem("token", newToken);
          if (newToken) {
            originalConfig.headers["Authorization"] = `Bearer ${newToken}`;
          }
          return axios(originalConfig);
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
