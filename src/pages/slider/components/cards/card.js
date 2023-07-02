import './card.css';
import { validatePet } from '../pet/pet';

const CssClacces = {
  CARD: 'card',
  ITEM: 'card__item',
  IMAGE: 'item__image',
  HEADER: 'item__header',
  BUTTON: 'card__button',
}
const TEXT_BUTTON = 'More info';
const TEXT_ALT_IMAGE = 'Photo';

function createElement (tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

function createCardComponent(pet) {
  validatePet(pet);

  const component = createElement ('li', CssClacces.CARD);

  const info = createElement ('figure', CssClacces.ITEM);

  const image = createElement ('img', CssClacces.IMAGE);
  image.src = pet.img;
  image.alt = TEXT_ALT_IMAGE;

  const name = createElement ('figcaption', CssClacces.HEADER);
  name.textContent = pet.name;

  info.append(image, name);

  const button = createElement ('button', CssClacces.BUTTON);
  button.textContent = TEXT_BUTTON;

  component.append(info, button);

  return component;
}

export { createCardComponent };