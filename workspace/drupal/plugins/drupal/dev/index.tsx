import { createDevApp } from '@backstage/dev-utils';
import { drupalPlugin } from '../src/plugin';

createDevApp().registerPlugin(drupalPlugin).render();
