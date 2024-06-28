import React from 'react';
import { Typography, Box } from '@material-ui/core';
import RetryIcon from '@material-ui/icons/Replay';
import Storage from '@material-ui/icons/Storage';
import { Table, TableColumn } from '@backstage/core-components';

type BDTableSchema = {
  COLUMN_NAME: string;
  DATA_TYPE: string;
};

type Props = {
  builds: Record<string, any>[];
  schema: BDTableSchema[];
  loading?: boolean;
  retry: () => void;
};

const mapDataTypeToColumnType = (dataType: string) => {
  switch (dataType) {
    case 'int':
    case 'bigint':
    case 'smallint':
    case 'tinyint':
    case 'numeric':
    case 'decimal':
    case 'float':
    case 'real':
      return 'numeric';
    case 'date':
    case 'datetime':
    case 'datetime2':
    case 'smalldatetime':
    case 'timestamp':
      return 'datetime';
    default:
      return 'string';
  }
};

export const BDTable = ({ builds, schema, loading, retry }: Props) => {
  // Genera las columnas dinámicamente basado en el esquema

  const generatedColumns: TableColumn[] = schema.map(column => ({
    title: column.COLUMN_NAME,
    field: column.COLUMN_NAME,
    type: mapDataTypeToColumnType(column.DATA_TYPE),
  }));

  return (
    <Table
      isLoading={loading}
      data={builds}
      title={
        <Box display="flex" alignItems="center">
          <Storage />
          <Box mr={1} />
          <Typography variant="h6">Oracle DB</Typography>
        </Box>
      }
      columns={generatedColumns}
      options={{
        paging: true,
        padding: 'dense',
        pageSizeOptions: [5, 10, 20, 50],
      }}
      actions={[
        {
          icon: () => <RetryIcon />,
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: retry,
        },
      ]}
    />
  );
};
