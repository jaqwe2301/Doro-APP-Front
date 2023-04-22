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
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const navigation = useNavigation();
  const { signData, setSignData } = useContext(SignContext);

  const handlePwChange = (text) => {
    setInputPw(text);
    setSignData({ ...signData, password: inputPw });
    if (text.length === 6) {
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  const handleRePwChange = (text) => {
    setInputRePw(text);
    setSignData({ ...signData, password: inputRePw });
    if (text.length === 6) {
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  function navigatePw() {
    navigation.navigate("name");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={2} flex2={8} />
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
        />
      </View>
      <View style={styles.pwBtn}>
        <PwBtn text="영문" />
        <PwBtn text="숫자" />
        <PwBtn text="특수문자" />
        <PwBtn text="8~20자" />
      </View>
      <View style={[styles.inputContainer, { marginTop: 5 }]}>
        <InputData
          hint="비밀번호 재입력"
          onChangeText={handleRePwChange}
          value={inputRePw}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonBig text="다음" style={lbtnColor} onPress={navigatePw} />
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
    marginTop: 31,
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
