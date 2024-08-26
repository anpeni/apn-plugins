import { useEntity } from '@backstage/plugin-catalog-react';

export const useProjectSlugFromEntity = (
  serverAnnotation: string,
  serverAnnotationProcedure: string,
) => {
  const { entity } = useEntity();
  let type = '';

  const result =
    entity.metadata.annotations?.[serverAnnotation] ??
    entity.metadata.annotations?.[serverAnnotationProcedure] ??
    '';

  if (entity.metadata.annotations?.[serverAnnotation]) {
    type = 'users';
  } else if (entity.metadata.annotations?.[serverAnnotationProcedure]) {
    type = 'procedure-select';
  }

  return { result, type };
};
