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
  const [inputSchool, setInputSchool] = useState("");
  const [inputMajor, setInputMajor] = useState("");
  const [inputStudentId, setInputStudentId] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [isNavi, setIsNavi] = useState(false);
  const navigation = useNavigation();
  const { signData, setSignData } = useContext(SignContext);

  const handleSchoolChange = (text) => {
    setInputSchool(text);

    setlbtnColor(
      text !== "" &&
        inputMajor !== "" &&
        inputStudentId !== "" &&
        inputStatus !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };

  const handleMajorChange = (text) => {
    setInputMajor(text);

    setlbtnColor(
      text !== "" &&
        inputSchool !== "" &&
        inputStudentId !== "" &&
        inputStatus !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };
  const handleStudentIdChange = (text) => {
    setInputStudentId(text);
    setlbtnColor(
      text !== "" &&
        inputMajor !== "" &&
        inputSchool !== "" &&
        inputStatus !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };
  const handleStatusChange = (text) => {
    setInputStatus(text);
    setlbtnColor(
      text !== "" &&
        inputMajor !== "" &&
        inputStudentId !== "" &&
        inputSchool !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };

  function navigateId() {
    setSignData({
      ...signData,
      school: inputSchool,
      major: inputMajor,
      studentId: inputStudentId,
      studentStatus: inputStatus,
    });
    if (
      inputSchool !== "" &&
      inputMajor !== "" &&
      inputStudentId !== "" &&
      inputStatus !== ""
    ) {
      navigation.navigate("code");
    } else {
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={6} flex2={3} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView>
          <View style={styles.textContainer}>
            <InputText text="학교를 입력해 주세요." />
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="학교를 입력하세요"
              onChangeText={handleSchoolChange}
              value={inputSchool}
            />
          </View>
          <View style={styles.textContainer}>
            <InputText text="전공을 입력해 주세요." />
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="전공을 입력하세요"
              onChangeText={handleMajorChange}
              value={inputMajor}
            />
          </View>
          <View style={styles.textContainer}>
            <InputText text="학번을 입력해 주세요." />
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="학번을 입력하세요"
              onChangeText={handleStudentIdChange}
              value={inputStudentId}
            />
          </View>
          <View style={styles.textContainer}>
            <InputText text="재학유무를 선택해 주세요." />
          </View>
          <Text style={styles.text}>
            재학중인 아닌 경우 모두 휴학으로 선택해 주세요.
          </Text>
          <View style={[styles.inputContainer, { marginBottom: 78 }]}>
            <InputData
              hint="재학유무를 선택하세요"
              onChangeText={handleStatusChange}
              value={inputStatus}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
        </View>
      </View>
    </View>
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
