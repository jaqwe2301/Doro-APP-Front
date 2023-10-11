import { useContext } from "react";
import { HeaderContext } from "../store/header-context";
import ManagerScreen from "./ManagerScreen";
import UserScreen from "./UserScreen";

function MyPageScreen({ navigation }) {
  const { headerRole, setHeaderRole } = useContext(HeaderContext);

  return headerRole === "ROLE_USER" ? (
    <UserScreen navigation={navigation} />
  ) : (
    <ManagerScreen nav={navigation} />
  );
}

export default MyPageScreen;
