import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { authPhoneNum } from "../../utill/auth";
import InputSmall from "../ui/InputSmall";
import ButtonBig from "../ui/ButtonBig";
import InputText from "../ui/InputText";
import { useNavigation, useRoute } from "@react-navigation/native";

function Pw() {
  const route = useRoute();
  const { id } = route.params;
  const [inputId, setInputId] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const navigation = useNavigation();

  const handleIdChange = (text) => {
    setInputId(text);
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.textContainer}>
        <InputText text="비밀번호를 입력해 주세요." />
      </View>
      <View>
        <Text>{id}</Text>
        <Text style={styles.text}>계정의 비밀번호를 설정합니다.</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputSmall
          hint="영문 또는 숫자 4~20자"
          onChangeText={handleIdChange}
          value={inputId}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonBig text="다음" style={lbtnColor} />
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
    marginTop: 44,
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
  },
  textSend: {
    fontSize: 12,
    fontWeight: 400,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
});
