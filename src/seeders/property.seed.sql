-- TRUNCATE TABLE "property";

INSERT INTO "property" (
  id, title, description, price_per_night, available_from, available_to
) VALUES
(uuid_generate_v4(), 'Cozy Downtown Studio', 'A compact but stylish studio apartment located in the heart of the city, perfect for solo travelers.', 80, '2025-09-01', '2025-12-31'),
(uuid_generate_v4(), 'Beachfront Villa', 'Luxury villa with direct beach access, private pool, and stunning ocean views.', 450, '2025-08-15', '2026-01-15'),
(uuid_generate_v4(), 'Rustic Mountain Cabin', 'Charming wooden cabin surrounded by pine trees, ideal for nature lovers.', 120, '2025-10-01', '2026-03-31'),
(uuid_generate_v4(), 'Modern Loft Apartment', 'Spacious loft with floor-to-ceiling windows, fully equipped kitchen, and rooftop access.', 150, '2025-09-10', '2026-02-28'),
(uuid_generate_v4(), 'Country Farmhouse', 'Traditional farmhouse with large garden, perfect for families and pets.', 100, '2025-09-05', '2026-06-30'),
(uuid_generate_v4(), 'Luxury Penthouse', 'High-rise penthouse with panoramic city views, private elevator, and hot tub.', 600, '2025-08-20', '2025-12-20'),
(uuid_generate_v4(), 'Lakeview Cottage', 'Peaceful lakeside property with dock access and fireplace for cozy evenings.', 130, '2025-09-15', '2026-04-15'),
(uuid_generate_v4(), 'Desert Retreat', 'Unique eco-friendly house in the desert, offering complete privacy and stargazing opportunities.', 200, '2025-09-01', '2026-01-31'),
(uuid_generate_v4(), 'Historic Townhouse', 'Beautifully restored townhouse with vintage furniture and modern amenities.', 170, '2025-09-20', '2026-05-20'),
(uuid_generate_v4(), 'Ski-In Ski-Out Chalet', 'Premium chalet right on the slopes, perfect for ski enthusiasts.', 400, '2025-12-01', '2026-03-15');
