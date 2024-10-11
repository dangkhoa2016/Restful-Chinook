
-- show all tables using sqlite3
select name from sqlite_master where type='table';

/*
+------------------+
|       name       |
+------------------+
| albums           |
| sqlite_sequence  |
| artists          |
| customers        |
| employees        |
| genres           |
| invoice_lines    |
| invoices         |
| media_types      |
| playlists        |
| playlists_tracks |
| tracks           |
+------------------+
*/

-- show number of albums records
select count(*) as number_of_albums from albums;

-- show number of tracks records
select count(*) as number_of_tracks from tracks;

-- show number of artists records
select count(*) as number_of_artists from artists;

-- show number of customers records
select count(*) as number_of_customers from customers;

-- show number of employees records
select count(*) as number_of_employees from employees;

-- show number of genres records
select count(*) as number_of_genres from genres;

-- show number of invoice records
select count(*) as number_of_invoices from invoices;

-- show number of media types records
select count(*) as number_of_media_types from media_types;

-- show number of playlist records
select count(*) as number_of_playlists from playlists;

-- show number of playlist track records
select count(*) as number_of_playlists_tracks from playlists_tracks;

-- show number of invoice lines records
select count(*) as number_of_invoice_lines from invoice_lines;



select * from artists where artist_id = 1;
UPDATE artists SET name = 'The Beatles' WHERE artist_id = 1;


-- show all columns from the albums table
PRAGMA table_info(albums);

-- show all columns from the customers table
PRAGMA table_info(customers);

-- show all columns from the employees table
PRAGMA table_info(employees);

-- show all columns from the invoices table
PRAGMA table_info(invoices);


-- list all identities indexes
SELECT name, sql FROM sqlite_master WHERE type='index' AND tbl_name IN
 ('albums', 'artists', 'customers', 'employees', 'genres', 'invoices',
 'invoice_lines', 'media_types', 'playlists', 'playlists_tracks', 'tracks');
/*
+-------------------------------------+----------------------------------------------------------------------------+
|                name                 |                                    sql                                     |
+-------------------------------------+----------------------------------------------------------------------------+
| sqlite_autoindex_playlists_tracks_1 |                                                                            |
| IFK_AlbumArtistId                   | CREATE INDEX [IFK_AlbumArtistId] ON [albums] ([artist_id])                 |
| IFK_CustomerSupportRepId            | CREATE INDEX [IFK_CustomerSupportRepId] ON [customers] ([support_rep_id])  |
| IFK_EmployeeReportsTo               | CREATE INDEX [IFK_EmployeeReportsTo] ON [employees] ([reports_to])         |
| IFK_InvoiceCustomerId               | CREATE INDEX [IFK_InvoiceCustomerId] ON [invoices] ([customer_id])         |
| IFK_InvoiceLineInvoiceId            | CREATE INDEX [IFK_InvoiceLineInvoiceId] ON [invoice_lines] ([invoice_id])  |
| IFK_InvoiceLineTrackId              | CREATE INDEX [IFK_InvoiceLineTrackId] ON [invoice_lines] ([track_id])      |
| IFK_PlaylistTrackTrackId            | CREATE INDEX [IFK_PlaylistTrackTrackId] ON [playlists_tracks] ([track_id]) |
| IFK_TrackAlbumId                    | CREATE INDEX [IFK_TrackAlbumId] ON [tracks] ([album_id])                   |
| IFK_TrackGenreId                    | CREATE INDEX [IFK_TrackGenreId] ON [tracks] ([genre_id])                   |
| IFK_TrackMediaTypeId                | CREATE INDEX [IFK_TrackMediaTypeId] ON [tracks] ([media_type_id])          |
+-------------------------------------+----------------------------------------------------------------------------+
*/

-- list all identities indexes id
SELECT * from sqlite_sequence WHERE name IN
 ('albums', 'artists', 'customers', 'employees', 'genres', 'invoices',
 'invoice_lines', 'media_types', 'playlists', 'playlists_tracks', 'tracks');
/*
+---------------+------+
|     name      | seq  |
+---------------+------+
| albums        | 347  |
| artists       | 275  |
| customers     | 59   |
| employees     | 8    |
| genres        | 25   |
| invoices      | 412  |
| invoice_lines | 2240 |
| media_types   | 5    |
| playlists     | 18   |
| tracks        | 3503 |
+---------------+------+
*/



-- count the number of rows in each table
SELECT 'albums' AS table_name, COUNT(*) AS count FROM albums;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| albums     | 347   |
*/

SELECT 'artists' AS table_name, COUNT(*) AS count FROM artists;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| artists    | 275   |
+------------+-------+
*/

SELECT 'customers' AS table_name, COUNT(*) AS count FROM customers;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| customers  | 59    |
+------------+-------+
*/
SELECT 'employees' AS table_name, COUNT(*) AS count FROM employees;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| employees  | 8     |
+------------+-------+
*/
SELECT 'genres' AS table_name, COUNT(*) AS count FROM genres;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| genres     | 25    |
+------------+-------+
*/

SELECT 'invoices' AS table_name, COUNT(*) AS count FROM invoices;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| invoices   | 412   |
+------------+-------+
*/

SELECT 'invoice_lines' AS table_name, COUNT(*) AS count FROM invoice_lines;
/*
+---------------+-------+
|  table_name   | count |
+---------------+-------+
| invoice_lines | 2240  |
+---------------+-------+
*/

SELECT 'media_types' AS table_name, COUNT(*) AS count FROM media_types;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| media_types| 5     |
+------------+-------+
*/

SELECT 'playlists' AS table_name, COUNT(*) AS count FROM playlists;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| playlists  | 18    |
+------------+-------+
*/

SELECT 'playlists_tracks' AS table_name, COUNT(*) AS count FROM playlists_tracks;
/*
+------------------+-------+
|   table_name     | count |
+------------------+-------+
| playlists_tracks | 8715  |
+------------------+-------+
*/

SELECT 'tracks' AS table_name, COUNT(*) AS count FROM tracks;
/*
+------------+-------+
| table_name | count |
+------------+-------+
| tracks     | 3503  |
+------------+-------+
*/

-- show the first 5 rows from the albums table
SELECT * FROM albums LIMIT 5;

-- show the first 5 rows from the artists table
SELECT * FROM artists LIMIT 5;

-- show the first 5 rows from the customers table
SELECT * FROM customers LIMIT 5;

-- show the first 5 rows from the employees table
SELECT * FROM employees LIMIT 5;

-- show the first 5 rows from the genres table
SELECT * FROM genres LIMIT 5;

-- show the first 5 rows from the invoices table
SELECT * FROM invoices LIMIT 5;

-- show the first 5 rows from the invoice_lines table
SELECT * FROM invoice_lines LIMIT 5;

-- show the first 5 rows from the media_types table
SELECT * FROM media_types LIMIT 5;

-- show the first 5 rows from the playlists table
SELECT * FROM playlists LIMIT 5;

-- show the first 5 rows from the playlists_tracks table
SELECT * FROM playlists_tracks LIMIT 5;

-- show the first 5 rows from the tracks table
SELECT * FROM tracks LIMIT 5;


-- group track by album
SELECT album_id, COUNT(*) AS track_count FROM tracks GROUP BY album_id;

-- find track belong to multiple albums
SELECT track_id, COUNT(*) AS album_count FROM tracks GROUP BY album_id HAVING album_count > 1;

select * from tracks where album_id = 1;

update customers set support_rep_id = 6 where customer_id = 55;