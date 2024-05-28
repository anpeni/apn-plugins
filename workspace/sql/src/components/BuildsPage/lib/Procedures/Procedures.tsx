
import React, { useEffect, useState } from 'react';
import { sqlApiRef } from '../../../../api';
import { useApi } from '@backstage/core-plugin-api';
import { ProcTable } from '../ProcTable';


export const Procedures = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const sqlApi = useApi(sqlApiRef);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await sqlApi.getProcedures();
        setBuilds(users);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [sqlApi]); 

  const retry = async () => {
    setLoading(true);
    try {
      const users = await sqlApi.getProcedures();
      setBuilds(users);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }

  }

  const executeProcedure = async (procedureName:string) => {
    setLoading(true);
    try {
      await sqlApi.execProcedures(procedureName);
    } catch (error) {
      console.error('Error al ejecutar el procedimiento:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProcTable
      loading={loading}
      builds={builds}
      retry={retry}  
      execute={executeProcedure}   

    />
  );
};