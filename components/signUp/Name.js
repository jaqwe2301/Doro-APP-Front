import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
  SafeAreaView,
  Pressable,
  ScrollView,
  Modal,
  Keyboard,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import Left from "../../assets/left.svg";
import InputText from "../../components/ui/InputText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
import { KRBold } from "../../constants/fonts";

import CheckboxBefore from "../../assets/checkbox.svg";
import CheckboxAfter from "../../assets/checkbox_after.svg";

function Name({ navigation, route }) {
  // const statusBarHeight = route.params.h;
  const [inputName, setInputName] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);

  const { signData, setSignData } = useContext(SignContext);
  const [btn, setBtn] = useState(false);
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [gender, setGender] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (Platform.OS === "android") {
      setShow(false);
      // setBtn(true);
      setlbtnColor(
        inputName !== ""
          ? GlobalStyles.colors.primaryDefault
          : GlobalStyles.colors.gray05
      );
    }
    setDate(currentDate);
  };

  const handleNameChange = (text) => {
    setInputName(text);

    setlbtnColor(
      text ? GlobalStyles.colors.primaryDefault : GlobalStyles.colors.gray05
    );
  };

  function okayBtn() {
    setShow(false);
    // setBtn(true);
    setlbtnColor(
      inputName !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  }

  function navigateId() {
    Keyboard.dismiss();
    setTimeout(() => {
      if (inputName !== "") {
        setSignData({
          ...signData,
          name: inputName,
          birth: check
            ? date
                .toLocaleDateString("ko-KR", options)
                .replace(/\./g, "-")
                .replace(/\.|-$/, "")
                .replace(/\s/g, "")
            : "",
          gender: gender,
        });
        navigation.navigate("school", { h: statusBarHeight });
      } else {
      }
    }, 50);
  }
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Bar num={2} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? 44 + statusBarHeight : 0
          }
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <ScrollView>
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
                <View style={[styles.textContainer, { marginTop: 50 }]}>
                  <InputText text="생년월일을 입력해 주세요." option="선택" />
                </View>
                <View>
                  <Pressable
                    onPress={() =>
                      setCheck((prev) => {
                        prev ? setDate("") : setDate(new Date("2000-06-23"));
                        return !prev;
                      })
                    }
                  >
                    <View
                      style={{
                        paddingHorizontal: 20,
                        flexDirection: "row",
                        marginTop: 8,
                        alignItems: "center",
                        // backgroundColor: "red",
                      }}
                    >
                      {check ? (
                        <CheckboxAfter width={30} height={30} />
                      ) : (
                        <CheckboxBefore width={30} height={30} />
                      )}
                      <Text style={{ marginBottom: 2, marginLeft: 6 }}>
                        {check
                          ? "체크박스를 누르면 생년월일 입력을 취소할 수 있습니다."
                          : "체크박스를 누르면 생년월일을 입력할 수 있습니다."}
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={() => setShow(!show)} style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                      {/* <Pressable> */}
                      {/* <InputData
                      hint="생년월일"
                      onChangeText={handleBirthChange}
                      value={date.toLocaleDateString()}
                      readOnly={true}
                    /> */}
                      {check ? (
                        <View
                          style={[
                            styles.textInputContainer,
                            !check
                              ? { backgroundColor: GlobalStyles.colors.gray06 }
                              : "",
                          ]}
                        >
                          <Text style={styles.textInput} placeholder="생년월일">
                            {/* {Platform.OS === "ios"
                              ? check
                                ? date.toLocaleDateString().replace(/\//g, "-")
                                : ""
                              :  */}
                            {check
                              ? date
                                  .toLocaleDateString("ko-KR", options)
                                  .replace(/\./g, "-")
                                  .replace(/\.|-$/, "")
                                  .replace(/\s/g, "")
                              : ""}
                            {/* } */}
                          </Text>
                        </View>
                      ) : (
                        ""
                      )}
                    </View>
                  </Pressable>
                </View>
                <View style={[styles.textContainer, { marginTop: 50 }]}>
                  <InputText text="성별을 선택해 주세요." option="선택" />
                </View>
                <View
                  style={{
                    marginHorizontal: 20,
                    marginTop: 10,
                    gap: 10,
                    flexDirection: "row",
                    paddingLeft: 2,
                  }}
                >
                  <Pressable
                    onPress={() =>
                      setGender((prev) => (prev === "MALE" ? "" : "MALE"))
                    }
                  >
                    <View style={{ flexDirection: "row", gap: 4 }}>
                      {gender === "MALE" ? (
                        <CheckboxAfter width={30} height={30} />
                      ) : (
                        <CheckboxBefore width={30} height={30} />
                      )}
                      <Text style={{ fontSize: 16, marginTop: 3 }}>남자</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      setGender((prev) => (prev === "FEMALE" ? "" : "FEMALE"))
                    }
                  >
                    <View style={{ flexDirection: "row", gap: 4 }}>
                      {gender === "FEMALE" ? (
                        <CheckboxAfter width={30} height={30} />
                      ) : (
                        <CheckboxBefore width={30} height={30} />
                      )}
                      <Text style={{ fontSize: 16, marginTop: 3 }}>여자</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
            {Platform.OS === "ios" ? (
              <Modal
                animationType="none"
                transparent={true}
                visible={show}
                statusBarTranslucent={true}
                onRequestClose={() => setShow(!show)}
              >
                <SafeAreaView style={{ flex: 1 }}>
                  <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setShow(!show)}
                  >
                    <Pressable>
                      <View
                        style={{
                          backgroundColor: "white",
                          height: 379,
                          justifyContent: "space-between",

                          borderTopEndRadius: 5.41,
                          borderTopStartRadius: 5.41,
                        }}
                      >
                        <View
                          style={{
                            marginTop: 32,
                            marginLeft: 16,
                            flexDirection: "row",

                            alignItems: "center",
                          }}
                        >
                          <Left width={24} height={24} />
                          <Text style={KRBold.Headline4}>
                            태어난 년월을 선택하세요
                          </Text>
                        </View>
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode="date"
                          // is24Hour={true}
                          onChange={onChange}
                          display="spinner"
                          locale="ko"
                          positiveButton={{ label: "확인", textColor: "green" }}
                          textColor={GlobalStyles.colors.gray01}
                          negativeButton={{ label: "취소", textColor: "red" }}
                        />

                        <View
                          style={{ marginBottom: 34, marginHorizontal: 20 }}
                        >
                          <ButtonBig
                            text="확인"
                            style={GlobalStyles.colors.primaryDefault}
                            onPress={okayBtn}
                          />
                        </View>
                      </View>
                    </Pressable>
                  </Pressable>
                </SafeAreaView>
              </Modal>
            ) : (
              show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  // is24Hour={true}
                  onChange={onChange}
                  display="spinner"
                  locale="ko"
                  // positiveButton={{ label: "확인", textColor: "green" }}
                  textColor={GlobalStyles.colors.gray01}
                  // negativeButton={{ label: "취소", textColor: "red" }}
                />
              )
            )}
            <View style={styles.buttonContainer}>
              <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

export default Name;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 23,
    marginTop: 35,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(84, 84, 86, 0.3)",
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 34,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 13,
    // flexDirection:"row"
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
    fontWeight: "400",
    color: GlobalStyles.colors.gray04,
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 18,
  },
  textSend: {
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
  textInputContainer: {
    height: 40,
    flex: 1,
    borderColor: GlobalStyles.colors.gray05,
    borderWidth: 1,
    borderRadius: 5.41,
    paddingLeft: 20,
    lineHeight: 20,
    fontSize: 15,
    justifyContent: "center",
  },
  textInput: {
    lineHeight: 20,
    fontSize: 15,
    color: GlobalStyles.colors.gray01,
    fontWeight: "600",
  },
});
