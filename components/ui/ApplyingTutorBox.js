import { View, StyleSheet, Text, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Xmark from "../../assets/xmark_gray.svg";

/** 강의신청내역 - 신청중 에 있는 박스 */
function ApplyingTutorBox({ name, role, major, onPress, status }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.container,
          status === "ASSIGNED"
            ? { backgroundColor: "white" }
            : { backgroundColor: GlobalStyles.colors.gray07 },
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.top}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.text}>{role}</Text>
          </View>
          {status === "ASSIGNED" ? (
            <Pressable onPress={onPress} style={{ marginTop: 11 }}>
              <Xmark width={24} height={24} />
            </Pressable>
          ) : (
            ""
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.text}>{major}</Text>
          {status === "ASSIGNED" ? (
            <Text style={styles.status}>{role} 확정</Text>
          ) : (
            ""
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default ApplyingTutorBox;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,

    paddingBottom: 13,
    borderRadius: 5.41,
    width: 335,
    height: 75,
    elevation: 3,
    // backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.3, // 그림자의 투명도
    shadowRadius: 1.5, // 그
    justifyContent: "space-between",
  },
  top: {
    marginTop: 15,
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
  status: {
    fontSize: 10,
    color: GlobalStyles.colors.primaryDefault,
  },
});
