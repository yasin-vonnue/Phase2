CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE
    employees (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        department TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW ()
    );

CREATE TABLE
    categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        name TEXT NOT NULL UNIQUE,
        description TEXT
    );

CREATE TABLE
    equipment (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        category_id UUID NOT NULL REFERENCES categories (id),
        name TEXT NOT NULL,
        serial_number TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL CHECK (status IN ('available', 'booked', 'maintenance')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW ()
    );

CREATE TABLE
    bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        employee_id UUID NOT NULL REFERENCES employees (id),
        equipment_id UUID NOT NULL REFERENCES equipment (id),
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending' CHECK (
            status IN ('pending', 'approved', 'rejected', 'completed')
        ),
        purpose TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        CHECK (end_date >= start_date)
    );

CREATE TABLE
    approvals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        booking_id UUID NOT NULL UNIQUE REFERENCES bookings (id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees (id),
        status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
        approved_at TIMESTAMPTZ,
        comments TEXT
    );

CREATE TABLE
    maintenance (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        equipment_id UUID NOT NULL REFERENCES equipment (id) ON DELETE CASCADE,
        description TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE,
        status TEXT NOT NULL CHECK (
            status IN ('scheduled', 'in-progress', 'completed')
        ),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        CHECK (
            end_date IS NULL
            OR end_date >= start_date
        )
    );