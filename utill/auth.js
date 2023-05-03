import axios from "axios";
import { useContext } from "react";

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

export function verifyauthPhoneNum({ authNum, messageType, phone }) {
  axios
    .post(URL + "/message/verify", {
      authNum: authNum,
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

export async function login({ id, pw }) {
  const response = await axios.post(URL + "/login", {
    account: id,
    password: pw,
  });

  const token = response.data;

  return token;
}
