// Query for creating student table
module.exports.createStudentsTableQuery = `CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    room_id INT,
    name VARCHAR (255) NOT NULL,
    level VARCHAR (10) NOT NULL,
    course VARCHAR (50) NOT NULL,
    matric_no VARCHAR (10) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (room_id)
        REFERENCES rooms (room_id)
)`;

module.exports.createRoomsTableQuery = `CREATE TABLE IF NOT EXISTS rooms (
    room_id SERIAL PRIMARY KEY,
    hostel VARCHAR (10) NOT NULL,
    room_no VARCHAR (10) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`;
