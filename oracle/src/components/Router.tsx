import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BuildsPage } from './BuildsPage';
import { Entity } from '@backstage/catalog-model';
import {
  useEntity,
  MissingAnnotationEmptyState,
} from '@backstage/plugin-catalog-react';
import { ORACLE_ANNOTATION } from '../constants';

/** @public */
export const isOracleAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[ORACLE_ANNOTATION]);

/** @public */
export const Router = () => {
  const { entity } = useEntity();

  if (!isOracleAvailable(entity)) {
    return <MissingAnnotationEmptyState annotation={ORACLE_ANNOTATION} />;
  }

  return (
    <Routes>
      <Route path="/" element={<BuildsPage />} />
    </Routes>
  );
};
