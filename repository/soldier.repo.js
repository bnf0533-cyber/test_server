import { ObjectId } from "mongodb";
import { client } from "../db/mongo.db.js";

const db = client.db("testServe");
const userCollection = db.collection("soldiers");

export async function createBenefitSoldier(body) {
    try {
        const newUser = {
            uint: body.uint,
            currentBenefitType: body.currentBenefitType,
            history: [],
        };
        const create = await userCollection.insertOne(newUser);
        return { id: create.insertedId.toString() };
    } catch (error) {
        throw error;
    }
}

export async function getSoliderBenefitById(id) {
    try {
        const get = await userCollection.findOne({ _id: new ObjectId(id) });
        console.log(get);

        return get;
    } catch (error) {
        throw error;
    }
}

export async function patchBenefit(id) {
    try {
        const newPatch = {
            benefitType: "giftCard" | "diningHall",
            details: {},
            decisionReason: "way",
            budgetApproved: true,
        };

        const res = await userCollection.updateOne(
            { _id: ObjectId(id) },
            {
                $push: { history: newPatch },
            }
        );
        return { reverted: true,
            reason : "way"
        };
    } catch (error) {
        throw error;
    }
}


