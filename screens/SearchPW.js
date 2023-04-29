import { View, Text, StyleSheet, Alert } from "react-native";

import { GlobalStyles } from "../constants/styles";
import InputSmall from "../components/ui/InputData";
import ButtonSmall from "../components/ui/ButtonSmall";
import InputData from "../components/ui/InputData";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { authPhoneNum, changePassword, findAccount } from "../utill/auth";
import ButtonBig from "../components/ui/ButtonBig";
import { verifyauthPhoneNum } from "../utill/auth";

function SearchPW() {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNum, setphoneNum] = useState("");

  const [id, setId] = useState("");
  const [authNum, setauthNum] = useState("");
  const [sbtnColor, setsbtnColor] = useState(GlobalStyles.colors.gray05);
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);

  const navigation = useNavigation();

  const handlePhoneChange = (text) => {
    setphoneNum(text);
    if (text.length === 11) {
      setsbtnColor(GlobalStyles.colors.gray01);
    } else {
      setsbtnColor(GlobalStyles.colors.gray05);
    }
  };

  const handleIdChange = (text) => {
    setId(text);
  };

  const handleAuthChange = (text) => {
    setauthNum(text);
    if (text.length === 6) {
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  async function verifyAuthNum() {
    if (authNum.length === 6) {
      try {
        const success = await verifyauthPhoneNum({
          authNum: authNum,
          messageType: "PASSWORD",
          phone: phoneNum,
        });

        console.log(success);
        if (success) {
          navigation.navigate("changePw", { id: id, phone: phoneNum });
        } else {
          Alert.alert("인증번호 불일치", "정확한 인증번호를 입력해주세요");
        }
      } catch (error) {
        Alert.alert("ERROR", "Network Error");
      }
    } else {
    }
  }

  async function requestNumber() {
    if (phoneNum.length === 11) {
      try {
        const response = await authPhoneNum({
          messageType: "PASSWORD",
          phone: phoneNum,
        });
        setIsVisible(true);
      } catch (error) {
        Alert.alert("ERROR", "Network Error");
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.numberText}>휴대폰 번호인증</Text>
        </View>
        <View style={styles.viewBorder}></View>
        <Text style={[styles.text, { marginTop: 31 }]}>아이디</Text>
        <View style={styles.idContainer}>
          <InputData
            hint="아이디 입력"
            value={id}
            onChangeText={handleIdChange}
          />
        </View>
        <Text style={styles.text}>가입 시 입력한 휴대폰 번호</Text>
        <View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <InputData
                hint="휴대폰 번호"
                onChangeText={handlePhoneChange}
                value={phoneNum}
                keyboardType="numeric"
              />
            </View>
            <View>
              <ButtonSmall
                title="인증 요청"
                onPress={requestNumber}
                style={sbtnColor}
              />
            </View>
          </View>
          {isVisible && (
            <>
              <View style={styles.lInputContainer}>
                <InputData
                  hint="인증번호"
                  value={authNum}
                  onChangeText={handleAuthChange}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.textSend}>인증번호가 전송되었습니다</Text>
            </>
          )}
        </View>
      </View>
      <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
        <ButtonBig
          text="비밀번호 확인 "
          style={lbtnColor}
          onPress={verifyAuthNum}
        />
      </View>
    </View>
  );
}

export default SearchPW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  numberText: {
    width: 107,
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
    color: GlobalStyles.colors.gray01,
    borderBottomColor: GlobalStyles.colors.primaryDefault,
    borderBottomWidth: 3,
    paddingBottom: 9,
    marginTop: 12,
    marginLeft: 20,
  },
  viewBorder: {
    height: 0.5,
    width: "100%",
    backgroundColor: GlobalStyles.colors.gray05,
  },
  text: {
    marginTop: 22,
    marginLeft: 26,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 5,
    flexDirection: "row",
  },
  lInputContainer: {
    marginHorizontal: 20,
    marginTop: 13,
  },
  idContainer: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  input: {
    marginRight: 7,
    flex: 1,
  },
  textSend: {
    fontSize: 12,
    fontWeight: 400,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
});
