const UserTypeDef = `#graphql

enum roles {
    CUSTOMER
    ADMIN
}

interface UserInterface {
    id: ID!
    email: String!
    password: String!
}

type User implements UserInterface {
    id: ID!
    email: String!
    name: String
    password: String!
    phone: String!
    address: Address!
    role: roles!
}

type Address {
    street: String!
    city: String!
    state: String!
    country: String!
    postal_code: String!
}


type Query {
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User 
    getCustomers: [User]
    getAdmins: [User]
    users: [User]
}

type Mutation {
    signup(input: SignUp): User
    login(input: Login): User
    updateAddress(input: UpdateAddress): User
    updatePhone(input: UpdatePhone): User
    updateAll(input: UpdateAll): User
}

input SignUp {
    email: String!
    name:String
    password: String!
    phone: String!
    address: String!
    role: roles!
}

input Login {
    email:String!
    password: String!
}

input UpdateAddress {
    email: String!
    password: String!
    address: String!
}

input UpdatePhone {
    email: String!
    password: String!
    phone: String!
}

input UpdateAll {
    id: ID!
}
`

module.exports = UserTypeDef;
