# Point of Sale Application

## Components
- Tauri Embedded Client
- Web Client
- Backend Server

### Electron Embedded Client
The embedded client is responsible for most actions pertaining to the POS system. This is where orders will be placed, employees will manage their time, etc. It is designed with responsiveness and performance in mind. It is designed to run on a portable tablet-like single-purpose system, or a desktop single-purpose system. Systems must be equipped with supported payment processing hardware.

Additionally, the embedded client will be responsible for operational management tasks. Manager overrides, order changes, etc. will be performed from the embedded client.

### Web Client
The web client serves as the management and configuration client for the rest of the POS system. The web client will manage settings applicable to the server, clients, and the business. Changes in employment, position, access, menu, etc. will all be perfomed here. It is designed for access via a desktop computer from an office or similar private space. The web client is intended for management use only.

### Backend Server
The server, which may be located on-premises or in the cloud, serves as the single source of truth for all aspects of the POS system. All orders, payment processing, employee actions will be routed through the server. 

## Security
### Architectural Decisions
Because embedded systems are often difficult to secure, all connections to the internet and payment processors are handled by the server and web client only. The embedded client is designed to only interact with the server on the LAN, and will never call out to the internet, even if permitted to do so. It is recommended that embedded clients only be allowed to communicate with the POS server on a designated network. Firewall rules should prevent any entity other than the server from reaching the internet on that network.


## Technology Stack
- React JS
- Tauri
- Express JS
- Node JS
- PostgreSQL? (DB decision pending)
- Docker

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