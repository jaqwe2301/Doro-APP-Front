import { View, StyleSheet, Text } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { GlobalStyles } from "../../constants/styles";

function NotiSetList({ Svg, title, text, handler, toggle }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftElement}>
        <Svg width={28} height={28} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
      <SwitchToggle
        switchOn={toggle}
        onPress={() => handler()}
        containerStyle={{
          width: 54,
          height: 26,
          borderRadius: 100,
          marginTop: 2,
          padding: 4,
        }}
        circleStyle={{
          width: 18,
          height: 18,
          borderRadius: 23,
        }}
        circleColorOn="white"
        circleColorOff="white"
        backgroundColorOn={GlobalStyles.colors.primaryDefault}
        backgroundColorOff="#DFDFE0"
        buttonStyle={
          !toggle
            ? {
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                marginLeft: 6,
                elevation: 5,
              }
            : {
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                marginLeft: 1,
              }
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 14,
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
  },
  leftElement: {
    gap: 8,
    flexDirection: "row",
    paddingLeft: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    color: GlobalStyles.colors.gray03,
  },
});

export default NotiSetList;
