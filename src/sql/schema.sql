DROP DATABASE IF EXISTS restaurant_crud;
CREATE DATABASE restaurant_crud;

\c restaurant_crud

CREATE TABLE restaurants (
    id serial PRIMARY KEY,
    name varchar(40),
    img text,
    food_type varchar(40),
    city text,
    state varchar(3),
    description varchar(250)
);

CREATE TABLE ratings (
    id serial PRIMARY KEY,
    restaurant_id integer references restaurants(id),
    user_name varchar(20) UNIQUE,
    rating integer DEFAULT 1,
    review text
);

