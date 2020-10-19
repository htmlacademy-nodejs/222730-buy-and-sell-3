'use strict';

const fs = require(`fs`);
const {getRandomInt, shuffle} = require(`../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_COUNT = 1000;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;

const {TITLES, DESCRIPTIONS, CATEGORIES} = require('./testData.js');

const getImgFileName = (num) => num < 10 ? `item0${num}.jpg` : `item${num}.jpg`;


const OfferType = {
  offer: `offer`,
  sale: `sale`,
};


const createRandomOffer = () => {
  const offer = {
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getImgFileName(getRandomInt(1, 16)),
    description: shuffle(DESCRIPTIONS).slice(0, getRandomInt(1, 5)).join(` `),
    type: Object.keys(OfferType)[getRandomInt(0, 1)],
    category: Array(getRandomInt(1, 3)).fill(``)
      .map(() => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)])
      .reduce((acc, it) => !acc.includes(it) ? [...acc, it] : acc, []),
    sum: getRandomInt(MIN_PRICE, MAX_PRICE),
  };
  return offer;
};

const generateOffers = (amount) => Array(amount).fill({}).map(() => createRandomOffer());

module.exports = {
  name: `--generate`,
  run(args) {
    const amount = args;
    const offerCount = Number.parseInt(amount, 10) || DEFAULT_COUNT;

    if (offerCount > MAX_COUNT) {
      console.log(`Не больше 1000 объявлений`);
      return;
    }
    const content = JSON.stringify(generateOffers(offerCount));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }
      return console.log(`Operation success. File created.`);
    });
  },
};