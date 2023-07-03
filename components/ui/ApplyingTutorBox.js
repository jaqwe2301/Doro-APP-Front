import { View, StyleSheet, Text, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

/** 강의신청내역 - 신청중 에 있는 박스 */
function ApplyingTutorBox({ name, role, major, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>{role}</Text>
        </View>
        <Text style={styles.text}>{major}</Text>
      </View>
    </Pressable>
  );
}

export default ApplyingTutorBox;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
    borderRadius: 5.41,
    width: 335,
    height: 75,
    elevation: 3,
    backgroundColor: "white",
    // shadowColor: "#c4c4c4",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
  },
  top: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    color: GlobalStyles.colors.gray03,
  },
});
