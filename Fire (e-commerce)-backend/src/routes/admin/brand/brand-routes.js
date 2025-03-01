import { Router } from "express";
import {
  createBrand,
  getBrands,
  updateBrand,
  updateBrandIsActive,
  deleteBrand,
} from '../../../controllers/admin/brand/brand-controllers.js'

const brandRouter = Router();

brandRouter.post("/create-brand", createBrand);
brandRouter.get("/get-brands", getBrands);
brandRouter.put("/update-brand", updateBrand);
brandRouter.patch("/update-brand-isActive", updateBrandIsActive);
brandRouter.delete("/delete-brand", deleteBrand);

export default brandRouter;
