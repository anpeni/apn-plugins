// Importa los hooks de React y la utilidad de API de Backstage
import { useState, useEffect, useCallback } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { sonarcloudApiRef } from '../api'; // Importa la referencia de la API de SonarCloud
import { DataPoint } from '../types'; // Importa la definición de tipos para los datos

/**
 * Hook personalizado para obtener y gestionar datos de vulnerabilidades de SonarCloud.
 * Utiliza el API de SonarCloud para recuperar vulnerabilidades y procesarlas.
 *
 * @returns {Object} Objeto que contiene los datos de las vulnerabilidades, estado de carga y la función para refrescar los datos.
 */
export const userSonarDataAnalysis = () => {
  // Estado para almacenar los datos de vulnerabilidades
  const [data, setData] = useState<DataPoint[]>([]);
  // Estado para gestionar la indicación de carga de datos
  const [loading, setLoading] = useState(false);
  // Accede al API de SonarCloud usando el hook de Backstage
  const sonarcloudApi = useApi(sonarcloudApiRef);

  // Función memorizada para cargar datos de vulnerabilidades
  const fetchVulnerabilities = useCallback(async () => {
    setLoading(true); // Indica que la carga ha comenzado
    try {
      // Realiza una llamada al API para obtener datos de vulnerabilidades
      const result = await sonarcloudApi.getVulnerability7();
      // Procesa los datos obtenidos y mapea a un nuevo formato
      //const vulnerabilities = result.vulnerabilities.length === 0 ? [0,0,0,0,0,0,0] : result.vulnerabilities;
      const newData = result.vulnerabilities.map((vulnerability: number) => ({
        name: 'Q121', // Identificador genérico para la vulnerabilidad
        uv: vulnerability, // Valor numérico de la vulnerabilidad
        color: '#0BB98C' // Color asociado a la visualización de la vulnerabilidad
      }));

      // Revierte el orden de los datos para alguna necesidad específica de visualización
      setData(newData.reverse());
    } catch (error) {
      // Manejo de errores en caso de fallo en la carga
      console.error('Error fetching vulnerabilities:', error);
    } finally {
      // Finaliza la indicación de carga independientemente del resultado
      setLoading(false);
    }
  }, [sonarcloudApi]); // Dependencia del hook de API

  // Usa useEffect para invocar la función de carga cuando el componente se monta
  useEffect(() => {
    fetchVulnerabilities();
  }, [fetchVulnerabilities]); // Dependencia de la función memorizada

  // Retorna los datos, el estado de carga y la función de carga para su uso externo
  return { data, loading, fetchVulnerabilities };
};


