const typeDefs = `#graphql
    type User {
        userID: Int
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

    input UserIn {
        userID: Int
        userPIN: String!
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
        getUser(userToken: String!): User
        PINAuth(hostname: String!, userPIN: Int!): String
        getSysInfo: System
    }

    type Mutation {
        updateUser(userToken: String!): User
        addUser(user: UserIn): String
    }
`;
export default typeDefs;
