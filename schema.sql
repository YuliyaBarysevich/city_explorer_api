DROP TABLE IF EXISTS location_info;

CREATE TABLE location_info (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query TEXT,
  latitude decimal,
  longitude decimal
)