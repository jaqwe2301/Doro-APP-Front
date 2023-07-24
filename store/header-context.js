import { createContext, useState } from "react";

export const HeaderContext = createContext();
//     {
//   decoded: "",
//   getRole: () => {},
//   getId: () => {},
// }

function HeaderContextProvider({ children }) {
  const [headerRole, setHeaderRole] = useState("");
  const [headerId, setHeaderId] = useState("");
  const [headerAccount, setHeaderAccount] = useState("");

  //이건 마이페이지 -> 신청 강의 목록 navi 때 tabIndex에 쓰임
  const [historyIndex, setHistoryIndex] = useState(0);

  const [isLectureUpdate, setIsLectureUpdate] = useState(true);
  const [isNoticeUpdate, setIsNoticeUpdate] = useState(true);

  //   const [headerPayload, setHeaderPayload] = useState();

  //   function getRole(decoded) {
  //     setHeaderPayload(decoded);
  //     setHeaderRole(decoded.roles[0].authority);
  //   }

  //   const values = { decoded: headerPayload, getRole: getRole };
  const values = {
    headerRole,
    setHeaderRole,
    headerId,
    setHeaderId,
    headerAccount,
    setHeaderAccount,
    historyIndex,
    setHistoryIndex,
    isLectureUpdate,
    setIsLectureUpdate,
    isNoticeUpdate,
    setIsNoticeUpdate,
  };

  return (
    <HeaderContext.Provider value={values}>{children}</HeaderContext.Provider>
  );
}

export default HeaderContextProvider;
