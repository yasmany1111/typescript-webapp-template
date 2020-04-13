import './css/index.css';
import './css/futy.css';
import { loadHomeComponent } from './components/home/home.component';
import { ServerStatsService } from './components/serverio/services/server-stats.service';
require('es6-promise').polyfill();

loadHomeComponent(true);

// Injecting services
export const serverStatsService: ServerStatsService = new ServerStatsService();
