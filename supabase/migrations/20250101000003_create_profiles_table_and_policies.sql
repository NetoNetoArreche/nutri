/*
# Create Profiles Table
This script creates the `profiles` table to store public user data and sets up security policies.

## Query Description:
This operation is safe and essential for user management. It creates a new `profiles` table linked to `auth.users` and establishes Row Level Security (RLS) policies. These policies ensure that users can only access and modify their own profile data, protecting user privacy. A trigger is also created to automatically populate a new profile when a user signs up.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (by dropping the table, policies, and trigger)

## Structure Details:
- Table Created: `public.profiles`
  - Columns: `id` (UUID, PK, FK to auth.users.id), `name` (TEXT), `avatar_url` (TEXT), `specialty` (TEXT), `created_at` (TIMESTAMPTZ), `updated_at` (TIMESTAMPTZ)
- Trigger Created: `on_auth_user_created` on `auth.users`
- RLS Enabled: on `public.profiles`
- Policies Created: "Public profiles are viewable by everyone.", "Users can insert their own profile.", "Users can update their own profile."

## Security Implications:
- RLS Status: Enabled on `public.profiles`
- Policy Changes: Yes, new policies are created to secure user data.
- Auth Requirements: Policies are based on `auth.uid()`.

## Performance Impact:
- Indexes: A primary key index is created on `profiles.id`.
- Triggers: One trigger is added to `auth.users` which fires after an insert. The impact is minimal.
- Estimated Impact: Low performance impact.
*/

-- 1. Create the profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  specialty TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for RLS
CREATE POLICY "Public profiles are viewable by everyone."
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create a trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Add comments to the table and columns
COMMENT ON TABLE public.profiles IS 'Stores public profile information for each user.';
COMMENT ON COLUMN public.profiles.id IS 'References the user in auth.users.';
