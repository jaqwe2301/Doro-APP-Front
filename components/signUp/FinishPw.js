import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import ButtonBig from "../ui/ButtonBig";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
function FinishPw() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  function naviLogin() {
    authCtx.isAuthenticated ? authCtx.logout() : navigation.replace("login");
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
          <View style={styles.headerShadow}></View>
          <Text style={[styles.text, { marginTop: 45 }]}>
            비밀번호 변경이 완료되었습니다.
          </Text>
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

export default FinishPw;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 28,
    marginLeft: 23,
  },
  headerShadow: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 0.5,
  },
});
