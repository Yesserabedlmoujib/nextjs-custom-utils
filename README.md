# JavaScript Utilities Demo

A Next.js demonstration project showcasing practical implementations of key JavaScript concepts including debounce, throttle, and deep cloning.

## Features

- **Debounce Examples**: 
  - **Product Search**: 600ms delayed API calls after typing stops
  - **Form Validation**: 700ms delayed username/email availability checks
  - **Product Filters**: 500ms delayed filtering for categories and price ranges
- **Throttle Examples**: 
  - **Scroll Progress**: 100ms throttled scroll tracking for smooth progress bar
  - **Parallax Effects**: 20ms throttled scroll for optimized 50 FPS animations
  - **Infinite Scroll**: 1000ms throttled scroll position checks for API loading
- **Deep Clone Examples**:
  - **Shopping Cart**: Safe state management with quantity updates, discounts, and cart operations
  - **Resume Builder**: Complex nested state with undo functionality and form management
  - **State Safety**: Prevents mutations in React state with complete object copies

## Prerequisites

Before running this project, make sure you have:
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
## Install dependencies
  ```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
  # or
  bun install

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
