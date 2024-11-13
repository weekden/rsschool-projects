export const getGifts = async () => {
  try {
    const response = await fetch('.././src/jsons/gifts.json');
    const data = await response.json();
    addAtrobuteForCard(data)
    return data
  }
  catch (error) {
    console.error('Ошибка:', error)
  }
};

export const getRandomArray = _data => {
  return _data.sort(() => Math.random() - 0.5);
};

const addAtrobuteForCard = _data => {
	_data.forEach((item, index) => (item.atribute = index));
};



