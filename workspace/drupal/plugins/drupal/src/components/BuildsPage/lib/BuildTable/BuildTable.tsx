import React, { useMemo } from 'react';
import { Typography, Box, Link as MuiLink } from '@material-ui/core';
import RetryIcon from '@material-ui/icons/Replay';
import { Table, TableColumn } from '@backstage/core-components';
import LogoDrupal from './drupal-logo.png';

type BuildTableSchema = {
  COLUMN_NAME: string;
  DATA_TYPE: string;
};

type Props = {
  builds: Record<string, any>[];
  schema: BuildTableSchema[];
  loading?: boolean;
  retry: () => void;
};

const mapDataTypeToColumnType = (dataType: string) => {
  switch (dataType) {
    case 'number':
      return 'numeric';
    case 'date':
    case 'datetime':
      return 'datetime';
    default:
      return 'string';
  }
};

const StatusIndicator = ({ status }: { status: string }) => {
  const color = status === 'On' ? 'green' : 'red';
  return (
    <Box
      component="span"
      style={{
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: color,
        marginLeft: '8px',
      }}
    />
  );
};

export const BuildTable = ({ builds, schema, loading, retry }: Props) => {
  const generatedColumns = useMemo<TableColumn[]>(
    () =>
      schema
        .filter(column => column.COLUMN_NAME !== 'view_node') // Filtra la columna view_node
        .map(column => ({
          title: column.COLUMN_NAME,
          field: column.COLUMN_NAME,
          type: mapDataTypeToColumnType(column.DATA_TYPE),
          render: (rowData: any) => {
            if (column.COLUMN_NAME === 'status') {
              return (
                <Box display="flex" alignItems="center">
                  {rowData[column.COLUMN_NAME]}
                  <StatusIndicator status={rowData[column.COLUMN_NAME]} />
                </Box>
              );
            }

            const viewNodeUrl = rowData.view_node;
            return (
              <MuiLink href={viewNodeUrl} target="_blank" rel="noopener">
                {rowData[column.COLUMN_NAME]}
              </MuiLink>
            );
          },
        })),
    [schema],
  );

  return (
    <Table
      isLoading={loading}
      data={builds}
      title={
        <Box display="flex" alignItems="center">
          <img
            src={LogoDrupal}
            alt="Drupal"
            style={{ width: '32px', height: '32px', filter: 'invert(100%)' }}
          />
          <Box mr={1} />
          <Typography variant="h6">Drupal</Typography>
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
