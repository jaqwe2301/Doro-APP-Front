import { View, Text, StyleSheet } from "react-native";
import InputData from "../ui/InputData";
import PwBtn from "../ui/PwBtn";
import ButtonBig from "../ui/ButtonBig";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

function ChangePw({ route }) {
  const [pw, setPw] = useState("");
  const [repw, setRePw] = useState("");
  const [sbtnColor, setsbtnColor] = useState(GlobalStyles.colors.gray05);
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);

  const id = route.params.id;
  const phoneNum = route.params.phone;

  async function handlerPwchange() {
    try {
      const response = await changePassword({
        account: id,
        newPassword: pw,
        newPasswordCheck: repw,
        phone: phoneNum,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handlePwChange = (text) => {
    setPw(text);
  };
  const handleRePwChange = (text) => {
    setRePw(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerShadow}></View>
      <View style={styles.inputContainer}>
        <Text style={styles.textTitle}>신규 비밀번호</Text>
        <InputData
          hint="영문, 숫자, 특수문자 포함 8~20자"
          onChangeText={handlePwChange}
          value={pw}
        />
      </View>
      <View style={styles.pwBtn}>
        <PwBtn text="영문" />
        <PwBtn text="숫자" />
        <PwBtn text="특수문자" />
        <PwBtn text="8~20자" />
      </View>
      <View style={[styles.inputContainer, { marginTop: 5 }]}>
        <Text style={styles.textTitle}>신규 비밀번호 재확인</Text>
        <InputData
          hint="비밀번호 재입력"
          onChangeText={handleRePwChange}
          value={repw}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonBig
          text="변경 하기"
          style={lbtnColor}
          onPress={handlerPwchange}
        />
      </View>
    </View>
  );
}

export default ChangePw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerShadow: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 0.5,
  },
  textTitle: {
    marginLeft: 6,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
  },
  textContainer: {
    marginHorizontal: 20,
    marginTop: 45,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 36,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 23,
  },
  lInputContainer: {
    marginHorizontal: 20,
    marginTop: 13,
  },
  input: {
    marginRight: 7,
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,

    alignItems: "center",
  },
  pwBtn: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 4,
  },
  text: {
    fontSize: 15,
    fontWeight: 400,
    color: GlobalStyles.colors.gray04,
    marginRight: 20,
    textAlign: "center",
  },
  id: {
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 20,
    marginRight: 4,
    flex: 0,
    color: GlobalStyles.colors.gray01,
    textAlign: "center",
  },
  textSend: {
    fontSize: 12,
    fontWeight: 400,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
});
