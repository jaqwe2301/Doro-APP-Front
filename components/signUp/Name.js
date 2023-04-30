import { View, Text, StyleSheet } from "react-native";
import { useState, useContext } from "react";

import InputText from "../../components/ui/InputText";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
function Name() {
  const [inputName, setInputName] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const navigation = useNavigation();
  const [flex1, setFlex1] = useState(3);
  const flex2 = 10 - flex1;
  const { signData, setSignData } = useContext(SignContext);

  const handleNameChange = (text) => {
    setInputName(text);
    setFlex1(4);

    // if () {
    //   setlbtnColor(GlobalStyles.colors.primaryAccent);
    // } else {
    //   setlbtnColor(GlobalStyles.colors.gray05);
    // }
    setlbtnColor(
      text && inputBirth !== ""
        ? GlobalStyles.colors.primaryAccent
        : GlobalStyles.colors.gray05
    );
  };

  const handleBirthChange = (text) => {
    setInputBirth(text);
    setFlex1(5);
    setlbtnColor(
      text && inputName !== ""
        ? GlobalStyles.colors.primaryAccent
        : GlobalStyles.colors.gray05
    );
  };

  function navigateId() {
    if (inputName !== "" && inputBirth !== "") {
      setSignData({ ...signData, name: inputName, birth: inputBirth });

      navigation.navigate("school");
    } else {
      setFlex1(4);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={flex1} flex2={flex2} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={styles.textContainer}>
            <InputText text="이름을 입력해 주세요." />
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="이름"
              onChangeText={handleNameChange}
              value={inputName}
            />
          </View>
          <View style={styles.textContainer}>
            <InputText text="생년월일을 입력해 주세요." />
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="생년월일"
              onChangeText={handleBirthChange}
              value={inputBirth}
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

export default Name;

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
  },
  textSend: {
    fontSize: 12,
    fontWeight: 400,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
});
