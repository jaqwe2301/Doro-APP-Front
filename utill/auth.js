import axios from "axios";
import { URL } from "./config";
import { Alert } from "react-native";

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
  const response = await axios.post(URL + "/login", {
    account: id,
    password: pw,
  });

  const token = response;
  //.headers.authorization
  console.log("hihi\t");
  console.log(token);

  return token;
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
