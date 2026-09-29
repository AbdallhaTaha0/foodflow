# FoodFlow — DESIGN.md

## Design Direction

FoodFlow should look like a modern restaurant product rather than a generic dashboard template.

The visual identity is built around:

- **Orange Prime** — primary brand/accent color.
- **White** — secondary/background color.
- Neutral dark text and gray surfaces.
- Semantic colors only when communicating state.

## Color Tokens

Use CSS variables/design tokens rather than scattering raw hex values.

Suggested starting palette:

```css
:root {
  --color-primary: #f97316;
  --color-primary-hover: #ea580c;
  --color-primary-soft: #fff7ed;

  --color-secondary: #ffffff;

  --color-text: #171717;
  --color-text-muted: #737373;

  --color-surface: #ffffff;
  --color-surface-muted: #fafafa;
  --color-border: #e5e5e5;

  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-danger: #dc2626;
  --color-info: #2563eb;
}
```

Orange is the brand color. Do not use orange for every element; preserve hierarchy and whitespace.

## Typography

Use a clean modern sans-serif.

Hierarchy:

```text
Page title
Section title
Card title
Body
Secondary text
Caption
```

Prioritize readability over decorative typography.

## Layout

### Customer

```text
Header
  ↓
Restaurant Hero
  ↓
Categories
  ↓
Menu
  ↓
Cart / Checkout
```

### Kitchen

```text
Top bar
  ↓
Order statistics
  ↓
Kanban/order columns
  ↓
Order cards
```

### Admin

```text
Sidebar
  ├── Overview
  ├── Orders
  ├── Menu
  ├── Staff
  └── Settings

Main content
```

## Components

Build reusable primitives:

- Button
- Input
- Select
- Dialog
- Dropdown
- Badge
- Card
- Table
- Tabs
- Toast
- Skeleton
- EmptyState
- ErrorState

Then build FoodFlow-specific components:

- MenuItemCard
- CartItem
- OrderCard
- OrderStatusBadge
- KitchenBoard
- SalesChart
- RestaurantHeader

## Order Status UI

Use semantic visual states:

```text
Pending       → warning
Confirmed     → info
Preparing     → primary
Ready         → success
Completed     → neutral/success
Cancelled     → danger
```

These semantic colors are secondary to the brand palette and should not compete with Orange Prime.

## Responsive Design

Design mobile-first.

Customer:
- optimize for mobile ordering;
- sticky cart/checkout affordance where appropriate.

Kitchen:
- desktop/tablet first;
- maintain usable touch targets.

Admin:
- desktop-first dashboard;
- responsive fallback for tablet/mobile.

## Accessibility

- Keyboard navigation.
- Visible focus states.
- Semantic HTML.
- Proper labels.
- Sufficient contrast.
- Do not communicate status by color alone.
- Touch targets should be comfortably tappable.
- Dialogs must trap focus appropriately.

## Motion

Motion should communicate state, not decorate everything.

Good uses:
- order status changes;
- toast appearance;
- modal transitions;
- subtle card interactions.

Avoid:
- excessive page animations;
- animations that delay core workflows;
- motion that harms accessibility.

Respect reduced-motion preferences.

## Image Strategy

Menu images should be optimized and lazy-loaded where appropriate.

Do not make the UI dependent on remote image availability. Provide placeholders/fallbacks.

## Visual Goal

The final product should communicate:

```text
Fresh
Fast
Professional
Reliable
Restaurant-focused
```

without becoming visually noisy.
