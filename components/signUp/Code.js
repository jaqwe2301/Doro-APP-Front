import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useContext } from "react";

import InputText from "../../components/ui/InputText";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
import { Ionicons } from "@expo/vector-icons";
function Code() {
  const [inputCode, setInputCode] = useState("");
  const [inputRole, setInputRole] = useState("");

  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const navigation = useNavigation();
  const { signData, setSignData } = useContext(SignContext);

  const handleCodeChange = (text) => {
    setInputCode(text);
    setSignData({ ...signData, doroAuth: inputCode });
    if (text.length === 6) {
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  const handleRoleChange = (text) => {
    setInputRole(text);
    setSignData({ ...signData, role: inputRole });
  };

  function navigateId() {
    navigation.navigate("finish");
  }

  function naviAgreeInfo() {
    navigation.navigate("agreeInfo");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar flex1={8} flex2={1} />
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
          <View style={{ flexDirection: "row" }}>
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
      <View style={styles.buttonContainer}>
        <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
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
    marginTop: 84,
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
