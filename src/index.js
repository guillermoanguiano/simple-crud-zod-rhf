import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config.js";
import connectDB from "./db.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.use("/api", routes);

export default app;
