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
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

//findAllUser를 구현해버렸네
export async function getProfile2({
  generation,
  major,
  phone,
  school,
  studentId,
  studenStatus,
  id,
}) {
  try {
    const response = await instance.get("/users/" + `${id}`, {
      params: {
        generation: generation,
        major: major,
        phone: phone,
        school: school,
        studentId: studentId,
        studenStatus: studenStatus,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateProfile({
  generation,
  major,
  phone,
  school,
  studentId,
  studentStatus,
  id,
}) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.patch(
      URL + "/users/" + `${parseInt(id)}`,
      {
        generation: parseInt(generation),
        major: major,
        phone: phone,
        school: school,
        studentId: studentId,
        studentStatus: studentStatus,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.log(
      parseInt(generation),
      major,
      phone,
      school,
      studentId,
      studentStatus,
      parseInt(id)
    );
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

export async function getNotification() {
  try {
    const token = await AsyncStorage.getItem("token");

    console.log(token);

    const response = await axios.get(URL + "/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
export async function pushNotification({ body, title }) {
  try {
    const token = await AsyncStorage.getItem("token");

    console.log(token);

    const response = await axios.post(
      URL + "/notifications",
      {
        body: body,
        title: title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
