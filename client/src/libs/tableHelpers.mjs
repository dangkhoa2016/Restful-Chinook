import { formatDateTime, isDate } from './dateTimeHelpers.mjs';
import currencyJs from 'currency.js';
import pluralize from 'pluralize';
const decimalRegex = /^-?\d*\.\d+$/;

const USD = value => currencyJs(value, { symbol: '$ ', precision: 2 });

const renderEmployerValue = (value, key/*, index*/) => {
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
};

const renderInvoiceValue = (value, key/*, index*/) => {
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
};

const renderTrackValue = (value, key/*, index*/) => {
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

function isValidDate(field, value) {
  if (!field || field.includes('date'))
    return isDate(value);

  return false;
}

function isDecimal(field, value) {
  if (field)
    return field.includes('price') || field.includes('total');
  
  if (typeof value === 'number')
    return Number.isInteger(value);
  else if (typeof value === 'string')
    return decimalRegex.test(value);

  return false;
};

function getBootstrapTextColor(field, value) {
  if (isValidDate(field, value))
    return 'text-info';
  else if (isDecimal(field, value))
    return 'text-teal';
  else if (field) {
    if (field.includes('email'))
      return 'text-orange';
    else if (field.includes('phone'))
      return 'text-purple';
    else if (field.includes('country'))
      return 'text-muted';
    else if (field.includes('bytes'))
      return 'text-pink';
  }

  if (typeof value === 'string') {
    if (['true', 'false', 'yes', 'no'].includes(value.toLowerCase()))
      return 'text-danger';

    return 'text-primary';
  }
  
  if (Array.isArray(value))
    return 'text-warning';
  else if (typeof value === 'number')
    return 'text-success';
  else if (typeof value === 'boolean')
    return 'text-danger';
  else if (typeof value === 'object' && value !== null)
    return 'text-secondary'; // For JSON objects
    
  // return 'text-muted'; // Fallback for other types
  return '';
};

function renderMilliseconds(value) {
  let seconds = Math.floor(value / 1000);
  let minutes = Math.floor(seconds / 60);
  minutes = minutes > 0 ? `${minutes} ${pluralize('minute', minutes)}` : '';
  seconds = seconds % 60;
  seconds = seconds > 0 ? `${seconds} ${pluralize('second', seconds)}` : '';
  return `${minutes} ${seconds}`.trim();
};

function renderBytes(value) {
  if (value < 1024)
    return `${value}B`;
  else if (value < 1048576)
    return `${(value / 1024).toFixed(2)} KB`;
  else if (value < 1073741824)
    return `${(value / 1048576).toFixed(2)} MB`;
  else
    return `${(value / 1073741824).toFixed(2)} GB`;
};

const renderValue = (model, field, value/*, index*/) => {
  // console.log('renderValue', model, field, value, index);
  switch (model) {
    case 'albums':
      switch (field) {
        case 'album_id':
          return value;
        default:
          return value;
      }
    case 'artists':
      switch (field) {
        case 'artist_id':
          return value;
        default:
          return value;
      }
    case 'customers':
      switch (field) {
        case 'customer_id':
          return value;
        default:
          return value;
      }
    case 'employees':
      return renderEmployerValue(value, field/*, index*/);
    case 'genres':
      switch (field) {
        case 'genre_id':
          return value;
        default:
          return value;
      }
    case 'invoices':
      return renderInvoiceValue(value, field/*, index*/);
    case 'invoice_lines':
    case 'invoice-lines':
      switch (field) {
        case 'invoice_line_id':
          return value;
        case 'unit_price':
          return USD(value).format();
        default:
          return value;
      }
      case 'media_types':
      case 'media-types':
      switch (field) {
        case 'media_type_id':
          return value;
        default:
          return value;
      }
    case 'playlists':
      switch (field) {
        case 'playlist_id':
          return value;
        default:
          return value;
      }
    case 'playlists-tracks':
    case 'playlists_tracks':
      switch (field) {
        case 'playlist_id':
          return value;
        default:
          return value;
      }
    case 'tracks':
      return renderTrackValue(value, field/*, index*/);
    default:
      return value;
  }
};


export {
  renderValue,
  getBootstrapTextColor,
  renderMilliseconds,
  renderBytes
};
