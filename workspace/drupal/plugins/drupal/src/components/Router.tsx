import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BuildsPage } from './BuildsPage';
import { Entity } from '@backstage/catalog-model';
import {
  useEntity,
  MissingAnnotationEmptyState,
} from '@backstage/plugin-catalog-react';
import { DRUPAL_ANNOTATION } from '../constants';

export const isDrupalAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[DRUPAL_ANNOTATION]);

export const Router = () => {
  const { entity } = useEntity();

  if (!isDrupalAvailable(entity)) {
    return <MissingAnnotationEmptyState annotation={DRUPAL_ANNOTATION} />;
  }

  return (
    <Routes>
      <Route path="/" element={<BuildsPage />} />
    </Routes>
  );
};
