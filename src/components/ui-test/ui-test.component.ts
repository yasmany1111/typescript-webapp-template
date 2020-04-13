import templateString from './ui-test.component.html';
import './ui-test.component.css';

import { DomService, YendSDKService } from '../../_core';
import { loadHomeComponent } from '../home/home.component';

export const yendSDKService: YendSDKService = new YendSDKService();
export const domService: DomService = new DomService();

export const loadUITestComponent = () => {
  domService.setHTML('#main', templateString);
  domService.onClick('#btnBack', (event) => {
    loadHomeComponent();
  });
};
