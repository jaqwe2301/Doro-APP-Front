import { View, Text, StyleSheet } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { GlobalStyles } from "../../constants/styles";
import Won from "../../assets/won.svg";
import Location from "../../assets/location.svg";
import Calendar from "../../assets/calendar.svg";
import Clock from "../../assets/Clock.svg";

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
      <Text style={styles.Title}>{subTitle}</Text>
      <View style={styles.boxContainter}>
        <View style={styles.box}>
          <View style={styles.svgContainer}>
            <WithLocalSvg asset={Won} height={24} width={24} />
          </View>
          <View>
            <Text style={styles.boxTitle}>강사급여</Text>
            <Text style={styles.paymentText}>주강사 : {mainPayment}원</Text>
            {!subPayment ? (
              ""
            ) : (
              <Text style={styles.paymentText}>보조강사 : {subPayment}원</Text>
            )}
            {!staffpayment ? (
              ""
            ) : (
              <Text style={styles.paymentText}>스태프 : {staffpayment}원</Text>
            )}
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
        </View>
        <View style={styles.box}>
          <View style={styles.svgContainer}>
            <WithLocalSvg asset={Location} height={24} width={24} />
          </View>
          <View>
            <Text style={styles.boxTitle}>지역</Text>
            <Text style={styles.boxText}>{city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.boxContainter}>
        <View style={styles.box}>
          <View style={styles.svgContainer}>
            <WithLocalSvg asset={Calendar} height={24} width={24} />
          </View>
          <View>
            <Text style={styles.boxTitle}>날짜</Text>
            {date.map((item, i) => {
              return (
                <Text style={styles.boxText} key={i}>
                  {new Date(item).getMonth() +
                    1 +
                    "월 " +
                    new Date(item).getDate() +
                    "일"}
                </Text>
              );
            })}
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.svgContainer}>
            <WithLocalSvg asset={Clock} height={24} width={24} />
          </View>
          <View>
            <Text style={styles.boxTitle}>시간</Text>
            <Text style={styles.boxText}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LectureTop;

const styles = StyleSheet.create({
  Title: {
    marginTop: 28,
    marginBottom: 68,
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 28,
  },
  boxContainter: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 6.99,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 68,
    paddingLeft: 10,
    gap: 9,
    borderRadius: 5.41,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  svgContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.gray07,
    justifyContent: "center",
    alignItems: "center",
  },
  boxTitle: {
    fontSize: 10,
    color: GlobalStyles.colors.gray03,
  },
  paymentText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  boxText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
