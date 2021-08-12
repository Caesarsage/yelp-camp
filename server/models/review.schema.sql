-- optional
CREATE TABLE reviews(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating>=1 and rating<=5)
);

ALTER TABLE reviews ADD restaurant_id BIGSERIAL NOT NULL REFERENCES restaurant(id);

-- OR
CREATE TABLE reviews(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating>=1 and rating<=5),
  restaurant_id BIGSERIAL NOT NULL REFERENCES restaurant(id)
);