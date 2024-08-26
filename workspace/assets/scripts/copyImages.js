const fs = require('fs-extra');

// Rutas de origen y destino
const sourceDir = './plugins/assets/src/components/images';
const destinationDir = './dist-types/plugins/src/images';

// Copiar directorio
fs.copy(sourceDir, destinationDir, function (err) {
  if (err) {
    console.error('Error al copiar imágenes:', err);
  } else {
    console.log('Imágenes copiadas correctamente.');
  }
});
