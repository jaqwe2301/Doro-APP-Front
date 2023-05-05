import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./Interceptor";

const URL = "http://10.0.2.2:8080";

// id를 넣어주면 header 필요없고 id없으면 header 필요하다
export async function getProfile({ id }) {
  try {
    const token = await AsyncStorage.getItem("token");

    console.log(token);

    const response = await axios.get(URL + "/users/" + `${id}`, {
      //   params: {
      //     id: id,
      //   },
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

//findAllUser를 구현해버렸네
export async function getProfile2({ id }) {
  try {
    const response = await instance.get("/users/", {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkAccount({ account }) {
  const response = await axios.get(URL + "/check/account?account=" + account);

  console.log(account);
  const data = response.data;
  console.log(data);

  return data;
}
