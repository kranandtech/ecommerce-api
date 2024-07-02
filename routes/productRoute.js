import  express  from "express";
import { createProduct, getProducts } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const productsRouter = express.Router();

productsRouter.post("/",isLoggedIn,createProduct);
productsRouter.get("/",getProducts);


export default productsRouter;