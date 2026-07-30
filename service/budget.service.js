import { 
    createBudgetInDb, 
    getBudgetsFromDb, 
} from "../repository/budget.repo.js";

export async function createBudgetService(body) {
    const existing = await getBudgetsFromDb({ 
        unit: body.unit, 
        benefitType: body.benefitType, 
        month: body.month 
    });
    
    if (existing && existing.length > 0) {
        return null; 
    }
    
    return await createBudgetInDb(body);
}

export function checkBudgetExceeded(allocatedAmount, currentSpent, requestedAmount) {
    return (currentSpent + requestedAmount) > allocatedAmount;
}
