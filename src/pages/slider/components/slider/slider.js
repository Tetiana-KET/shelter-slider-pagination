import './slider.css';

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

function createComponent(petsData) {
  if (!Array.isArray(petsData)) {
    throw TypeError(`Slider error. Pets array is invalid.`);
  }

  const component = document.createElement('section');
  component.classList.add(CssClasses.SLIDER);

  return component;
}

export { createComponent };
