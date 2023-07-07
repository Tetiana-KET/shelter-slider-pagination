/**
 * выполняет валидацию данных
 * @param {object} pet данные питомца
 * @throws {TypeError} в случае не валидных данных
 * @returns {boolean} в случае успеха
 */
function validatePet (pet) {
  Object.keys(pet).forEach((key) => {
    if ((typeof (pet[key]) === 'string' && pet[key] === '') && Array.isArray(pet[key]) ===false) {
      throw TypeError (`Pet erroe. Field ${key} is invalid.`);
    }
  });

  return true;
}

export { validatePet };