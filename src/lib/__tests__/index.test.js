import { describe, expect } from "vitest";
import {
  checkHealth,
  registerService,
  fetchServices,
  fetchServiceDetails,
  fetchServiceConfiguration,
  postServiceState,
  deleteServiceState,
} from "../globalconfigsApi";

import { api } from "../../app/api";

describe("Api calls", () => {
  test("health check", async () => {
    const healthMock = { healthy: true };

    api.get.mockResolvedValue({
      data: healthMock,
    });

    const res = await checkHealth();
    expect(res).toBe(true);
  });

  test("Should Register ", async () => {
    const healthMock = { healthy: false };

    api.get.mockResolvedValue({
      data: healthMock,
    });

    const res = await checkHealth();
    expect(res).toBe(false);
  });
});
