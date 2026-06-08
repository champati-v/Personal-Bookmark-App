# Personal Bookmark App Assignment | Eagerminds

A bookmark management application built with Next.js, Supabase, and Resend.
- Live Url - <https://links.vibek.space> | <https://personal-bookmark-app.vercel.app/>

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/champati-v/Personal-Bookmark-App.git
cd Personal-Bookmark-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Supabase project on https://supabase.com/

Create the following tables:

#### profiles

| Column     | Type                                |
| ---------- | ----------------------------------- |
| id         | uuid (PK, references auth.users.id) |
| handle     | text (unique)                       |
| created_at | timestamptz                         |

#### bookmarks

| Column     | Type        |
| ---------- | ----------- |
| id         | uuid        |
| user_id    | uuid        |
| title      | text        |
| url        | text        |
| is_public  | boolean     |
| created_at | timestamptz |
| updated_at | timestamptz |

### 4. Configure RLS Policies

RLS (Row Level Security provided by Supabase) must be enabled on both tables.
- Docs - https://supabase.com/docs/guides/database/postgres/row-level-security

Project Authetication Policies:

#### profiles

* Authenticated users can create their own profile
* Users can read their own profile
* Public users can read profiles by handle

#### bookmarks

* Users can create their own bookmarks
* Users can read their own bookmarks
* Users can update their own bookmarks
* Users can delete their own bookmarks
* Public users can read bookmarks where `is_public = true`

During development I had to manually create and adjust these policies because default permissions were causing access issues between authenticated, and service-role requests.

### 5. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run the application

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Where the AI Agent Got Things Wrong

1. After AI generated the dashboard, the code looked correct but database queries initially failed. After going the supabase settings, I found that table-level grants for the authenticated role were missing. After granting CRUD (SELECT, UPDATE, DELETE, INSERT) permissions, the queries were able to run sucessfully and users were able to access their bookmarks.

2. Similar thing happened while implementing the public profile page, the AI-generated solution failed because unauthenticated users could not access the public page. I found the issue, updated the access model to allow only public bookmarks to be queried, and learned about service role for making the query, which needs an API KEY and should not be exposed to browser/client. So I stored it securely in .env.local .

3. Also there were major improvements in the UI which I addressed using multiple coding agents like Cursor, Codex and Google Stitch (UI builder) to ensure a modern and SaaS styled UI. 

---

## Entire CLI Setup
- Initially I installed the Entire CLI and enabled it using codex agent, but the in initial few test commits, the entire/checkpoints/v1 branch was not getting updated. After a lot of trying and reading the Entire docs, it seems like the issue with codex agent, as it is mentioned that the codex agent support is in "Preview" stage in the documentation. So I swirched to Copilot CLI agent and continued the task.

---

## What I'd Improve With More Time

Although this project is working fine, but with more time, below are some of the things related to scalability I would like to learn more about and address them:
- what if > 1000 or 10,000 users visit the platform at the same time? how server and db will handle all the queries
- what if more than one user is trying to choose the same user handle at the same time? how to decide who gets the handle?
- Also I would like to add more features like profile picture, a custom QR code to share links, tracking the count of clicks on public bookmarks, and other feaures to make it a polished and ready to launch application.

## Live Demo

<https://links.vibek.space> | <https://personal-bookmark-app.vercel.app/>

## Repository

<https://github.com/champati-v/Personal-Bookmark-App>
