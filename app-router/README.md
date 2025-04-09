# Next.js Scheduler with App Router

This project demonstrates how to integrate the Nylas Scheduler component within a Next.js application using the App Router architecture.

## Prerequisites

- Node.js 20.x or higher
- npm or pnpm
- A Nylas developer account and client ID

## Environment Setup

This project uses environment variables for configuration:

1. Create a `.env.local` file by copying the example file:

```bash
cp .env.example .env.local
```

2. Update the values in `.env.local` with your actual configuration:

```
# Required - Your Nylas application client ID
NEXT_PUBLIC_NYLAS_CLIENT_ID=your_actual_client_id

# Optional - Defaults to https://api.us.nylas.com/v3
# Use https://api.eu.nylas.com/v3 for EU data residency
NEXT_PUBLIC_NYLAS_API_ENDPOINT=https://api.us.nylas.com/v3
```

## Installation and Setup

1. Install dependencies:

```bash
npm install
# or
pnpm install
```

2. Build the application:

```bash
npm run build
# or
pnpm build
```

3. Start the development server:

```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the scheduler.

## Usage

The main scheduler components are located in:
- Scheduling page: `src/app/scheduling-page/page.tsx`
- Scheduler editor: `src/app/scheduler-editor/page.tsx`. 

You can modify these files to customize the scheduler configuration and appearance.

### Using Query Parameters

The scheduling page supports the following query parameters:

- `slug`: The unique identifier for a scheduler configuration. Example: `http://localhost:3000/scheduling-page?slug=your-scheduler-config-id`

If no slug is provided, the application will use a default value `test`.

## Documentation

For more information about the Nylas Scheduler component, refer to the [Nylas documentation](https://developer.nylas.com/docs/v3/scheduler/).

## License

This project is MIT licensed.

