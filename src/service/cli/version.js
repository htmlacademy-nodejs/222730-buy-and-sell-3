'use strict';

const {version} = require(`../../../package.json`);

module.exports = {
  getVersion: () => {
    console.log(version);
  }
};
