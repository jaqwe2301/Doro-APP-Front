import { View, Text, StyleSheet } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Won from "../../assets/won.svg";
import { GlobalStyles } from "../../constants/styles";

function LectureTop({
  subTitle,
  mainPayment,
  subPayment,
  staffpayment,
  city,
  date,
  time,
}) {
  // const subPaymentSplit = payment?.split("보");
  // const staffPaymentSplit = subPaymentSplit[-1]?.split("스");

  return (
    <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
      <Text style={styles.text}>{subTitle}</Text>
      <View style={styles.boxContainter}>
        <View style={styles.box}>
          <View style={styles.svgContainer}>
            <WithLocalSvg asset={Won} height={24} width={24} />
          </View>
          <Text>강사급여</Text>
          <Text>주강사 : {mainPayment}원</Text>
          {!subPayment ? "" : <Text>보조강사 : {subPayment}원</Text>}
          {!staffpayment ? "" : <Text>스태프 : {staffpayment}원</Text>}
          {/* <Text>{subPaymentSplit[0]}</Text> */}
          {/* <Text>
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
          </Text> */}
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
  boxContainter: {
    flexDirection: "row",
    gap: 7,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 68,
    borderRadius: 5.41,
    borderWidth: 0.5,
    borderColor: "D9D9D9",
  },
  svgContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.gray07,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 28,
  },
});
