import React, { createContext, useContext, useState } from "react";

type State = string;

export const AuthContext = createContext<
  { accessToken: string; setAccessToken: any } | undefined
>(undefined);

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState<State>("");

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  return [context?.accessToken, context?.setAccessToken];
};

export default useAuthContext;
