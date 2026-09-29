# FoodFlow — SCHEMA.md

## Database Goals

PostgreSQL is the authoritative persistence layer. Prisma is the ORM.

The schema should protect integrity through:
- foreign keys;
- unique constraints;
- appropriate indexes;
- transactions.

## Core Entities

```text
User
Restaurant
RestaurantMember
Category
MenuItem
Order
OrderItem
```

Optional later entities:

```text
Address
Payment
Notification
AuditLog
RefreshToken
Coupon
Review
```

## User

Suggested fields:

```text
id
email
passwordHash
name
createdAt
updatedAt
```

Email must be unique.

## Restaurant

```text
id
name
slug
description
logoUrl
isOpen
createdAt
updatedAt
```

Slug should be unique.

## RestaurantMember

Connects users to restaurants.

```text
id
userId
restaurantId
role
createdAt
```

Add a unique constraint on `(userId, restaurantId)`.

This is preferable to assuming one global staff role is enough for every restaurant.

## Category

```text
id
restaurantId
name
description
sortOrder
isActive
createdAt
updatedAt
```

Consider unique `(restaurantId, name)`.

## MenuItem

```text
id
restaurantId
categoryId
name
description
price
imageUrl
isAvailable
createdAt
updatedAt
```

`price` must use a safe monetary representation.

Do not allow a category from Restaurant A to be assigned to a menu item belonging to Restaurant B.

## Order

Suggested fields:

```text
id
customerId
restaurantId
status
subtotal
deliveryFee
discount
total
notes
createdAt
updatedAt
```

Use an order number/public identifier if useful, but do not expose sequential database IDs unnecessarily.

## OrderItem

```text
id
orderId
menuItemId
nameSnapshot
unitPrice
quantity
lineTotal
```

Snapshots preserve historical order information.

## Relationships

```text
User
 ├── RestaurantMember
 └── Orders

Restaurant
 ├── RestaurantMembers
 ├── Categories
 ├── MenuItems
 └── Orders

Category
 └── MenuItems

Order
 └── OrderItems

MenuItem
 └── OrderItems
```

## Suggested Prisma Enums

```text
RestaurantRole
  OWNER
  MANAGER
  KITCHEN

OrderStatus
  PENDING
  CONFIRMED
  PREPARING
  READY
  COMPLETED
  CANCELLED
```

## Index Strategy

Start with indexes supporting actual queries, such as:

- `Restaurant.slug`
- `Category.restaurantId`
- `MenuItem.restaurantId`
- `MenuItem.categoryId`
- `Order.customerId`
- `Order.restaurantId`
- `Order.status`
- `Order.createdAt`
- `RestaurantMember.userId`
- `RestaurantMember.restaurantId`

Do not create indexes blindly.

## Transactions

Order creation should use a Prisma transaction.

Restaurant membership changes and other multi-write operations should also use transactions when atomicity is required.

## Schema Evolution

Use Prisma migrations.

Never modify production schema manually as the normal development workflow.

Every migration must be reviewed for:
- data loss;
- locking;
- backward compatibility;
- index impact.
