import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import InputText from "../../components/ui/InputText";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
import { Ionicons } from "@expo/vector-icons";
import { signUp } from "../../utill/auth";

import { WithLocalSvg } from "react-native-svg";
import Checkmark from "../../assets/checkmark.svg";
import Checkbox from "../../assets/checkbox.svg";
import CheckmarkAfter from "../../assets/checkmark_after.svg";
import CheckboxAfter from "../../assets/checkbox_after.svg";
import Right from "../../assets/right.svg";
import Down from "../../assets/down.svg";
import Modalx from "../../assets/modalx.svg";
import ModalCheck from "../../assets/modalcheck.svg";

function Code() {
  const [inputCode, setInputCode] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [inputGeneration, setInputGeneration] = useState(0);

  const [visible, setVisible] = useState(false);
  const [visibleCode, setVisibleCode] = useState(false);
  const [display1, setDispaly1] = useState("none");
  const [display2, setDispaly2] = useState("none");
  const [cdisplay3, setCDisplay3] = useState("none");
  const [cdisplay4, setCDisplay4] = useState("none");
  const [cdisplay1, setCDisplay1] = useState("none");
  const [cdisplay2, setCDisplay2] = useState("none");
  const [select, setSelect] = useState("가입 유형을 선택하세요");
  const [selectCode, setSelectCode] = useState("기수를 선택하세요");
  const [statusStyle, setStatusStyle] = useState(styles.textModal);
  const [statusGStyle, setStatusGStyle] = useState(styles.textModal);

  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const navigation = useNavigation();
  const { signData, setSignData } = useContext(SignContext);

  const [accept1, setAccept1] = useState(false);
  const [accept2, setAccept2] = useState(false);

  const handleCodeChange = (text) => {
    setInputCode(text);
  };

  useEffect(() => {
    setlbtnColor(
      inputRole !== "" &&
        inputCode !== "" &&
        accept1 &&
        accept2 &&
        inputGeneration
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  }, [accept1, accept2, inputCode, inputRole, inputGeneration]);

  function navigateId() {
    if (
      inputRole !== "" &&
      inputCode !== "" &&
      accept1 &&
      accept2 &&
      inputGeneration
    ) {
      signUp({
        account: signData.account,
        birth: signData.birth,
        doroAuth: inputCode,
        gender: "FEMALE",
        generation: inputGeneration,
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

  function generationSelect1() {
    setCDisplay1("flex");
    setCDisplay2("none");
    setCDisplay3("none");
    setCDisplay4("none");
  }
  function generationSelect2() {
    setCDisplay1("none");
    setCDisplay2("flex");
    setCDisplay3("none");
    setCDisplay4("none");
  }
  function generationSelect3() {
    setCDisplay1("none");
    setCDisplay2("none");
    setCDisplay3("flex");
    setCDisplay4("none");
  }
  function generationSelect4() {
    setCDisplay1("none");
    setCDisplay2("none");
    setCDisplay3("none");
    setCDisplay4("flex");
  }

  function okayBtn() {
    if (display1 === "flex" || display2 === "flex") {
      setInputRole(display1 === "none" ? "ROLE_ADMIN" : "ROLE_USER");
      setSelect(display1 === "none" ? "매니저" : "강사");
      setStatusStyle(styles.textInputText);

      setVisible(!visible);
    } else {
      setVisible(!visible);
    }
  }
  function okayBtn2() {
    if (
      cdisplay1 === "flex" ||
      cdisplay2 === "flex" ||
      cdisplay3 === "flex" ||
      cdisplay4 === "flex"
    ) {
      if (cdisplay1 === "flex") {
        setInputGeneration(0);
        setSelectCode("0기");
      } else if (cdisplay2 === "flex") {
        setInputGeneration(1);
        setSelectCode("1기");
      } else if (cdisplay3 === "flex") {
        setInputGeneration(2);
        setSelectCode("2기");
      } else {
        setInputGeneration(3);
        setSelectCode("3기");
      }
      setStatusGStyle(styles.textInputText);

      setVisibleCode(!visibleCode);
    } else {
      setVisibleCode(!visibleCode);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Bar num={3} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView>
          <View style={[styles.textContainer, { marginTop: 35 }]}>
            <InputText text="기수를 입력해 주세요." />
          </View>
          <View style={styles.inputContainer}>
            <Pressable onPress={() => setVisibleCode(!visibleCode)}>
              <View style={styles.textInput}>
                <Text style={statusGStyle}>{selectCode}</Text>
                <View style={{ marginRight: 13 }}>
                  <WithLocalSvg asset={Down} />
                </View>
              </View>
            </Pressable>
          </View>
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
                  <WithLocalSvg asset={Down} />
                </View>
              </View>
            </Pressable>
          </View>

          <View style={[styles.inputContainer, { marginTop: 10 }]}>
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
              style={{
                flexDirection: "row",
                marginTop: 21,
                marginLeft: 20,
              }}
            >
              <Pressable
                onPress={() => {
                  setAccept1(!accept1);
                  setAccept2(!accept2);
                }}
              >
                <View style={{ marginTop: -3 }}>
                  <WithLocalSvg
                    asset={accept1 && accept2 ? CheckboxAfter : Checkbox}
                  />
                </View>
              </Pressable>
              <Text
                style={[
                  styles.acceptText,
                  {
                    color:
                      accept1 && accept2
                        ? GlobalStyles.colors.gray01
                        : GlobalStyles.colors.gray05,
                  },
                ]}
              >
                전체동의
              </Text>
            </View>
            <View style={styles.acceptContentContainer}>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => {
                    setAccept1(!accept1);
                  }}
                >
                  <View style={{ marginTop: 4 }}>
                    <WithLocalSvg
                      asset={!accept1 ? Checkmark : CheckmarkAfter}
                    />
                  </View>
                </Pressable>

                <Text
                  style={[
                    styles.acceptContentText,
                    {
                      color: accept1
                        ? GlobalStyles.colors.gray01
                        : GlobalStyles.colors.gray05,
                    },
                  ]}
                >
                  [필수] 이용약관
                </Text>
              </View>
              <Pressable
                style={{ marginRight: 35 }}
                onPress={() => navigation.navigate("agreeInfo")}
              >
                <WithLocalSvg asset={Right} />
              </Pressable>
            </View>
            <View style={styles.acceptContentContainer}>
              <View style={{ flexDirection: "row", marginBottom: 40 }}>
                <Pressable
                  onPress={() => {
                    setAccept2(!accept2);
                  }}
                >
                  <View style={{ marginTop: 4 }}>
                    <WithLocalSvg
                      asset={!accept2 ? Checkmark : CheckmarkAfter}
                    />
                  </View>
                </Pressable>
                <Text
                  style={[
                    styles.acceptContentText,
                    {
                      color: accept2
                        ? GlobalStyles.colors.gray01
                        : GlobalStyles.colors.gray05,
                    },
                  ]}
                >
                  [필수] 개인정보 수집 및 이용
                </Text>
              </View>
              <Pressable
                style={{ marginRight: 35 }}
                onPress={() => navigation.navigate("agreeInfo2")}
              >
                <WithLocalSvg asset={Right} />
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
                      <WithLocalSvg asset={Modalx} />
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
                    <WithLocalSvg asset={ModalCheck} />
                  </View>
                </Pressable>
                <Pressable
                  style={styles.statusTextContainer}
                  onPress={statusSelect}
                >
                  <Text style={styles.statusText}>매니저</Text>
                  <View style={[styles.iconContainer2, { display: display2 }]}>
                    <WithLocalSvg asset={ModalCheck} />
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
      <Modal
        animationType="none"
        transparent={true}
        visible={visibleCode}
        statusBarTranslucent={true}
        onRequestClose={() => setVisibleCode(!visibleCode)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisibleCode(!visibleCode)}
        >
          <Pressable>
            <View
              style={{
                backgroundColor: "white",
                height: 357,
                justifyContent: "space-between",

                borderTopEndRadius: 5.41,
                borderTopStartRadius: 5.41,
              }}
            >
              <View>
                <View style={styles.statusTitleContainer}>
                  <View style={styles.iconContainer}>
                    <Pressable onPress={() => setVisibleCode(!visibleCode)}>
                      <WithLocalSvg asset={Modalx} />
                    </Pressable>
                  </View>
                  <Text style={styles.statusTitle}>가입 유형</Text>
                </View>
                <Pressable
                  style={styles.statusTextContainer}
                  onPress={generationSelect1}
                >
                  <Text style={styles.statusText}>0기</Text>
                  <View style={[styles.iconContainer2, { display: cdisplay1 }]}>
                    <WithLocalSvg asset={ModalCheck} />
                  </View>
                </Pressable>
                <Pressable
                  style={styles.statusTextContainer}
                  onPress={generationSelect2}
                >
                  <Text style={styles.statusText}>1기</Text>
                  <View style={[styles.iconContainer2, { display: cdisplay2 }]}>
                    <WithLocalSvg asset={ModalCheck} />
                  </View>
                </Pressable>
                <Pressable
                  style={styles.statusTextContainer}
                  onPress={generationSelect3}
                >
                  <Text style={styles.statusText}>2기</Text>
                  <View style={[styles.iconContainer2, { display: cdisplay3 }]}>
                    <WithLocalSvg asset={ModalCheck} />
                  </View>
                </Pressable>
                <Pressable
                  style={styles.statusTextContainer}
                  onPress={generationSelect4}
                >
                  <Text style={styles.statusText}>3기</Text>
                  <View style={[styles.iconContainer2, { display: cdisplay4 }]}>
                    <WithLocalSvg asset={ModalCheck} />
                  </View>
                </Pressable>
              </View>
              <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
                <ButtonBig
                  text="확인"
                  style={GlobalStyles.colors.primaryDefault}
                  onPress={okayBtn2}
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
    marginHorizontal: 23,
    marginTop: 50,
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
    marginLeft: 19,
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
    backgroundColor: "rgba(84, 84, 86, 0.3)",
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

    marginRight: 48,
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
    marginLeft: 20,
    marginTop: 3,
  },
  iconContainer2: {
    marginRight: 22,
    marginTop: 2,
  },
});
