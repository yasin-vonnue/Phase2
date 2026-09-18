-- Index 1: Frequently search equipment by availability/status.
CREATE INDEX idx_equipment_status ON equipment (status);

-- Index 2: Frequently search and sort bookings by start date.
CREATE INDEX idx_bookings_start_date ON bookings (start_date);