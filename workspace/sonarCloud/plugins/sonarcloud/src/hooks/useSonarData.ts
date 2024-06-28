// Importando hooks de React y utilidades de Backstage
import { useState, useCallback } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { sonarcloudApiRef } from '../api'; // Referencia al API de SonarCloud definido en otro archivo
import { Project } from '../types'; // Tipos definidos en otro archivo

/**
 * Hook personalizado para obtener y manejar datos de vulnerabilidades de SonarCloud.
 */
export const useSonarData = () => {
  // Estado para almacenar los datos y el estado de carga
  const [data, setData] = useState({ critical: 0, high: 0, medium: 0, low: 0 });
  const [loading, setLoading] = useState(false);

  // Utilizando el hook de Backstage para consumir APIs
  const sonarcloudApi = useApi(sonarcloudApiRef);

  // Función para cargar los datos
  const fetchData = useCallback(async () => {
    setLoading(true); // Indicar que la carga ha comenzado
    try {
      // Llamada al API para obtener datos
      const dataDb: Project[] = await sonarcloudApi.getData();

      // Preparación para contar las vulnerabilidades por categoría
      const ratingCount: { [key: string]: number } = { '1.0': 0, '2.0': 0, '3.0': 0, '4.0': 0 };

      // Procesamiento de cada proyecto para contar las vulnerabilidades
      dataDb.forEach(project => {
        const rating = project.metrics.component.measures.find(m => m.metric === 'security_rating')?.value;
        if (rating) {
          if (rating === '5.0') {
            ratingCount['4.0']++; // Incrementar el conteo para críticas si es 5.0
          } else if (rating in ratingCount) {
            ratingCount[rating]++; // Incrementar el conteo para otras categorías
          }
        }
      });
      // Actualización del estado con los conteos
      setData({
        low: ratingCount['1.0'],
        medium: ratingCount['2.0'],
        high: ratingCount['3.0'],
        critical: ratingCount['4.0'] + (ratingCount['5.0'] || 0),
      });
    } catch (error) {
      console.error('Error fetching data:', error); // Manejo de errores
    } finally {
      setLoading(false); // Finalizar el indicador de carga
    }
  }, [sonarcloudApi]); // Dependencia del API de SonarCloud

  // Retorno del estado y la función para realizar la carga
  return { data, loading, fetchData };
};
