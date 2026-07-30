import {
    createBudgetService,
    checkBudgetExceeded,
} from "../service/budget.service.js";
import {
    getBudgetsFromDb,
    getBudgetByIdFromDb,
    updateBudgetSpentAmount,
} from "../repository/budget.repo.js";

export const createBudgetCtrl = async (req, res) => {
    try {
        const body = req.body;
        const result = await createBudgetService(body);
        if (result == null) {
            return res.status(409).json("budget exists");
        }
        res.status(201).json(result);
    } catch (error) {
        res.status(404).json("budget not found");
    }
};

export const getBudgetByQueryCtrl = async (req, res) => {
    try {
        const query = req.query;
        const budgets = await getBudgetsFromDb(query);
        res.status(200).json(budgets);
    } catch (error) {
        res.status(404).json("not found");
    }
};

export const getAllBudgetByIdCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getBudgetByIdFromDb(id);
        if (!result || result.length === 0) {
            return res.status(404).json("budget not found");
        }
        res.status(200).json(result[0]);
    } catch (error) {
        return res.status(404).json("budget not found");
    }
};

export const createSpendCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const requestedAmount = req.body.amount;
        const budgetArr = await getBudgetByIdFromDb(id);
        if (!budgetArr || budgetArr.length === 0) {
            return res.status(404).json("budget not found");
        }
        const budget = budgetArr[0];
        const allocatedAmount = budget.allocatedAmount;
        const currentSpent = budget.spentAmount || 0;
        const isExceeded = checkBudgetExceeded(
            allocatedAmount,
            currentSpent,
            requestedAmount
        );

        if (isExceeded) {
            const remainingAmount = allocatedAmount - currentSpent;
            return res.status(400).json({
                error: "budget exceeded",
                remainingAmount: remainingAmount,
            });
        }
        const newSpentAmount = currentSpent + requestedAmount;
        const updatedBudget = await updateBudgetSpentAmount(id, newSpentAmount);
        const newRemaining = allocatedAmount - newSpentAmount;
        return res.status(201).json({
            message: "spend approved",
            remainingAmount: newRemaining,
        });
    } catch (error) {
        res.status(400).json("bad request");
    }
};
