-- Employees
INSERT INTO
    employees (id, name, email, department)
VALUES
    (
        '11111111-1111-1111-1111-111111111111',
        'Alice Johnson',
        'alice@company.com',
        'IT'
    ),
    (
        '22222222-2222-2222-2222-222222222222',
        'Bob Smith',
        'bob@company.com',
        'Finance'
    ),
    (
        '33333333-3333-3333-3333-333333333333',
        'Carol Davis',
        'carol@company.com',
        'HR'
    ),
    (
        '44444444-4444-4444-4444-444444444444',
        'David Wilson',
        'david@company.com',
        'IT'
    );

-- Categories
INSERT INTO
    categories (id, name, description)
VALUES
    (
        '10000000-0000-0000-0000-000000000001',
        'Laptops',
        'Portable computers for employees'
    ),
    (
        '10000000-0000-0000-0000-000000000002',
        'Projectors',
        'Projectors for meetings and presentations'
    ),
    (
        '10000000-0000-0000-0000-000000000003',
        'Cameras',
        'Cameras for events and media work'
    );

-- Equipment
INSERT INTO
    equipment (id, category_id, name, serial_number, status)
VALUES
    (
        '20000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000001',
        'Dell Latitude 5440',
        'DL-5440-001',
        'available'
    ),
    (
        '20000000-0000-0000-0000-000000000002',
        '10000000-0000-0000-0000-000000000001',
        'HP ProBook 450',
        'HP-450-002',
        'booked'
    ),
    (
        '20000000-0000-0000-0000-000000000003',
        '10000000-0000-0000-0000-000000000002',
        'Epson EB-X49',
        'EP-X49-003',
        'available'
    ),
    (
        '20000000-0000-0000-0000-000000000004',
        '10000000-0000-0000-0000-000000000003',
        'Canon EOS 90D',
        'CN-90D-004',
        'maintenance'
    ),
    (
        '20000000-0000-0000-0000-000000000005',
        '10000000-0000-0000-0000-000000000003',
        'Sony A6400',
        'SN-A6400-005',
        'available'
    );

-- Bookings
INSERT INTO
    bookings (
        id,
        employee_id,
        equipment_id,
        start_date,
        end_date,
        status,
        purpose
    )
VALUES
    (
        '30000000-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111',
        '20000000-0000-0000-0000-000000000002',
        '2026-09-15',
        '2026-09-18',
        'approved',
        'Client presentation'
    ),
    (
        '30000000-0000-0000-0000-000000000002',
        '22222222-2222-2222-2222-222222222222',
        '20000000-0000-0000-0000-000000000003',
        '2026-09-20',
        '2026-09-20',
        'pending',
        'Finance team meeting'
    ),
    (
        '30000000-0000-0000-0000-000000000003',
        '33333333-3333-3333-3333-333333333333',
        '20000000-0000-0000-0000-000000000005',
        '2026-09-22',
        '2026-09-24',
        'approved',
        'HR training event'
    ),
    (
        '30000000-0000-0000-0000-000000000004',
        '44444444-4444-4444-4444-444444444444',
        '20000000-0000-0000-0000-000000000001',
        '2026-09-25',
        '2026-09-26',
        'rejected',
        'Internal testing'
    ),
    (
        '30000000-0000-0000-0000-000000000005',
        '11111111-1111-1111-1111-111111111111',
        '20000000-0000-0000-0000-000000000005',
        '2026-09-28',
        '2026-09-30',
        'completed',
        'Product photography'
    );

-- Approvals
INSERT INTO
    approvals (
        id,
        booking_id,
        employee_id,
        status,
        approved_at,
        comments
    )
VALUES
    (
        '40000000-0000-0000-0000-000000000001',
        '30000000-0000-0000-0000-000000000001',
        '44444444-4444-4444-4444-444444444444',
        'approved',
        '2026-09-14 10:00:00',
        'Booking approved for client presentation'
    ),
    (
        '40000000-0000-0000-0000-000000000002',
        '30000000-0000-0000-0000-000000000004',
        '44444444-4444-4444-4444-444444444444',
        'rejected',
        '2026-09-14 11:00:00',
        'Equipment is not required for this request'
    );

-- Maintenance
INSERT INTO
    maintenance (
        id,
        equipment_id,
        description,
        start_date,
        end_date,
        status
    )
VALUES
    (
        '50000000-0000-0000-0000-000000000001',
        '20000000-0000-0000-0000-000000000004',
        'Camera lens inspection and cleaning',
        '2026-09-10',
        '2026-09-12',
        'completed'
    ),
    (
        '50000000-0000-0000-0000-000000000002',
        '20000000-0000-0000-0000-000000000001',
        'Laptop battery replacement',
        '2026-09-27',
        NULL,
        'scheduled'
    ),
    (
        '50000000-0000-0000-0000-000000000003',
        '20000000-0000-0000-0000-000000000002',
        'Keyboard repair',
        '2026-09-08',
        '2026-09-09',
        'completed'
    );