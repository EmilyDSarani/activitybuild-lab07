DROP TABLE IF EXISTS orders;

CREATE TABLE sentences (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  toxcity BOOLEAN
)