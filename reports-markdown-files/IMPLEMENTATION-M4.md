# FoodFlow — IMPLEMENTATION-M4.md

## Objective
Implement cart and transactional order creation.

## Cart

Cart may be client-managed, but the server must revalidate all prices and availability during checkout.

## Checkout

Client submits item identifiers and quantities.

Server:
1. authenticates customer;
2. loads current menu items;
3. verifies availability;
4. verifies restaurant consistency;
5. calculates prices;
6. calculates subtotal/fees/discounts;
7. creates order and items in a Prisma transaction;
8. returns persisted order.

Never accept client-calculated totals as authoritative.

## Historical Pricing

Order items must store the charged unit price at the time of purchase.

Changing the menu price later must not change old orders.

## Frontend

Implement:
- cart;
- checkout;
- confirmation;
- order detail;
- order history.

## Completion

A customer can create and review a valid order, while invalid/stale carts are rejected safely.
