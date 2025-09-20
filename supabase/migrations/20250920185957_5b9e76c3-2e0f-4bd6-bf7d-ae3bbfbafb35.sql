-- Fix critical security vulnerability in admins table
-- Remove overly permissive policies that allow any authenticated user full access

-- Drop existing dangerous policies
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.admins;
DROP POLICY IF EXISTS "admin_full_access" ON public.admins;

-- Create security definer function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admins 
    WHERE user_id = user_uuid 
    AND active = true
  );
$$;

-- Create secure RLS policies for admins table
-- Only verified admins can view admin records
CREATE POLICY "admins_select_admin_only" 
ON public.admins 
FOR SELECT 
USING (public.is_admin());

-- Only verified admins can create new admin accounts
CREATE POLICY "admins_insert_admin_only" 
ON public.admins 
FOR INSERT 
WITH CHECK (public.is_admin());

-- Only verified admins can update admin records
CREATE POLICY "admins_update_admin_only" 
ON public.admins 
FOR UPDATE 
USING (public.is_admin());

-- Only verified admins can delete admin records
CREATE POLICY "admins_delete_admin_only" 
ON public.admins 
FOR DELETE 
USING (public.is_admin());

-- Grant execute permission on the security function
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;