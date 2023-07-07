import './showcase.css';
import * as Card from '../../../common/cards/card';
import petsData from '../../../../data/petsData';



const CssClasses = {
  CONTAINER: 'pagination',
  SHOWCASE: 'showcase',
}

const PAGE_COUNT = 6;

let petsPage = [];
let cardComponents = [];
let showCaseElement = null;


function createComponent(pets) {
  if (!Array.isArray(pets)) {
    throw TypeError(`Pagination error. Pets array is invalid.`);
  }

  const component = Card.createElement('section', CssClasses.CONTAINER);
  showCaseElement = Card.createElement('ul', CssClasses.SHOWCASE);

  petsPage.push(petsData);
  for (let i = 1; i < PAGE_COUNT; i++) {
    const newPetsPage = createRandomPets(petsPage[i-1].reverse());
    pets
  }
}

function createRandomPets () {

}