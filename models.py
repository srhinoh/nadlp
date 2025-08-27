from pydantic import BaseModel
from typing import Optional

class WarehouseReceipt(BaseModel):
    id: str
    commodity: str
    lot: str
    grade: str
    weight: float
    moisture: float
    warehouse_id: str
    expiry: str
    lien: Optional[str] = None
    certifications: Optional[list[str]] = []
    insured: Optional[bool] = False

class CollateralRequest(BaseModel):
    wr_id: str
    bank_id: str
    value: float
    lien_id: str
    pledge_date: str

class InsuranceRequest(BaseModel):
    wr_id: str
    insurer_id: str
    coverage_amount: float
    policy_number: str
    claim_status: Optional[str] = "active"