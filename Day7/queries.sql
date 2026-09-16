-- select all open tickets
SELECT *
FROM tickets
WHERE status = 'open';

-- select high-priority tickets
SELECT * 
FROM tickets
WHERE priority = 'high'
ORDER BY created_at DESC;

-- select the latest 3 tickets
SELECT * 
FROM tickets
ORDER BY created_at DESC
LIMIT 3;

-- select tickets with customer names

SELECT 
    tickets.id,
    tickets.title,
    tickets.priority,
    tickets.status,
    customers.name AS customer_name

FROM tickets
JOIN customers
    ON tickets.customer_id = cutomer.id
ORDER BY tickets.created_at DESC;

-- insert a new Ticket

INSERT INTO tickets(
    customer_id,
    category_id,
    title,
    description,
    priority,
    status
)
VALUES (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '10000000-0000-0000-0000-000000000001',
    'Payment confirmation missing',
    'Customer has not received payment confirmation.',
    'medium',
    'open'
);

-- update a ticket status

UPDATE tickets
set
    status = 'resolved',
    upated_at = NOW()
WHERE id = 'aaaaaaaa-1111-1111-1111-111111111111';

-- delete a specific ticket safely

DELETE FROM tickets
WHERE id = 'cccccccc-3333-3333-3333-333333333333';

-- verify the deleted ticket

SELECT * 
FROM tickets
WHERE id = 'cccccccc-3333-3333-3333-333333333333';



