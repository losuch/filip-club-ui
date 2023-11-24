import * as React from "react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import NotFound from "../NotFound";

describe("<Not Found/>", () => {
  it("Should render not found text", () => {
    const { queryByText } = render(<NotFound />);
    expect(queryByText("😢")).toBeInTheDocument();
  });
});
