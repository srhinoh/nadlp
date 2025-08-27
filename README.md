# Warehousing & Credit Service

Provides digital Warehouse Receipts, collateralization endpoints for banks/MFIs, and insurance integration.  
Enables WR issuance, querying, pledging, and cover/claims workflows.

## Endpoints
- `POST /warehouse-receipts`: Issue WR
- `GET /warehouse-receipts/{wr_id}`: Query WR
- `POST /warehouse-receipts/{wr_id}/collateralize`: Pledge WR as collateral
- `POST /warehouse-receipts/{wr_id}/insure`: Bind insurance cover

See [`api-gateway/openapi-specs/warehousing-credit.yaml`](../../api-gateway/openapi-specs/warehousing-credit.yaml) for the full API spec.