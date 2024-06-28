import { useEffect } from 'react';

/**
 * Hook personalizado para establecer una conexión SSE y manejar mensajes.
 * @param {string} url La URL del SSE a la cual conectarse.
 * @param {function} onMessage Función de callback para manejar mensajes recibidos a través del SSE.
 */
export const useSse = (url: string, onMessage: (message: any) => void) => {
  useEffect(() => {
    // Crear una nueva conexión SSE utilizando la URL proporcionada
    const eventSource = new EventSource(url);

    // Escuchar el evento 'message' y llamar a la función de callback proporcionada
    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      onMessage(newMessage);
    };

    // Manejar errores de conexión
    eventSource.onerror = () => {
      console.error("EventSource failed.");
      eventSource.close();
    };

    // Limpieza al desmontar el componente
    return () => {
      eventSource.close();
    };
  }, [url, onMessage]); // Dependencias del useEffect, reactivará el efecto si cambian
};
