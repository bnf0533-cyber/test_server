import { client } from "../db/supabase.db.js";

export async function createBudgetInDb(body) {
    const { data, error } = await client.from("budget").insert([body]).select();
    if (error) throw error;
    return data[0];
}

export async function getBudgetsFromDb(query) {
    let supabaseQuery = client.from("budget").select("*");
    if (query.unit) {
        supabaseQuery = supabaseQuery.eq("unit", query.unit);
    }
    if (query.month) {
        supabaseQuery = supabaseQuery.eq("month", query.month);
    }
    if (query.benefitType) {
        supabaseQuery = supabaseQuery.eq("benefitType", query.benefitType);
    }

    const { data, error } = await supabaseQuery;
    if (error) throw error;
    return data;
}

export async function getBudgetByIdFromDb(id) {
    const { data, error } = await client
        .from("budget")
        .select("*")
        .eq("id", id);
    if (error) throw error;
    return data;
}

export async function updateBudgetSpentAmount(id, newSpentAmount) {
    const { data, error } = await client
        .from("budget")
        .update({ spentAmount: newSpentAmount })
        .eq("id", id)
        .select();
    if (error) throw error;
    return data[0];
}
