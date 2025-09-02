## Next.js Scheduler with Pages Router

This sample shows how to integrate Nylas Scheduler in a Next.js Pages Router app using the same minimal UI as the App Router version.

## Prerequisites

- Node v20 or higher
- Nylas Application (Client ID) see our [docs](https://developer.nylas.com/docs/v3/getting-started/scheduler/#set-up-your-nylas-account) for more information.
- Nylas callback URI configured for `http://localhost:3000/scheduler-editor` see our [docs](https://developer.nylas.com/docs/v3/getting-started/scheduler/#register-callback-uri) for more information.
- Create a `.env.development` file in the root of the project and add the following environment variables.
    ```bash
    NEXT_PUBLIC_NYLAS_CLIENT_ID=<YOUR_NYLAS_CLIENT_ID>
    NEXT_PUBLIC_NYLAS_API_ENDPOINT=https://api.us.nylas.com/v3
    ```
## Running the project

1. First install all dependencies by running the following command in the root of the project.
    ```bash
    npm install
    ```

2. Start the development server by running the following command in the root of the project.
    ```bash
    npm run dev
    ```

3. Open [http://localhost:3000](http://localhost:3000).

## Screenshots

Home

![Home](../figures/home.png)

Scheduler Editor

![Scheduler Editor](../figures/scheduler-editor.png)

Scheduling Page

![Scheduling Page](../figures/nylas-scheduling-page.png)

## Routes

- Home: `/`
- Scheduler Editor: `/scheduler-editor`
- Scheduling Page by slug: `/[slug]`
- Manage booking by reference: `/booking-ref/[bookingRef]/cancel` and `/booking-ref/[bookingRef]/reschedule`

### Notes

- Nylas UI components are dynamically imported with SSR disabled.
