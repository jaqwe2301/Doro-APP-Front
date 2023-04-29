import { View, Text, StyleSheet } from "react-native";
import { useState, useContext } from "react";

import InputText from "../../components/ui/InputText";
import ButtonSmall from "../../components/ui/ButtonSmall";
import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";

import { useNavigation } from "@react-navigation/native";
import { authPhoneNum, verifyauthPhoneNum } from "../../utill/auth";
import InputData from "../ui/InputData";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import Phone from "../ui/Phone";

function AuthPhone() {
  const [phoneNum, setphoneNum] = useState("");
  const [authNum, setauthNum] = useState("");
  const [sbtnColor, setsbtnColor] = useState(GlobalStyles.colors.gray05);
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [btnTitle, setBtnTitle] = useState("인증 요청");
  const { signData, setSignData } = useContext(SignContext);
  const navigation = useNavigation();
  const [flex1, setFlex1] = useState(0);
  const flex2 = 10 - flex1;

  const [isVisible, setIsVisible] = useState(false);

  const handlePhoneChange = (text) => {
    setphoneNum(text);

    if (text.length === 11) {
      setsbtnColor(GlobalStyles.colors.gray01);
    } else {
      setsbtnColor(GlobalStyles.colors.gray05);
    }
  };
  const handleAuthChange = (text) => {
    setauthNum(text);
    if (text.length === 6) {
      setFlex1(1);
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setFlex1(0);
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  function requestNumber() {
    if (phoneNum.length === 11) {
      authPhoneNum({ messageType: "JOIN", phone: phoneNum });
      setBtnTitle("다시 요청");
      setIsVisible(true);
    } else {
    }
  }
  function verifyAuthNum() {
    if (authNum.length === 6) {
      verifyauthPhoneNum({
        authNum: authNum,
        messageType: "JOIN",
        phone: phoneNum,
      });
      setSignData({ ...signData, phone: phoneNum });

      navigation.navigate("id");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={flex1} flex2={flex2} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={styles.textContainer}>
            <InputText text="휴대폰 번호를 알려주세요." />
          </View>
          <Text style={styles.text}>
            입력하신 번호로 인증번호가 전송됩니다.
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <InputData
                hint="휴대폰 번호"
                onChangeText={handlePhoneChange}
                value={phoneNum}
                keyboardType="numeric"
              />
            </View>
            <View>
              <ButtonSmall
                title={btnTitle}
                onPress={requestNumber}
                style={sbtnColor}
              />
            </View>
          </View>
          {isVisible && (
            <>
              <View style={styles.lInputContainer}>
                <InputData
                  hint="인증번호"
                  value={authNum}
                  onChangeText={handleAuthChange}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.textSend}>인증번호가 전송되었습니다</Text>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <ButtonBig text="다음" style={lbtnColor} onPress={verifyAuthNum} />
        </View>
      </View>
    </View>
  );
}

export default AuthPhone;

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
    flexDirection: "row",
  },
  lInputContainer: {
    marginHorizontal: 20,
    marginTop: 13,
  },
  input: {
    marginRight: 7,
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: 400,
    color: GlobalStyles.colors.gray04,
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 20,
  },
  textSend: {
    fontSize: 12,
    fontWeight: 400,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
});
