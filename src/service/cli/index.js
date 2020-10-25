'use strict';

let version;
let help;
let generate;

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
};

module.exports = {
  Cli,
};
