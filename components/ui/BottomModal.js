import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "./ButtonBig";
import Xmark from "../../assets/xmark_black.svg";
import Plus from "../../assets/plus.svg";

function BottomModal({
  visible,
  title,
  inVisible,
  plusVisible,
  data,
  onPressPlus,
}) {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalWhiteBox}>
          <View style={styles.modalTop}>
            <Pressable onPress={inVisible}>
              <View style={styles.topButton}>
                <Xmark width={24} height={24} />
              </View>
            </Pressable>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>{title}</Text>
            <Pressable
              onPress={() => {
                addContentsModalHandler(true);
                setContentsData({
                  content: "",
                  kit: "",
                  detail: "",
                  remark: "",
                  requirement: "",
                });
              }}
            >
              <View style={styles.topButton}>
                {plusVisible ? (
                  <Pressable onPress={onPressPlus}>
                    <Plus width={19} height={20} />
                  </Pressable>
                ) : (
                  ""
                )}
              </View>
            </Pressable>
          </View>
          <FlatList
            style={styles.modalList}
            data={data}
            renderItem={(data) => {
              return (
                <Pressable
                  onPress={() => selectingLectureContents(data.item.id)}
                >
                  <View style={styles.modalTextContainer}>
                    <Text style={styles.modalText}>{data.item.kit}</Text>
                  </View>
                </Pressable>
              );
            }}
            extraData={data}
          />
          <View style={styles.modalButtonContainer}>
            <ButtonBig text="확인" onPress={() => modalHandler(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default BottomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalWhiteBox: {
    backgroundColor: "white",
    paddingBottom: 14,
  },
  modalTop: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray05,
    height: 54,
    alignItems: "center",
  },
  modalList: {
    marginBottom: 35,
  },
  modalTextContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 42,
    borderBottomWidth: 0.5,
    borderBottomColor: GlobalStyles.colors.gray05,
  },
  modalText: {
    fontSize: 16,
  },
  modalButtonContainer: {
    // height: 45,
    paddingHorizontal: 20,
  },
  modalButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    borderRadius: 5.41,
  },
  topButton: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
