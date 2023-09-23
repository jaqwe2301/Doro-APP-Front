import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import SwitchToggle from "react-native-switch-toggle";
import NotiSetList from "../components/ui/NotiSetList";
import Lecture from "../assets/lecture.svg";
import Info from "../assets/info.svg";
import Megaphone from "../assets/megaphoneBlack.svg";

function SetNoti() {
  // 알림 토글
  const [all, setAll] = useState();
  const [lecture, setLecture] = useState();
  const [announcement, setAnnouncement] = useState();
  const [normal, setNormal] = useState();

  const toggleHandler = (notiType) => {
    if (notiType === "all") {
      setAll((prev) => {
        if (prev) {
          setLecture(false);
          setAnnouncement(false);
          setNormal(false);
        }
        if (!prev) {
          setLecture(true);
          setAnnouncement(true);
          setNormal(true);
        }
        return !prev;
      });
    }
    if (notiType === "lecture") {
      setLecture((prev) => {
        if (prev) {
          setAll(false);
        }
        if (announcement && normal && !prev) {
          setAll(true);
        }
        return !prev;
      });
    }
    if (notiType === "announcement") {
      setAnnouncement((prev) => {
        if (prev) {
          setAll(false);
        }
        if (lecture && normal && !prev) {
          setAll(true);
        }
        return !prev;
      });
    }
    if (notiType === "notification") {
      setNormal((prev) => {
        if (prev) {
          setAll(false);
        }
        if (lecture && announcement && !prev) {
          setAll(true);
        }
        return !prev;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.midBar} />
      <View style={styles.contentsContainer}>
        <View style={styles.column}>
          <Text style={styles.allChangeText}>알림 모두 변경</Text>
          <SwitchToggle
            switchOn={all}
            onPress={() => toggleHandler("all")}
            containerStyle={{
              width: 58,
              height: 30,
              borderRadius: 100,
              padding: 4,
            }}
            circleStyle={{
              width: 20,
              height: 20,
              borderRadius: 23,
            }}
            circleColorOn="white"
            circleColorOff="white"
            backgroundColorOn={GlobalStyles.colors.primaryDefault}
            backgroundColorOff="#DFDFE0"
            buttonStyle={
              !all
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
        <View style={styles.midBar} />
        <NotiSetList
          Svg={Lecture}
          title="강의"
          text="강의가 생성되거나 배정되었을 때 발송됩니다."
          toggle={lecture}
          handler={() => toggleHandler("lecture")}
        />
        <NotiSetList
          Svg={Megaphone}
          title="공지"
          text="공지가 업로드 되었을 때 발송됩니다."
          toggle={announcement}
          handler={() => toggleHandler("announcement")}
        />
        <NotiSetList
          Svg={Info}
          title="일반 알림"
          text="강의와 공지 외에 매니저가 발송하는 알림입니다."
          toggle={normal}
          handler={() => toggleHandler("notification")}
        />
      </View>
    </View>
  );
}

export default SetNoti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentsContainer: { paddingHorizontal: 20 },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  allChangeText: { fontSize: 16, fontWeight: "bold" },
  midBar: {
    backgroundColor: GlobalStyles.colors.gray07,
    height: 44,
    marginBottom: 14,
  },
});
