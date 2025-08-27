from fastapi import FastAPI, HTTPException
from .models import WarehouseReceipt, CollateralRequest, InsuranceRequest

app = FastAPI(
    title="NADLP Warehousing & Credit API",
    description="Digital Warehouse Receipts, collateralization, and insurance integration.",
    version="1.0.0"
)

warehouse_receipts_db = {}
collateral_db = {}
insurance_db = {}

@app.post("/warehouse-receipts", response_model=WarehouseReceipt, status_code=201)
def issue_wr(wr: WarehouseReceipt):
    if wr.id in warehouse_receipts_db:
        raise HTTPException(status_code=409, detail="WR already exists")
    warehouse_receipts_db[wr.id] = wr
    return wr

@app.get("/warehouse-receipts/{wr_id}", response_model=WarehouseReceipt)
def get_wr(wr_id: str):
    wr = warehouse_receipts_db.get(wr_id)
    if not wr:
        raise HTTPException(status_code=404, detail="WR not found")
    return wr

@app.post("/warehouse-receipts/{wr_id}/collateralize", response_model=CollateralRequest, status_code=201)
def collateralize_wr(wr_id: str, request: CollateralRequest):
    wr = warehouse_receipts_db.get(wr_id)
    if not wr:
        raise HTTPException(status_code=404, detail="WR not found")
    collateral_db[wr_id] = request
    wr.lien = request.lien_id
    return request

@app.post("/warehouse-receipts/{wr_id}/insure", response_model=InsuranceRequest, status_code=201)
def insure_wr(wr_id: str, request: InsuranceRequest):
    wr = warehouse_receipts_db.get(wr_id)
    if not wr:
        raise HTTPException(status_code=404, detail="WR not found")
    insurance_db[wr_id] = request
    return request