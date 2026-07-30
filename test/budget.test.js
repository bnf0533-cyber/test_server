import test from "node:test";
import assert from "node:assert/strict";
import { checkBudgetExceeded } from "../service/budget.service.js";

test("budget service tests", async (t) => {

    await t.test("should return true if budget is exceeded", () => {
        const allocated = 1000;
        const currentSpent = 800;
        const requested = 300;
        
        const result = checkBudgetExceeded(allocated, currentSpent, requested);
        
        assert.equal(result, true);
    });

    await t.test("should return false if budget is NOT exceeded", () => {
        const allocated = 1000;
        const currentSpent = 800;
        const requested = 100;
        
        const result = checkBudgetExceeded(allocated, currentSpent, requested);
        
        assert.equal(result, false);
    });
});