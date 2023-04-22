import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useContext } from "react";

import InputText from "../../components/ui/InputText";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
function School() {
  const [inputName, setInputName] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const navigation = useNavigation();
  const { signData, setSignData } = useContext(SignContext);

  const handleNameChange = (text) => {
    setInputName(text);
    setSignData({ ...signData, name: inputName });
    if (text.length === 6) {
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  const handleBirthChange = (text) => {
    setInputBirth(text);
    setSignData({ ...signData, birth: inputBirth });
  };

  function navigateId() {
    navigation.navigate("school");
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={6} flex2={3} />
      <View style={styles.textContainer}>
        <InputText text="학교를 입력해 주세요." />
      </View>
      <View style={styles.inputContainer}>
        <InputData
          hint="학교를 입력하세요"
          onChangeText={handleNameChange}
          value={inputName}
        />
      </View>
      <View style={styles.textContainer}>
        <InputText text="전공을 입력해 주세요." />
      </View>
      <View style={styles.inputContainer}>
        <InputData
          hint="전공을 입력하세요"
          onChangeText={handleBirthChange}
          value={inputBirth}
        />
      </View>
      <View style={styles.textContainer}>
        <InputText text="학번을 입력해 주세요." />
      </View>
      <View style={styles.inputContainer}>
        <InputData
          hint="학번을 입력하세요"
          onChangeText={handleBirthChange}
          value={inputBirth}
        />
      </View>
      <View style={styles.textContainer}>
        <InputText text="재학유무를 선택해 주세요." />
      </View>
      <Text style={styles.text}>
        재학중인 아닌 경우 모두 휴학으로 선택해 주세요.
      </Text>
      <View style={styles.inputContainer}>
        <InputData
          hint="재학유무를 선택하세요"
          onChangeText={handleBirthChange}
          value={inputBirth}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
      </View>
    </ScrollView>
  );
}

export default School;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 20,
    marginTop: 45,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 78,
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
