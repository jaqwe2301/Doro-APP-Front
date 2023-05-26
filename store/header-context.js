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
  };

  return (
    <HeaderContext.Provider value={values}>{children}</HeaderContext.Provider>
  );
}

export default HeaderContextProvider;
