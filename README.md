# Education Dashboard - Angular 17

An education management dashboard built with Angular 17, featuring:

- **Atomic Design System** (Atoms, Molecules, Organisms, Templates, Pages)
- **SCSS with BEM naming convention**
- **Bootstrap 5 + Angular Material**
- **Standalone Components**
- **Signals for state management**

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core services and models
│   │   ├── models/
│   │   │   ├── student.model.ts
│   │   │   └── menu.model.ts
│   │   └── services/
│   │       ├── student.service.ts
│   │       └── sidebar.service.ts
│   │
│   ├── ui/                      # Atomic Design Components
│   │   ├── atoms/               # Basic building blocks
│   │   │   ├── avatar/
│   │   │   ├── badge/
│   │   │   ├── button/
│   │   │   ├── icon/
│   │   │   └── input/
│   │   │
│   │   ├── molecules/           # Combinations of atoms
│   │   │   ├── action-buttons/
│   │   │   ├── breadcrumb/
│   │   │   ├── pagination/
│   │   │   ├── search-bar/
│   │   │   ├── sidebar-item/
│   │   │   └── view-toggle/
│   │   │
│   │   ├── organisms/           # Complex UI sections
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   └── students-table/
│   │   │
│   │   ├── templates/           # Page layouts
│   │   │   └── main-layout/
│   │   │
│   │   └── pages/               # Full pages
│   │       ├── dashboard/
│   │       ├── students/
│   │       ├── professors/
│   │       ├── courses/
│   │       └── ...
│   │
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
├── assets/
│   └── images/
│       └── avatars/
│
└── styles/
    ├── _variables.scss          # Design tokens
    ├── _mixins.scss             # Reusable mixins
    └── styles.scss              # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Open browser at `http://localhost:4200`

## Features

- **Dashboard** - Overview with statistics
- **Students Management** - List view and grid view with pagination
- **Responsive Sidebar** - Collapsible navigation
- **Search Functionality** - Filter students
- **CRUD Operations** - Add, edit, delete students

## Technology Stack

- Angular 17
- TypeScript
- SCSS
- Bootstrap 5
- Angular Material
- RxJS

## BEM Naming Convention

All CSS classes follow BEM methodology:
- `.block` - Component container
- `.block__element` - Child element
- `.block--modifier` - Variant state

Example:
```scss
.sidebar-item {
  &__icon { }
  &__label { }
  &--active { }
  &--collapsed { }
}
```

## License

MIT
