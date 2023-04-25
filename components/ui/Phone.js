import { View, StyleSheet, Text } from "react-native";
import InputData from "./InputData";
import ButtonSmall from "./ButtonSmall";
import { useState } from "react";

function Phone() {
  const [isVisible, setIsVisible] = useState(false);

  const handlePhoneChange = (text) => {
    setphoneNum(text);
    setSignData({ ...signData, phone: phoneNum });
    if (text.length === 11) {
      setsbtnColor(GlobalStyles.colors.gray01);
    } else {
      setsbtnColor(GlobalStyles.colors.gray05);
    }
  };
  const handleAuthChange = (text) => {
    setauthNum(text);
    if (text.length === 6) {
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  function requestNumber() {
    authPhoneNum({ messageType: "JOIN", phone: phoneNum });
    setIsVisible(true);
  }
  return (
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
            />
          </View>
          <Text style={styles.textSend}>인증번호가 전송되었습니다</Text>
        </>
      )}
    </View>
  );
}

export default Phone;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 18,
    flexDirection: "row",
  },
  lInputContainer: {
    marginHorizontal: 20,
    marginTop: 13,
  },
  input: {
    marginRight: 7,
    flex: 1,
  },
});
