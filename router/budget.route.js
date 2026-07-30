import { createBudgetCtrl, getBudgetByQueryCtrl, getAllBudgetByIdCtrl, createSpendCtrl } from "../controller/budget.ctrl.js"
import express from "express"

const router = express.Router()

router.post("/", createBudgetCtrl)

router.get("/", getBudgetByQueryCtrl)

router.get("/:id/transactions", getAllBudgetByIdCtrl)

router.post("/:id/spend", createSpendCtrl)

export default router;