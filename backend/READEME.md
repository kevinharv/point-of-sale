# POS Application Backend
## About
The POS backend is responsible for handling all data pertianing to a POS tenant. It will manage all orders, transactions, configuration changes, etc. All clients will connect to the backend through various API routes. 

## Architecture
Each Backend deployment is designed to serve one tenant. Each tenant may have multiple sites. These sites may be grouped by region or operational zone, but that will not affect the underlying technology. Every deployment must have at least one tenant master, and one site server, with additional site servers handling additional sites that may be added. All sites must be connected to the tenant server on LAN.

## Technologies
- Node.js Tenant Master Server
- Node.js Site Server
- PostgreSQL Database
- Redis RO Cache?
- Docker
- Kubernetes

## Roadmap



## Example Deployment
In the real world, Good Food Inc. has 3 locations across 2 regions. They are separated by a large distance and are only connected via S2S VPN.

The web client used to manage the tenant and each of the sites will be hosted at the tenant level. Under normal operation, the 

### Kubernetes Cluster
The following containers will be deployed with associated IPs and Load Balancers. Each container will have 1 replica per node. The quantity of nodes will be determined by the pricing model that the customer selects. A simple and cheap deployment can be accomplished with a single node. The ideal deployment involves a Kubernetes cluster master, 3 nodes for the tenant services, and 3 additional nodes per site. This will ensure HA from a hardware and software level.

Tenant Level
- tenant-master-goodfood
- tenant-pgsql-goodfood
- tenant-web-goodfood

Site Level
- node-arlington-goodfood
- pgsql-arlington-goodfood
- redis-arlington-goodfood