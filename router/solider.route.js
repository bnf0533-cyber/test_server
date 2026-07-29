import { createBenefit, getBenefitById } from "../controller/soldier.ctrl.js";
import express from "express"

const router = express.Router()

router.post("/:soldierId/benefits", createBenefit)

router.get("/:soldierId/benefits",getBenefitById)

router.patch("/:soliderId/benefits", (req , res) => {
    try {
        
    } catch (error) {
        
    }
})

export default router;