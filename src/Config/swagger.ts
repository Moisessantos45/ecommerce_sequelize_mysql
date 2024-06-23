import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "User",
        description: "User operations",
      },
      {
        name: "Product",
        description: "Product operations",
      },
      {
        name: "Auth",
        description: "Auth operations",
      },
    ],
    info: {
      title: "API Documentation for User operations in the database",
      version: "1.0.0",
      description: "API documentation for User operations in the database",
    },
  },
  apis: [
    "./src/Routers/users.ts",
    "./src/Routers/products.ts",
    "./src/Routers/auth.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
