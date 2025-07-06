from pydantic import BaseModel

# class Ticket(BaseModel):
#     id: int
#     name: str

#     def to_json(self) -> str:
#         return self.model_dump_json()

# === PHYSICAL DOMAIN ===

class Region(BaseModel):
    id: int
    name: str

class SiteGroup(BaseModel):
    id: int
    name: str
    region_id: str

class Site(BaseModel):
    id: int
    name: str
    address: str
    site_group_id: int

class TableGroup(BaseModel):
    id: int
    name: str
    site_id: int

class Table(BaseModel):
    id: int
    name: str
    table_group_id: int


# === INFRASTRUCTURE SECTION ===

class KDS(BaseModel):
    id: int
    name: str
    hostname: str
    fqdn: str
    ip_address: str
    role: str   # copying this, not sure what for yet
    site_id: int

class Workstation(BaseModel):
    id: int
    name: str
    hostname: str
    fqdn: str
    ip_address: str
    site_id: str

class PrinterType():
    name: str
    paper_size: str
    is_thermal: bool

class Printer(BaseModel):
    id: int
    name: str
    hostname: str
    fqdn: str
    ip_address: str
    site_id: str
    printer_type: PrinterType


# === BUSINESS SECTION ===

# Ex: cash, card, Apple Pay? Google Pay? Others?
class PaymentMethod(BaseModel):
    id: int
    name: str
    site_id: int


# === TICKET SECTION ===

class Ticket(BaseModel):
    id: int
    site_id: int
    ticket_type: str

# Ticket Types: table, bar, takeout, delivery, event