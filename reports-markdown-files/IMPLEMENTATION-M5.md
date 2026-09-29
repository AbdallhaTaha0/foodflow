# FoodFlow — IMPLEMENTATION-M5.md

## Objective
Implement the realtime operational experience with Socket.IO.

## Socket Authentication

Authenticate the socket connection using the same authenticated identity model as the API. Do not trust client-supplied user IDs or restaurant IDs.

## Rooms

Use scoped rooms such as:

```text
restaurant:{restaurantId}:kitchen
user:{userId}
```

Only authorized users may join relevant rooms.

## Events

Suggested events:

```text
order.created
order.confirmed
order.preparing
order.ready
order.completed
order.cancelled
```

Use a documented event payload shape.

## Status Changes

Do not allow arbitrary transitions.

The service validates:

```text
PENDING → CONFIRMED
CONFIRMED → PREPARING
PREPARING → READY
READY → COMPLETED
```

with explicit cancellation rules.

## Persistence First

Always:

```text
validate
→ authorize
→ persist
→ emit event
```

If the socket event is missed, the client must be able to refetch authoritative state.

## Frontend

Implement:
- kitchen order board;
- live incoming orders;
- status controls;
- customer live tracking;
- reconnect handling.

## Completion

Two browser sessions should demonstrate a kitchen status change appearing in the customer session without manual refresh.
