import { Router } from "express";
import indexController from "../controller/indexController";

const indexRouter = Router();
indexRouter.get("/", indexController.getIndex);

export default indexRouter;
