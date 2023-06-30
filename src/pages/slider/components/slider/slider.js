import './slider.css';
import * as Card from '../cards/card'

const CssClasses = {
  SLIDER: 'slider',
  BUTTON: 'round__button',
  WRAPPER: 'slider__wrapper',
  CARD_CONTAINER: 'card__container',
  CARD_GROUP: 'card__group',
  ANIMATE_LEFT: 'animate__left',
  ANIMATE_RIGHT: 'animate__right',
  NO_TRANSITION: 'container__no-transition',
};

const TEXT_BUTTON_LEFT = '<';
const TEXT_BUTTON_RIGHT = '>';
const COUNT_CARD = 3;
const COUNT_CARD_BLOCK = 3;
const INDEX_VISIBLE_GROUP = 2;

let cards = new Array();
let visibleCards = new Array();

function createElement (tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

function createComponent(petsData) {
  if (!Array.isArray(petsData)) {
    throw TypeError(`Slider error. Pets array is invalid.`);
  }

  const component = createElement('section', CssClasses.SLIDER);

  const buttonLeft = createElement('button', CssClasses.BUTTON);
  buttonLeft.textContent = TEXT_BUTTON_LEFT;
  component.append(buttonLeft);

  const wrapper = createElement('div', CssClasses.WRAPPER);
  const cardContainer = createElement('ul', CssClasses.CARD_CONTAINER);
  wrapper.append(cardContainer);

  petsData.forEach((pet) => {
    const cardComponent = Card.createComponent(pet);
    cards.push(cardComponent);
  });

  for (let i = 0; i < COUNT_CARD_BLOCK; i++) {
    const cardGroup = createElement ('ul', CssClasses.CARD_GROUP);
    cardGroup.style.order = `${i + 1}`;
    cardContainer.append(cardGroup);
  }

  for (let i = 0; i < COUNT_CARD; i++) {
    cardContainer.children[1].append(cards[i]);
    visibleCards.push(cards[i]);
  }

  component.append(wrapper);

  const buttonRight = createElement('button', CssClasses.BUTTON);
  buttonRight.textContent = TEXT_BUTTON_RIGHT;
  component.append(buttonRight);

  return component;
}

export { createComponent };
