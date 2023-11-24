import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "apollo-react/components/Button";
import NotificationBanner from "../index";
import NotificationContext, { NotificationProvider } from "../context";

const NotificationBannerWithActions = ({}) => {
  const { setAlert } = React.useContext(NotificationContext);

  return (
    <>
      <Button
        onClick={() =>
          setAlert({
            open: true,
            message: "This is error",
            error: true,
          })
        }
      >
        Open Error
      </Button>
      <Button
        onClick={() =>
          setAlert({
            open: true,
            message: "This is success",
            error: false,
          })
        }
      >
        Open success
      </Button>
      <Button
        onClick={() =>
          setAlert({
            open: false,
            message: "This Should Close",
            error: false,
          })
        }
      >
        Close
      </Button>

      <NotificationBanner />
    </>
  );
};
describe("<Notification Banner/>", () => {
  it("Should render error when error action is set", async () => {
    const { queryByText, getByText, queryByTestId } = render(
      <NotificationProvider>
        <NotificationBannerWithActions />
      </NotificationProvider>
    );
    const btnEr = getByText("Open Error");
    await fireEvent.click(btnEr);
    screen.debug();
    expect(queryByText("This is error")).toBeInTheDocument();
    expect(queryByTestId("This is error")).toBeInTheDocument();
  });
  it("Should render success when success action is set", async () => {
    const { queryByText, getByText } = render(
      <NotificationProvider>
        <NotificationBannerWithActions />
      </NotificationProvider>
    );

    const btnSuc = getByText("Open success");
    await fireEvent.click(btnSuc);
    expect(queryByText("This is error")).not.toBeInTheDocument();
    expect(queryByText("This is success")).toBeInTheDocument();
  });
  it("Should not render anything when close action is set", async () => {
    const { queryByText, getByText } = render(
      <NotificationProvider>
        <NotificationBannerWithActions />
      </NotificationProvider>
    );

    const btnCl = getByText("Close");
    await fireEvent.click(btnCl);
    expect(queryByText("This is error")).not.toBeInTheDocument();
    expect(queryByText("This is success")).toBeNull();
  });
});
