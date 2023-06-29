import { View, StyleSheet, Text, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ApplyingTutorBox({ name, role, major, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text>{name}</Text>
        <Text>{role}</Text>
        <Text>{major}</Text>
      </View>
    </Pressable>
  );
}

export default ApplyingTutorBox;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5.41,
    width: 335,
    height: 75,
    shadowColor: "#c4c4c4",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
