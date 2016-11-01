import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import './routes.js';
import './beam-breaks.js';

Bert.defaults.style = 'growl-top-right';
