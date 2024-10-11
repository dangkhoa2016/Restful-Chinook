const oneToMany = 'one-to-many';
const manyToOne = 'many-to-one';
const artist_id = 'artist_id';
const album_id = 'album_id';
const track_id = 'track_id';
const genre_id = 'genre_id';
const media_type_id = 'media_type_id';
const playlist_id = 'playlist_id';
const employee_id = 'employee_id';
const customer_id = 'customer_id';
const invoice_id = 'invoice_id';
const support_rep_id = 'support_rep_id';
const reports_to = 'reports_to';


module.exports = {
  'albums': {
    'artists': {
      'type': manyToOne,
      'field': artist_id,
      'field_target': artist_id,
    },
    'tracks': {
      'type': oneToMany,
      'field': album_id,
      'field_target': album_id,
    },
  },
  'artists': {
    'albums': {
      'type': oneToMany,
      'field': artist_id,
      'field_target': artist_id,
    },
  },
  'customers': {
    'employees': {
      'type': manyToOne,
      'field': support_rep_id,
      'field_target': employee_id,
    },
    'invoices': {
      'type': oneToMany,
      'field': customer_id,
      'field_target': customer_id,
    },
  },
  'employees': {
    'customers': {
      'type': oneToMany,
      'field': employee_id,
      'field_target': support_rep_id,
    },
    'employees': {
      'type': manyToOne,
      'field': reports_to,
      'field_target': employee_id,
    },
  },
  'genres': {
    'tracks': {
      'type': oneToMany,
      'field': genre_id,
      'field_target': genre_id,
    },
  },
  'invoices': {
    'customers': {
      'type': manyToOne,
      'field': customer_id,
      'field_target': customer_id,
    },
    'invoice_lines': {
      'type': oneToMany,
      'field': invoice_id,
      'field_target': invoice_id,
    },
  },
  'invoice_lines': {
    'invoices': {
      'type': manyToOne,
      'field': invoice_id,
      'field_target': invoice_id,
    },
    'tracks': {
      'type': manyToOne,
      'field': track_id,
      'field_target': track_id,
    },
  },
  'media_types': {
    'tracks': {
      'type': oneToMany,
      'field': media_type_id,
      'field_target': media_type_id,
    },
  },
  'playlists': {
    'playlists_tracks': {
      'type': oneToMany,
      'field': playlist_id,
      'field_target': playlist_id,
    },
  },
  'playlists_tracks': {
    'playlists': {
      'type': manyToOne,
      'field': playlist_id,
      'field_target': playlist_id,
    },
    'tracks': {
      'type': manyToOne,
      'field': track_id,
      'field_target': track_id,
    },
  },
  'tracks': {
    'albums': {
      'type': manyToOne,
      'field': album_id,
      'field_target': album_id,
    },
    'genres': {
      'type': manyToOne,
      'field': genre_id,
      'field_target': genre_id,
    },
    'media_types': {
      'type': manyToOne,
      'field': media_type_id,
      'field_target': media_type_id,
    },
    'playlists_tracks': {
      'type': oneToMany,
      'field': track_id,
      'field_target': track_id,
    },
  },
}
