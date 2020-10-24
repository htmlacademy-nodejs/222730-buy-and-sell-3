'use strict';

const version = require(`./cli/version`);
const help = require(`./cli/help`);
const generate = require(`./cli/generate`);

const customCommands = [{
  name: `--version`,
  action: version.getVersion
}, {
  name: `--help`,
  action: help.getHelp
}, {
  name: `--generate`,
  action: (count) => generate.run(count)
}];

const [
  commandName,
  ...params
] = process.argv.slice(2);

const userCommand = customCommands.find((command) => command.name === commandName);

if (userCommand) {
  userCommand.action(...params);
} else {
  help.getHelp();
}
