import { NextFunction, Router,Request, Response } from "express";

import { drinkController } from "../../drink.dependencies";
import { DrinkAddDTO } from "../../domain/dtos/drink.add.dto";
import { DrinkOutDTO } from "../../domain/dtos/drink.out.dto";

const router = Router();



router.post("/", drinkController.add);

export default router;