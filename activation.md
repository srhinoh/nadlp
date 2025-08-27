# NADLP Module Activation

## Prerequisites
- All services (Marketplace, Farmer Registry, Warehousing, Extension, Payments, Notifications, Analytics, Identity & Consent) running on dedicated ports.

## Activating Analytics & Dashboards
1. Start the analytics service:
   ```
   uvicorn services.analytics-open-data.main:app --reload --port 8006
   ```
2. Ensure event data ingestion from other modules (can be simulated for MVP).
3. Access dashboards via API or frontend, passing authenticated `user_id` in headers.

## Activating Identity & Consent
1. Start identity & consent service:
   ```
   uvicorn services.identity-consent.main:app --reload --port 8005
   ```
2. Integrate consent capture and policy checks into all frontends and backend microservices.

## Integration
- Secure all sensitive endpoints (analytics, publishing, payments, registry) with calls to `/policy/{user_id}` and `/consent`.
- Ensure all user-facing apps (Android, web, tablet, USSD) capture consent and check policies before performing actions.

## Testing
- Run pytest in each module's `/tests/` directory.
- Simulate a user onboarding, consent grant, dashboard access, and open data publishing in test flows.
