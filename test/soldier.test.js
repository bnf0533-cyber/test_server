import { it, after } from "node:test";
import assert from "node:assert/strict";
import { getSoliderBenefitById } from "../repository/soldier.repo.js";
import { mockSoldier } from "./mocks.js";
import { client } from "../db/mongo.db.js";

it("should get soldier with mock", async () => {
    const mockGetSoldier = async () => {
        return mockSoldier;
    };

    const result = await mockGetSoldier();

    assert.equal(result.soldierId, "151515");
    assert.equal(result.currentBenefitType, "giftCard");
});

after(async () => {
    await client.close();
});