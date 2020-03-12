SELECT * FROM users;
ALTER TABLE users ADD COLUMN isAdmin bool;
INSERT INTO users ("First_Name","Last_Name","Email","Location","Password",isadmin)
VALUES('scoop',
    'loop',
    'tmail@tmail.com',
    '{"Address":"111 Illiois Rd", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563}), "isadmin":false}',
    'pass',
    false)
-- INSERT INTO  ("First_Name", "Last_Name", "Email", "Password", "Location", "isadmin")
-- VALUES
--   ( 'scoop',
--     'loop',
--     'tmail@tmail.com',
--     'pass',
--     '{"Address":"111 Illiois Rd", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563}), "isadmin":false}',
--     false); 