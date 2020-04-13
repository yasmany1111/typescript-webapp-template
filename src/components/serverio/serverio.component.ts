import templateString from './serverio.component.html';
import './serverio.component.css';

import { DomService, YendSDKService } from '../../_core';
import { loadHomeComponent } from '../home/home.component';
import { serverStatsService } from '../..';

export const yendSDKService: YendSDKService = new YendSDKService();
export const domService: DomService = new DomService();

export const loadServerioComponent = () => {
  domService.setHTML('#main', templateString);
  domService.onClick('#btnBack', (event) => {
    loadHomeComponent();
  });

  domService.onClick('#btnCors', (event) => {
    // yendSDKService
    //   .authenticatedGet('//yas.ninja/api/cors', {
    //     url: 'https://www.youtube.com/watch?v=j9D7AW8ew3E&t=167s'
    //   })
    //   ?.then((a: any) => {
    //     console.log(a);
    //   });
    refreshServerData();
  });

  refreshServerData();
};

const knownServers = [
  {
    name: 'hub',
    host: 'yas.ninja'
  },
  // {
  //   name: 'mass-storage',
  //   host: 'yas.ninja'
  // },
  {
    name: 'home-net'
  }
];
const refreshServerData = async () => {
  const serverSattsContainer = document.querySelector('.server-stats-container');
  if (serverSattsContainer) {
    serverSattsContainer.innerHTML = '';
    for (const server of knownServers) {
      try {
        const vnStatOutput: any = await yendSDKService.authenticatedGet('//yas.ninja/api/bash', {
          command: 'vnstat -m',
          server: server.name === 'hub' ? undefined : server.name
        });

        const freeRamOutput: any = await yendSDKService.authenticatedGet('//yas.ninja/api/bash', {
          command: 'free',
          server: server.name === 'hub' ? undefined : server.name
        });

        const dockerPSOutput: any = await yendSDKService.authenticatedGet('//yas.ninja/api/bash', {
          command: "docker ps -a --format '{{.Names}} {{.Status}}'",
          server: server.name === 'hub' ? undefined : server.name
        });
        console.log(dockerPSOutput);

        let serverStats = serverStatsService.getServerStats(
          freeRamOutput.stdout,
          vnStatOutput.stdout,
          dockerPSOutput.stdout
        );

        let activePSHTML = ``;
        for (const dockerPS of serverStats.containers) {
          activePSHTML += `
          <div><span>${dockerPS.name}</span> <span>${dockerPS.active}</span></div>
          `;
        }

        serverSattsContainer.innerHTML += `
      <div class="futurepanel server-stats-panel">
        <div class="futurepanel__header">
          <h1 class="futurepanel__title">${server.name}</h1>
        </div>
        <div class="futurepanel__body">
          <div><span style="color: lime;">_network: </span><span>${serverStats.networkUsed}</span></div> 
          <div><span style="color: lime;">_ram: </span><span>${serverStats.usedRam}GB / ${serverStats.totalRam}GB</span></div>
          <br>
          ${activePSHTML}
        </div>
      </div>
      `;
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
