import { client } from "../db/mongo.db.js"
import {createBudget , getAllBudgetById ,getBudgetByQuery} from "../repository/budget.repo.js"

export const createBudgetCtrl  = async (req, res) => {
    try {
        const {body} = req.body
        const result = await createBudget(body)
        res.status(201).json(result)
        // אם כבר יש אז צריך להחזיר 409 וזה צריך לביות עם צירוף של כולם 
    } catch (error) {
        res.status(404).json("budget not found")
    }
}

export const getBudgetByQueryCtrl = async (req , res) => {
    try {
        //לעשות בדיקה מה מקבל הקוורי פאשראם שלי לחפש אות ברשימות 
        const {  } = req.paras
        const result = await getBudgetByQuery()
        res.status(200).json(result)
        // כאן לעשות חישוב בסרוויס את החישוב של כל ההקצאות ולהחזיר את זה כאן בשרת ללוקח
    } catch (error) {
        res.status(404).json("not found")
    }
}

export const getAllBudgetByIdCtrl = async (req, res) => {
    try {
        const { id } = req.paras
        const result = await getAllBudgetById(id)
        res.status(200).json(result)
    } catch (error) {
        return res.status(404).json("budget not found")
    }
}