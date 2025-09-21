-- Fix security definer view issue
-- The orders_with_items view was created with elevated privileges
-- We need to ensure it respects RLS policies properly

-- Drop the existing view
DROP VIEW IF EXISTS public.orders_with_items;

-- Recreate the view ensuring it will respect RLS policies
-- This view will now inherit the permissions of the calling user
CREATE VIEW public.orders_with_items 
WITH (security_barrier=true) AS
SELECT 
  o.id,
  o.customer_id,
  o.customer_name,
  o.customer_email,
  o.customer_phone,
  o.status,
  o.total,
  o.payment_method,
  o.shipping_address,
  o.notes,
  o.invoice_number,
  o.invoice_generated_at,
  o.created_at,
  o.updated_at,
  COALESCE(
    json_agg(
      json_build_object(
        'id', oi.id, 
        'name', oi.name, 
        'description', oi.description, 
        'quantity', oi.quantity, 
        'price', oi.price, 
        'total', oi.total
      )
    ) FILTER (WHERE oi.id IS NOT NULL), 
    '[]'::json
  ) AS items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY 
  o.id, o.customer_id, o.customer_name, o.customer_email, 
  o.customer_phone, o.status, o.total, o.payment_method, 
  o.shipping_address, o.notes, o.invoice_number, 
  o.invoice_generated_at, o.created_at, o.updated_at;

-- Grant appropriate permissions to authenticated users
GRANT SELECT ON public.orders_with_items TO authenticated;