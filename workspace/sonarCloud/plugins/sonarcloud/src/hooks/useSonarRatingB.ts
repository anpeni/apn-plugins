import { useState, useCallback } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { sonarcloudApiRef } from '../api';
import { Project } from '../types';

/**
 * Hook personalizado para obtener y manejar la media aritmética de las medias de múltiples métricas de seguridad de SonarCloud, normalizadas con respecto a un proyecto ideal.
 */
export const useSonarRatingB = () => {
  const [rate, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const sonarcloudApi = useApi(sonarcloudApiRef);

  const fetchRate = useCallback(async () => {
    setLoading(true);
    try {
      const dataDb: Project[] = await sonarcloudApi.getData();

      // Métricas para un proyecto ideal que se consideran para el puntaje 10
      const idealMetrics = {
        coverage: 100.0, // 100% de cobertura
        bugs: 0,         // Sin bugs
        codeSmells: 0,   // Sin code smells
        securityRating: 1.0, // La mejor calificación de seguridad
        vulnerabilities: 0,  // Sin vulnerabilidades
        sqaleRating: 1.0     // La mejor calificación de calidad del código
      };

      // Transformar las métricas en puntuaciones relativas al proyecto ideal
      const projectScores = dataDb.map(project => {
        const metrics = project.metrics.component.measures.map(measure => {
          let score = 0;
          switch (measure.metric) {
            case 'coverage':
              score = (parseFloat(measure.value) / idealMetrics.coverage) * 100;
              break;
            case 'bugs':
              score = (idealMetrics.bugs / (parseFloat(measure.value) + 1)) * 100; // Evitar división por cero
              break;
            case 'code_smells':
              score = (idealMetrics.codeSmells / (parseFloat(measure.value) + 1)) * 100;
              break;
            case 'security_rating':
              score = ((5 - parseFloat(measure.value) + 1) / (5 - idealMetrics.securityRating + 1)) * 100;
              break;
            case 'vulnerabilities':
              score = (idealMetrics.vulnerabilities / (parseFloat(measure.value) + 1)) * 100;
              break;
            case 'sqale_rating':
              score = ((5 - parseFloat(measure.value) + 1) / (5 - idealMetrics.sqaleRating + 1)) * 100;
              break;
          }
          return score;
        }).filter(value => !isNaN(value));

        // Calcular la puntuación total para el proyecto
        const totalScore = metrics.reduce((acc, curr) => acc + curr, 0);
        return metrics.length > 0 ? totalScore / metrics.length : NaN;
      }).filter(score => !isNaN(score));

      // Normalizar el puntaje para que esté entre 1 y 10
      const maxScore = 100; // El puntaje máximo posible basado en el proyecto ideal
      const normalizedScores = projectScores.map(score => 
        1 + (score * 9 / maxScore)
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
