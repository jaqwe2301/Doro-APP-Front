import { View, StyleSheet, Image, Text } from "react-native";
import ButtonBig from "../ui/ButtonBig";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg";
import Doro from "../../assets/doroLogoSmall.svg";

function Finish({ navigation }) {
  function naviLogin() {
    navigation.replace("login");
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <View>
        <View style={{ marginLeft: 24, marginTop: 89 }}>
          <WithLocalSvg asset={Doro} />
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
  );
}

export default Finish;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 28,
    marginLeft: 23,
    marginTop: 16,
  },
});
