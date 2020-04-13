import templateString from './home.component.html';
import './home.component.css';
import { DomService, YendSDKService } from '../../_core';
import { loadTesterComponent } from '../tester/tester.component';
import { loadYastubeComponent } from '../yastube/yastube.component';
import { loadUITestComponent } from '../ui-test/ui-test.component';
import { loadServerioComponent } from '../serverio/serverio.component';

export const yendSDKService: YendSDKService = new YendSDKService();
export const domService: DomService = new DomService();

export const loadHomeComponent = (firstTime = false) => {
  if (!firstTime) {
    return successfulLogin({});
  }
  yendSDKService.autoLogin((result: any) => {
    if (result.accepted) {
      successfulLogin(result);
    } else {
      window.location.reload();
    }
  }, true);
};

const successfulLogin = (eData: any) => {
  domService.setHTML('#main', templateString);

  domService.onClick('#btnLogout', () => {
    localStorage.clear();
    window.location.reload();
  });
  domService.onClick('#btnReload', () => {
    window.location.reload();
  });
  domService.onClick('#btnTester', () => {
    loadTesterComponent();
  });
  domService.onClick('#btnYastube', () => {
    loadYastubeComponent();
  });
  domService.onClick('#btnUITest', () => {
    loadUITestComponent();
  });
  domService.onClick('#btnServerio', () => {
    loadServerioComponent();
  });

  // const minioKeys = yendSDKService.authenticatedGet({
  //   url: '//yas.ninja/api/file/access_keys.json',
  //   callback: (out: any) => {
  //     console.log(out);
  //   }
  // });
};
