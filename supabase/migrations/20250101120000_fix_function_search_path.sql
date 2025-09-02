/*
# [SECURITY] Set Function Search Path
This operation sets a fixed `search_path` for the `handle_new_user` function. This is a security best practice to prevent potential vulnerabilities related to search path hijacking.

## Query Description:
This query modifies the existing `handle_new_user` function to explicitly set its `search_path` to `public`. This ensures that the function only looks for tables and other objects within the `public` schema, mitigating the risk of it executing malicious code from other schemas that might be in a user's or role's search path. This change does not affect existing data and is considered safe to apply.

## Metadata:
- Schema-Category: ["Safe", "Security"]
- Impact-Level: ["Low"]
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Function affected: `public.handle_new_user()`

## Security Implications:
- RLS Status: Not Applicable
- Policy Changes: No
- Auth Requirements: Requires admin privileges to alter the function.
- Fixes: This addresses the "[WARN] Function Search Path Mutable" security advisory.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible performance impact.
*/

ALTER FUNCTION public.handle_new_user() SET search_path = 'public';
