import {Application} from './src/Application';
import {local_port} from './src/config/config';

const app: Application = new Application(Number(local_port));
app.init();