# Token Trading Table

A pixel-perfect, high-performance token discovery interface built with Next.js 14, Redux Toolkit, and Real-time WebSocket simulation.

## 🚀 Features

- **High Performance:** Optimized rendering with `React.memo` and Atomic Architecture.
- **Real-time Updates:** Simulated WebSocket connection pulsing live price, volume, and metric updates via Redux.
- **Responsive Design:** Fully responsive layout supporting devices down to **320px**.
- **Market Filters:** Switch between "New Pairs", "Final Stretch", and "Migrated" views.
- **Interactive UI:** Sorting, Hover effects, and accessible Radix UI components.
- **Modern Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, TanStack Query.

## � Screenshots

### Desktop View
![Desktop Preview](docs/desktop-preview.png)

### Mobile View
<img src="docs/mobile-preview.jpg" width="300" alt="Mobile Preview" />

## �🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + `clsx`/`tailwind-merge`
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (Global State), [React Query](https://tanstack.com/query/latest) (Server/Async State)
- **UI Components:** Radix UI primitives, Lucide Icons.

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  Navigate to the project directory:
    ```bash
    cd token-trading-table
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/           # Components following Atomic Design
│   ├── atoms/            # Basic building blocks (Badge, Button)
│   ├── molecules/        # Composite components (TokenCell, PriceCell)
│   └── organisms/        # Complex functional sections (TokenTable)
├── lib/                  # Utilities, Stores, and Hooks
│   ├── features/         # Redux Slices (tokenSlice)
│   ├── hooks/            # Custom Hooks (useTokenData)
│   └── websocket.ts      # Mock WebSocket Service
└── styles/               # Global styles
```

## 🧪 Verification

To run the production build verification:

```bash
npm run build
```

## 🎨 Design Decisions

- **Atomic Architecture:** Ensures reusability and maintainability of UI components.
- **Redux for Real-time Data:** Used to efficiently manage high-frequency updates from the WebSocket across the application without prop drilling.
- **Grid Layout:** Used CSS Grid for the table to ensuring perfect alignment across viewports without layout shifts.
