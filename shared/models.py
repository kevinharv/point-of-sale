from pydantic import BaseModel

# class Ticket(BaseModel):
#     id: int
#     name: str

#     def to_json(self) -> str:
#         return self.model_dump_json()

# === PHYSICAL DOMAIN ===

pk_classes = [
    # "ACCOUNT",    # Not needed if table-per-tenant
    "REGION",
    "SITE_GROUP",
    "SITE",
    "TABLE_GROUP",
    "TABLE",
    "KDS",
    "WORKSTATION",
    "PRINTER",
    "PAYMENT_METHOD",
    "TICKET",
    
]

table_classes = [
    {
    "pk": "ACCOUNT:<id>",
    "sk": "METADATA",
    "data": {
        "name": "Example Dining Facility",
        "address": "Home Office"
        }
    },
    {
    "pk": "REGION:<id>",
    "sk": "ACCOUNT:<id>",
    "data": {
        "foo": 1
        }
    },
]

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

# Consolidate into hardware:type (ex: hardware:kds)
# KDS, Workstation, Printer

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
# Convert this into a transaction...?
# Can hold metadata:paymentMethods key with info
class PaymentMethod(BaseModel):
    id: int
    name: str
    site_id: int


# === TICKET SECTION ===


# ticket (record of transaction), kds_ticket (derived from order submission event)


class Ticket(BaseModel):
    id: int
    site_id: int
    ticket_type: str

class KDSTicket(BaseModel):
    id: int
    kds_id: int
    ticket_id: int
    status: str   # new, in-progress, completed
    priority: int

# Created per order submission, can have multiple for each ticket.
# MAYBE - appetizers and/or drinks get dispatched separately and before main course.
kds_ticket_example = {
    "id": 5,
    "createdAt": 9000013483,        # UNIX epoch timestamp? ISO 8601 string?
    "related": {
        "ticketID": 1234,
        "ticketType": "table",
        "tableID": 432,
        "createdBy": "Jonathan",
    },
    "menuItems": [
        {
            "id": 15,
            "displayName": "SM Fry",
            "type": "side",
            "notes": [
                "EXTRA SALT",
                "SIDE RANCH"
            ]
        }
    ]
}

# Ticket Types: table, bar, takeout, delivery, event