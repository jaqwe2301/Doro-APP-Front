import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Pressable,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useContext, useState } from "react";

import { GlobalStyles } from "../constants/styles";
import { AuthContext } from "../store/auth-context";

function ManagerSend() {
  const authCtx = useContext(AuthContext);
  function logoutHandler() {
    authCtx.logout();
  }
  const FirstRoute = () => (
    <Pressable onPress={logoutHandler}>
      <Text>로그아웃</Text>
    </Pressable>
  );
  const SecondRoute = () => <Text>두번째</Text>;

  const [tapState, setTapState] = useState({
    index: 0,
    routes: [
      { key: "first", title: `강사 목록` },
      { key: "second", title: `알림 발송` },
    ],
  });

  _tabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) =>
                inputIndex === i ? 1 : 0.5
              ),
            });

            return (
              <TouchableOpacity
                key={route.key}
                style={styles.tabItem}
                onPress={() => props.jumpTo(route.key)}
              >
                <Animated.Text
                  style={{
                    opacity,
                    borderBottomColor: GlobalStyles.colors.primaryAccent,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontSize: 15,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <>
      <TabView
        navigationState={tapState}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        renderTabBar={_tabBar}
        onIndexChange={(index) => setTapState({ ...tapState, index })}
        initialLayout={{ width: Dimensions.get("window").width }}
        style={styles.container}
      />
    </>
  );
}

export default ManagerSend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 78,
    backgroundColor: "white",
  },
  tabItem: {
    flex: 1,
    // alignItems: "center",
    paddingLeft: 18,
  },
});
