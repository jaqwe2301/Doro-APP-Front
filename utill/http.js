import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Interceptor from "./Interceptor";
import { URL } from "./config";
import { errorHandler } from "./etc";
import { Alert } from "react-native";

import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";

const instance = Interceptor();

// id를 넣어주면 header 필요없고 id없으면 header 필요하다
export async function getProfile({ id }) {
  try {
    const response = await instance.get("/users/" + `${id}`);
    // console.log(response);
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
  birth,
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
      birth: birth,
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
  try {
    const response = await axios.get(URL + "/check/account?account=" + account);
    console.log(account);
    const data = response.data;
    console.log(data);
  } catch (error) {
    throw error;
  }

  return data;
}

export async function getNotification({ page, size }) {
  try {
    const response = await instance.get("/users-notifications/", {
      params: {
        page,
        size,
      },
    });

    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function readNotification({ notificationId }) {
  try {
    const response = await instance.get(
      `/users-notifications/${notificationId}/`
    );
    return response;
  } catch (error) {
    errorHandler(error, "Noti Read ERROR");
    console.log(error);

    throw error;
  }
}
export async function pushNotification({ body, title }) {
  try {
    const response = await instance.post("/notifications", {
      title: title,
      body: body,
      notificationType: "NOTIFICATION",
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

export async function getAnnouncementId({ id }) {
  try {
    const response = await instance.get("/announcements/" + `${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function createAnnouncement({ formData, title, body }) {
  try {
    const token = await SecureStore.getItemAsync("token");
    // console.log("폼데이터" + JSON.stringify(formData));
    const boundary = "----ExpoBoundary" + Math.random().toString(16).slice(2);
    const response = await axios
      .post(
        URL + "/announcements",
        {
          announcementReq: JSON.stringify({
            title: title,
            body: body,
            writer: "노세인",
          }),
        },
        {
          headers: {
            Accept: "application/json",
            "content-type": `multipart/form-data; boundary=${boundary}`,
            Authorization: `Bearer ${token}`,
          },
          transformRequest: [
            function (data, headers) {
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
      console.log(error.response.data);
    }
    if (error.request) {
      console.log(JSON.stringify(error.request) + "리퀘스트");
    }
    console.log("Error", error.message);
    console.log(error);

    throw error;
  }
}

export async function createAnnouncement2({ formData }) {
  try {
    const response = await instance.post("/announcements", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(JSON.stringify(error.response.headers) + "response");
    }
    if (error.request) {
      console.log(JSON.stringify(error.request) + "리퀘스트");
    }
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
    throw error;
  }
}

export async function updateUserImage({ formData }) {
  try {
    console.log(formData);
    const response = await instance.patch("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }

    throw error;
  }
}

export async function logout() {
  try {
    const fcmToken = await SecureStore.getItemAsync("fcmToken");
    // console.log(fcmToken + "로그아웃 fcm");
    const response = await instance.post("/logout", undefined, {
      headers: {
        fcmToken: fcmToken,
      },
    });
    return response;
  } catch (error) {
    errorHandler(error, "로그아웃 에러");
    // console.log("로그아웃 에러", error);
    throw error;
  }
}

export async function getCityList({ status }) {
  try {
    const response = await instance.get("/lectures/cities/" + `${status}`);
    return response.data.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getLectureList({
  city,
  endDate,
  lectureStatus,
  startDate,
  page,
  size,
}) {
  try {
    const res = await instance.get("/lectures", {
      params: {
        city: city,
        endDate: endDate,
        startDate: startDate,
        page: page,
        size: size,
        lectureStatus: lectureStatus,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data; // 프로미스에서 결과를 반환
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환한 경우
      console.log("Error response:", error.response.data);
    } else if (err.request) {
      // 요청이 만들어졌지만, 응답을 받지 못한 경우
      console.log("Error request:", error.request);
    } else {
      // 그 외의 에러
      console.log("Error", error.message);
    }
    throw error; // 에러를 다시 던져서 호출자에게 전달
  }
}

/** 알림 구독 */
export async function notiSubscribe(notiType) {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    let fcmToken = undefined;
    if (enabled) {
      console.log("Authorization status:", authStatus);
      fcmToken = await messaging().getToken();
      // setItemAsync의 value는 string만 가능
      await SecureStore.setItemAsync("fcmToken", fcmToken);
      // 푸시메시지 수신 리스너 등록 -> 앱이 켜져있을 때 알림이 오도록 함
      const onDisplayNotification = async ({ title = "", body = "" }) => {
        const channelId = await notifee.createChannel({
          id: "channelId",
          name: "channelName",
        });
        await notifee.displayNotification({
          title,
          body,
          android: {
            channelId,
          },
        });
      };
      messaging().onMessage(async (remoteMessage) => {
        const title = remoteMessage?.notification?.title;
        const body = remoteMessage?.notification?.body;
        await onDisplayNotification({ title, body });
      });
      if (notiType === "all") {
        // 강의 알림
        await SecureStore.setItemAsync("LECTURE-NOTI", "allow");
        // 공지사항 알림
        await SecureStore.setItemAsync("ANNOUNCEMENT-NOTI", "allow");
        // 일반 알림
        await SecureStore.setItemAsync("NOTIFICATION-NOTI", "allow");

        await instance.post("/notifications/subscribe", {
          fcmToken: fcmToken,
          notificationType: "LECTURE",
        });
        await instance.post("/notifications/subscribe", {
          fcmToken: fcmToken,
          notificationType: "ANNOUNCEMENT",
        });
        await instance.post("/notifications/subscribe", {
          fcmToken: fcmToken,
          notificationType: "NOTIFICATION",
        });
      } else {
        await SecureStore.setItemAsync(notiType + "-NOTI", "allow");
        await instance.post("/notifications/subscribe", {
          fcmToken: fcmToken,
          notificationType: "notiType",
        });
      }
      return true;
    } else {
      Alert.alert(
        "알림 동의 필요",
        "시스템 설정에서 DORO 앱의 알림을 동의해 주세요."
      );
      await SecureStore.deleteItemAsync("fcmToken");
      await SecureStore.deleteItemAsync("lectureNoti");
      await SecureStore.deleteItemAsync("announcementNoti");
      await SecureStore.deleteItemAsync("notificationNoti");
    }
  } catch (error) {
    errorHandler(error, "Noti Subscribe ERROR");
    // console.log("로그아웃 에러", error);
    throw error;
  }
}

/** 알림 구독 취소 */
export async function notiUnsubscribe(notiType) {
  try {
    const fcmToken = await SecureStore.getItemAsync("fcmToken");

    if (notiType === "all") {
      await instance.post("/notifications/unsubscribe", {
        fcmToken: fcmToken,
        notificationType: "LECTURE",
      });
      await instance.post("/notifications/unsubscribe", {
        fcmToken: fcmToken,
        notificationType: "ANNOUNCEMENT",
      });
      await instance.post("/notifications/unsubscribe", {
        fcmToken: fcmToken,
        notificationType: "NOTIFICATION",
      });

      await SecureStore.deleteItemAsync("fcmToken");

      await SecureStore.deleteItemAsync("LECTURE-NOTI");
      await SecureStore.deleteItemAsync("ANNOUNCEMENT-NOTI");
      await SecureStore.deleteItemAsync("NOTIFICATION-NOTI");
    } else {
      await instance.post("/notifications/unsubscribe", {
        fcmToken: fcmToken,
        notificationType: notiType,
      });
      await SecureStore.deleteItemAsync(notiType + "-NOTI");
    }

    return true;
  } catch (error) {
    errorHandler(error, "Noti Unsubscribe ERROR");
    // console.log("로그아웃 에러", error);
    throw error;
  }
}
