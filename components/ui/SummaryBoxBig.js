import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function SummaryBoxBig({ svg: SvgComponent, title, text = [] }) {
  return (
    <View style={styles.box}>
      <View style={styles.svgContainer}>
        <SvgComponent height={24} width={24} />
      </View>
      <View>
        <Text style={styles.boxTitle}>{title}</Text>
        {text?.map((item, index) => {
          return (
            <Text key={index} style={styles.paymentText}>
              {item}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

export default SummaryBoxBig;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    minHeight: 68,
    paddingLeft: 10,
    paddingVertical: 14,
    gap: 9,
    borderRadius: 5.41,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  svgContainer: {
    marginTop: 2,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.gray07,
    justifyContent: "center",
    alignItems: "center",
  },
  boxTitle: {
    // marginTop: 14,
    marginBottom: 2,
    fontSize: 10,
    color: GlobalStyles.colors.gray03,
  },
  paymentText: {
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "bold",
  },
});
