const fs = require('fs');
const path = require('path');

// Ajusta la ruta del archivo según dónde esté ubicado en tu proyecto
const filePath1 = path.join(
  __dirname,
  '../plugins/assets/src/components/images/index.ts',
);
const filePath2 = path.join(
  __dirname,
  '../plugins/assets/src/components/index.ts',
);

// Leer el contenido del archivo
fs.readFile(filePath1, 'utf8', (err, data1) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Descomentar las líneas específicas
  const uncommentedData1 = data1.replace(
    /\/\/ export { default as/g,
    'export { default as',
  );

  // Escribir de nuevo al archivo
  fs.writeFile(filePath1, uncommentedData1, 'utf8', err => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
      return;
    }

    console.log('Archivo 1 actualizado correctamente.');
  });
});

fs.readFile(filePath2, 'utf8', (err, data2) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Descomentar las líneas específicas
  const uncommentedData2 = data2.replace(
    /\/\/(export \* from '\.\/images';)/g,
    '$1',
  );

  // Escribir de nuevo al archivo
  fs.writeFile(filePath2, uncommentedData2, 'utf8', err => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
      return;
    }

    console.log('Archivo 2 actualizado correctamente.');
  });
});
