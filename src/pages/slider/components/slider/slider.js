import './slider.css';
import * as Card from '../../../common/cards/card'

/**
 * @param {deltaOrder} отвечает за направление перелистывания, перелистывание влево -1, вправо +1
 *
 */
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

let cards = [];
let currentVisibleCards = [];
let leftCards = [];
let rightCards = [];
let deltaOrder = 0;
let cardContainer = null;
let buttonLeft = null;
let buttonRight = null;

function createComponent(petsData) {
  if (!Array.isArray(petsData)) {
    throw TypeError(`Slider error. Pets array is invalid.`);
  };

  const component = createElement('section', CssClasses.SLIDER);

  buttonLeft = createElement('button', CssClasses.BUTTON);
  buttonLeft.textContent = TEXT_BUTTON_LEFT;
  component.append(buttonLeft);

  const wrapper = createElement('div', CssClasses.WRAPPER);

  cardContainer = createElement('ul', CssClasses.CARD_CONTAINER);
  wrapper.append(cardContainer);

  petsData.forEach((pet) => {
    const cardComponent = Card.createCardComponent(pet);
    cards.push(cardComponent);
  });

  for (let i = 1; i <= COUNT_CARD_BLOCK; i++) {
    const cardGroup = createElement ('ul', CssClasses.CARD_GROUP);// блок из 3х карточек
    cardGroup.style.order = i;
    cardContainer.append(cardGroup);
  };

  for (let i = 0; i < COUNT_CARD; i++) {
    cardContainer.children[1].append(cards[i]);
    currentVisibleCards.push(cards[i]);
  };

  component.append(wrapper);

  buttonRight = createElement('button', CssClasses.BUTTON);
  buttonRight.textContent = TEXT_BUTTON_RIGHT;
  component.append(buttonRight);

  buttonRight.addEventListener('click', buttonRightClickHandler);
  buttonLeft.addEventListener('click', buttonLeftClickHandler);

  cardContainer.addEventListener('transitionend', transitionEndHandler);

  return component;
};

function createElement (tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

function buttonRightClickHandler () {

  let leftCardGroup = null;
  for (let group of cardContainer.children) {
    if (Number(group.style.order) === INDEX_VISIBLE_GROUP - 1) {
      leftCardGroup = group;
      break;
    }
  }

  while (leftCardGroup.firstElementChild) {
    leftCardGroup.firstElementChild.remove();
  }

  let cardsToShow = getLeftCards();

  cardsToShow.forEach((card) => {
    leftCardGroup.insertAdjacentElement('beforeend', card);
  })

  deltaOrder = 1;
  cardContainer.classList.add(CssClasses.ANIMATE_RIGHT);
  disableButtons();
};

function buttonLeftClickHandler () {

  let rightCardGroup = null;

  for (let group of cardContainer.children) {
    if (Number(group.style.order) === INDEX_VISIBLE_GROUP + 1) {
      rightCardGroup = group;
      break;
    }
  }

  while (rightCardGroup.firstElementChild) {
    rightCardGroup.firstElementChild.remove();
  }

  let cardsToShow = getRightCards();

  cardsToShow.forEach((card) => {
    rightCardGroup.insertAdjacentElement('beforeend', card);
  })

  deltaOrder = -1;
  cardContainer.classList.add(CssClasses.ANIMATE_LEFT);
  disableButtons();
};

function transitionEndHandler () {
  cardContainer.classList.add(CssClasses.NO_TRANSITION);

  for (let group of cardContainer.children) {
    let order = Number(group.style.order);
    order += deltaOrder;
    if (order <= 0 ) {
      order = COUNT_CARD;
    } else if (order > COUNT_CARD) {
      order = 1;
    }
    group.style.order = order;
  }

  cardContainer.classList.remove(CssClasses.ANIMATE_LEFT, CssClasses.ANIMATE_RIGHT);

  setTimeout(() => {
    cardContainer.classList.remove(CssClasses.NO_TRANSITION);
    enableButtons();
  }, 1);
};

function disableButtons() {
  buttonLeft.setAttribute('disabled', true);
  buttonRight.setAttribute('disabled', true);
};

function enableButtons() {
  buttonLeft.removeAttribute('disabled');
  buttonRight.removeAttribute('disabled');
};

function getRandomCards () {
  let cardsToShow = [];
  while (cardsToShow.length < COUNT_CARD) {
    const index = getRundomNumber(0, cards.length-1);
    if (!currentVisibleCards.includes(cards[index]) && !cardsToShow.includes(cards[index])) {
      cardsToShow.push(cards[index]);
    }
  }
  return cardsToShow;
};

function getRightCards () {
  let cardsToShow = null;

  if (rightCards.length) {
    cardsToShow = [...rightCards];
    rightCards = [];
  } else {
    cardsToShow = getRandomCards();
  }
  leftCards = [...currentVisibleCards];
  currentVisibleCards = [...cardsToShow];

  return cardsToShow;
};

function getLeftCards() {
  let cardsToShow = null;

  if (leftCards.length) {
    cardsToShow = [...leftCards];
    leftCards = [];
  } else {
    cardsToShow = getRandomCards();
  }
  rightCards = [...currentVisibleCards];
  currentVisibleCards = [...cardsToShow];

  return cardsToShow;
};

function getRundomNumber (min, max) {
  max = Math.floor(max);
  min = Math.ceil(min);
  return Math.floor(Math.random() * (max - min)) + min;
};

export { createComponent };
