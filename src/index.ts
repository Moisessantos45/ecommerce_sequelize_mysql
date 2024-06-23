import dotenv from "dotenv";
import connectDatabases from "./db/connectDatabases";
import router from "./Routers";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Config/swagger";
import app from "./server";

dotenv.config();

connectDatabases();

const PORT = process.env.PORT || 4000;

app.use("/api/1.0", router);

//docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
