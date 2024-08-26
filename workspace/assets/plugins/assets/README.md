# Plugin de Recursos

Este plugin ofrece recursos compartidos que pueden ser utilizados por otros plugins de Backstage.

## Contenidos

- **Iconos**: Este plugin incluye el icono de Bitbucket.
- **Temas**: Define variables de tema para los modos de luz y oscuridad.
- **Imágenes**: (Actualmente comentado) Este espacio está reservado para imágenes compartidas.

## Uso

### Componentes de Bitbucket

Los componentes en la carpeta `bitbucket` están diseñados específicamente para integrar funcionalidades de Bitbucket en tu aplicación. El componente principal es `BitbucketIcon.tsx`.

### Imágenes

La carpeta `images` contiene varias imágenes que pueden ser utilizadas como recursos visuales en tu aplicación. Estas incluyen logos y fondos específicos.

### Temas

La carpeta `themes` define las variables de estilo globales que pueden ser reutilizadas en toda la aplicación. Puedes modificar `variables.ts` para ajustar los temas según tus necesidades.

Para utilizar los recursos de este plugin en otros plugins de Backstage, sigue estos pasos:

1. Importa los componentes que necesitas:

   ```typescript
   import { BitbucketIcon, vars } from '@backstage/plugin-assets';
   ```

2. Utiliza los componentes importados en tu código:

   ```typescript
   <BitbucketIcon />
   ```

   ```typescript
   const theme = createTheme({
     palette: vars.light, // o vars.dark para el tema oscuro
   });
   ```

## Desarrollo

Para añadir nuevos recursos:

1. Crea el nuevo componente en la carpeta correspondiente.
2. Exporta el componente en el archivo index.ts de la carpeta.
3. Si es necesario, actualiza el archivo index.ts principal del plugin.
