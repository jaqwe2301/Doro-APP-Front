import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "./ButtonBig";
import Xmark from "../../assets/xmark_black.svg";
import Plus from "../../assets/plus.svg";
import ModalCheck from "../../assets/modalcheck.svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function FilterModal({
  visible,
  title,
  inVisible,
  plusVisible,
  data,
  onPressPlus,
  status,
  setCity,
  setStartDate,
  setEndDate,
  useFilter,
}) {
  const [date, setDate] = useState([
    new Date(new Date().setMonth(new Date().getMonth() - 6)),
    new Date(new Date().setMonth(new Date().getMonth() + 6)),
  ]);

  const [dateVisible, setDateVisible] = useState();
  const [choice, setChoice] = useState(true);

  const [selectedIndices, setSelectedIndices] = useState([]);

  const dateControl = (date) => {
    const month =
      date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const days = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    return `${date.getFullYear()}.${month}.${days}`;
  };

  const dateOnConfirm = (pick) => {
    setDate((prev) => (choice ? [pick, prev[1]] : [prev[0], pick]));
    setDateVisible(false);
  };

  const ConfirmBtn = () => {
    const cities = selectedIndices.map((index) => data[index]).join(",");

    if (status === "RECRUITING" || status === "ALLOCATION_COMP") {
      setCity(cities);
      useFilter("city", status, cities, "", "");
    } else if (status === "GENERATION") {
      // 마이페이지 - 기수 선택 모달에 해당
      setCity(
        selectedIndices
          .map((index) => data[index])
          .map((item) => parseInt(item))
      );
    } else {
      const dateStatus =
        status === "recruitingDate" ? "RECRUITING" : "ALLOCATION_COMP";
      const formattedDate = `${date[0].getFullYear()}-${padNumber(
        date[0].getMonth() + 1
      )}-${padNumber(date[0].getDate())}`;
      const formattedDate2 = `${date[1].getFullYear()}-${padNumber(
        date[1].getMonth() + 1
      )}-${padNumber(date[1].getDate())}`;
      setStartDate(formattedDate);
      setEndDate(formattedDate2);
      useFilter("date", dateStatus, "", formattedDate, formattedDate2);
    }

    inVisible();
  };

  const layout = useWindowDimensions();

  const padNumber = (num) => {
    return num.toString().padStart(2, "0");
  };
  return (
    <Modal transparent={true} visible={visible}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <Pressable style={styles.modalContainer} onPress={inVisible}>
        {/* <View style={styles.modalContainer}> */}
        <Pressable>
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
            {status === "recruitingDate" || status === "allocationDate" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  height: 53,
                  marginVertical: 22,
                  paddingHorizontal: 16,
                  borderColor: GlobalStyles.colors.gray06,
                  borderWidth: 0.5,
                }}
              >
                <Pressable
                  onPress={() => {
                    setChoice(true);
                    setDateVisible(true);
                  }}
                  style={{
                    // backgroundColor: GlobalStyles.colors.gray01,
                    padding: 16,
                  }}
                >
                  <Text>{dateControl(date[0])}</Text>
                </Pressable>
                <Text>-</Text>
                <Pressable
                  onPress={() => {
                    setChoice(false);
                    setDateVisible(true);
                  }}
                  style={{ padding: 16 }}
                >
                  <Text>{dateControl(date[1])}</Text>
                </Pressable>
              </View>
            ) : (
              <FlatList
                style={styles.modalList}
                data={data}
                renderItem={(data) => {
                  // onPress(data.item)
                  return (
                    <Pressable
                      onPress={() => {
                        // setCheck(data.index);
                        // setCheckItem(data.item);
                        const index = data.index;
                        const isSelected = selectedIndices.includes(index);

                        if (isSelected) {
                          // 이미 선택된 항목일 경우 선택 취소
                          setSelectedIndices(
                            selectedIndices.filter((i) => i !== index)
                          );
                        } else {
                          // 새로운 항목 선택
                          setSelectedIndices([...selectedIndices, index]);
                        }
                      }}
                    >
                      <View style={styles.modalTextContainer}>
                        <Text
                          style={[
                            styles.modalText,
                            { maxWidth: layout.width - 70 },
                          ]}
                        >
                          {data.item}
                        </Text>
                        {selectedIndices.includes(data.index) ? (
                          <ModalCheck />
                        ) : null}
                      </View>
                    </Pressable>
                  );
                }}
                extraData={data}
              />
            )}
            <View style={styles.modalButtonContainer}>
              <ButtonBig text="확인" onPress={() => ConfirmBtn()} />
            </View>
          </View>
          {/* </View> */}

          <DateTimePickerModal
            isVisible={dateVisible}
            mode={"date"}
            onConfirm={dateOnConfirm}
            onCancel={() => setDateVisible(false)}
            date={choice ? date[0] : date[1]}
            textColor={GlobalStyles.colors.gray01}
            locale="ko"
            customCancelButtonIOS={() => {
              <View />;
            }}
            confirmTextIOS="확인"
          />
        </Pressable>
      </Pressable>
      {/* </SafeAreaView> */}
    </Modal>
  );
}

export default FilterModal;

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
    maxHeight: 252,
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
    paddingBottom: Platform.OS === "ios" ? 34 : 0,
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
  datebox: {},
});
