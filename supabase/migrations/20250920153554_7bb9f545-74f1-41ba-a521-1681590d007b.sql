-- Enable Row Level Security on all tables that have policies but RLS is disabled

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Enable RLS on categories table  
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Enable RLS on customers table
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Enable RLS on orcamentos table
ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;

-- Enable RLS on orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Enable RLS on order_items table
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Enable RLS on subcategories table
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;