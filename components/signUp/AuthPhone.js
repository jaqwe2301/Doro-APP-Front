import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import InputSmall from "../../components/ui/InputSmall";
import InputText from "../../components/ui/InputText";
import ButtonSmall from "../../components/ui/ButtonSmall";
import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";

import { useNavigation } from "@react-navigation/native";
import { authPhoneNum, verifyauthPhoneNum } from "../../utill/auth";

function AuthPhone() {
  const [phoneNum, setphoneNum] = useState("");
  const [authNum, setauthNum] = useState("");
  const [sbtnColor, setsbtnColor] = useState(GlobalStyles.colors.gray05);
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
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
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  function requestNumber() {
    authPhoneNum({ messageType: "ACCOUNT", phone: phoneNum });
    setIsVisible(true);
  }

  function verifyAuthNum() {
    verifyauthPhoneNum({
      authNum: authNum,
      messageType: "ACCOUNT",
      phone: phoneNum,
    });

    navigation.navigate("id");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.textContainer}>
        <InputText text="휴대폰 번호를 알려주세요." />
      </View>
      <Text style={styles.text}>입력하신 번호로 인증번호가 전송됩니다.</Text>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <InputSmall
            hint="휴대폰 번호"
            onChangeText={handlePhoneChange}
            value={phoneNum}
          />
        </View>
        <View>
          <ButtonSmall
            title="인증 요청"
            onPress={requestNumber}
            style={sbtnColor}
          />
        </View>
      </View>
      {isVisible && (
        <>
          <View style={styles.lInputContainer}>
            <InputSmall
              hint="인증번호"
              value={authNum}
              onChangeText={handleAuthChange}
            />
          </View>
          <Text style={styles.textSend}>인증번호가 전송되었습니다</Text>
        </>
      )}
      <View style={styles.buttonContainer}>
        <ButtonBig text="다음" style={lbtnColor} onPress={verifyAuthNum} />
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
    marginTop: 44,
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
  },
  textSend: {
    fontSize: 12,
    fontWeight: 400,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
});
