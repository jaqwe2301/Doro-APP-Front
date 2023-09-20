import { useContext, useEffect, useState } from "react";
import {
  View,
  useWindowDimensions,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import { HeaderContext } from "../store/header-context";
import ApplicationDetails from "./ApplicationDetails";
import { TabBar, TabView } from "react-native-tab-view";
import { GlobalStyles } from "../constants/styles";
import { KRRegular } from "../constants/fonts";
import { getLectureList } from "../utill/http";
import ApplyingLectureBox from "../components/ui/ApplyingLectureBox";

function HistoryScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const { headerRole, setHeaderRole } = useContext(HeaderContext);

  useEffect(() => {
    navigation.setOptions({
      title: headerRole === "ROLE_USER" ? "강의신청내역" : "강의 목록",
    });
  }, []);

  function ManagerHistory() {
    const { isLectureUpdate, setIsLectureUpdate } = useContext(HeaderContext);
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([
      { key: "first", title: "모집중(0)" },
      { key: "second", title: "진행중(0)" },
      { key: "third", title: "강의 완료(0)" },
    ]);

    const [rlectureData, setRLectureData] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [rNum, setRNum] = useState(0);
    const [alectureData, setALectureData] = useState([]);
    const [pageNum2, setPageNum2] = useState(0);
    const [aNum, setANum] = useState(0);
    const [flectureData, setFLectureData] = useState([]);
    const [pageNum3, setPageNum3] = useState(0);
    const [fNum, setFNum] = useState(0);

    useEffect(() => {
      refreshHandler("RECRUITING");
      refreshHandler("ALLOCATION_COMP");
      refreshHandler("FINISH");
    }, [isLectureUpdate]);

    useEffect(() => {
      setRoutes([
        { key: "first", title: `모집중(${rNum})` },
        { key: "second", title: `진행중(${aNum})` },
        { key: "third", title: `강의 완료(${fNum})` },
      ]);
    }, [rNum, aNum, fNum]);

    async function lectureHandler() {
      try {
        const result = await getLectureList({
          city: "",
          endDate: "",
          startDate: "",
          page: pageNum,
          size: 10,
          lectureStatus: "RECRUITING",
        });

        const data = result.lecturesInfos;
        console.log("ㅗㅑ");
        setRLectureData((prev) => [...prev, ...data]);

        console.log(data);
        setPageNum((prev) => prev + 1);
      } catch (error) {
        console.error(error);
        if (error.isRefreshError) {
          // RefreshToken 관련 에러 시 로그아웃
          authCtx.logout();
        }
      }
    }

    async function refreshHandler(status) {
      try {
        const result = await getLectureList({
          city: "",
          endDate: "",
          startDate: "",
          page: 0,
          size: 10,
          lectureStatus: status,
        });

        const data = result.lecturesInfos;

        if (status === "RECRUITING") {
          setRLectureData(data);
          setPageNum(1);
          setRNum(result.totalCount);
          console.log("rR");
          console.log(result.totalCount);
        } else if (status === "ALLOCATION_COMP") {
          setALectureData(data);
          setPageNum2(1);
          setANum(result.totalCount);
          console.log("rA");
        } else if (status === "FINISH") {
          setFLectureData(data);
          setPageNum3(1);
          setFNum(result.totalCount);
          console.log("rF");
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function lectureHandler2() {
      try {
        const result = await getLectureList({
          city: "",
          endDate: "",
          startDate: "",
          page: pageNum2,
          size: 10,
          lectureStatus: "ALLOCATION_COMP",
        });

        const data = result.lecturesInfos;
        console.log("ㅗㅑ");
        setALectureData((prev) => [...prev, ...data]);
        console.log(data);
        setPageNum2((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      }
    }
    async function lectureHandler3() {
      try {
        const result = await getLectureList({
          city: "",
          endDate: "",
          startDate: "",
          page: pageNum3,
          size: 10,
          lectureStatus: "FINISH",
        });

        const data = result.lecturesInfos;
        console.log("ㅗㅑ");
        setFLectureData((prev) => [...prev, ...data]);
        console.log(data);
        setPageNum3((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      }
    }
    const dateControl = (stringDate) => {
      // string에서 date 타입으로 전환하기 위해 만듬
      return new Date(stringDate);
    };

    const renderScene = ({ route }) => {
      switch (route.key) {
        case "first":
          return (
            <FlatList
              style={styles.container}
              data={rlectureData}
              onEndReached={lectureHandler}
              onEndReachedThreshold={0.2}
              onRefresh={() => {
                refreshHandler("RECRUITING");
              }}
              keyExtractor={(item) => item.id}
              refreshing={false}
              // ListFooterComponent={<View style={{ height: 30 }} />}
              renderItem={({ item, index }) => {
                let dateTypeValue = dateControl(item.enrollEndDate);
                const isLastItem = index === rlectureData.length - 1;
                return (
                  <View style={isLastItem && { marginBottom: 30 }}>
                    <ApplyingLectureBox
                      subTitle={item.subTitle}
                      date={item.lectureDates}
                      time={item.time}
                      lectureIdHandler={() =>
                        navigation.navigate("DetailLecture", {
                          id: item.id,
                          status: item.status,
                          navi: true,
                        })
                      }
                      id=""
                      dateTypeValue={dateTypeValue}
                      place={item.place}
                      tutorRole={`주강사 ${item.mainTutor}${
                        item.subTutor === "0"
                          ? ""
                          : `, 보조강사 ${item.subTutor}`
                      }${item.staff === "0" ? "" : `, 스태프 ${item.staff}`}`}

                      // onPressX={() => deleteLecture(item.id, item.subTitle, role)}
                    />
                  </View>
                );
              }}
            />
          );

        case "second":
          return (
            <FlatList
              style={styles.container}
              data={alectureData}
              keyExtractor={(item) => item.id}
              onEndReached={lectureHandler2}
              onEndReachedThreshold={0.2}
              onRefresh={() => {
                refreshHandler("ALLOCATION_COMP");
              }}
              refreshing={false}
              // ListFooterComponent={() => <View style={{ height: 30 }} />}
              renderItem={({ item, index }) => {
                let dateTypeValue = dateControl(item.enrollEndDate);
                const isLastItem = index === alectureData.length - 1;
                return (
                  <View style={isLastItem && { marginBottom: 30 }}>
                    <ApplyingLectureBox
                      subTitle={item.subTitle}
                      date={item.lectureDates}
                      time={item.time}
                      lectureIdHandler={() =>
                        navigation.navigate("DetailLecture", {
                          id: item.id,
                          navi: true,
                        })
                      }
                      id=""
                      dateTypeValue={dateTypeValue}
                      place={item.place}
                      tutorRole={`주강사 ${item.mainTutor}${
                        item.subTutor === "0"
                          ? ""
                          : `, 보조강사 ${item.subTutor}`
                      }${item.staff === "0" ? "" : `, 스태프 ${item.staff}`}`}
                      // onPressX={() => deleteLecture(item.id, item.subTitle, role)}
                    />
                  </View>
                );
              }}
            />
          );
        case "third":
          return (
            <FlatList
              style={styles.container}
              data={flectureData}
              onEndReached={lectureHandler3}
              onEndReachedThreshold={0.2}
              keyExtractor={(item) => item.id}
              onRefresh={() => {
                refreshHandler("FINISH");
              }}
              refreshing={false}
              // ListFooterComponent={() => <View style={{ height: 30 }} />}
              renderItem={({ item, index }) => {
                let dateTypeValue = dateControl(item.enrollEndDate);
                const isLastItem = index === flectureData.length - 1;
                return (
                  <View style={isLastItem && { marginBottom: 30 }}>
                    <ApplyingLectureBox
                      subTitle={item.subTitle}
                      date={item.lectureDates}
                      time={item.time}
                      lectureIdHandler={() =>
                        navigation.navigate("DetailLecture", {
                          id: item.id,
                          navi: true,
                        })
                      }
                      id=""
                      dateTypeValue={dateTypeValue}
                      place={item.place}
                      tutorRole={`주강사 ${item.mainTutor}${
                        item.subTutor === "0"
                          ? ""
                          : `, 보조강사 ${item.subTutor}`
                      }${item.staff === "0" ? "" : `, 스태프 ${item.staff}`}`}
                      // onPressX={() => deleteLecture(item.id, item.subTitle, role)}
                    />
                  </View>
                );
              }}
            />
          );
        default:
          return <View />;
      }
    };
    return (
      <>
        <View style={{ height: 20 }} />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{
                // Style to apply to the container view for the indicator.
                backgroundColor: GlobalStyles.colors.primaryDefault,
                height: 2,
                border: "none",
              }}
              style={{
                backgroundColor: "white",
                shadowOffset: { height: 0, width: 0 },
                shadowColor: "transparent",
                height: 30,
                borderBottomWidth: 0.5,
                borderBottomColor: GlobalStyles.colors.gray04,
              }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={
                    focused
                      ? [
                          KRRegular.Subheadline,
                          { color: GlobalStyles.colors.gray01 },
                        ]
                      : [
                          KRRegular.Subheadline,
                          { color: GlobalStyles.colors.gray05 },
                        ]
                  }
                >
                  {route.title}
                </Text>
              )}
              tabStyle={{
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 0,
              }}
              pressColor={"transparent"}
            />
          )}
        />
      </>
    );
  }

  return headerRole === "ROLE_USER" ? (
    <ApplicationDetails />
  ) : (
    <ManagerHistory />
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    paddingHorizontal: 20,
    backgroundColor: GlobalStyles.colors.gray07,
  },
});
