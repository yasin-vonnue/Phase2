-- invalid property
-- expected: check constraint error
INSERT INTO tickets (
    customer_id,
    category_id,
    title,
    description,
    priority,
    status
)
VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '10000000-0000-0000-0000-000000000002',
    'Invalid priority test',
    'This ticket should not be inserted.',
    'urgent',
    'open'
);

-- duplicate user email
-- expected: unique constraint error

INSERT INTO users (name, email)
VALUES(
    'Duplicate User',
    'alice@example.com'
);

-- invalid customer foreign key
-- expected: foreign key constraint error

INSERT INTO tickets (
    customer_id,
    category_id,
    title,
    description,
    priority,
    status
)
VALUES (
    '99999999-9999-9999-9999-999999999999',
    '10000000-0000-0000-0000-000000000002',
    'Invalid customer test',
    'This ticket should not be inserted.',
    'medium',
    'open'
);

-- invalid category foreign key
-- expected: foreign key constraint error

INSERT INTO tickets (
    customer_id,
    category_id,
    title,
    description,
    priority,
    status
)
VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '99999999-9999-9999-9999-999999999999',
    'Invalid category test',
    'This ticket should not be inserted.',
    'medium',
    'open'
);