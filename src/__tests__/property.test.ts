// src/__tests__/property.test.ts
import request from "supertest";
import app from "../app";
import { TestDataSource } from "../config/test-data-source";
import { Property } from "../entities/property";

beforeAll(async () => {
  // Prevent double-init
  if (!TestDataSource.isInitialized) {
    await TestDataSource.initialize();
  }

  // Completely reset DB (drops tables, enums, etc.)
  await TestDataSource.query(
    `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`
  );

  // Apply migrations instead of relying on synchronize
  await TestDataSource.runMigrations();

  // Seed data
  await TestDataSource.getRepository(Property).save([
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
  if (TestDataSource.isInitialized) {
    await TestDataSource.destroy();
  }
});

describe("GET /api/v1/properties", () => {
  it("should respond to basic route", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

  it("should return paginated properties with default page & limit", async () => {
    const res = await request(app).get("/api/v1/properties");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveLength(2);
    expect(res.body.meta).toEqual(
      expect.objectContaining({
        total: 2,
        page: 1,
        limit: 10,
        lastPage: 1,
      })
    );
  });
});
