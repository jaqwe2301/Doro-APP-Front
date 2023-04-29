import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useState, useContext } from "react";

import InputText from "../../components/ui/InputText";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
import { Ionicons } from "@expo/vector-icons";
import { signUp } from "../../utill/auth";
function Code() {
  const [inputCode, setInputCode] = useState("");
  const [inputRole, setInputRole] = useState("");

  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const navigation = useNavigation();
  const { signData, setSignData } = useContext(SignContext);
  const [flex1, setFlex1] = useState(9);
  const flex2 = 10 - flex1;

  const handleCodeChange = (text) => {
    setInputCode(text);

    setlbtnColor(
      text !== "" && inputRole !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };

  const handleRoleChange = (text) => {
    setInputRole(text);
    setlbtnColor(
      text !== "" && inputCode !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };

  function navigateId() {
    if (inputRole !== "" && inputCode !== "") {
      signUp({
        account: signData.account,
        birth: signData.birth,
        doroAuth: inputCode,
        gender: "FEMALE",
        generation: 1,
        major: signData.major,
        name: signData.name,
        password: signData.password,
        passwordCheck: signData.passwordCheck,
        phone: signData.phone,
        role: inputRole,
        profileImg: "",
        school: signData.school,
        studentId: signData.studentId,
        studentStatus: signData.studentStatus,
      });
      navigation.navigate("finish");
    } else {
    }
  }

  function naviAgreeInfo() {
    navigation.navigate("agreeInfo");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={flex1} flex2={flex2} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView>
          <View style={styles.textContainer}>
            <InputText text="가입코드를 입력해 주세요." />
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="가입 유형을 선택해주세요"
              onChangeText={handleRoleChange}
              value={inputRole}
            />
          </View>

          <View style={styles.inputContainer}>
            <InputData
              hint="가입 코드를 입력해주세요"
              onChangeText={handleCodeChange}
              value={inputCode}
            />
          </View>
          <View style={styles.textContainer}>
            <InputText text="약관에 동의해 주세요" />
          </View>
          <View>
            <View
              style={{ flexDirection: "row", marginTop: 21, marginLeft: 22.57 }}
            >
              <Ionicons
                name="checkbox"
                color={GlobalStyles.colors.gray05}
                size={23}
              />
              <Text style={styles.acceptText}>전체동의</Text>
            </View>
            <View style={styles.acceptContentContainer}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="checkmark"
                  color={GlobalStyles.colors.gray05}
                  size={15}
                />

                <Text style={styles.acceptContentText}>[필수] 이용약관</Text>
              </View>
              <Pressable style={{ marginRight: 42 }} onPress={naviAgreeInfo}>
                <Ionicons
                  name="chevron-forward"
                  color={GlobalStyles.colors.gray05}
                  size={20}
                />
              </Pressable>
            </View>
            <View style={styles.acceptContentContainer}>
              <View style={{ flexDirection: "row", marginBottom: 40 }}>
                <Ionicons
                  name="checkmark"
                  color={GlobalStyles.colors.gray05}
                  size={15}
                />
                <Text style={styles.acceptContentText}>
                  [필수] 개인정보 수집 및 이용
                </Text>
              </View>
              <Pressable style={{ marginRight: 42 }} onPress={naviAgreeInfo}>
                <Ionicons
                  name="chevron-forward"
                  color={GlobalStyles.colors.gray05}
                  size={20}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
        </View>
      </View>
    </View>
  );
}

export default Code;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 20,
    marginTop: 44,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 34,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 13,
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
  acceptText: {
    fontSize: 17,
    fontWeight: 600,
    lineHeight: 22,
    marginLeft: 21,
    color: GlobalStyles.colors.gray05,
  },
  acceptContentText: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
    marginLeft: 26,
    color: GlobalStyles.colors.gray05,
  },
  acceptContentContainer: {
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 27,

    justifyContent: "space-between",
  },
});
