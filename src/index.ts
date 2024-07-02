import express, { json, NextFunction, Request, Response } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import swaggerUi from "swagger-ui-express";

import petRouter from "routes/pets";
import userRouter from "routes/users";
import schemaRouter from "routes/schema";
import { getOpenAPISpec } from "registry";

const app = express();

app.use(json());

// Generate the openapi schema (must come after import of routers)
const openapiSchema = getOpenAPISpec();

// Serve openapi spec as Swagger documentation
app.use("/", swaggerUi.serve, swaggerUi.setup(openapiSchema));

// Use openapi spec to validate requests/responses
app.use(
  OpenApiValidator.middleware({
    apiSpec: openapiSchema as OpenAPIV3.Document,
    validateRequests: true,
    validateResponses: true
  }),
  (err: any, req: Request, res: Response, next: NextFunction) => {
    // format validation errors
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors
    });
  }
);

// Application routes
app.use("/users", userRouter);
app.use("/pets", petRouter);
app.use("/schema", schemaRouter);

app.listen(3000, () => {
  console.log(`🚀 Server ready at: http://localhost:3000`);
});
