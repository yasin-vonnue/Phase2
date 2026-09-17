-- Transactional ticket reassignment
BEGIN;

UPDATE assignments
SET
    user_id = '22222222-2222-2222-2222-222222222222'
WHERE
    ticket_id = 'aaaaaaaa-1111-1111-1111-111111111111';

INSERT INTO
    status_history (ticket_id, status, changed_by)
VALUES
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'open',
        '22222222-2222-2222-2222-222222222222'
    );

INSERT INTO
    comments (ticket_id, user_id, body)
VALUES
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222',
        'Ticket reassigned to Bob Smith.'
    );

COMMIT;

-- Rollback test with deliberate failure
BEGIN;

UPDATE assignments
SET
    user_id = '99999999-9999-9999-9999-999999999999'
WHERE
    ticket_id = 'aaaaaaaa-1111-1111-1111-111111111111';

INSERT INTO
    status_history (ticket_id, status, changed_by)
VALUES
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        'open',
        '99999999-9999-9999-9999-999999999999'
    );

INSERT INTO
    comments (ticket_id, user_id, body)
VALUES
    (
        'aaaaaaaa-1111-1111-1111-111111111111',
        '99999999-9999-9999-9999-999999999999',
        'Rollback test comment.'
    );

ROLLBACK;