# Supabase Integration Guide

## Current Status

Your PrepFlow application is now fully integrated with Supabase for authentication and database operations. Since you've already connected your Supabase project to your Vercel project, the environment variables are automatically available.

## What's Connected

### Authentication
- ✅ Email/Password signup and login
- ✅ Google OAuth (ready to configure)
- ✅ Session management with HTTP-only cookies
- ✅ Auth middleware protecting dashboard routes

### Database Integration
- ✅ User profiles table
- ✅ Interview sessions table
- ✅ Interview questions/answers table
- ✅ Interview reports table
- ✅ Analytics tracking table
- ✅ Row-level security policies

### Real-time Features
- ✅ User authentication state
- ✅ Profile data fetching
- ✅ Interview session storage
- ✅ Logout functionality

## Complete Integration Checklist

### Step 1: Apply Database Schema ✅ YOU NEED TO DO THIS

Go to your Supabase dashboard:
1. Navigate to **SQL Editor**
2. Create a new query
3. Copy the entire contents from `/db/migrations/schema.sql`
4. Execute the SQL to create all tables with RLS policies

This creates:
- `profiles` - User account information
- `interviews` - Interview session records
- `interview_questions` - Q&A pairs with scores
- `interview_reports` - AI-generated performance reports
- `analytics` - User performance metrics

### Step 2: Set Up Auth Profiles Trigger ✅ OPTIONAL BUT RECOMMENDED

In Supabase SQL Editor, run this to auto-create profiles when users sign up:

```sql
-- Create function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();
```

### Step 3: Configure Google OAuth ✅ OPTIONAL

In your Supabase dashboard:
1. Go to **Authentication** → **Providers**
2. Enable Google
3. Add your Google OAuth credentials
4. Google sign-up/login will work automatically

### Step 4: Test Authentication

1. Start the dev server: `pnpm dev`
2. Visit http://localhost:3000
3. Click "Sign Up" 
4. Create an account with email/password
5. Should redirect to dashboard with your name displayed
6. Profile dropdown shows your email
7. Logout works and redirects to home

## Features Now Working

### Authentication
- `app/(auth)/login/page.tsx` - Real Supabase login
- `app/(auth)/signup/page.tsx` - Real Supabase signup
- `app/auth/callback/route.ts` - OAuth callback handler
- `middleware.ts` - Protected dashboard routes

### Dashboard
- Real user name/email displayed
- User profile fetched from Supabase
- Logout functionality with state

### Server Actions
- `actions/auth.ts` - Authentication operations
- `actions/interview.ts` - Interview operations
- Server-side type-safe database calls

### Utilities
- `lib/supabase/client.ts` - Browser client
- `lib/supabase/server.ts` - Server client with service role
- `lib/supabase/auth.ts` - Authentication helpers

## Environment Variables

Your Vercel/v0 project automatically has these from Supabase connection:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (server-only)
```

Verify these in v0 settings → Vars section.

## Code Examples

### Get Current User

```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Fetch User Profile

```typescript
import { getUserProfile } from '@/lib/supabase/auth'

const profile = await getUserProfile(userId)
```

### Update Profile

```typescript
import { updateUserProfile } from '@/lib/supabase/auth'

const result = await updateUserProfile(userId, {
  bio: 'Senior Engineer',
  skills: ['React', 'TypeScript']
})
```

### Server-Side Auth Check

```typescript
import { requireAuth } from '@/lib/supabase/auth'

export async function someServerAction() {
  const user = await requireAuth() // Throws if not authenticated
  // Now you have the authenticated user
}
```

## Database Schema

### Profiles Table
```sql
- id (UUID) - Auth user ID
- email (TEXT)
- full_name (TEXT)
- bio (TEXT)
- avatar_url (TEXT)
- skills (JSON array)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Interviews Table
```sql
- id (UUID)
- user_id (UUID) - References profiles
- role (TEXT) - Backend, Frontend, etc
- interview_type (TEXT) - Technical, Behavioral, etc
- difficulty (TEXT) - Junior, Mid, Senior
- overall_score (INTEGER)
- created_at (TIMESTAMP)
- completed_at (TIMESTAMP)
```

### Interview Questions Table
```sql
- id (UUID)
- interview_id (UUID)
- question (TEXT)
- user_answer (TEXT)
- ai_evaluation (JSON)
- score (INTEGER)
```

### Interview Reports Table
```sql
- id (UUID)
- interview_id (UUID)
- summary (TEXT)
- strengths (TEXT array)
- weaknesses (TEXT array)
- recommendations (TEXT array)
- generated_at (TIMESTAMP)
```

### Analytics Table
```sql
- id (UUID)
- user_id (UUID)
- date (DATE)
- interviews_completed (INTEGER)
- avg_score (DECIMAL)
- skill_breakdown (JSON)
```

## Next Steps

1. **Apply database schema** (Step 1 above)
2. **Test signup/login** 
3. **Implement interview storage** - Connect interview completion to database
4. **Implement analytics** - Store scores and track progress
5. **Add real AI** - Connect OpenAI for actual question/feedback generation

## Troubleshooting

### "Supabase client not configured"
- Check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
- Verify they appear in v0 settings → Vars

### Login not working
- Check Supabase Authentication is enabled
- Verify database schema was applied
- Check browser console for specific errors

### RLS (Row Level Security) Issues
- All tables have RLS enabled by default
- Users can only access their own data
- Service role key bypasses RLS (used server-side)

### Auth state not persisting
- Cookies are HTTP-only and should persist
- Browser needs to allow cookies
- Check localStorage in browser dev tools

## File Structure

```
lib/supabase/
├── client.ts          # Browser client with auto-retry
├── server.ts          # Server client with service role
└── auth.ts            # Auth helpers (140+ lines)

actions/
├── auth.ts            # Auth server actions
└── interview.ts       # Interview operations

app/
├── (auth)/login       # Real Supabase login
├── (auth)/signup      # Real Supabase signup
└── auth/callback      # OAuth callback

types/
├── database.ts        # TypeScript types
└── supabase.ts        # Auto-generated Supabase types

db/migrations/
└── schema.sql         # Database schema
```

## Security Features

- ✅ Service role key never exposed to client
- ✅ Row-level security on all tables
- ✅ HTTP-only cookies for sessions
- ✅ Input validation on all operations
- ✅ Type-safe database operations
- ✅ Middleware protects dashboard routes
- ✅ Auth checks on all server actions

## Real Time Features (Optional)

To add real-time updates (interviews, scores, messages):

```typescript
// Subscribe to profile changes
const channel = supabase
  .channel(`profile:${userId}`)
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` },
    (payload) => {
      console.log('Profile changed!', payload)
    }
  )
  .subscribe()
```

## Production Checklist

Before deploying to production:

- [ ] Database schema applied to production Supabase
- [ ] RLS policies reviewed and correct
- [ ] Auth triggers configured
- [ ] Google OAuth credentials added (if using)
- [ ] Environment variables set in Vercel
- [ ] Service role key stored securely
- [ ] Error handling tested
- [ ] User can signup, login, logout
- [ ] User profile displays correctly
- [ ] Dashboard shows authenticated content

## Support

- Supabase Docs: https://supabase.com/docs
- Next.js Auth: https://nextjs.org/docs/app/building-your-application/authentication
- PrepFlow Docs: See INDEX.md
