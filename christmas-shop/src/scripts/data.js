export const getGifts = async () => {
  try {
    const response = await fetch('.././src/jsons/gifts.json');
    const data = await response.json();
    addAtrobuteAndCategryForCard(data)
    return data
  }
  catch (error) {
    console.error('Ошибка:', error)
  }
};

export const getRandomArray = _data => {
  return _data.sort(() => Math.random() - 0.5);
};

const addAtrobuteAndCategryForCard = _data => {
  _data.map((item, index) => {
    item.atribute = index;
    item.category = item.category.toLowerCase().split(' ').join('-')
  })
};