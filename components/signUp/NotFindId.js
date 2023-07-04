import { View, StyleSheet, Image, Text } from "react-native";
import ButtonBig from "../ui/ButtonBig";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function FindId() {
  const navigation = useNavigation();
  function naviLogin() {
    navigation.navigate("signUp");
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
        <View style={styles.headerShadow}></View>
        <Text style={[styles.text, { marginTop: 60 }]}>해당 아이디가</Text>
        <Text style={styles.text}>조회되지 않습니다.</Text>
      </View>
      <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
        <ButtonBig
          text="회원 가입"
          style={GlobalStyles.colors.primaryDefault}
          onPress={naviLogin}
        />
      </View>
    </View>
  );
}

export default FindId;

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
