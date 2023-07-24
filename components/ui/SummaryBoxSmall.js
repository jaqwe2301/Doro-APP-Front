import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { KRBold, KRRegular } from "../../constants/fonts";

function SummaryBoxSmall({ svg: SvgComponent, title, text }) {
  const layout = useWindowDimensions();
  return (
    <View style={styles.box}>
      <View style={styles.svgContainer}>
        <SvgComponent height={24} width={24} />
      </View>
      <View style={{ marginBottom: 7 }}>
        <Text
          style={[KRRegular.Caption, { color: GlobalStyles.colors.gray03 }]}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: GlobalStyles.colors.gray01,
            marginTop: -5,
            maxWidth: layout.width / 2 - 95,
            maxHeight: 40,
          }}
        >
          {text}
        </Text>
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
