-- Fix critical security issue: Secure admin credentials from unauthorized access
-- Remove all existing overly permissive policies on admins table
DROP POLICY IF EXISTS "admin_full_access" ON public.admins;
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.admins;

-- Create secure policies for admin data protection
-- Policy 1: Admins can only view their own profile data
CREATE POLICY "Admins can view own profile" 
ON public.admins 
FOR SELECT 
USING (auth.uid() = user_id AND active = true);

-- Policy 2: Admins can update their own profile (excluding sensitive fields)
CREATE POLICY "Admins can update own profile" 
ON public.admins 
FOR UPDATE 
USING (auth.uid() = user_id AND active = true)
WITH CHECK (
  auth.uid() = user_id 
  AND active = true
  -- Prevent users from changing their own role or permissions
  AND role = OLD.role 
  AND permissions = OLD.permissions
);

-- Policy 3: Super admins can view all admin data (requires proper role hierarchy)
-- This assumes you have a role-based system where certain admins have elevated permissions
CREATE POLICY "Super admins can view all admins" 
ON public.admins 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
    AND (
      role = 'super_admin' 
      OR permissions @> '{"manage_admins": true}'::jsonb
    )
  )
);

-- Policy 4: Super admins can manage other admin accounts
CREATE POLICY "Super admins can manage admins" 
ON public.admins 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
    AND (
      role = 'super_admin' 
      OR permissions @> '{"manage_admins": true}'::jsonb
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
    AND (
      role = 'super_admin' 
      OR permissions @> '{"manage_admins": true}'::jsonb
    )
  )
);

-- Policy 5: Allow admin creation only by super admins or during initial setup
CREATE POLICY "Controlled admin creation" 
ON public.admins 
FOR INSERT 
WITH CHECK (
  -- Allow creation if no admins exist (initial setup)
  NOT EXISTS (SELECT 1 FROM public.admins WHERE active = true)
  OR
  -- Or if a super admin is creating the account
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
    AND (
      role = 'super_admin' 
      OR permissions @> '{"manage_admins": true}'::jsonb
    )
  )
);

-- Add a comment explaining the security model
COMMENT ON TABLE public.admins IS 
'Admin accounts table with strict RLS policies. Only allows admins to view their own data and super admins to manage other accounts. Prevents unauthorized access to sensitive admin credentials.';