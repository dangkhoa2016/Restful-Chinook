module.exports = {
  'albums': {
    primaryKey: 'album_id',
    columns: ['album_id', 'title', 'artist_id'],
  },
  'artists': {
    primaryKey: 'artist_id',
    columns: ['artist_id', 'name'],
  },
  'customers': {
    primaryKey: 'customer_id',
    columns: [
      'customer_id', 'first_name',
      'last_name', 'company',
      'address', 'city',
      'state', 'country',
      'postal_code', 'phone',
      'fax', 'email',
      'support_rep_id'
    ],
  },
  'employees': {
    primaryKey: 'employee_id',
    columns: [
      'employee_id', 'last_name',
      'first_name', 'title',
      'reports_to', 'birth_date',
      'hire_date', 'address',
      'city', 'state',
      'country', 'postal_code',
      'phone', 'fax',
      'email'
    ],
  },
  'genres': {
    primaryKey: 'genre_id',
    columns: ['genre_id', 'name'],
  },
  'invoice_lines': {
    primaryKey: 'invoice_line_id',
    columns: [
      'invoice_line_id', 'invoice_id',
      'track_id', 'unit_price',
      'quantity'
    ],
  },
  'invoices': {
    primaryKey: 'invoice_id',
    columns: [
      'invoice_id', 'customer_id',
      'invoice_date', 'billing_address',
      'billing_city', 'billing_state',
      'billing_country', 'billing_postal_code',
      'total'
    ],
  },
  'media_types': {
    primaryKey: 'media_type_id',
    columns: ['media_type_id', 'name'],
  },
  'playlists': {
    primaryKey: 'playlist_id',
    columns: ['playlist_id', 'name'],
  },
  'tracks': {
    primaryKey: 'track_id',
    columns: [
      'track_id', 'name',
      'album_id', 'media_type_id',
      'genre_id', 'composer',
      'milliseconds', 'bytes',
      'unit_price'
    ],
  },
};

