INSERT INTO users(id,name,email)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Alice Johnson','alice@example.com'),
    ('22222222-2222-2222-2222-222222222222', 'Bob Smith', 'bob@example.com'),
    ('33333333-3333-3333-3333-333333333333', 'Carol Davis', 'carol@example.com');

INSERT INTO categories(id,name)
VALUES 
    ('10000000-0000-0000-0000-000000000001', 'Billing'),
    ('10000000-0000-0000-0000-000000000002', 'Technical Support'),
    ('10000000-0000-0000-0000-000000000003', 'Account');

INSERT INTO customers(id,name, email)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Acme Corporation', 'acme@example.com'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Globex Inc', 'globex@example.com'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Initech', 'initech@example.com');

INSERT INTO tickets(
    id,
    customer_id,
    category_id,
    title,
    description,
    priority,
    status
)
VALUES 
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '10000000-0000-0000-0000-000000000002',
        'Cannot reset password',
        'Customer cannot reset account password.',
        'high',
        'open'
    ),
    (
        'bbbbbbbb-2222-2222-2222-222222222222',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '10000000-0000-0000-0000-000000000001',
        'Incorrect invoice amount',
        'Customer reports an incorrect amount on the invoice.',
        'medium',
        'in-progress'
    ),
    (
        'cccccccc-3333-3333-3333-333333333333',
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '10000000-0000-0000-0000-000000000003',
        'Update contact email',
        'Customer wants to update the contact email address.',
        'low',
        'resolved'
    ),
    (
        'dddddddd-4444-4444-4444-444444444444',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '10000000-0000-0000-0000-000000000003',
        'Account locked',
        'Customer account is locked and cannot be accessed.',
        'high',
        'open'
    ),
    (
        'eeeeeeee-5555-5555-5555-555555555555',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '10000000-0000-0000-0000-000000000002',
        'API access issue',
        'Customer cannot access the API.',
        'high',
        'in-progress'
    );

INSERT INTO comments(id, ticket_id, user_id, body)
VALUES 
    (
        'c0000000-0000-0000-0000-000000000002',
        'aaaaaaaa-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111',
        'Asked the customer to try the password reset link again.'
    ),
    (
        'c0000000-0000-0000-0000-000000000003',
        'bbbbbbbb-2222-2222-2222-222222222222',
        '22222222-2222-2222-2222-222222222222',
        'Checking the invoice details with the billing team.'
    );

INSERT INTO assignments (id, ticket_id, user_id)
VALUES
    (
        'a0000000-0000-0000-0000-000000000001',
        'aaaaaaaa-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111'
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        'eeeeeeee-5555-5555-5555-555555555555',
        '33333333-3333-3333-3333-333333333333'
    );


INSERT INTO status_history (id, ticket_id, status, changed_by)
VALUES
    (
        '50000000-0000-0000-0000-000000000001',
        'aaaaaaaa-1111-1111-1111-111111111111',
        'open',
        '11111111-1111-1111-1111-111111111111'
    ),
    (
        '50000000-0000-0000-0000-000000000002',
        'bbbbbbbb-2222-2222-2222-222222222222',
        'open',
        '22222222-2222-2222-2222-222222222222'
    ),
    (
        '50000000-0000-0000-0000-000000000003',
        'bbbbbbbb-2222-2222-2222-222222222222',
        'in-progress',
        '22222222-2222-2222-2222-222222222222'
    );