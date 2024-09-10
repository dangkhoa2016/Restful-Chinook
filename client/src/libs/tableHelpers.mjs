import { formatDateTime } from './dateTimeHelpers.mjs';
import currencyJs from 'currency.js';
const USD = value => currencyJs(value, { symbol: '$ ', precision: 2 });

const renderValue = (model, key, value, index) => {
  // console.log('renderValue', model, key, value, index);
  switch (model) {
    case 'albums':
      switch (key) {
        case 'album_id':
          return value;
        default:
          return value;
      }
    case 'artists':
      switch (key) {
        case 'artist_id':
          return value;
        default:
          return value;
      }
    case 'customers':
      switch (key) {
        case 'customer_id':
          return value;
        default:
          return value;
      }
    case 'employees':
      return renderEmployerValue(value, key, index);
    case 'genres':
      switch (key) {
        case 'genre_id':
          return value;
        default:
          return value;
      }
    case 'invoices':
      return renderInvoiceValue(value, key, index);
    case 'invoice_lines':
    case 'invoice-lines':
      switch (key) {
        case 'invoice_line_id':
          return value;
        default:
          return value;
      }
      case 'media_types':
      case 'media-types':
      switch (key) {
        case 'media_type_id':
          return value;
        default:
          return value;
      }
    case 'playlists':
      switch (key) {
        case 'playlist_id':
          return value;
        default:
          return value;
      }
    case 'playlist_track':
    case 'playlist-track':
      switch (key) {
        case 'playlist_id':
          return value;
        default:
          return value;
      }
    case 'tracks':
      return renderTrackValue(value, key, index);
  }
};

const renderEmployerValue = (value, key, index) => {
  // console.log('renderEmployerValue', value, key, index);
  switch (key) {
    case 'employee_id':
      return value;
    case 'birth_date':
    case 'hire_date':
      return formatDateTime(value);
    default:
      return value;
  }
}

const renderInvoiceValue = (value, key, index) => {
  // console.log('renderInvoiceValue', value, key, index);
  switch (key) {
    case 'invoice_id':
      return value;
    case 'invoice_date':
      return formatDateTime(value);
    case 'total':
      return USD(value).format();
    default:
      return value;
  }
}

const renderTrackValue = (value, key, index) => {
  // console.log('renderTrackValue', value, key, index);
  switch (key) {
    case 'track_id':
      return value;
    case 'unit_price':
      return USD(value).format();
    default:
      return value;
  }
};

export {
  renderValue
};
