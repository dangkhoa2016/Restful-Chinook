// const dbHelpers = require('../api/libs/db-helpers');
const db = require('../api/libs/db-connection');

// create table albums
const createAlbums = () => {
  const sql = `CREATE TABLE IF NOT EXISTS albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
  )`;
  console.log(`[createAlbums] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table artists
const createArtists = () => {
  const sql = `CREATE TABLE IF NOT EXISTS artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`;
  console.log(`[createArtists] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table customers
const createCustomers = () => {
  const sql = `CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    phone TEXT,
    fax TEXT,
    email TEXT,
    support_rep_id INTEGER,
    FOREIGN KEY (support_rep_id) REFERENCES employees (employee_id)
  )`;
  console.log(`[createCustomers] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table employees
const createEmployees = () => {
  const sql = `CREATE TABLE IF NOT EXISTS employees (
    employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
    last_name TEXT,
    first_name TEXT,
    title TEXT,
    reports_to INTEGER,
    birth_date TEXT,
    hire_date TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    phone TEXT,
    fax TEXT,
    email TEXT
  )`;
  console.log(`[createEmployees] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table genres
const createGenres = () => {
  const sql = `CREATE TABLE IF NOT EXISTS genres (
    genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`;
  console.log(`[createGenres] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table invoice_lines
const createInvoiceLines = () => {
  const sql = `CREATE TABLE IF NOT EXISTS invoice_lines (
    invoice_line_id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_id INTEGER,
    track_id INTEGER,
    unit_price REAL,
    quantity INTEGER,
    FOREIGN KEY (invoice_id) REFERENCES invoices (invoice_id),
    FOREIGN KEY (track_id) REFERENCES tracks (track_id)
  )`;
  console.log(`[createInvoiceLines] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table invoices
const createInvoices = () => {
  const sql = `CREATE TABLE IF NOT EXISTS invoices (
    invoice_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    invoice_date TEXT,
    billing_address TEXT,
    billing_city TEXT,
    billing_state TEXT,
    billing_country TEXT,
    billing_postal_code TEXT,
    total REAL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
  )`;
  console.log(`[createInvoices] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table media_types
const createMediaTypes = () => {
  const sql = `CREATE TABLE IF NOT EXISTS media_types (
    media_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`;
  console.log(`[createMediaTypes] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table playlists
const createPlaylists = () => {
  const sql = `CREATE TABLE IF NOT EXISTS playlists (
    playlist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`;
  console.log(`[createPlaylists] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table playlists_tracks
const createPlaylistsTracks = () => {
  const sql = `CREATE TABLE IF NOT EXISTS playlists_tracks (
    playlist_id INTEGER,
    track_id INTEGER,
    PRIMARY KEY (playlist_id, track_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists (playlist_id),
    FOREIGN KEY (track_id) REFERENCES tracks (track_id)
  )`;
  console.log(`[createPlaylistsTracks] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// create table tracks
const createTracks = () => {
  const sql = `CREATE TABLE IF NOT EXISTS tracks (
    track_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    album_id INTEGER,
    media_type_id INTEGER,
    genre_id INTEGER,
    composer TEXT,
    milliseconds INTEGER,
    bytes INTEGER,
    unit_price REAL,
    FOREIGN KEY (album_id) REFERENCES albums (album_id),
    FOREIGN KEY (media_type_id) REFERENCES media_types (media_type_id),
    FOREIGN KEY (genre_id) REFERENCES genres (genre_id)
  )`;
  console.log(`[createTracks] ${sql}`); // skipcq: JS-0002
  return db.asyncExec(sql);
};

// Create Foreign Keys
const createForeignKeys = async () => {
  let sql = 'CREATE INDEX [IFK_AlbumArtistId] ON [albums] ([artist_id]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_CustomerSupportRepId] ON [customers] ([support_rep_id]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_EmployeeReportsTo] ON [employees] ([reports_to]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_InvoiceCustomerId] ON [invoices] ([customer_id]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_InvoiceLineInvoiceId] ON [invoice_lines] ([invoice_id]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_InvoiceLineTrackId] ON [invoice_lines] ([track_id]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_PlaylistTrackTrackId] ON [playlists_tracks] ([track_id]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_TrackAlbumId] ON [tracks] ([album_id]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_TrackGenreId] ON [tracks] ([genre_id]);';
  await db.asyncExec(sql);

  sql = 'CREATE INDEX [IFK_TrackMediaTypeId] ON [tracks] ([media_type_id]);';
  await db.asyncExec(sql);
};

(async () => {
  try {
    await createAlbums();
    await createArtists();
    await createCustomers();
    await createEmployees();
    await createGenres();
    await createInvoiceLines();
    await createInvoices();
    await createMediaTypes();
    await createPlaylists();
    await createPlaylistsTracks();
    await createTracks();
    await createForeignKeys();

    db.close();
  } catch (err) {
    console.error(err);
  }
})();
