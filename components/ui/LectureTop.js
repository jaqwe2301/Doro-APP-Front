import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

// svg
import Bus from "../../assets/directions_bus.svg";
import Location from "../../assets/location.svg";
import Won from "../../assets/won.svg";
import Calendar from "../../assets/calendar.svg";
import Clock from "../../assets/clock.svg";

// 컴포넌트
import SummaryBoxSmall from "./SummaryBoxSmall";
import SummaryBoxBig from "./SummaryBoxBig";

function LectureTop({
  subTitle,
  mainPayment,
  subPayment,
  staffPayment,
  city,
  date,
  time,
  transportCost,
}) {
  const day = ["일", "월", "화", "수", "목", "금", "토"];

  // ex. 05월 04일 (금) 09:30 ~ 12:30
  const LectureDate = date.map((item) => {
    const date = new Date(item);
    const month =
      date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const days = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

    return `${month}월 ${days}일 (${day[date.getDay()]}) ${time}`;
  });

  // 강사 급여
  let payment = [];
  paymentCheck = false;
  mainPayment !== "0" ? payment.push(`주강사: ${mainPayment}원`) : "";

  if (subPayment !== "0") {
    if (payment.length === 1) {
      payment[0] += `        보조강사: ${subPayment}원`;
      paymentCheck = true;
    } else {
      payment.push(`보조강사: ${subPayment}원`);
    }
  }

  if (staffPayment !== "0") {
    if (payment.length === 1) {
      if (paymentCheck) {
        payment.push(`스태프: ${staffPayment}원`);
      } else if (!paymentCheck) {
        payment[0] += `        스태프: ${staffPayment}원`;
      }
    } else {
      payment.push(`스태프: ${staffPayment}원`);
    }
  }

  return (
    <View
      style={{ alignItems: "center", paddingHorizontal: 20 }}
      pointerEvents="none"
    >
      <Text style={styles.Title}>{subTitle}</Text>

      <View style={styles.boxContainer}>
        <SummaryBoxBig svg={Won} title="강사 급여" text={payment} />
      </View>

      <View style={styles.boxContainer}>
        <SummaryBoxBig svg={Calendar} title="날짜 및 시간" text={LectureDate} />
      </View>
      <View style={styles.boxContainer}>
        <SummaryBoxSmall svg={Bus} title="교통비" text={transportCost + "원"} />
        <SummaryBoxSmall svg={Location} title="지역" text={city} />
      </View>
    </View>
  );
}

export default LectureTop;

const styles = StyleSheet.create({
  Title: {
    marginTop: 28,
    marginBottom: 28,
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
  },
  boxContainer: {
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
