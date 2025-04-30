const OrderTypeDefs = `#graphql
    type Order {
        id: ID!
        order_item: String!
        user_id: ID!
        quantity: Integer!
        order_status: String!
        delivery_time: Date!
        delivery_partner: ID!
        invoice: ID!
        total_amount: Float!
        shipping_address: Address!
        payment_method: PaymentMethod!
        order_date: Date!
        estimated_delivery: Date
        tracking_number: String
        items: [OrderItem!]!
    }

    type OrderItem {
        product_id: ID!
        product_name: String!
        quantity: Integer!
        price: Float!
        seller_id: ID!
    }

    type Address {
        street: String!
        city: String!
        state: String!
        country: String!
        postal_code: String!
    }

    type PaymentMethod {
        id: ID!
        type: String!
        last_digits: String
    }

    enum OrderStatus {
        PENDING
        CONFIRMED
        SHIPPED
        OUT_FOR_DELIVERY
        DELIVERED
        CANCELLED
        RETURNED
    }

    type Query {
        getOrderById(id: ID!): Order
        getOrderStatus(id: ID!): Order
        getUserOrders(user_id: ID!): [Order!]!
        getOrdersByDateRange(start_date: Date!, end_date: Date!): [Order!]!
    }

    type Mutation {
        createOrder(input: OrderInput!): Order!
        updateOrderStatus(id: ID!, status: OrderStatus!): Order!
        cancelOrder(id: ID!): Order!
        returnOrder(id: ID!, reason: String!): Order!
    }

    input OrderInput {
        user_id: ID!
        items: [OrderItemInput!]!
        shipping_address_id: ID!
        payment_method_id: ID!
    }

    input OrderItemInput {
        product_id: ID!
        quantity: Integer!
    }
`