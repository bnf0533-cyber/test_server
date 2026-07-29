import { object } from "zod";
import {
    createBenefitSoldier,
    getSoliderBenefitById,
} from "../repository/soldier.repo.js";
import { ObjectId } from "bson";

export async function createBenefit(req, res) {
    try {
        const { body } = req.body;
        // if (body.BenefitType === "")
        // console.log(body);
        
        const result = await createBenefitSoldier(body);
        // console.log(result);
        res.status(201).json("benefit created");
    } catch (error) {
        res.status(404).json("soldierId not found");
    }
}

export async function getBenefitById(req, res) {
    try {
        const { id } = req.params;
        const result = await getSoliderBenefitById({_id : ObjectId(id)});
        return result
    } catch (error) {
        return res.status(404).json("soldierId not found")
    }
}
