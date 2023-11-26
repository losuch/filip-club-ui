import * as React from "react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import HomeIcon from "@material-ui/icons/Home";

import Layout from "../Layout";

describe("<Layout/>", () => {
  it("renders layout all components correctly", () => {
    const { getByTestId, container } = render(
      <MemoryRouter>
        <Layout crumbs={[]}>
          <p data-testid="children">Paragraph</p>
        </Layout>
      </MemoryRouter>
    );

    expect(container.querySelector("header")).toBeInTheDocument();
    // screen.debug();
    expect(getByTestId("footer")).toBeInTheDocument();
    expect(getByTestId("breadcrumb")).toBeInTheDocument();
    expect(container.querySelector("p")).toBeInTheDocument();

    const p = getByTestId("children");
    expect(p?.textContent).not.toBe("Paragraph a");
    expect(p?.textContent).toBe("Paragraph");

    // check if App components renders headline
  });
  it("renders breadcrumb properly", () => {
    const crumbs = [
      {
        title: "Home",
        icon: <HomeIcon style={{ margin: 0.5 }} fontSize="inherit" />,
        href: "/",
      },
      {
        title: "Service Details",
      },
    ];
    const { container, getByText } = render(
      <MemoryRouter>
        <Layout crumbs={crumbs}>
          <p data-testid="children">Paragraph</p>
        </Layout>
      </MemoryRouter>
    );
    // screen.debug();

    expect(container.querySelectorAll("a").length).toBe(2);
    expect(getByText("Service Details")).toBeInTheDocument();
  });
});
