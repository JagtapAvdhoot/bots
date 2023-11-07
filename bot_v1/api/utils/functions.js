exports.stopFunction = async (timeout) => {
  await new Promise((resolve) => setTimeout(resolve, timeout));
};

exports.removeDuplicates = (arr, prop) => {
  const uniqueArray = [];
  const seenProps = new Set();

  for (const item of arr) {
    const key = item[prop];
    if (!seenProps.has(key)) {
      seenProps.add(key);
      uniqueArray.push(item);
    }
  }

  return uniqueArray;
};

exports.getRandomNumber = (min, max) => {
  const randomDecimal = Math.random();

  const randomInteger = Math.floor(randomDecimal * (max - min + 1)) + min;

  return randomInteger;
};
