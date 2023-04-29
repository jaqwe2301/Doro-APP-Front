import { View, Text, StyleSheet, Alert } from "react-native";
import InputData from "../ui/InputData";
import PwBtn from "../ui/PwBtn";
import ButtonBig from "../ui/ButtonBig";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import { changePassword } from "../../utill/auth";
import { useNavigation } from "@react-navigation/native";

function ChangePw({ route }) {
  const [pw, setPw] = useState("");
  const [repw, setRePw] = useState("");
  const [isNavi, setIsNavi] = useState(false);
  const [sbtnColor, setsbtnColor] = useState(GlobalStyles.colors.gray05);
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [eng, setEng] = useState(GlobalStyles.colors.gray05);
  const [num, setNum] = useState(GlobalStyles.colors.gray05);
  const [mark, setMark] = useState(GlobalStyles.colors.gray05);
  const [len, setLen] = useState(GlobalStyles.colors.gray05);

  const id = route.params.id;
  const phoneNum = route.params.phone;
  const navigation = useNavigation();
  async function handlerPwchange() {
    if (isNavi) {
      try {
        const response = await changePassword({
          account: id,
          newPassword: pw,
          newPasswordCheck: repw,
          phone: phoneNum,
        });

        if (response.success) {
          Alert.alert("성공", "비밀번호 변경");
          navigation.replace("login");
        } else {
          Alert.alert("Error", "일치하는 아이디가 없습니다. ");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handlePwChange = (text) => {
    let hasEng = /[a-zA-Z]+/g.test(text);
    let hasNum = /[0-9]+/g.test(text);
    let hasMark = /[~!@#$%^&*()_+|<>?:{}]+/g.test(text);
    let hasValidLen = text.length >= 8 && text.length <= 20;

    setEng(hasEng ? GlobalStyles.colors.gray01 : GlobalStyles.colors.gray05);
    setNum(hasNum ? GlobalStyles.colors.gray01 : GlobalStyles.colors.gray05);
    setMark(hasMark ? GlobalStyles.colors.gray01 : GlobalStyles.colors.gray05);
    setLen(
      hasValidLen ? GlobalStyles.colors.gray01 : GlobalStyles.colors.gray05
    );
    setPw(text);

    if (
      pw !== "" &&
      repw !== "" &&
      repw === text &&
      text.length >= 8 &&
      text.length <= 20 &&
      /[a-zA-z]+/g.test(text) &&
      /[0-9]+/g.test(text) &&
      /[~!@#$%^&*()_+|<>?:{}]+/g.test(text)
    ) {
      setIsNavi(true);
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setIsNavi(false);
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  const handleRePwChange = (text) => {
    setRePw(text);

    if (
      pw === text &&
      text.length >= 8 &&
      text.length <= 20 &&
      /[a-zA-z]+/g.test(text) &&
      /[0-9]+/g.test(text) &&
      /[~!@#$%^&*()_+|<>?:{}]+/g.test(text)
    ) {
      setIsNavi(true);
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setIsNavi(false);
      setlbtnColor(GlobalStyles.colors.gray05);
    }
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
        <PwBtn text="영문" btnColor={eng} />
        <PwBtn text="숫자" btnColor={num} />
        <PwBtn text="특수문자" btnColor={mark} />
        <PwBtn text="8~20자" btnColor={len} />
      </View>
      <View style={[styles.inputContainer, { marginTop: 8 }]}>
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
