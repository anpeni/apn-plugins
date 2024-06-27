import React, { useEffect, useState } from 'react';
import { CITable } from '../CITable';
import { mongodbApiRef } from '../../../../api';
import { useApi } from '@backstage/core-plugin-api';
import {
  MONGODB_SERVER_ANNOTATION,
  MONGODB_SERVER_ANNOTATION_PROCEDURE,
} from '../../../../constants';
import { useEntity } from '@backstage/plugin-catalog-react';

interface BuildsProps {
  databaseName: string;
}

export const Builds: React.FC<BuildsProps> = ({ databaseName }) => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState([]);
  const mongodbApi = useApi(mongodbApiRef);
  const { result, type } = useProjectSlugFromEntity();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dataDb = await mongodbApi.getData(result, type, databaseName);
        setBuilds(dataDb.data);
        setSchema(dataDb.schema);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mongodbApi, result, type]);

  const retry = async () => {
    setLoading(true);
    try {
      const dataDb = await mongodbApi.getData(result, type, databaseName);
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
          if (typeof value === 'string' && (value.indexOf(',') >= 0 || value.indexOf('\n') >= 0 || value.indexOf('"') >= 0)) {
            return `"${value.replace(/"/g, '""')}"`; 
          }
          return value.toString();
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
  const isButtonDisabled = builds.length === 0 || loading;
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
          color: isButtonDisabled ? '#A9A9A9' : '#FFF', 
          background: isButtonDisabled ? '#808080' : '#101112',
          borderRadius: '12px',
          padding: '6px 16px',
          fontSize: '14px',
          fontFamily: 'sans-serif',
          fontWeight: 600,
          border: 'none',
        }}
        onClick={() => exportToCSV(builds, result)}
        disabled={builds.length === 0 || loading}
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
    entity.metadata.annotations?.[MONGODB_SERVER_ANNOTATION] ??
    entity.metadata.annotations?.[MONGODB_SERVER_ANNOTATION_PROCEDURE] ??
    '';

  if (entity.metadata.annotations?.[MONGODB_SERVER_ANNOTATION]) {
    type = 'users';
  } else if (entity.metadata.annotations?.[MONGODB_SERVER_ANNOTATION_PROCEDURE]) {
    type = 'procedure-select';
  }

  return { result, type };
};
