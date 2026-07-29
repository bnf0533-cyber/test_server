import { client } from "../db/supabase.db.js";

export async function createBudget(body) {
    try {
        const newBudget = {
            unit: "golani",
            benefitType: "giftCard" | "dininghall",
            month: "yuly",
            allocatedAmount: 10,
        };
        // אם יש לי כבר כזה דבר צריך 409 לאותו מידע שקיבלתי בבודי
        return {status :201 , data : "newBudget"}
    } catch (error) {
        throw error
    }
}
