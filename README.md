GitHub Repository Search

A simple frontend app to search GitHub repositories using React, TypeScript, and TanStack Query.

Features

  1. Search GitHub repositories by keyword.

  2. Filter by programming language.

  3. Sort by stars, forks, or last updated.

  4. Sort order: ascending/descending.

  5. Pagination with previous/next buttons and page count.

  6. Debounced input (500ms) to reduce unnecessary API calls.

  7. Clears previous results automatically when input is empty.

  8. Accessible components with aria-live and proper roles.

  9. Displays star counts.

Setup

1. Clone the repository
    git clone https://github.com/Sho-s01/github-explorer.git
    cd github-repo-search

2. Install dependencies
    npm install

3. Add GitHub Token (Optional)
    Create a .env file in the project root:

    VITE_GITHUB_TOKEN=YOUR_PERSONAL_ACCESS_TOKEN

4. Run the app
    npm run dev

Open your browser at the URL shown in the console.

Default is usually http://localhost:5173, but it may change if the port is in use.

NOTE

1. Without a Token (Unauthenticated Requests)

    Maximum 10 requests per minute.

    IP-based limit (multiple users on the same IP share it).

    Suitable for quick tests or demos.

    Requests may fail if the limit is exceeded.

2. With a Personal Access Token (Read-Only)

    Maximum 5,000 requests per hour per user.

    Recommended for submission or frequent usage.

    Only requires public_repo or read-only permissions.
