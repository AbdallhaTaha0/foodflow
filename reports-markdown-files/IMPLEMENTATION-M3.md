# FoodFlow — IMPLEMENTATION-M3.md

## Objective
Implement the restaurant catalog and manager workflows.

## Data

Implement:
- Restaurant.
- RestaurantMember.
- Category.
- MenuItem.

Relationships:

```text
Restaurant
  ├── RestaurantMembers
  └── Categories
       └── Menu Items
```

## Backend

For each module implement:

```text
schema
controller
service
repository
routes
```

Validate:
- names;
- descriptions;
- prices;
- category ownership;
- availability;
- IDs.

## Authorization

Only authorized restaurant staff/managers can mutate restaurant-owned resources.

Never trust a restaurant ID supplied by the client without verifying access.

## Frontend

Build:
- public restaurant/menu view;
- category navigation;
- menu item cards;
- manager menu table;
- create/edit/delete flows;
- availability toggle.

## Completion

A manager can maintain a menu and a customer can view the resulting catalog.
