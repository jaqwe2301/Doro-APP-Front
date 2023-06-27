import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { reToken } from "./auth";

function Interceptor() {
  const instance = axios.create({
    // baseURL: "http://10.0.2.2:8080",
    baseURL: "https://api.doroapp.com",

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
<<<<<<< HEAD
      // console.log(response + "hihi");
      // if (response.status === 401) {
      //   const token = await AsyncStorage.getItem("token");
      //   const refreshToken = await AsyncStorage.getItem("refreshToken");
      //   console.log("re화이팅");

      //   const reToken = await axios.post("http://10.0.2.2:8080/reissue", {
      //     accessToken: token,
      //     refreshToken: refreshToken,
      //   });

      //   // AsyncStorage.setItem("token",reToken)
      //   console.log("hihi" + reToken);
      // }

      return response;
    },
    async function (error) {
=======
      return response;
    },
    async function (error) {
      const originalConfig = error.config;
>>>>>>> 9667fdc25c17b3ddb35a71ae88735986e127726c
      if (error.response.status === 401) {
        const token = await AsyncStorage.getItem("token");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        console.log("hi refresh 할꺼염 \t");
<<<<<<< HEAD
        console.log(token);
        console.log(refreshToken);

        try {
          const response = await reToken({
            accessToken: `Bearer ${token}`,
            refreshToken: refreshToken,
          });
          console.log(response);

          authCtx.authenticate(response, refreshToken);
        } catch (error) {
          console.log("error발생" + error);
          // console.log(error)
        }

        // console.log(reToken);
=======

        try {
          // const response = await axios.post("http://10.0.2.2:8080/reissue", {
          const response = await axios.post("https://api.doroapp.com/reissue", {
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
>>>>>>> 9667fdc25c17b3ddb35a71ae88735986e127726c
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default Interceptor;
