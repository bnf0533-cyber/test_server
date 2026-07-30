import {z} from 'zod';

export const benefitSchema = z.object({
    id : z.number(),
    soliderId : z.number(),
    unit : z.string(),
    currentBenefitType : z.enum(["giftCard", "diningHall"]),
    history : z.date()
})

export const benefitPeriodSchema = z.object({
        startDate : z.string(),
        endDate :z.string(),
        decisionReason : z.string(),
        budgetApproved : z.boolean(),
        benefitType : z.enum(["giftCard", "diningHall"]),
        details : z.array()
})

export const benefitTypeGiftCardSchema = z.object({
    cardProvider : z.string(),
    monthlyValue : z.number(),
    validMerchants : z.array()
})

export const benefitTypeDiningHallSchema = z.object({
    baseld : z.number(),
    kosherLevel : z.string(),
    mealTimes : z.array()
})