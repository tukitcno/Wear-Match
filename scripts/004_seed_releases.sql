-- Seed upcoming releases
INSERT INTO public.releases (name, date, product_id, image_url, description)
SELECT 
  'ND x RTFKT Clone X Collection',
  '2025-01-15'::date,
  id,
  '/placeholder.svg?height=400&width=600',
  'Limited edition collaboration featuring futuristic design elements and exclusive colorways.'
FROM public.products WHERE name = 'Air Jordan 1 High OG' LIMIT 1;

INSERT INTO public.releases (name, date, product_id, image_url, description)
SELECT 
  'ND High Black Dusty Cactus',
  '2025-02-01'::date,
  id,
  '/placeholder.svg?height=400&width=600',
  'Premium suede construction with unique earth-tone colorway. Limited quantities available.'
FROM public.products WHERE name = 'Nike Dunk Low Retro' LIMIT 1;

INSERT INTO public.releases (name, date, product_id, image_url, description)
SELECT 
  'Spring 2025 Collection',
  '2025-03-20'::date,
  id,
  '/placeholder.svg?height=400&width=600',
  'Fresh colorways perfect for the new season. Multiple styles dropping simultaneously.'
FROM public.products WHERE name = 'Air Jordan 4 Retro' LIMIT 1;
