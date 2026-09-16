-- Business question:
-- How many tickets are in each status for each assigned user?
SELECT
    users.name AS assignee,
    tickets.status,
    COUNT(tickets.id) as ticket_count
FROM
    assignments
    JOIN users ON assignments.user_id = users.id
    JOIN tickets ON assignments.ticket_id = tickets.id
GROUP BY
    users.name,
    tickets.status
ORDER BY
    users.name,
    tickets.status;

-- Which customers have more than five open tickets?
SELECT
    customers.name AS customer_name,
    COUNT(tickets.id) AS open_ticket_count
FROM
    customers
    JOIN tickets ON customers.id = tickets.customer_id
WHERE
    tickets.status = 'open'
GROUP BY
    customers.name
HAVING
    COUNT(tickets.id) > 5
ORDER BY
    open_ticket_count DESC;

-- Which users have no assigned tickets?
SELECT
    users.name,
    users.email
FROM
    users
    LEFT JOIN assignments ON users.id = assignments.user_id
WHERE
    assignments.id IS NULL
ORDER BY
    users.name;

-- What is the oldest ticket that is not yet resolved?
SELECT
    title,
    priority,
    status,
    created_at
FROM
    tickets
WHERE
    status <> 'resolved'
ORDER BY
    created_at ASC
LIMIT
    1;

-- How many tickets are there for each category and priority?
SELECT
    categories.name AS category,
    tickets.priority,
    COUNT(tickets.id) as ticket_count
FROM
    categories
    JOIN tickets ON categories.id = tickets.category_id
GROUP BY
    categories.name,
    tickets.priority
ORDER BY
    categories.name,
    tickets.priority;