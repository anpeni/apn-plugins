# Drupal Backend

## Descripción

`plugin-drupal-backend` es un plugin de Backstage que permite integrar una instancia de Drupal con el backend de Backstage. Este plugin facilita la obtención de contenido desde Drupal y su exposición a través de Backstage, permitiendo una gestión centralizada de los datos.

## Funcionamiento del Plugin

El plugin `@internal/plugin-drupal-backend` realiza las siguientes funciones principales:

1. **Conexión con Drupal**: Utiliza una instancia de `DrupalClient` para conectarse a la API de Drupal.
2. **Obtención de Contenido**: Define una ruta en el backend de Backstage (`/drupal-backend/content`) que al ser accedida realiza una solicitud a la API de Drupal para obtener contenido.
3. **Exposición de Datos**: Los datos obtenidos desde Drupal se envían como una respuesta JSON a las solicitudes realizadas a la ruta definida en Backstage.

## Configuración

Para que el plugin funcione correctamente, necesitas configurar la conexión a tu instancia de Drupal en el archivo de configuración de Backstage (`app-config.yaml`). A continuación se detallan los pasos necesarios:

1. **Configurar el URL base de Drupal**: Añade la configuración de tu instancia de Drupal en el archivo `app-config.yaml` de Backstage.

   ```yaml
   drupal:
     baseUrl: 'https://tusitiodrupal.com'
   ```
