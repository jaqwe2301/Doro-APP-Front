import axios from "axios";

const URL = "http://10.0.2.2:8080";

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

  const code = response.data;
  console.log(code);

  return code;
}

export async function login({ id, pw }) {
  const response = await axios.post(URL + "/login", {
    account: id,
    password: pw,
  });

  const token = response.data;
  console.log(token);

  return token;
}

export async function signUp({
  account,
  birth,
  doroAuth,
  gender,
  generation,
  major,
  name,
  password,
  passwordCheck,
  phone,
  profileImg,
  role,
  school,
  studentId,
  studentStatus,
}) {
  axios
    .post(URL + "/join", {
      account: account,
      birth: birth,
      doroAuth: doroAuth,
      gender: "FEMALE",
      generation: 1,
      major: major,
      name: name,
      password: password,
      passwordCheck: passwordCheck,
      phone: phone,
      profileImg: "",
      role: role,
      school: school,
      studentId: studentId,
      studentStatus: studentStatus,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(
        account,
        birth,
        doroAuth,
        gender,
        major,
        name,
        password,
        passwordCheck,
        phone,
        role,
        school,
        studentId,
        studentStatus
      );
      console.log(error);
    });
}
