-- Approve a booking and create its approval record
BEGIN;

UPDATE bookings
SET
    status = 'approved'
WHERE
    id = '30000000-0000-0000-0000-000000000002';

INSERT INTO
    approvals (
        booking_id,
        employee_id,
        status,
        approved_at,
        comments
    )
VALUES
    (
        '30000000-0000-0000-0000-000000000002',
        '44444444-4444-4444-4444-444444444444',
        'approved',
        NOW (),
        'Booking approved by David Wilson.'
    );

COMMIT;