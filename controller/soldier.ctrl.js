import {
    createBenefitSoldier,
    getSoliderBenefitById,
    patchBenefit,
} from "../repository/soldier.repo.js";

export async function createBenefit(req, res) {
    try {
        const body = req.body;
        const id = req.params.soldierId;
        const check = await getSoliderBenefitById(id);
        if (check != null) {
            return res.status(409).json("benefit exists");
        }
        const result = await createBenefitSoldier(id, body);
        res.status(201).json(result);
    } catch (error) {
        res.status(404).json("soldierId not found");
    }
}

export async function getBenefitById(req, res) {
    try {
        const id = req.params.soldierId;
        const result = await getSoliderBenefitById(id);
        if (result == null) {
            return res.status(404).json("soldier not found");
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json("error");
    }
}

export async function patchBenefitCtrl(req, res) {
    try {
        const id = req.params.soldierId;
        const body = req.body;
        const check = await getSoliderBenefitById(id);
        if (check == null) {
            return res.status(404).json("soldier not found");
        }
        const result = await patchBenefit(id, body, check);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json("error");
    }
}
