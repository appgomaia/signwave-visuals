-- Fix Security Definer functions that don't need elevated privileges
-- Convert functions to SECURITY INVOKER where possible to reduce security risks

-- Fix update_updated_at_column function - doesn't need SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
STABLE SECURITY INVOKER
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Fix auto_generate_invoice function - trigger functions can use SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.auto_generate_invoice()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
    IF NEW.status = 'Confirmado' AND (OLD.invoice_number IS NULL OR OLD.invoice_number = '') THEN
        NEW.invoice_number := generate_invoice_number();
        NEW.invoice_generated_at := NOW();
    END IF;
    
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$;

-- Fix generate_invoice_number function - convert to SECURITY INVOKER 
-- This should work since it only reads from orders table which users can access through RLS
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS text
LANGUAGE plpgsql
STABLE SECURITY INVOKER
AS $$
DECLARE
    current_year TEXT;
    current_month TEXT;
    sequence_num INTEGER;
    invoice_num TEXT;
BEGIN
    current_year := EXTRACT(YEAR FROM NOW())::TEXT;
    current_month := LPAD(EXTRACT(MONTH FROM NOW())::TEXT, 2, '0');
    
    SELECT COALESCE(MAX(
        CASE 
            WHEN invoice_number ~ ('^INV-' || current_year || current_month || '-[0-9]+$')
            THEN SUBSTRING(invoice_number FROM LENGTH('INV-' || current_year || current_month || '-') + 1)::INTEGER
            ELSE 0
        END
    ), 0) + 1
    INTO sequence_num
    FROM orders
    WHERE invoice_number IS NOT NULL;
    
    invoice_num := 'INV-' || current_year || current_month || '-' || LPAD(sequence_num::TEXT, 4, '0');
    
    RETURN invoice_num;
END;
$$;

-- Keep is_admin function as SECURITY DEFINER since it's needed to prevent RLS recursion
-- But ensure it has proper security measures
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admins 
    WHERE user_id = user_uuid 
    AND active = true
  );
$$;