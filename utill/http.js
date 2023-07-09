import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Interceptor from "./Interceptor";
import { URL } from "./config";

// const URL = "http://10.0.2.2:8080";
// const URL = "https://api.doroapp.com";
const instance = Interceptor();

// id를 넣어주면 header 필요없고 id없으면 header 필요하다
export async function getProfile({ id }) {
  try {
    const response = await instance.get("/users/" + `${id}`);
    return response.data;
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
    console.log(
      parseInt(generation),
      major,
      phone,
      school,
      studentId,
      studentStatus,
      parseInt(id)
    );
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
    const response = await instance.post("/notifications", {
      title: title,
      body: body,
      userIds: [],
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

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

    console.log("여긴 http파일");
    // const announcementReq = new Blob(
    //   [JSON.stringify({ title: title, body: body })],
    //   { type: "application/json" }
    // );
    // const formData = new FormData();
    // formData.append("announcementReq", {
    //   title: title,
    //   body: body,
    //   writer: "노세인",
    // });
    // const obj = { title: title, body: body, writer: "노세인" };
    // const blob = new Blob([JSON.stringify(obj)], {
    //   type: "application/json",
    // });
    // formData.append("announcementReq", JSON.stringify([obj]));
    // formData.append("announcementReq", blob);
    console.log("폼데이터" + JSON.stringify(formData));
    const boundary = "----ExpoBoundary" + Math.random().toString(16).slice(2);
    const response = await axios
      .post(
        URL + "/announcements",
        // { announcementReq: announcementReq, picture: formData },
        // formData
        {
          // announcementReq: {
          announcementReq: JSON.stringify({
            title: title,
            body: body,
            writer: "노세인",
            // },
          }),
        },
        // formData,
        /// formData,
        {
          headers: {
            Accept: "application/json",
            "content-type": `multipart/form-data; boundary=${boundary}`,
            //"Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          //transformRequest: (data, header) => data,
          transformRequest: [
            function (data, headers) {
              // Do whatever you want to transform the data
              return JSON.stringify(data);
            },
          ],
        }
      )
      .then((res) => {
        console.log("then 리턴" + res);
        return res;
      })
      .catch((e) => {
        console.log("post 내 에러" + e);
      });
    console.log(response);
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(JSON.stringify(error.response.headers) + "response");
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(JSON.stringify(error.request) + "리퀘스트");
    }
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    console.log(error);

    throw error;
  }
}

export async function createAnnouncement2({ formData }) {
  try {
    const response = await instance.post("/announcements/dto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(JSON.stringify(error.response.headers) + "response");
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(JSON.stringify(error.request) + "리퀘스트");
    }
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    console.log(error);

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
  try {
    const response = await instance.delete("/withdrawal");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserImage({ formData }) {
  try {
    console.log(formData);
    const response = await instance.patch("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      //  transformRequest: () => formData,
    });
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

    throw error;
  }
}

export async function alarmEdit({ id, notificationAgreement }) {
  try {
    const response = await instance.patch(
      "/users/" + `${id}` + "/notification-settings",
      { notificationAgreement: notificationAgreement }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

    throw error;
  }
}

export async function logout() {
  try {
    const fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log(fcmToken + "로그아웃 fcm");
    const response = await instance.post("/logout", undefined, {
      headers: {
        fcmToken: fcmToken,
      },
    });
    return response;
  } catch (error) {
    // if (error.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //   // http.ClientRequest in node.js
    //   console.log(error.request);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   console.log("Error", error.message);
    // }
    console.log("로그아웃 에러", error);
    throw error;
  }
}
