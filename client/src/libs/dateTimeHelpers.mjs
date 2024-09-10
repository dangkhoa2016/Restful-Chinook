import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export function formatDateTime(dateTime, format = 'LL') {
  if (!dateTime) return '';

  return dayjs(dateTime).format(format);
}
