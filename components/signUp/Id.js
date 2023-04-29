import { View, Text, StyleSheet, Alert } from "react-native";
import { useContext, useState } from "react";

import InputText from "../../components/ui/InputText";
import ButtonSmall from "../../components/ui/ButtonSmall";
import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
function Id() {
  const [inputId, setInputId] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [isNavi, setIsNavi] = useState(false);
  const navigation = useNavigation();

  const { signData, setSignData } = useContext(SignContext);

  const handleIdChange = (text) => {
    setInputId(text);

    if (
      text.length >= 4 &&
      text.length <= 20 &&
      text.search(/[a-zA-Z0-9]+/g) >= 0
    ) {
      setIsNavi(true);
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setIsNavi(false);
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  function navigateId() {
    if (isNavi) {
      setSignData({ ...signData, account: inputId });
      navigation.navigate("pw");
    } else {
      // Alert.alert("Input Error", "아이디를 제대로 입력해주세요");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={2} flex2={8} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={styles.textContainer}>
            <InputText text="아이디를 입력해 주세요." />
          </View>
          <Text style={styles.text}>
            입력하신 아이디는 로그인 시 사용됩니다.
          </Text>
          <View style={styles.inputContainer}>
            <InputData
              hint="영문 또는 숫자 4~20자"
              onChangeText={handleIdChange}
              value={inputId}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
        </View>
      </View>
    </View>
  );
}

export default Id;

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
