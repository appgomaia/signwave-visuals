-- Fix security issue: Restrict access to customer personal information
-- Remove the overly permissive policy that allows all authenticated users to access all customer data
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.customers;

-- Create secure policies that protect customer personal information
-- Policy 1: Customers can only view their own data
CREATE POLICY "Customers can view own data" 
ON public.customers 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Customers can only update their own data
CREATE POLICY "Customers can update own data" 
ON public.customers 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy 3: Customers can insert their own data (for registration)
CREATE POLICY "Customers can create own profile" 
ON public.customers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Only admins can view all customer data (for admin panel)
-- Note: This requires implementing proper admin role checking
CREATE POLICY "Admins can view all customers" 
ON public.customers 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
);

-- Policy 5: Admins can modify customer data
CREATE POLICY "Admins can modify customers" 
ON public.customers 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
);