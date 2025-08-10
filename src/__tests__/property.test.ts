import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/data-source";
import { Property } from "../entities/property";
import { Booking } from "../entities/booking";

describe("GET /api/v1/properties", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

   await AppDataSource.query(`DELETE FROM booking;`);
   await AppDataSource.query(`DELETE FROM property;`);

    await AppDataSource.getRepository(Property).save([
      {
        id: "11111111-1111-1111-1111-111111111111",
        title: "Test Property 1",
        description: "Description 1",
        price_per_night: 100,
        available_from: "2025-01-01",
        available_to: "2025-12-31",
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        title: "Test Property 2",
        description: "Description 2",
        price_per_night: 150,
        available_from: "2025-02-01",
        available_to: "2025-11-30",
      },
    ]);
  }, 30000);

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  test("should return paginated properties with default page & limit", async () => {
    const res = await request(app).get("/api/v1/properties");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.length).toBe(2);
  });

  test("should return paginated properties with specific page & limit", async () => {
    const res = await request(app).get("/api/v1/properties?page=1&limit=1");
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.meta.total).toBe(2);
  });

  test("should handle invalid query params gracefully", async () => {
    const res = await request(app).get(
      "/api/v1/properties?page=invalid&limit=invalid"
    );
    expect(res.status).toBe(200);
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(10);
  });
});
