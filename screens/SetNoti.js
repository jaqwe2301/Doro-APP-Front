import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import SwitchToggle from "react-native-switch-toggle";
import * as SecureStore from "expo-secure-store";
import NotiSetList from "../components/ui/NotiSetList";
import { notiSubscribe, notiUnsubscribe } from "../utill/http";
import { errorHandler } from "../utill/etc";
import Lecture from "../assets/lecture.svg";
import Info from "../assets/info.svg";
import Megaphone from "../assets/megaphoneBlack.svg";

function SetNoti() {
  // 알림 토글
  const [all, setAll] = useState(false);
  const [lecture, setLecture] = useState(false);
  const [announcement, setAnnouncement] = useState(false);
  const [normal, setNormal] = useState(false);

  const [loading, setLoading] = useState();

  useEffect(() => {
    async function initialToggler() {
      const isLecture = await SecureStore.getItemAsync("LECTURE-NOTI");
      const isAnnouncement = await SecureStore.getItemAsync(
        "ANNOUNCEMENT-NOTI"
      );
      const isNotification = await SecureStore.getItemAsync(
        "NOTIFICATION-NOTI"
      );

      if (isLecture && isAnnouncement && isNotification) {
        setAll(true);
        setLecture(true);
        setAnnouncement(true);
        setNormal(true);
      } else {
        if (isLecture) {
          setLecture(true);
        }
        if (isAnnouncement) {
          setAnnouncement(true);
        }
        if (isNotification) {
          setNormal(true);
        }
      }
    }

    initialToggler();
  }, []);

  async function allToggler() {
    setLoading(true);
    try {
      const isLecture = await SecureStore.getItemAsync("LECTURE-NOTI");
      const isAnnouncement = await SecureStore.getItemAsync(
        "ANNOUNCEMENT-NOTI"
      );
      const isNotification = await SecureStore.getItemAsync(
        "NOTIFICATION-NOTI"
      );
      // 알림 전체 취소
      if (isLecture && isAnnouncement && isNotification) {
        const api = await notiUnsubscribe("all");
        if (api) {
          setAll(false);
          setLecture(false);
          setAnnouncement(false);
          setNormal(false);
        }
      } else {
        const api = await notiSubscribe("all");
        if (api) {
          setAll(true);
          setLecture(true);
          setAnnouncement(true);
          setNormal(true);
        }
      }
    } catch (error) {
      errorHandler(error, "Noti Unsubscribe ERROR");
    } finally {
      setLoading(false);
    }
  }

  async function individualToggler(notiType) {
    setLoading(true);
    try {
      const isLecture = await SecureStore.getItemAsync("LECTURE-NOTI");
      const isAnnouncement = await SecureStore.getItemAsync(
        "ANNOUNCEMENT-NOTI"
      );
      const isNotification = await SecureStore.getItemAsync(
        "NOTIFICATION-NOTI"
      );

      if (notiType === "LECTURE") {
        // 알림 동의한 상태라면 -> 취소 시켜 줘야함
        if (isLecture) {
          try {
            const api = await notiUnsubscribe("LECTURE");
            if (api) {
              setLecture(false);
              setAll(false);
            }
          } catch (error) {
            errorHandler(error, "Noti Unsubscribe ERROR");
          }
        } else {
          const api = await notiSubscribe(notiType);
          if (api) {
            await SecureStore.setItemAsync("LECTURE-NOTI", "allow");
            setLecture(true);
            if (isAnnouncement && isNotification) {
              setAll(true);
            }
          }
        }
      }

      if (notiType === "ANNOUNCEMENT") {
        if (isAnnouncement) {
          try {
            const api = await notiUnsubscribe("ANNOUNCEMENT");
            if (api) {
              setAnnouncement(false);
              setAll(false);
            }
          } catch (error) {
            errorHandler(error, "Noti Unsubscribe ERROR");
          }
        } else {
          const api = await notiSubscribe(notiType);
          if (api) {
            await SecureStore.setItemAsync("ANNOUNCEMENT-NOTI", "allow");
            setAnnouncement(true);
            if (isLecture && isNotification) {
              setAll(true);
            }
          }
        }
      }
      if (notiType === "NOTIFICATION") {
        if (isNotification) {
          try {
            const api = await notiUnsubscribe("NOTIFICATION");
            if (api) {
              setNormal(false);
              setAll(false);
            }
          } catch (error) {
            errorHandler(error, "Noti Unsubscribe ERROR");
          }
        } else {
          const api = await notiSubscribe(notiType);
          if (api) {
            await SecureStore.setItemAsync("NOTIFICATION-NOTI", "allow");
            setNormal(true);
            if (isLecture && isAnnouncement) {
              setAll(true);
            }
          }
        }
      }
    } catch (error) {
      errorHandler(error, "개별 알림 설정 에러");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={GlobalStyles.colors.primaryAccent}
          />
        </View>
      ) : (
        ""
      )}
      <View style={styles.midBar} />
      <View style={styles.contentsContainer}>
        <View style={styles.column}>
          <Text style={styles.allChangeText}>알림 모두 변경</Text>
          <SwitchToggle
            switchOn={all}
            onPress={() => allToggler()}
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
          handler={() => individualToggler("LECTURE")}
        />
        <NotiSetList
          Svg={Megaphone}
          title="공지"
          text="공지가 업로드 되었을 때 발송됩니다."
          toggle={announcement}
          handler={() => individualToggler("ANNOUNCEMENT")}
        />
        <NotiSetList
          Svg={Info}
          title="일반 알림"
          text="강의와 공지 외에 매니저가 발송하는 알림입니다."
          toggle={normal}
          handler={() => individualToggler("NOTIFICATION")}
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
  loading: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
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
