import { Alert } from "react-native";

function formatErrorMessage(data) {
  try {
    if (typeof data === "string") {
      // 데이터가 문자열 형태이며, JSON 형태인지 확인
      const parsedError = JSON.parse(data);
      return JSON.stringify(parsedError, null, 2); // pretty-printed JSON string
    } else {
      // 데이터가 이미 객체 형태일 경우
      return JSON.stringify(data, null, 2); // pretty-printed JSON string
    }
  } catch (e) {
    // JSON 형태가 아니면 기존 데이터 반환
    return String(data);
  }
}

export function errorHandler(error, title) {
  if (error.response) {
    return Alert.alert(title, formatErrorMessage(error.response.data));
  } else if (error.request) {
    return Alert.alert(title, formatErrorMessage(error.request));
  } else {
    return Alert.alert(title, formatErrorMessage(error.message));
  }
}
