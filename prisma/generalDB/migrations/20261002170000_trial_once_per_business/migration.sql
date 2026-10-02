-- Existing businesses may already have duplicate legacy trial rows. Preserve history;
-- BusinessTrialGrant's primary key enforces one new claim per business transactionally.
CREATE INDEX IF NOT EXISTS "Subscription_trial_history_by_business_idx"
ON "Subscription" ("subscriptionBusinessId")
WHERE "subscriptionPlanId" IN ('P001', 'OPT-TRIAL');
