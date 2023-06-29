import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { KRBold, KRRegular } from "../../constants/fonts";

function TutorBox({ name, generation, school, major, lecture }) {
  // generation : 기수
  // lecture : 최근 강의
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.name, KRBold.Title2]}>{name}</Text>
          <Text style={[styles.generation, KRRegular.Caption]}>
            DORO {generation}기
          </Text>
        </View>
        <Text style={[styles.school, KRRegular.Caption]}>
          {school} {major}
        </Text>
      </View>
      <Text style={[styles.new, KRRegular.Subbody]}>최근 강의</Text>
      {lecture?.map((item) => {
        <Text style={styles.newContent}>- {item}</Text>;
      })}
      {/* <Text style={styles.newContent}>
        - 진로 체험 주간 워킹 로봇 메이킹 클래스(주강사)
      </Text>
      <Text style={styles.newContent}>
        - 진로 체험 주간 워킹 로봇 메이킹 클래스(보조 강사)
      </Text> */}
      <View style={{ marginTop: 12 }}></View>
    </View>
  );
}

export default TutorBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    marginBottom: 5,
    marginHorizontal: 20,
    borderRadius: 5.41,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: GlobalStyles.colors.gray03,
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.6, // 그림자의 투명도
    shadowRadius: 1, // 그
  },
  name: {
    marginTop: 14,
    marginLeft: 20,

    color: GlobalStyles.colors.gray01,
  },
  generation: {
    marginTop: 23,
    marginLeft: 4,
    color: GlobalStyles.colors.gray03,
  },
  school: {
    marginTop: 23,
    marginRight: 17,
    color: GlobalStyles.colors.gray03,
  },
  new: {
    marginTop: 14,
    marginLeft: 20,
    color: "black",
    marginBottom: 1,
  },
  newContent: {
    marginHorizontal: 20,
    fontSize: 10,
    lineHeight: 18,
    fontWeight: 400,
    letterSpacing: -0.24,
    color: GlobalStyles.colors.gray03,
  },
});
