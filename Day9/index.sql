-- Query used to check ticket status search performance
EXPLAIN
SELECT
    title,
    priority,
    status
FROM
    tickets
WHERE
    status = 'open';

-- Index justified by the status search query
CREATE INDEX idx_tickets_status ON tickets (status);

-- Query plan after creating the index
EXPLAIN
SELECT
    title,
    priority,
    status
FROM
    tickets
WHERE
    status = 'open';