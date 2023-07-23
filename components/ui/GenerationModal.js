import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";
import Modalx from "../../assets/modalx.svg";
import ButtonBig from "./ButtonBig";
import { GlobalStyles } from "../../constants/styles";
import { PickerIOS } from "@react-native-picker/picker";

function GenerationModal({
  setVisibleCode,
  visibleCode,
  title,
  inputGeneration,
  setInputGeneration,
  setSelectCode,
  setStatusGStyle,
  type,
}) {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visibleCode}
      statusBarTranslucent={true}
      onRequestClose={() => setVisibleCode(!visibleCode)}
      type
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisibleCode(!visibleCode)}
        >
          <Pressable>
            <View
              style={{
                backgroundColor: "white",
                height: 357,
                justifyContent: "space-between",

                borderTopEndRadius: 5.41,
                borderTopStartRadius: 5.41,
              }}
            >
              <View>
                <View style={styles.statusTitleContainer}>
                  <View style={styles.iconContainer}>
                    <Pressable onPress={() => setVisibleCode(!visibleCode)}>
                      <Modalx width={24} height={24} />
                    </Pressable>
                  </View>
                  <Text style={styles.statusTitle}>{title}</Text>
                </View>
                {/* <Picker
                  selectedValue={inputGeneration}
                  onValueChange={(itemValue, itemIndex) => {
                    setInputGeneration(itemValue);
                    if (type) {
                      setSelectCode(itemValue + "기");
                      setStatusGStyle(styles.textInputText);
                    }
                  }}
                  itemStyle={{
                    marginHorizontal: 10,
                  }}
                  mode="dropdown"
                  // prompt="기수 선택"
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="6" value="6" />
                  <Picker.Item label="7" value="7" />
                  <Picker.Item label="8" value="8" />
                  <Picker.Item label="9" value="9" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="11" value="11" />
                  <Picker.Item label="12" value="12" />
                  <Picker.Item label="13" value="13" />
                  <Picker.Item label="14" value="14" />
                  <Picker.Item label="15" value="15" />
                  <Picker.Item label="16" value="16" />
                  <Picker.Item label="17" value="17" />
                  <Picker.Item label="18" value="18" />
                  <Picker.Item label="19" value="19" />
                  <Picker.Item label="20" value="20" />
                </Picker> */}
                <PickerIOS
                  selectedValue={inputGeneration}
                  onValueChange={(itemValue, itemIndex) => {
                    setInputGeneration(itemValue);
                    if (type) {
                      setSelectCode(itemValue + "기");
                      setStatusGStyle(styles.textInputText);
                    }
                  }}
                  itemStyle={{
                    marginHorizontal: 10,
                  }}
                  mode="dropdown"
                >
                  <PickerIOS.Item label="1" value="1" />
                  <PickerIOS.Item label="2" value="2" />
                  <PickerIOS.Item label="3" value="3" />
                  <PickerIOS.Item label="4" value="4" />
                  <PickerIOS.Item label="5" value="5" />
                  <PickerIOS.Item label="6" value="6" />
                  <PickerIOS.Item label="7" value="7" />
                  <PickerIOS.Item label="8" value="8" />
                  <PickerIOS.Item label="9" value="9" />
                  <PickerIOS.Item label="10" value="10" />
                  <PickerIOS.Item label="11" value="11" />
                  <PickerIOS.Item label="12" value="12" />
                  <PickerIOS.Item label="13" value="13" />
                  <PickerIOS.Item label="14" value="14" />
                  <PickerIOS.Item label="15" value="15" />
                  <PickerIOS.Item label="16" value="16" />
                  <PickerIOS.Item label="17" value="17" />
                  <PickerIOS.Item label="18" value="18" />
                  <PickerIOS.Item label="19" value="19" />
                  <PickerIOS.Item label="20" value="20" />
                </PickerIOS>
              </View>
              <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
                <ButtonBig
                  text="확인"
                  style={GlobalStyles.colors.primaryDefault}
                  onPress={() => setVisibleCode(false)}
                />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

export default GenerationModal;

const styles = StyleSheet.create({
  statusTitle: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
    marginTop: 3,
    flex: 1,

    marginRight: 48,
    textAlign: "center",
  },
  statusTitleContainer: {
    flexDirection: "row",
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
    height: 53,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(84, 84, 86, 0.3)",
  },
  iconContainer: {
    marginLeft: 20,
    marginTop: 3,
  },
  textInputText: {
    lineHeight: 20,
    fontSize: 15,
    color: GlobalStyles.colors.gray01,
    fontWeight: "600",
  },
});
