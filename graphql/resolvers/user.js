const users = require('../sample/data')

const UserResolvers = {
    Query: {
        getUserById: (obj,args,cxt,info)=>{
            return users.find((user)=>user.id===args.id)
        },
        getUserByEmail: (obj,args,cxt,info)=>{
            return users.find((user)=>user.email===args.email)
        },
        getCustomers: (obj,args,cxt,info)=>{
            return users.filter(user => user.role === "CUSTOMER")
        },
        getAdmins: (obj,args,cxt,info)=>{
            return users.filter(user => user.role === "ADMIN")
        },
        users: (obj,args,cxt,info)=>{
            return users
        },

    },
    Mutation: {
        signup(obj, args, cxt, info){
            
        }
    }
}

module.exports = UserResolvers;