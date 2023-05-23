import { View, Text, StyleSheet } from "react-native";

function LectureTop({ subTitle, payment, city, date, time }) {
  const subPaymentSplit = payment?.split("보");
  const staffPaymentSplit = subPaymentSplit[-1]?.split("스");

  return (
    <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
      <Text style={styles.text}>{subTitle}</Text>
      <View style={styles.boxContainter}>
        <View style={styles.box}>
          <Text>강사급여</Text>
          <Text>{subPaymentSplit[0]}</Text>
          <Text>
            {subPaymentSplit.length === 2 && staffPaymentSplit.length === 2
              ? "보" + staffPaymentSplit[0]
              : subPaymentSplit.length === 2 && staffPaymentSplit.length === 1
              ? "보" + subPaymentSplit[-1]
              : ""}
          </Text>
          <Text>
            {staffPaymentSplit?.length === 2
              ? "스" + staffPaymentSplit[-1]
              : ""}
          </Text>
        </View>
        <View style={styles.box}>
          <Text>{city}</Text>
        </View>
      </View>
      <View style={styles.boxContainter}>
        <View style={styles.box}>
          <Text>날짜</Text>
          {date.map((item, i) => {
            return (
              <Text key={i}>
                {new Date(item).getMonth() +
                  1 +
                  "월 " +
                  new Date(item).getDay() +
                  "일"}
              </Text>
            );
          })}
        </View>
        <View style={styles.box}>
          <Text>시간</Text>
          <Text>{time}</Text>
        </View>
      </View>
    </View>
  );
}

export default LectureTop;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 600,

    lineHeight: 28,
  },
  boxContainter: {
    flexDirection: "row",
    gap: 7,
  },
  box: {
    flex: 1,
    height: 68,
    borderRadius: 5.41,
    borderWidth: 0.5,
    borderColor: "D9D9D9",
  },
});
