import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Interceptor from "./Interceptor";

// const URL = "http://10.0.2.2:8080";
const URL = "https://api.doroapp.com";
const instance = Interceptor();

// id를 넣어주면 header 필요없고 id없으면 header 필요하다
export async function getProfile({ id }) {
  try {
    const response = await instance.get("/users/" + `${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error + "api er");

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
    const response = await instance.patch("/users/" + `${parseInt(id)}`, {
      generation: parseInt(generation),
      major: major,
      phone: phone,
      school: school,
      studentId: studentId,
      studentStatus: studentStatus,
    });
    return response.data;
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

export async function getNotification({ userId, page, size }) {
  try {
    const response = await instance.get(
      URL +
        "/notifications/" +
        `${userId}` +
        "?page=" +
        `${page}` +
        "&size=" +
        `${size}`
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
export async function readNotification({ notificationId }) {
  try {
    const response = await axios.post(
      URL + "/notifications/" + `${notificationId}` + "/doRead"
    );
    return response;
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

export async function getAnnouncement({ page, size }) {
  try {
    const response = await instance.get(
      "/announcements?page=" + page + "&size=" + size
    );
    return response.data.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function createAnnouncement({ formData, title, body }) {
  try {
    const token = await AsyncStorage.getItem("token");

    const announcementReq = new Blob(
      [JSON.stringify({ title: title, body: body })],
      { type: "application/json" }
    );
    const response = await axios.post(
      URL + "/announcements/",
      { announcementReq: announcementReq, picture: formData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error + "여기여기");

    throw error;
  }
}

export async function editAnnouncement({ formData, id }) {
  try {
    const response = await instance.patch(
      "/announcements/" + `${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
export async function deleteAnnouncement({ id }) {
  try {
    const response = await instance.delete("/announcements/" + `${id}`);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function deleteUser() {
  const response = await instance.delete("/withdrawal");

  // console.log("hihi\t");
  // console.log(token);

  return response;
}

export async function updateUserImage({ formData }) {
  try {
    const response = await instance.patch("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
