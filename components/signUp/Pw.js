import { View, Text, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { GlobalStyles } from "../../constants/styles";

import ButtonBig from "../ui/ButtonBig";
import InputText from "../ui/InputText";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PwBtn from "../ui/PwBtn";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";

function Pw() {
  const [inputPw, setInputPw] = useState("");
  const [inputRePw, setInputRePw] = useState("");
  const [isNavi, setIsNavi] = useState(false);
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [eng, setEng] = useState(GlobalStyles.colors.gray05);
  const [num, setNum] = useState(GlobalStyles.colors.gray05);
  const [mark, setMark] = useState(GlobalStyles.colors.gray05);
  const [len, setLen] = useState(GlobalStyles.colors.gray05);
  const navigation = useNavigation();
  const { signData, setSignData } = useContext(SignContext);
  const [flex1, setFlex1] = useState(2);
  const flex2 = 10 - flex1;
  const handlePwChange = (text) => {
    let hasEng = /[a-zA-Z]+/g.test(text);
    let hasNum = /[0-9]+/g.test(text);
    let hasMark = /[~!@#$%^&*()_+|<>?:{}]+/g.test(text);
    let hasValidLen = text.length >= 8 && text.length <= 20;

    setEng(
      hasEng ? GlobalStyles.colors.primaryDefault : GlobalStyles.colors.gray05
    );
    setNum(
      hasNum ? GlobalStyles.colors.primaryDefault : GlobalStyles.colors.gray05
    );
    setMark(
      hasMark ? GlobalStyles.colors.primaryDefault : GlobalStyles.colors.gray05
    );
    setLen(
      hasValidLen
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
    setInputPw(text);

    if (
      inputPw !== "" &&
      inputRePw !== "" &&
      inputRePw === text &&
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
    setInputRePw(text);

    if (
      inputPw === text &&
      text.length >= 8 &&
      text.length <= 20 &&
      /[a-zA-z]+/g.test(text) &&
      /[0-9]+/g.test(text) &&
      /[~!@#$%^&*()_+|<>?:{}]+/g.test(text)
    ) {
      setFlex1(3);
      setIsNavi(true);
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setFlex1(2);
      setIsNavi(false);
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  function navigatePw() {
    if (isNavi) {
      setSignData({ ...signData, password: inputPw, passwordCheck: inputRePw });

      navigation.navigate("name");
    } else {
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={flex1} flex2={flex2} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={styles.textContainer}>
            <InputText text="비밀번호를 입력해 주세요." />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.id}>{signData.account}</Text>
            <Text style={styles.text}>계정의 비밀번호를 설정합니다.</Text>
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="영문, 숫자, 특수문자 포함 8~20자"
              onChangeText={handlePwChange}
              value={inputPw}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.pwBtn}>
            <PwBtn text="영문" btnColor={eng} />
            <PwBtn text="숫자" btnColor={num} />
            <PwBtn text="특수문자" btnColor={mark} />
            <PwBtn text="8~20자" btnColor={len} />
          </View>
          <View style={[styles.inputContainer, { marginTop: 0 }]}>
            <InputData
              hint="비밀번호 재입력"
              onChangeText={handleRePwChange}
              value={inputRePw}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonBig text="다음" style={lbtnColor} onPress={navigatePw} />
        </View>
      </View>
    </View>
  );
}

export default Pw;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 20,
    marginTop: 45,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 34,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 18,
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
