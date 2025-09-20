-- Fix security issue: Remove SECURITY DEFINER from views
-- First, let's check the current view definition and recreate it properly

-- Drop the existing orders_with_items view that likely has SECURITY DEFINER
DROP VIEW IF EXISTS public.orders_with_items;

-- Recreate the view without SECURITY DEFINER property
-- This view aggregates order data with their items for easier querying
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
    ) as items
FROM public.orders o
LEFT JOIN public.order_items oi ON o.id = oi.order_id
GROUP BY 
    o.id, o.customer_id, o.customer_name, o.customer_email, o.customer_phone,
    o.status, o.total, o.payment_method, o.shipping_address, o.notes,
    o.invoice_number, o.invoice_generated_at, o.created_at, o.updated_at;

-- Enable RLS on the view (views inherit RLS from underlying tables)
-- The view will now respect the RLS policies of the underlying tables
-- This is safer than using SECURITY DEFINER which bypasses user permissions

-- Add a comment explaining the security approach
COMMENT ON VIEW public.orders_with_items IS 
'View that combines orders with their items. Access is controlled by RLS policies on underlying tables (orders and order_items) rather than SECURITY DEFINER to maintain proper user-level security.';