import { useState, useCallback } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { sonarcloudApiRef } from '../api';
import { Project } from '../types';

/**
 * Hook personalizado para obtener y manejar la media aritmética de las medias de múltiples métricas de seguridad de SonarCloud.
 */
export const useSonarRating = () => {
  const [rate, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const sonarcloudApi = useApi(sonarcloudApiRef);

  const fetchRate = useCallback(async () => {
    setLoading(true);
    try {
      const dataDb: Project[] = await sonarcloudApi.getData();

      // Transformar las métricas en puntuaciones y calcular la media aritmética para cada proyecto
      const projectScores = dataDb.map(project => {
        const metrics = project.metrics.component.measures.map(measure => {
          let score = 0;
          switch (measure.metric) {
            case 'coverage': // Cobertura de código
              score = parseFloat(measure.value); // Consideramos el porcentaje directamente
              break;
            case 'bugs': // Errores
            case 'vulnerabilities': // Vulnerabilidades
            case 'code_smells': // Malos olores de código
              score = -parseFloat(measure.value); // Negativo porque menos es mejor
              break;
            case 'security_rating': // Calificación de seguridad
            case 'sqale_rating': // Calificación de calidad del código
              score = 5 - parseFloat(measure.value); // Invertir escala
              break;
          }
          return score;
        }).filter(value => !isNaN(value));

        // Calcular la puntuación total para el proyecto
        const totalScore = metrics.reduce((acc, curr) => acc + curr, 0);
        return metrics.length > 0 ? totalScore / metrics.length : NaN;
      }).filter(score => !isNaN(score)); // Filtrar proyectos sin puntuaciones válidas

      // Normalizar el puntaje para que esté entre 1 y 10
      const minScore = Math.min(...projectScores);
      const maxScore = Math.max(...projectScores);
      const normalizedScores = projectScores.map(score => 
        1 + (score - minScore) * 9 / (maxScore - minScore)
      );

      // Calcular la media de las puntuaciones de todos los proyectos
      if (normalizedScores.length > 0) {
        const meanScore = normalizedScores.reduce((acc, curr) => acc + curr, 0) / normalizedScores.length;
        setData(meanScore);
      } else {
        console.log('No valid project scores available to calculate the overall mean.');
        setData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [sonarcloudApi]);

  return { rate, loading, fetchRate };
};
