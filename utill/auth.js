import axios from "axios";
import { URL } from "./config";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";

// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log("Authorization status:", authStatus);
//     const fcmToken = await messaging().getToken();
//     await AsyncStorage.setItem("fcmToken", fcmToken);
//     return fcmToken;
//   } else {
//     await AsyncStorage.removeItem("fcmToken");
//     return null; // 권한이 없는 경우 null 반환
//   }
// }

// const URL = "https://api.doroapp.com";
// const URL = "http://10.0.2.2:8080";

export function authPhoneNum({ messageType, phone }) {
  axios
    .post(URL + "/message/send", {
      messageType: messageType,
      phone: phone,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function verifyauthPhoneNum({ authNum, messageType, phone }) {
  const response = await axios.post(URL + "/message/verify", {
    authNum: authNum,
    messageType: messageType,
    phone: phone,
  });
  console.log(response.data);
  const success = response.data.success;

  return success;
}

export async function findAccount({ phone }) {
  const response = await axios.get(URL + "/find/account?phone=" + phone);

  console.log(phone);
  const code = response.data;
  console.log(code);

  return code;
}

export async function checkAccount({ account }) {
  const response = await axios.get(URL + "/check/account?account=" + account);

  console.log(account);
  const data = response.data;
  console.log(data);

  return data;
}

export async function changePassword({
  account,
  newPassword,
  newPasswordCheck,
  phone,
}) {
  const response = await axios.post(URL + "/change/password", {
    account: account,
    newPassword: newPassword,
    newPasswordCheck: newPasswordCheck,
    phone: phone,
  });

  const data = response.data;
  console.log(data);

  return data;
}

export async function login({ id, pw }) {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      const fcmToken = await messaging().getToken();
      await AsyncStorage.setItem("fcmToken", fcmToken);
      return fcmToken;
    } else {
      await AsyncStorage.removeItem("fcmToken");
      return null; // 권한이 없는 경우 null 반환
    }
  }
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
  // const fcmToken = await messaging().getToken();
  // Alert.alert(“fcm”, fcmToken);
  try {
    const fcmToken = await requestUserPermission();
    const response = await axios.post(
      URL + "/login",
      {
        account: id,
        password: pw,
      },
      {
        headers: fcmToken ? { fcmToken: fcmToken } : undefined,
      }
    );
    const token = response;
    // 로그인 성공 후, 푸시메시지 수신 리스너 등록
    if (fcmToken) {
      messaging().onMessage(async (remoteMessage) => {
        const title = remoteMessage?.notification?.title;
        const body = remoteMessage?.notification?.body;
        await onDisplayNotification({ title, body });
      });
    }
    return token;
  } catch (error) {
    console.error("Error occurred during login: ", error);
  }
}

export async function reToken({ accessToken, refreshToken }) {
  const response = await axios.post(URL + "/reissue", {
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  // const token = response.headers.authorization;
  console.log(response);

  // console.log("hihi\t");
  // console.log(token);

  return response;
}

export async function signUp({
  account,
  birth,
  doroAuth,
  gender,
  generation,
  major,
  name,
  notificationAgreement,
  password,
  passwordCheck,
  phone,
  role,
  school,
  studentId,
  studentStatus,
}) {
  try {
    console.log(
      account,
      birth,
      doroAuth,
      gender,
      generation,
      major,
      name,
      notificationAgreement,
      password,
      passwordCheck,
      phone,
      role,
      school,
      studentId,
      studentStatus
    );
    const response = await axios.post(URL + "/join", {
      account: account,
      birth: birth,
      doroAuth: doroAuth,
      gender: gender,
      generation: generation,
      major: major,
      name: name,
      notificationAgreement: notificationAgreement,
      password: password,
      passwordCheck: passwordCheck,
      phone: phone,
      role: role,
      school: school,
      studentId: studentId,
      studentStatus: studentStatus,
    });
    console.log(response.data);
    if (!response.data.success) {
      Alert.alert("회원가입 오류", response.data.message);
    }
    return response;
  } catch (error) {
    console.log(error);
    console.log("여긴가");
  }
}
