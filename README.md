# Point of Sale Application

## Components
- Sales Client
	- Tauri + Linux Embedded
	- iOS?
- Kitchen Display System (KDS) Client
- Web Client
- Backend Server

### Tauri Embedded Client
The embedded client is responsible for most actions pertaining to the POS system. This is where orders will be placed, employees will manage their time, etc. It is designed with responsiveness and performance in mind. It is designed to run on a portable tablet-like single-purpose system, or a desktop single-purpose system. Systems must be equipped with supported payment processing hardware.

Additionally, the embedded client will be responsible for operational management tasks. Manager overrides, order changes, etc. will be performed from the embedded client.

### Web Client
The web client serves as the management and configuration client for the rest of the POS system. The web client will manage settings applicable to the server, clients, and the business. Changes in employment, position, access, menu, etc. will all be perfomed here. It is designed for access via a desktop computer from an office or similar private space. The web client is intended for management use only.

### Backend Server
The server, which may be located on-premises or in the cloud, serves as the single source of truth for all aspects of the POS system. All orders, payment processing, employee actions will be routed through the server. It will interface with an off-the-shelf database deployed by the customer. Documentation will include installing a compatible DB.

## Security
### Architectural Decisions
Because embedded systems are often difficult to secure, all connections to the internet and payment processors are handled by the server and web client only. The embedded client is designed to only interact with the server on the LAN, and will never call out to the internet, even if permitted to do so. It is recommended that embedded clients only be allowed to communicate with the POS server on a designated network. Firewall rules should prevent any entity other than the server from reaching the internet on that network.


## Technology Stack
- Next.js
- Tauri
- Fastify
- PostgreSQL + Prism
- Docker

## Management Functionality
- Audit Logins/Actions by User/Timestamp
- "Trace" of users/actions/orders etc.


# Page Map
## Embedded Client
### Home Pages
- Authentication
- Homescreen
- Configuration
    - Manager Screen
        - Employee Management
        - Order Management
        - Operations Management
        - Fiscal Management
    - Sales Manager
    - Profile Manager
    - Device Management (elevation required for some ops)
- Open Tickets
- Pending Orders
- Start Bar Tab
- Start Table Tab

### Order Pages
- Navigation
- Seat Selection
- ? Guest Information
- Drinks
- Alcohol
    - Beer
    - Wine
    - Spirits
- Food


# User Model
## Roles
- Administrator
    - Read/Write to all aspects of tenant
- Site Manager
    - R/W most aspects of tenant
- General Manager
    - R/W most aspects of given location
- Sales Manager
    - Manage sales at given location
- Employment Manager
    - Manage employees at given location
- Operational Manager
    - Manage systems at given location
- Sales
    - Alcohol
    - Other restricted items?
- Fullfillment
    - RO for some sales data
- Timeclock
    - Timeclock only
- Disabled
    - No access

## Permissions
Permissions are inherited from roles, but can also be manually enabled and disabled on a per user basis. The default permissions granted by each role cannot be changed at this time. In the future, this may be a feature implemented on a per site, or per tenant basis. Permissions are divided into categories according to the part of the application they are a part of.

### Administrative
- Tenant Settings
- Site Management
