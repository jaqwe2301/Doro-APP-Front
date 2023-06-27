import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { WithLocalSvg } from "react-native-svg";
import Password from "../../assets/password.svg";
import PasswordAfter from "../../assets/password_after.svg";
function PwBtn({ text, btnColor }) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {btnColor === GlobalStyles.colors.primaryDefault ? (
          <WithLocalSvg asset={PasswordAfter} />
        ) : (
          <WithLocalSvg asset={Password} />
        )}
      </View>
      <Text style={[styles.text, { color: btnColor }]}>{text}</Text>
    </View>
  );
}

export default PwBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 17,
    marginLeft: 6,
    marginRight: 10,
<<<<<<< HEAD
    marginTop: 4,
    marginBottom: 5,
  },
  icon: { marginTop: 8, marginBottom: 8.6, marginLeft: 7 },
=======
    marginTop: 3,
    marginBottom: 10,
  },
  icon: { marginTop: 7, marginBottom: 13.6, marginLeft: 7 },
>>>>>>> 9667fdc25c17b3ddb35a71ae88735986e127726c
});
