import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "./ButtonBig";
import Xmark from "../../assets/xmark_black.svg";
import Plus from "../../assets/plus.svg";
import ModalCheck from "../../assets/modalcheck.svg";

function AddContentModal({
  visible,
  title,
  inVisible,
  plusVisible,
  data,
  onPressPlus,
  onPress,
  multiCheck, // 체크 복수 가능 여부
}) {
  const [check, setCheck] = useState();
  const [checkItem, setCheckItem] = useState();
  const onConfirm = (item) => {
    if (!item) {
      Alert.alert(
        "주의",
        "항목을 체크해주세요!",
        [
          {
            text: "확인",
            onPress: () => {
              // console.log("강사 신청 완료");
            },
            style: "destructive",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    } else {
      onPress(item);
    }
  };
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
            <Pressable onPress={onPressPlus}>
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
              // onPress(data.item)
              return (
                <Pressable
                  onPress={() => {
                    setCheck(data.index);
                    setCheckItem(data.item.id);
                  }}
                >
                  <View style={styles.modalTextContainer}>
                    <Text style={styles.modalText}>{data.item.kit}</Text>
                    {check === data.index ? <ModalCheck /> : ""}
                  </View>
                </Pressable>
              );
            }}
            extraData={data}
          />
          <View style={styles.modalButtonContainer}>
            <ButtonBig text="확인" onPress={() => onConfirm(checkItem)} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddContentModal;

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
