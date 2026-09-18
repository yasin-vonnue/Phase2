-- list all available equipment
SELECT
    name,
    serial_number
FROM
    equipment
WHERE
    status = 'available'
ORDER BY
    name;

-- list all bookings with employee and equipment names
SELECT
    employees.name AS employee_name,
    equipment.name AS equipment_name,
    bookings.start_date,
    bookings.end_date,
    bookings.status
FROM
    bookings
    JOIN employees ON bookings.employee_id = employees.id
    JOIN equipment ON bookings.equipment_id = equipment.id
ORDER BY
    bookings.start_date;

-- List approved bookings
SELECT
    employees.name AS employee_name,
    equipment.name AS equipment_name,
    bookings.start_date,
    bookings.end_date
FROM
    bookings
    JOIN employees ON bookings.employee_id = employees.id
    JOIN equipment ON bookings.equipment_id = equipment.id
WHERE
    bookings.status = 'approved'
ORDER BY
    bookings.start_date;

-- Count bookings for each employee
SELECT
    employees.name AS employee_name,
    COUNT(bookings.id) AS booking_count
FROM
    employees
    LEFT JOIN bookings ON employees.id = bookings.employee_id
GROUP BY
    employees.name
ORDER BY
    booking_count DESC;

-- Count equipment in each category
SELECT
    categories.name AS category,
    COUNT(equipment.id) AS equipment_count
FROM
    categories
    LEFT JOIN equipment ON categories.id = equipment.category_id
GROUP BY
    categories.name
ORDER BY
    categories.name;

-- Find employees who have no bookings
SELECT
    employees.name,
    employees.email
FROM
    employees
    LEFT JOIN bookings ON employees.id = bookings.employee_id
WHERE
    bookings.id IS NULL
ORDER BY
    employees.name;

-- List equipment currently under maintenance
SELECT
    equipment.name,
    equipment.serial_number,
    maintenance.start_date,
    maintenance.end_date,
    maintenance.status
FROM
    equipment
    JOIN maintenance ON equipment.id = maintenance.equipment_id
WHERE
    maintenance.status IN ('scheduled', 'in-progress')
ORDER BY
    maintenance.start_date;

-- List pending approvals
SELECT
    employees.name AS requester,
    equipment.name AS equipment_name,
    bookings.start_date,
    bookings.end_date,
    approvals.status
FROM
    approvals
    JOIN bookings ON approvals.booking_id = bookings.id
    JOIN employees ON bookings.employee_id = employees.id
    JOIN equipment ON bookings.equipment_id = equipment.id
WHERE
    approvals.status = 'pending'
ORDER BY
    bookings.start_date;

-- Find employees with more than one booking
SELECT
    employees.name AS employee_name,
    COUNT(bookings.id) AS booking_count
FROM
    employees
    JOIN bookings ON employees.id = bookings.employee_id
GROUP BY
    employees.name
HAVING
    COUNT(bookings.id) > 1
ORDER BY
    booking_count DESC;

-- Find the most frequently booked equipment
SELECT
    equipment.name AS equipment_name,
    equipment.serial_number,
    COUNT(bookings.id) AS booking_count
FROM
    equipment
    LEFT JOIN bookings ON equipment.id = bookings.equipment_id
GROUP BY
    equipment.id,
    equipment.name,
    equipment.serial_number
ORDER BY
    booking_count DESC
LIMIT
    1;