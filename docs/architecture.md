A lightweight bookmark management application where users can:

- Sign up and log in
- Manage personal bookmarks
- Control bookmark visibility (public/private)
- Claim a unique public handle
- Share public bookmarks through a profile page

The application uses Supabase for authentication and database services, Resend for transactional email delivery, and Vercel for deployment.

## Functional Requirements

### Authentication
- User signup
- User login
- User logout
- Welcome email after signup

### Profile
- Unique handle per user
- Public profile page

### Bookmarks
- Create bookmark
- Edit bookmark
- Delete bookmark
- Public/private visibility

### Dashboard
- Authenticated access only

### Security
- User data isolation
- Ownership-based access control

## Routes

/               -> Landing page
/login          -> Login page
/signup         -> Signup page
/dashboard      -> User dashboard (protected)
/settings       -> Profile settings
/[handle]       -> Public profile page

## Tables

profiles

- id (uuid, references auth.users.id)
- handle (text, unique)
- created_at

bookmarks

- id (uuid)
- user_id (uuid)
- title (text)
- url (text)
- is_public (boolean)
- created_at
- updated_at

## Security

Profiles

- Users can view public profile information.
- Users can update only their own profile.

Bookmarks

- Users can create bookmarks owned by themselves.
- Users can view only their own bookmarks in the dashboard.
- Users can update only their own bookmarks.
- Users can delete only their own bookmarks.

Public Access

- Public visitors may view only bookmarks where is_public = true.
- Private bookmarks must never be exposed through public routes or direct API access.

## Authentication Flow

User Signup
    ↓
Supabase Auth
    ↓
Create profile record
    ↓
Send welcome email
    ↓
Redirect to dashboard

## External Services

Supabase
- Authentication
- Database
- Row Level Security

Resend
- Welcome email delivery

Vercel
- Hosting
- Deployment

## Development Phases

Phase 1
- Repository setup
- Entire CLI setup
- Service accounts

Phase 2
- Authentication

Phase 3
- Profiles and handles

Phase 4
- Welcome email

Phase 5
- Bookmark CRUD

Phase 6
- Security hardening

Phase 7
- Public profile pages

Phase 8
- Deployment

Phase 9
- Testing and documentation