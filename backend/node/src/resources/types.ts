const typeDefs = `#graphql
    type User {
        userID: Int!
        username: String!
        displayName: String!
        firstName: String!
        middleName: String
        lastName: String!
        birthdate: String
        address: String
        email: String!
        clockStatus: Boolean
        lastClockIn: String
        lastClockOut: String
        roles: [String!]
        permissions: [String!]
    }

    type System {
        server_hostname: String,
        server_uptime: Float,
        server_arch: String,
        server_os: String,
        server_os_release: String,
        server_cpu: String
        server_memory: Float
        server_availableMem: Float
        server_NICs: String
        dns_servers: String
        postgres_version: String
    }

    type Query {
        user(userID: Int!): String
        profile(userID: Int!): String
        systemAuth(hostname: String!, userPIN: Int!): String
        sysInfo: System
    }

    type Mutation {
        updateUser(userID: Int!): String
    }
`;

export default typeDefs;