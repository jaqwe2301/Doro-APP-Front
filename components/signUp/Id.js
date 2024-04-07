import {
  View,
  Text,
  StyleSheet,
  Alert,
  NativeModules,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from "react-native";
import { useContext, useEffect, useState } from "react";

import InputText from "../../components/ui/InputText";
import ButtonSmall from "../../components/ui/ButtonSmall";
import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
import { checkAccount } from "../../utill/auth";
function Id({ navigation, route }) {
  const [inputId, setInputId] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [isNavi, setIsNavi] = useState(false);
  // const statusBarHeight = route.params.h;

  const [isVisible, setIsVisible] = useState(false);

  const { signData, setSignData } = useContext(SignContext);

  const handleIdChange = (text) => {
    setInputId(text);

    if (
      text.length >= 4 &&
      text.length <= 20 &&
      text.search(/[a-zA-Z0-9]+/g) >= 0 &&
      !/\s/.test(text)
    ) {
      setIsNavi(true);
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setIsNavi(false);
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  async function navigateId() {
    if (isNavi) {
      Keyboard.dismiss();
      try {
        const response = await checkAccount({
          account: inputId,
        });

        if (response.success) {
          setSignData({ ...signData, account: inputId });
          navigation.navigate("pw", { h: statusBarHeight });
        } else {
          setIsVisible(true);
        }
      } catch (error) {
        if (error.response) {
          // 서버가 응답을 반환한 경우
          if (error.response.data.code === "AUTH009") {
            Alert.alert(
              "이미 존재하는 아이디",
              "해당 아이디를 사용할 수 없습니다."
            );
          }
        } else if (error.request) {
          // 요청이 만들어졌지만, 응답을 받지 못한 경우
        } else {
          // 그 외의 에러
        }
      }
    } else {
      // Alert.alert("Input Error", "아이디를 제대로 입력해주세요");
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 44 + statusBarHeight : 0
        }
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Bar num={1} />
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <ScrollView>
              <View>
                <View style={styles.textContainer}>
                  <InputText text="아이디를 입력해 주세요" />
                </View>
                <Text style={styles.text}>
                  입력하신 아이디는 로그인 시 사용됩니다.
                </Text>
                <View style={styles.inputContainer}>
                  <InputData
                    hint="영문 또는 숫자 4~20자"
                    onChangeText={handleIdChange}
                    value={inputId}
                  />
                  {isVisible && (
                    <Text style={styles.failText}>
                      해당 아이디는 이미 존재합니다.
                    </Text>
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Id;

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
    marginTop: 20,
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
    marginLeft: 23,
    marginTop: 6,

    lineHeight: 20,
  },
  textSend: {
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
  failText: {
    color: GlobalStyles.colors.red,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 17,
    marginLeft: 10,
    marginTop: 3,
  },
});
