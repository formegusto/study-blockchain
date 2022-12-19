import Express from "express";
import dotenv from "dotenv";
import routes from "@routes";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

class App {
  app: Express.Application;

  constructor() {
    this.app = Express();
    this.SetMW();
    this.SetRoutes();
  }

  SetMW() {
    this.app.use(cors());
    this.app.use(Express.json());
    this.app.use(morgan("dev"));
  }

  SetRoutes() {
    this.app.use(routes);
  }

  Start() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`[Express] start port:${PORT} :)`);
    });
  }
}

export default new App().Start();
