import React, { createContext } from "react";

export const defaultAlertProps = {
  open: false,
  message: "",
  error: false,
};

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }) => {
  const [alert, setAlert] = React.useState(defaultAlertProps);

  return (
    <NotificationContext.Provider
      value={{
        alert,
        setAlert,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
