import templateString from './yastube.component.html';
import './yastube.component.css';

import { DomService, YendSDKService } from '../../_core';
import { loadHomeComponent } from '../home/home.component';

export const yendSDKService: YendSDKService = new YendSDKService();
export const domService: DomService = new DomService();

export const loadYastubeComponent = () => {
  domService.setHTML('#main', templateString);
  domService.onClick('#btnBack', (event) => {
    loadHomeComponent();
  });
  domService.onClick('#btnTester', (event) => {
    document
      .querySelector('.video-view')
      ?.setAttribute(
        'src',
        'http://yas.ninja/api/youtube/' + prompt() + '?token=' + localStorage['__yend-token']
      );
  });
};
