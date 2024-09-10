module.exports = {
  'albums': {
    'artists': {
      'type': 'many-to-one',
      'field': 'artist_id',
      'field_target': 'artist_id',
    },
    'tracks': {
      'type': 'one-to-many',
      'field': 'album_id',
      'field_target': 'album_id',
    },
  },
  'artists': {
    'albums': {
      'type': 'one-to-many',
      'field': 'artist_id',
      'field_target': 'artist_id',
    },
  },
  'customers': {
    'employees': {
      'type': 'many-to-one',
      'field': 'support_rep_id',
      'field_target': 'employee_id',
    },
    'invoices': {
      'type': 'one-to-many',
      'field': 'customer_id',
      'field_target': 'customer_id',
    },
  },
  'employees': {
    'customers': {
      'type': 'one-to-many',
      'field': 'employee_id',
      'field_target': 'support_rep_id',
    },
    'employees': {
      'type': 'many-to-one',
      'field': 'reports_to',
      'field_target': 'employee_id',
    },
  },
  'genres': {
    'tracks': {
      'type': 'one-to-many',
      'field': 'genre_id',
      'field_target': 'genre_id',
    },
  },
  'invoices': {
    'customers': {
      'type': 'many-to-one',
      'field': 'customer_id',
      'field_target': 'customer_id',
    },
    'invoice_lines': {
      'type': 'one-to-many',
      'field': 'invoice_id',
      'field_target': 'invoice_id',
    },
  },
  'invoice_lines': {
    'invoices': {
      'type': 'many-to-one',
      'field': 'invoice_id',
      'field_target': 'invoice_id',
    },
    'tracks': {
      'type': 'many-to-one',
      'field': 'track_id',
      'field_target': 'track_id',
    },
  },
  'media_types': {
    'tracks': {
      'type': 'one-to-many',
      'field': 'media_type_id',
      'field_target': 'media_type_id',
    },
  },
  'playlists': {
    'playlists_tracks': {
      'type': 'one-to-many',
      'field': 'playlist_id',
      'field_target': 'playlist_id',
    },
  },
  'playlists_tracks': {
    'playlists': {
      'type': 'many-to-one',
      'field': 'playlist_id',
      'field_target': 'playlist_id',
    },
    'tracks': {
      'type': 'many-to-one',
      'field': 'track_id',
      'field_target': 'track_id',
    },
  },
  'tracks': {
    'albums': {
      'type': 'many-to-one',
      'field': 'album_id',
      'field_target': 'album_id',
    },
    'genres': {
      'type': 'many-to-one',
      'field': 'genre_id',
      'field_target': 'genre_id',
    },
    'media_types': {
      'type': 'many-to-one',
      'field': 'media_type_id',
      'field_target': 'media_type_id',
    },
    'playlists_tracks': {
      'type': 'one-to-many',
      'field': 'track_id',
      'field_target': 'track_id',
    },
  },
}
