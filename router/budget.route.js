import {createBudgetCtrl , getAllBudgetByIdCtrl , getBudgetByQueryCtrl} from "../controller/budget.ctrl.js"
import express from "express"

const router = express.Router()

router.post("/", createBudgetCtrl)

router.get("/",getBudgetByQueryCtrl)

router.get("/:id/transactions", getAllBudgetByIdCtrl)

export default router;