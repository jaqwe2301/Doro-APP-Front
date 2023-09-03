import axios from "axios";
import { URL } from "./config";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";

import { errorHandler } from "./etc";

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

export async function checkPhoneNum(phone) {
  try {
    const response = await axios.get(URL + "/check/phone?phone=" + phone);
    return response.data.code;
    // console.log(phone);
  } catch (err) {
    if (err.response) {
      // 서버가 응답을 반환한 경우
      // console.log(err.response.data.code);
      return err.response.data.code;
    } else {
      // 그 외의 에러
      Alert.alert("요청 실패", "휴대폰 번호 유효 체크를 실패하였습니다.");
      console.log("Error", err.message);
    }
  }
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
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  let fcmToken = null;
  if (enabled) {
    console.log("Authorization status:", authStatus);
    fcmToken = await messaging().getToken();
    await AsyncStorage.setItem("fcmToken", fcmToken);
  } else {
    await AsyncStorage.removeItem("fcmToken");
  }
  try {
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
    }
    return token;
  } catch (error) {
    Alert.alert("로그인 실패", "로그인에 실패하셨습니다.");
    // console.error("Error occurred during login: ", error);
    if (error.response) {
      // 서버가 응답을 반환한 경우
      console.log("Error response:", error.response.data);
    } else if (error.request) {
      // 요청이 만들어졌지만, 응답을 받지 못한 경우
      console.log("Error request:", error.request);
    } else {
      // 그 외의 에러
      console.log("Error", error.message);
    }
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
    if (!response.data.success) {
      Alert.alert("회원가입 오류", response.data.message);
    }
    return response;
  } catch (error) {
    errorHandler(error, "sigh-up auth file error");
  }
}
