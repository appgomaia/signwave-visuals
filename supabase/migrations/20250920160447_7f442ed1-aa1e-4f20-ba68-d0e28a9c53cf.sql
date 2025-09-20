-- Fix RLS policies for orcamentos table to protect sensitive customer data
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Admins can view all quotes" ON public.orcamentos;
DROP POLICY IF EXISTS "Admins can insert quotes" ON public.orcamentos;
DROP POLICY IF EXISTS "Admins can update quotes" ON public.orcamentos;
DROP POLICY IF EXISTS "Admins can delete quotes" ON public.orcamentos;

-- Create secure RLS policies for orcamentos table

-- Allow anyone to submit quote requests (public form submission)
CREATE POLICY "Anyone can submit quote requests"
ON public.orcamentos
FOR INSERT
WITH CHECK (true);

-- Only authenticated admins can view quote requests
CREATE POLICY "Only admins can view quote requests"
ON public.orcamentos
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admins
    WHERE admins.user_id = auth.uid()
    AND admins.active = true
  )
);

-- Only authenticated admins can update quote requests
CREATE POLICY "Only admins can update quote requests"
ON public.orcamentos
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admins
    WHERE admins.user_id = auth.uid()
    AND admins.active = true
  )
);

-- Only authenticated admins can delete quote requests
CREATE POLICY "Only admins can delete quote requests"
ON public.orcamentos
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admins
    WHERE admins.user_id = auth.uid()
    AND admins.active = true
  )
);