import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import InputText from "../../components/ui/InputText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
function Name({ navigation, route }) {
  // const statusBarHeight = route.params.h;
  const [inputName, setInputName] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);

  const { signData, setSignData } = useContext(SignContext);

  const [date, setDate] = useState(new Date(961741730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleNameChange = (text) => {
    setInputName(text);

    setlbtnColor(
      text ? GlobalStyles.colors.primaryAccent : GlobalStyles.colors.gray05
    );
  };

  const handleBirthChange = (text) => {
    setInputBirth(text);

    setlbtnColor(
      text && inputName !== ""
        ? GlobalStyles.colors.primaryAccent
        : GlobalStyles.colors.gray05
    );
  };

  function navigateId() {
    if (inputName !== "") {
      setSignData({
        ...signData,
        name: inputName,
        birth: date.toLocaleDateString().replace(/\//g, "-"),
      });

      navigation.navigate("school", { h: statusBarHeight });
    } else {
    }
  }

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
                <InputText text="생년월일을 입력해 주세요." />
              </View>
              <View>
                <Pressable onPress={() => setShow(!show)}>
                  <View style={styles.inputContainer}>
                    {/* <Pressable> */}
                    {/* <InputData
                      hint="생년월일"
                      onChangeText={handleBirthChange}
                      value={date.toLocaleDateString()}
                      readOnly={true}
                    /> */}
                    <View style={styles.textInputContainer}>
                      <Text style={styles.textInput} placeholder="생년월일">
                        {date.toLocaleDateString().replace(/\//g, "-")}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  onChange={onChange}
                  display="spinner"
                />
              )}
            </View>

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
  textInputContainer: {
    height: 40,
    width: "100%",
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
