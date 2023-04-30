import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
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

  const [visible, setVisible] = useState(false);
  const [display1, setDispaly1] = useState("none");
  const [display2, setDispaly2] = useState("none");
  const [select, setSelect] = useState("가입 유형을 선택해주세요");
  const [statusStyle, setStatusStyle] = useState(styles.textModal);

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
  function statusSelect() {
    if (display1 === "none") {
      setDispaly1("flex");
      setDispaly2("none");
    } else {
      setDispaly1("none");
      setDispaly2("flex");
    }
  }

  function okayBtn() {
    if (display1 === "flex" || display2 === "flex") {
      setInputRole(display1 === "none" ? "ROLE_ADMIN" : "ROLE_USER");
      setSelect(display1 === "none" ? "매니저" : "강사");
      setStatusStyle(styles.textInputText);
      setFlex1(9);
      setlbtnColor(
        inputCode !== ""
          ? GlobalStyles.colors.primaryDefault
          : GlobalStyles.colors.gray05
      );
      setVisible(!visible);
    } else {
      setVisible(!visible);
    }
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
            {/* <InputData
              hint="가입 유형을 선택해주세요"
              onChangeText={handleRoleChange}
              value={inputRole}
            /> */}
            <Pressable onPress={() => setVisible(!visible)}>
              <View style={styles.textInput}>
                <Text style={statusStyle}>{select}</Text>
                <View style={{ marginRight: 13 }}>
                  <Ionicons
                    name="chevron-down"
                    size={25}
                    color={GlobalStyles.colors.gray05}
                  />
                </View>
              </View>
            </Pressable>
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
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        statusBarTranslucent={true}
        onRequestClose={() => setVisible(!visible)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(!visible)}
        >
          <Pressable>
            <View
              style={{
                backgroundColor: "white",
                height: 273,
                justifyContent: "space-between",

                borderTopEndRadius: 5.41,
                borderTopStartRadius: 5.41,
              }}
            >
              <View>
                <View style={styles.statusTitleContainer}>
                  <View style={styles.iconContainer}>
                    <Pressable onPress={() => setVisible(!visible)}>
                      <Ionicons name="close-outline" size={40} />
                    </Pressable>
                  </View>
                  <Text style={styles.statusTitle}>가입 유형</Text>
                </View>
                <Pressable
                  style={styles.statusTextContainer}
                  onPress={statusSelect}
                >
                  <Text style={styles.statusText}>강사</Text>
                  <View style={[styles.iconContainer2, { display: display1 }]}>
                    <Ionicons name="checkmark" size={30} />
                  </View>
                </Pressable>
                <Pressable
                  style={styles.statusTextContainer}
                  onPress={statusSelect}
                >
                  <Text style={styles.statusText}>매니저</Text>
                  <View style={[styles.iconContainer2, { display: display2 }]}>
                    <Ionicons name="checkmark" size={30} />
                  </View>
                </Pressable>
              </View>
              <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
                <ButtonBig
                  text="확인"
                  style={GlobalStyles.colors.primaryDefault}
                  onPress={okayBtn}
                />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  textInput: {
    height: 40,
    width: "100%",
    borderColor: GlobalStyles.colors.gray05,
    borderWidth: 1,
    borderRadius: 5.41,
    paddingLeft: 20,
    lineHeight: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textModal: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    color: GlobalStyles.colors.gray05,
  },
  textInputText: {
    lineHeight: 20,
    fontSize: 15,
    color: GlobalStyles.colors.gray01,
    fontWeight: "600",
  },
  statusTitleContainer: {
    flexDirection: "row",
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
    height: 53,
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: 600,
    lineHeight: 22,
    marginTop: 3,
    flex: 1,

    marginRight: 50,
    textAlign: "center",
  },
  statusText: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
    marginLeft: 20,
  },
  statusTextContainer: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 0.5,
    height: 42,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: 10,
    marginTop: 3,
  },
  iconContainer2: {
    marginRight: 10,
    marginTop: 2,
  },
});
