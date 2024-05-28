import React, { useEffect, useState } from 'react';
import { BDTable } from '../BDTable';
import { oracleApiRef } from '../../../../api';
import { useApi } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { ORACLE_ANNOTATION } from '../../../../constants';

export const Builds = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState([]);
  const oracleApi = useApi(oracleApiRef);
  const { table } = useProjectSlugFromEntity();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await oracleApi.getUsers(table);
        const data = response.data;
        const schema = response.schema;

        // Transformar data y schema a arrays de objetos
        const builds = data.map((row: any[]) => {
          return row.reduce((obj: any, value: any, index: number) => {
            obj[schema[index][0]] = value;
            return obj;
          }, {});
        });

        const newSchema = schema.map((column: any[]) => {
          return { COLUMN_NAME: column[0], DATA_TYPE: column[1] };
        });

        setBuilds(builds);
        setSchema(newSchema);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [oracleApi]);

  const retry = async () => {
    setLoading(true);
    try {
      const response = await oracleApi.getUsers(table);
      const data = response.data;
      const schema = response.schema;

      // Transformar data y schema a arrays de objetos
      const builds = data.map((row: any[]) => {
        return row.reduce((obj: any, value: any, index: number) => {
          obj[schema[index][0]] = value;
          return obj;
        }, {});
      });

      const newSchema = schema.map((column: any[]) => {
        return { COLUMN_NAME: column[0], DATA_TYPE: column[1] };
      });

      setBuilds(builds);
      setSchema(newSchema);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (data.length > 0) {
      csvContent += Object.keys(data[0]).join(',') + '\r\n';
    }

    data.forEach(obj => {
      const row = Object.values(obj)
        .map((value: unknown) => {
          if (
            typeof value === 'string' &&
            (value.indexOf(',') >= 0 ||
              value.indexOf('\n') >= 0 ||
              value.indexOf('"') >= 0)
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          } else if (value !== null && value !== undefined) {
            return value.toString();
          } else {
            return '';
          }
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
      <BDTable
        loading={loading}
        builds={builds}
        schema={schema}
        retry={retry}
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
        onClick={() => exportToCSV(builds, table)}
      >
        Exportar a CSV
      </button>
    </>
  );
};

export const useProjectSlugFromEntity = () => {
  const { entity } = useEntity();
  const table = entity.metadata.annotations?.[ORACLE_ANNOTATION] ?? '';
  return { table };
};
