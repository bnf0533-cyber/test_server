import { ObjectId } from "mongodb";
import { client } from "../db/mongo.db.js";
const db = client.db("testServer");
const userCollection = db.collection("soldiers");

export function checkFinanceMinisterRule(dateString) {
    let checkDate = new Date();
    if (dateString != null) {
        checkDate = new Date(dateString);
    }
    if (checkDate.getDate() === 1) {
        let startOfYear = new Date(checkDate.getFullYear(), 0, 1);
        let diffTime = checkDate.getTime() - startOfYear.getTime();
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        let isPrime = true;
        if (diffDays <= 1) {
            isPrime = false;
        }
        for (let i = 2; i <= Math.sqrt(diffDays); i++) {
            if (diffDays % i === 0) {
                isPrime = false;
                break;
            }
        }
        return isPrime;
    }
    return false;
}

export async function createBenefitSoldier(id, body) {
    try {
        const historyItem = {
            startDate: new Date().toISOString(),
            endDate: null,
            decisionReason: body.decisionReason,
            budgetApproved: body.budgetApproved,
            benefitType: body.benefitType,
            details: body.details,
        };

        const newUser = {
            soldierId: id,
            unit: body.unit,
            currentBenefitType: body.benefitType,
            history: [historyItem],
        };
        const create = await userCollection.insertOne(newUser);
        return { id: create.insertedId.toString() };
    } catch (error) {
        throw error;
    }
}

export async function getSoliderBenefitById(id) {
    try {
        const get = await userCollection.findOne({ soldierId: id });
        return get;
    } catch (error) {
        throw error;
    }
}

export async function patchBenefit(id, body, existing) {
    try {
        const isCanceled = checkFinanceMinisterRule(body.decisionDate);
        if (isCanceled === true) {
            return { reverted: true, reason: "finance minister rule" };
        }
        let historyArray = existing.history;
        for (let i = 0; i < historyArray.length; i++) {
            if (historyArray[i].endDate == null) {
                historyArray[i].endDate = new Date().toISOString();
            }
        }
        let newBenefitType = existing.currentBenefitType;
        if (body.benefitType != null) {
            newBenefitType = body.benefitType;
        }
        const historyItem = {
            startDate: new Date().toISOString(),
            endDate: null,
            decisionReason: body.decisionReason,
            budgetApproved: body.budgetApproved,
            benefitType: newBenefitType,
            details: body.details,
        };
        historyArray.push(historyItem);
        await userCollection.updateOne(
            { soldierId: id },
            {
                $set: {
                    currentBenefitType: newBenefitType,
                    history: historyArray,
                },
            }
        );
        let revert = false;
        if (body.reverted == true) {
            revert = true;
        }
        return { reverted: revert, reason: body.decisionReason };
    } catch (error) {
        throw error;
    }
}
