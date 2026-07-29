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
        return { status: 201, data: "newBudget" };
    } catch (error) {
        throw error;
    }
}

export async function getBudgetByQuery(data) {
    try {
        const get = await client.from("budget").select("*").eq("something", data);
        return get;
        // id , benefitType , month , allocatedAmount , spentAmount , remainingAmount(allocatedAmount  - spentAmount)
    } catch (error) {}
}

export async function getAllBudgetById(id) {
    try {
        const get = client.from("budget").select("*").eq("id", id);
        return { data: get, status: 200 }; // אם לא נמצא להחזיר בקומטרולר 404
    } catch (error) {}
}


