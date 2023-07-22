import { useContext, useEffect, useState } from "react";
import {
  View,
  useWindowDimensions,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { HeaderContext } from "../store/header-context";
import ApplicationDetails from "./ApplicationDetails";
import { TabBar, TabView } from "react-native-tab-view";
import { GlobalStyles } from "../constants/styles";
import { KRRegular } from "../constants/fonts";
import { getLectureList } from "../utill/http";
import ApplyingLectureBox from "../components/ui/ApplyingLectureBox";

function HistoryScreen({ navigation }) {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);
  function ManagerHistory() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: "first", title: "모집중" },
      { key: "second", title: "진행중" },
      { key: "third", title: "강의 완료" },
    ]);

    // useEffect(() => {
    //   lectureHandler();
    //   lectureHandler2();
    //   lectureHandler3();
    // }, []);

    const [rlectureData, setRLectureData] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [alectureData, setALectureData] = useState([]);
    const [pageNum2, setPageNum2] = useState(0);
    const [flectureData, setFLectureData] = useState([]);
    const [pageNum3, setPageNum3] = useState(0);

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
              ListFooterComponent={() => <View style={{ height: 30 }} />}
              renderItem={({ item }) => {
                let dateTypeValue = dateControl(item.enrollEndDate);
                // const roles = item.tutorRole;
                // const role =
                //   roles === "MAIN_TUTOR"
                //     ? "주강사"
                //     : roles === "SUB_TUTOR"
                //     ? "보조강사"
                //     : roles === "STAFF"
                //     ? "스태프"
                //     : "";
                return (
                  <ApplyingLectureBox
                    subTitle={item.subTitle}
                    date={item.lectureDates}
                    time={item.time}
                    lectureIdHandler={() =>
                      navigation.navigate("DetailLecture", {
                        id: item.id,
                      })
                    }
                    id=""
                    dateTypeValue={dateTypeValue}
                    place={item.place}
                    tutorRole={`주강사 ${item.mainTutor}${
                      item.subTutor === "0" ? "" : `, 보조강사 ${item.subTutor}`
                    }${item.staff === "0" ? "" : `, 스태프 ${item.staff}`}`}

                    // onPressX={() => deleteLecture(item.id, item.subTitle, role)}
                  />
                );
              }}
            />
          );

        case "second":
          return (
            <FlatList
              style={styles.container}
              data={alectureData}
              onEndReached={lectureHandler2}
              onEndReachedThreshold={0.2}
              ListFooterComponent={() => <View style={{ height: 30 }} />}
              renderItem={({ item }) => {
                let dateTypeValue = dateControl(item.enrollEndDate);

                return (
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
                      item.subTutor === "0" ? "" : `, 보조강사 ${item.subTutor}`
                    }${item.staff === "0" ? "" : `, 스태프 ${item.staff}`}`}
                    // onPressX={() => deleteLecture(item.id, item.subTitle, role)}
                  />
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
              ListFooterComponent={() => <View style={{ height: 30 }} />}
              renderItem={({ item }) => {
                let dateTypeValue = dateControl(item.enrollEndDate);

                return (
                  <ApplyingLectureBox
                    subTitle={item.subTitle}
                    date={item.lectureDates}
                    time={item.time}
                    lectureIdHandler={() =>
                      navigation.navigate("DetailLecture", {
                        id: item.id,
                      })
                    }
                    id=""
                    dateTypeValue={dateTypeValue}
                    place={item.place}
                    tutorRole={`주강사 ${item.mainTutor}${
                      item.subTutor === "0" ? "" : `, 보조강사 ${item.subTutor}`
                    }${item.staff === "0" ? "" : `, 스태프 ${item.staff}`}`}
                    // onPressX={() => deleteLecture(item.id, item.subTitle, role)}
                  />
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
