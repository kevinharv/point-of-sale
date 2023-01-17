# POS Deployment

## Architecture
A Kubernetes deployment of the POS application stack is recommended. Automatic scaling and easy version management results in fewer operational complications and better avaialbility of the application stack. A standalone Docker deployment is also supported, and may be run on a local, private, or public cloud environment.

The server-side application stack consists of four individual containers that may have one or more replicas for high availability.

1. Backend Web Server (Node.js)
1. Database (PostgreSQL)
1. Redis DB Cache
1. Management Web Portal (NGINX)