import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
      console.log(response);
      if (response.status === 401) {
        const token = await AsyncStorage.getItem("token");
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        const reToken = await axios.post("http://10.0.2.2:8080/reissue", {
          accessToken: token,
          refreshToken: refreshToken,
        });

        // AsyncStorage.setItem("token",reToken)
        console.log(reToken);
      }

      return response;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return instance;
}

export default Interceptor;
