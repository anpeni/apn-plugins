/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Typography, Box, makeStyles, IconButton } from '@material-ui/core';
import RetryIcon from '@material-ui/icons/Replay';
import Storage from '@material-ui/icons/Storage';
import { Table, TableColumn } from '@backstage/core-components';


export type CITableBuildInfo = {
 
  name: string;
  execute: (procedureName: string) => void;
};

const generatedColumns = (execute: CITableBuildInfo['execute']): TableColumn[] => [
  {
    title: 'name',
    field: 'name',
    type: 'string', 
  },
  {
    title: 'Actions',
    width: '10%',
    render: (row: Partial<CITableBuildInfo>) => (
      <IconButton onClick={() => row.name && execute(row.name)}> {/* Asegúrate de que row.name no sea undefined */}
        <RetryIcon />
      </IconButton>
    ),
  },
 
];

type Props = {
  builds: CITableBuildInfo[];
  loading?: boolean;
  retry: () => void;
  execute: (procedureName:string) => void;
};

export const ProcTable = ({ builds, loading, retry, execute }: Props) => {
  const columnsWithActions = generatedColumns(execute);
  return (
    <Table
      isLoading={loading}
      data={builds}
      title={
        <Box display="flex" alignItems="center">
          <Storage />
          <Box mr={1} />
          <Typography variant="h6">Procedures</Typography>
        </Box>
        
      }
      columns={columnsWithActions}
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
          onClick: () => retry(),
        },
      ]}
      
    />
  );
};


