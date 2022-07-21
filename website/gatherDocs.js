const { exec: _exec } = require("node:child_process");
const util = require("node:util");
const url = require("url");

const path = require("path");
const {
  Extractor,
  ExtractorConfig,
  ExtractorResult,
} = require("@microsoft/api-extractor");

const exec = util.promisify(_exec);

exec("yarn --cwd ../foo build", (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);

  const apiExtractorJsonPath = path.join(
    __dirname,
    "..",
    "foo",
    "api-extractor.json"
  );

  console.log(apiExtractorJsonPath);

  // Load and parse the api-extractor.json file
  const extractorConfig =
    ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

  // Invoke API Extractor
  const extractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,

    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    console.log(`API Extractor completed successfully`);
    process.exitCode = 0;
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    );
    process.exitCode = 1;
  }
});
