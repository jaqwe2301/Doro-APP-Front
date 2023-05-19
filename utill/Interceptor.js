import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { reToken } from "./auth";

function Interceptor() {
  const instance = axios.create({
    baseURL: "http://10.0.2.2:8080",
    timeout: 1000,
  });

  instance.interceptors.request.use(
    async function (config) {
      // const authCtx = useContext(AuthContext);

      const token = await AsyncStorage.getItem("token");
      console.log(token);

      if (token) {
        //   config.headers["Content-Type"] = "application/json; charset=utf-8";
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
      if (error.response.status === 401) {
        const token = await AsyncStorage.getItem("token");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        console.log("hi \t");
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
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default Interceptor;
