/*dropping the tables*/
DROP TABLE IF EXISTS public.items;
DROP TABLE IF EXISTS public.users;
/*creating the tables*/
CREATE TABLE IF NOT EXISTS public.users(
id serial PRIMARY KEY ,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
username VARCHAR(50) NOT NULL,
password varchar(255) NOT NULL,
phone VARCHAR(25),
email VARCHAR(100) NOT NULL UNIQUE,
profile_image TEXT,
google_id TEXT UNIQUE,
is_admin boolean DEFAULT FALSE,
created_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS public.items(
	id SERIAL PRIMARY KEY ,
	user_id INTEGER NOT NULL,
	name VARCHAR(150) NOT NULL,
	price NUMERIC(10,2) NOT NULL,
	description TEXT,
	image_path TEXT NOT NULL,
	created_date DATE DEFAULT CURRENT_DATE

	FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);