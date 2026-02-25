import swaggerJSDOC from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express, { Request, Response, Router } from "express";

const router = Router();

const options: swaggerJSDOC.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Housekeeping Booking API",
      version: "1.0.0",
      description: "API documenation for Housekeeping Booking System",
    },
    tags: [
      {
        name: "Auth",
        description: "Authentication api",
      },
    ],
    servers: [
      {
        url: `http://localhost:5000/api/v1`,
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
          beaerFormat: "JWT",
          description: "JWT key authorization for API",
        },
        ApiKeyAuth: {
          type: "apikey",
          in: "header",
          name: "x-api-key",
          description: "API key authorization for API",
        },
      },
    },
  },
  //   apis: ["./src/app/routes/*.ts"],
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJSDOC(options);

require("swagger-model-validator")(swaggerSpec);

router.get("/json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
