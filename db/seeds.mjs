import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { tableize, underscore } from 'inflection';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import dbHelpers from '../api/libs/db-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folder = path.join(__dirname, 'csv');
console.log(`Importing CSV files from ${folder}`);

const processRow = async (modelName, row) => {
  const field_hash = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [underscore(key), value])
  );

  /*
  if (modelName !== 'PlaylistTrack') {
    const id_field = Object.keys(field_hash).find(k => k.match(/_id$/));
    const id_value = field_hash[id_field];
    field_hash['id'] = id_value;
    delete field_hash[id_field];
  }
  */

  try {
    const result = await dbHelpers.create(modelName, field_hash);
    if (result.status !== 201) {
      console.log(`Error importing ${modelName}:`, result);
      return false;
    }

    return true;
  } catch (err) {
    console.log(`Error importing ${modelName}:`, err);

    return false;
  }
};

const importFile = (file) => {
  return new Promise(resolve => {
    let modelName = path.basename(file, path.extname(file));
    if (modelName === 'PlaylistTrack')
      modelName = 'playlists_tracks';
    else
      modelName = tableize(modelName);

    let total = 0;
    const stream = fs.createReadStream(file);
    Papa.parse(stream, {
      header: true,
      step: async (result) => {
        // Process each row as it is parsed
        // console.log("Row data:", result);
        if (await processRow(modelName, result.data)) {
          // console.log('Imported: ', result.data);
          total++;
        } else {
          console.log('Error importing', result.data);
          process.exit(1);
        }
      },
      complete: () => {
        console.log(`Imported ${modelName} done: ${total} rows.`);
        resolve();
      },
      error: err => {
        console.error(`Error parsing CSV ${modelName}:`, err);
        resolve();
      }
    });
  });
};

(async () => {

  let files = [];
  try {
    files = await fs.readdirSync(folder);
  } catch (err) {
    console.error(err);
    return;
  }

  for (const file of files) {
    await importFile(path.join(folder, file));
  };

})();

