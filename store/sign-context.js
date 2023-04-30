import { createContext, useState } from "react";

export const SignContext = createContext();

function SignContextProvider({ children }) {
  const [signData, setSignData] = useState({
    account: "",
    birth: "",
    doroAuth: "",
    gender: "",
    generation: 0,
    major: "",
    name: "",
    password: "",
    passwordCheck: "",
    phone: "",
    profileImg: "",
    role: "",
    school: "",
    studentId: "",
    studentStatus: "",
  });

  const values = { signData, setSignData };

  return <SignContext.Provider value={values}>{children}</SignContext.Provider>;
}

export default SignContextProvider;
