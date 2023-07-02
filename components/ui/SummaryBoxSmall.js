import { View, Text, StyleSheet } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { GlobalStyles } from "../../constants/styles";

function SummaryBoxSmall({svg, title, text}) {
  return (
    <View style={styles.box}>
      <View style={styles.svgContainer}>
        <WithLocalSvg asset={svg} height={24} width={24} />
      </View>
      <View>
        <Text style={styles.boxTitle}>{title}</Text>
        <Text style={styles.paymentText}>{text}</Text>
      </View>
    </View>
  );
}

export default SummaryBoxSmall;

const styles = StyleSheet.create({
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
    fontSize: 12,
    fontWeight: "bold",
  },
});
