-- Fix function search path security warnings
-- Update existing functions to have secure search_path settings

-- Fix the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Fix the generate_invoice_number function  
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS text AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Fix the auto_generate_invoice function
CREATE OR REPLACE FUNCTION public.auto_generate_invoice()
RETURNS trigger AS $$
BEGIN
    IF NEW.status = 'Confirmado' AND (OLD.invoice_number IS NULL OR OLD.invoice_number = '') THEN
        NEW.invoice_number := generate_invoice_number();
        NEW.invoice_generated_at := NOW();
    END IF;
    
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;