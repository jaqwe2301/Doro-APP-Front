import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import ButtonBig from "../ui/ButtonBig";
import { GlobalStyles } from "../../constants/styles";

import Doro from "../../assets/doroLogoSmall.svg";

function Finish({ navigation }) {
  function naviLogin() {
    navigation.replace("login");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View style={{ marginLeft: 24, marginTop: 89 }}>
            <Doro width={121} height={26} />
          </View>
          <Text style={styles.text}>회원가입을 축하합니다.</Text>
        </View>
        <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
          <ButtonBig
            text="로그인"
            style={GlobalStyles.colors.primaryDefault}
            onPress={naviLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Finish;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    marginLeft: 23,
    marginTop: 16,
  },
});
