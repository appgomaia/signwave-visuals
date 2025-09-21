-- Fix security definer view issue by changing ownership
-- The orders_with_items view is currently owned by postgres superuser
-- which gives it elevated privileges. We need to change ownership to authenticator role.

-- Change the view ownership to authenticator role to remove elevated privileges
ALTER VIEW public.orders_with_items OWNER TO authenticator;

-- Ensure the view respects RLS by recreating it without superuser privileges
-- Drop and recreate the view to ensure it doesn't have elevated permissions
DROP VIEW IF EXISTS public.orders_with_items;

-- Recreate the view with proper permissions
CREATE VIEW public.orders_with_items AS
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

-- Set proper ownership to authenticator role
ALTER VIEW public.orders_with_items OWNER TO authenticator;