# TODO

- PIN Auth: User Pass/Fail
- User Get: User {name, roles, permissions}



## Schema
```js
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

type SalesTab {

}

type Device {

}

type Order {
    
}

Query {
    user(id: userID)
    profile(id: userID)
}

Mutation {
    updateUser(id: userID)
}
```