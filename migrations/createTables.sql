CREATE TABLE user_credentials (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE user_profile (
  user_id INT PRIMARY KEY REFERENCES user_credentials(id),
  full_name VARCHAR(50) NOT NULL,
  address1 VARCHAR(100) NOT NULL,
  address2 VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  state CHAR(2) NOT NULL,
  zip_code VARCHAR(9) NOT NULL,
  skills TEXT[] NOT NULL,
  preferences TEXT,
  availability DATE[]
);

CREATE TABLE event_details (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  event_description TEXT NOT NULL,
  location TEXT NOT NULL,
  required_skills TEXT[] NOT NULL,
  urgency VARCHAR(10) NOT NULL,
  event_date DATE NOT NULL
);

CREATE TABLE volunteer_history (
  id SERIAL PRIMARY KEY,
  volunteer_id INT REFERENCES user_profile(user_id),
  event_id INT REFERENCES event_details(id),
  participation_status VARCHAR(20) NOT NULL
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  volunteer_id INT REFERENCES user_profile(user_id),
  message TEXT NOT NULL
);

CREATE TABLE states (
  code CHAR(2) PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
