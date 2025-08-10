import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rental Booking API",
      version: "1.0.0",
      description: "API for managing rental properties and bookings",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1", // Adjust base URL for your API
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // Path to your route/controller files with swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
