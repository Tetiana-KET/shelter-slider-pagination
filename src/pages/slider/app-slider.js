import '../style.css';
import { createComponent } from './components/slider/slider';
import petsData from '../../data/petsData';

const slider = createComponent(petsData);
document.body.appendChild(slider);
