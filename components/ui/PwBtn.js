import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function PwBtn({ text }) {
  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          name="checkmark-sharp"
          color={GlobalStyles.colors.gray05}
          size={15}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
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
    color: GlobalStyles.colors.gray05,
    marginLeft: 6,
    marginRight: 17,
  },
});
