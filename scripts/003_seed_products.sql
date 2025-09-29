-- Seed some sample sneakers
INSERT INTO public.products (type, name, description, price, image_url, colors, brand, stock, release_date) VALUES
('sneaker', 'Air Jordan 1 High OG', 'The iconic Air Jordan 1 in classic colorways. Premium leather construction with Nike Air cushioning.', 170.00, '/placeholder.svg?height=400&width=400', ARRAY['Black/White', 'Chicago', 'Royal Blue'], 'Air Jordan', 50, '2024-03-15'),
('sneaker', 'Nike Dunk Low Retro', 'Classic basketball style meets modern comfort. Vintage look with premium materials.', 110.00, '/placeholder.svg?height=400&width=400', ARRAY['Panda', 'University Blue', 'Black/White'], 'Nike', 75, '2024-02-20'),
('sneaker', 'Air Jordan 4 Retro', 'Legendary design from 1989. Features visible Air unit and iconic mesh panels.', 210.00, '/placeholder.svg?height=400&width=400', ARRAY['White Cement', 'Black Cat', 'Military Blue'], 'Air Jordan', 30, '2024-04-10'),
('sneaker', 'Nike Air Force 1 Low', 'The shoe that started it all. Timeless design with unmatched versatility.', 110.00, '/placeholder.svg?height=400&width=400', ARRAY['Triple White', 'Triple Black', 'White/Gum'], 'Nike', 100, '2024-01-05'),
('sneaker', 'Air Jordan 3 Retro', 'The first Jordan with visible Air. Elephant print and Jumpman logo.', 200.00, '/placeholder.svg?height=400&width=400', ARRAY['White Cement', 'Black Cement', 'Fire Red'], 'Air Jordan', 40, '2024-05-01'),
('sneaker', 'Nike SB Dunk High', 'Skateboarding heritage with premium cushioning. Bold colorways and durable construction.', 125.00, '/placeholder.svg?height=400&width=400', ARRAY['Syracuse', 'Kentucky', 'Black/White'], 'Nike', 60, '2024-03-25'),
('sneaker', 'Air Jordan 11 Retro', 'Patent leather luxury meets performance. The most iconic Jordan silhouette.', 220.00, '/placeholder.svg?height=400&width=400', ARRAY['Bred', 'Concord', 'Space Jam'], 'Air Jordan', 25, '2024-12-15'),
('sneaker', 'Nike Air Max 90', 'Visible Air cushioning and bold design. A true icon of the 90s.', 130.00, '/placeholder.svg?height=400&width=400', ARRAY['Infrared', 'Triple White', 'Black/White'], 'Nike', 80, '2024-02-10');

-- Add design collections as JSONB
UPDATE public.products SET designs = '[
  {"name": "Head Banger", "thumbnail_url": "/placeholder.svg?height=200&width=200"},
  {"name": "Hello Ladies", "thumbnail_url": "/placeholder.svg?height=200&width=200"},
  {"name": "All Things Love", "thumbnail_url": "/placeholder.svg?height=200&width=200"},
  {"name": "Classic Logo", "thumbnail_url": "/placeholder.svg?height=200&width=200"},
  {"name": "Street Art", "thumbnail_url": "/placeholder.svg?height=200&width=200"},
  {"name": "Retro Wave", "thumbnail_url": "/placeholder.svg?height=200&width=200"}
]'::jsonb WHERE type = 'sneaker';
