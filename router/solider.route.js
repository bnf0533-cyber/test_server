import { createBenefit, getBenefitById, patchBenefitCtrl } from "../controller/soldier.ctrl.js";
import express from "express"

const router = express.Router()

router.post("/:soldierId/benefits", createBenefit)

router.get("/:soldierId/benefits", getBenefitById)

router.patch("/:soldierId/benefits", patchBenefitCtrl)

export default router;