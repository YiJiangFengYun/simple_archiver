#!/usr/bin/env node
// require modules
var commandLineArgs = require("command-line-args");
var achiver = require("../dist");

// option definitions.
const optionDefinitions = [
    { name: "src", alias: "s", type: String, defaultOption: true, defaultValue: "output" },
    { name: "output", alias: "o", type: String, defaultValue: "output.zip" },
    { name: "format", alias: "f", type: String, defaultValue: "zip" },
    { name: "level", alias: "l", type: Number, defaultValue: 9 },
]

// parse option from command line args.
const options = commandLineArgs(optionDefinitions);

achiver.archive(options)
.then(() => {
    log.info("Succeeded to archive the folder.");
    process.exit(0);
})
.catch((err) => {
    log.error(`Failed to archive the folder.`);
    log.error(err);
    process.exit(1);
});

