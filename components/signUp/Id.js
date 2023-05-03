import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import InputSmall from "../../components/ui/InputSmall";
import InputText from "../../components/ui/InputText";
import ButtonSmall from "../../components/ui/ButtonSmall";
import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";

function Id() {
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

  function navigateId() {
    navigation.navigate("pw", { id: inputId });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.textContainer}>
        <InputText text="아이디를 입력해 주세요." />
      </View>
      <Text style={styles.text}>입력하신 아이디는 로그인 시 사용됩니다.</Text>
      <View style={styles.inputContainer}>
        <InputSmall
          hint="영문 또는 숫자 4~20자"
          onChangeText={handleIdChange}
          value={inputId}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
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
