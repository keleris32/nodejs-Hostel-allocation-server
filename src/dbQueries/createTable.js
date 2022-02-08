// Query for creating student table
module.exports.createStudentsTableQuery = `CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
  	room_id INT,
    name VARCHAR (255) NOT NULL,
    level VARCHAR (10) NOT NULL,
    course VARCHAR (255) NOT NULL,
    matric_no VARCHAR (10) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
  	gender VARCHAR(10) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (room_id)
        REFERENCES rooms (id)
)`;

module.exports.createRoomsTableQuery = `CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
	hostel VARCHAR(50) NOT NULL,
	room_type VARCHAR(50) NOT NULL,
	room_number VARCHAR (10) NOT NULL,
	price INT NOT NULL,
	no_of_inhabitants INT NOT NULL DEFAULT 0,
	type_of_hostel VARCHAR(10) NOT NULL ,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`;
