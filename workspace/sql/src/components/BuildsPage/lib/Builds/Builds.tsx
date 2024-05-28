import React, { useEffect, useState } from 'react';
import { CITable } from '../CITable';
import { sqlApiRef } from '../../../../api';
import { useApi } from '@backstage/core-plugin-api';
import {
  SQL_SERVER_ANNOTATION,
  SQL_SERVER_ANNOTATION_PROCEDURE,
} from '../../../../constants';
import { useEntity } from '@backstage/plugin-catalog-react';

export const Builds = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState([]);
  const sqlApi = useApi(sqlApiRef);
  const { result, type } = useProjectSlugFromEntity();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dataDb = await sqlApi.getData(result, type);
        setBuilds(dataDb.data);
        setSchema(dataDb.schema);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sqlApi, result, type]);

  const retry = async () => {
    setLoading(true);
    try {
      const dataDb = await sqlApi.getData(result, type);
      setBuilds(dataDb.data);
      setSchema(dataDb.schema);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data: string[], filename: string) => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (data.length > 0) {
      csvContent += Object.keys(data[0]).join(',') + '\r\n';
    }

    data.forEach(obj => {
      const row = Object.values(obj)
        .map(value => {
          
          typeof value === 'string' &&
          (value.indexOf(',') >= 0 ||
            value.indexOf('\n') >= 0 ||
            value.indexOf('"') >= 0)
            ? `"${value.replace(/"/g, '""')}"` 
            : value.toString(); 
        })
        .join(',');
      csvContent += row + '\r\n';
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename + '.csv');
    document.body.appendChild(link); 

    link.click();
    document.body.removeChild(link); 
  };

  return (
    <>
      <CITable
        loading={loading}
        builds={builds}
        schema={schema}
        retry={retry}
        title={result}
      />

      <button
        style={{
          color: '#FFF',
          background: '#101112',
          borderRadius: '12px',
          padding: '6px 16px',
          fontSize: '14px',
          fontFamily: 'sans-serif',
          fontWeight: 600,
          border: 'none',
        }}
        onClick={() => exportToCSV(builds, 'nombre_de_tu_archivo')}
      >
        Exportar a CSV
      </button>
    </>
  );
};

export const useProjectSlugFromEntity = () => {
  const { entity } = useEntity();
  let type = '';

  const result =
    entity.metadata.annotations?.[SQL_SERVER_ANNOTATION] ??
    entity.metadata.annotations?.[SQL_SERVER_ANNOTATION_PROCEDURE] ??
    '';

  if (entity.metadata.annotations?.[SQL_SERVER_ANNOTATION]) {
    type = 'users';
  } else if (entity.metadata.annotations?.[SQL_SERVER_ANNOTATION_PROCEDURE]) {
    type = 'procedure-select';
  }

  return { result, type };
};
