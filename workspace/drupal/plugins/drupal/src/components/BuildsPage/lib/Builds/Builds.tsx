import React, { useEffect, useState, useCallback } from 'react';
import { BuildTable } from '../BuildTable';
import { drupalApiRef } from '../../../../api';
import { useApi } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { DRUPAL_ANNOTATION } from '../../../../constants';

type Build = Record<string, any>;

type Schema = {
  COLUMN_NAME: string;
  DATA_TYPE: string;
};

export const Builds = () => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState<Schema[]>([]);
  const drupalApi = useApi(drupalApiRef);
  const { table } = useProjectSlugFromEntity();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (!table) {
        console.error(
          'No se encontró la anotación DRUPAL_ANNOTATION en la entidad.',
        );
        return;
      }

      const response = await drupalApi.getTable(table);
      const data: Build[] = response || [];

      if (data.length > 0) {
        const newSchema: Schema[] = Object.keys(data[0]).map(key => ({
          COLUMN_NAME: key,
          DATA_TYPE: typeof data[0][key],
        }));

        setBuilds(data);
        setSchema(newSchema);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [drupalApi, table]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BuildTable
      loading={loading}
      builds={builds}
      schema={schema}
      retry={fetchData}
    />
  );
};

export const useProjectSlugFromEntity = () => {
  const { entity } = useEntity();
  const table = entity.metadata.annotations?.[DRUPAL_ANNOTATION] ?? '';
  return { table };
};
