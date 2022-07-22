const { exec: _exec } = require("node:child_process");
const { promisify } = require("node:util");
const url = require("url");
const exec = promisify(_exec);
const { join } = require("path");
const { Extractor, ExtractorConfig } = require("@microsoft/api-extractor");
const config = require("./packageConfig.json");

(async () => {
  function generateDocFiles() {
    for (const packageName of config.packages) {
      const apiExtractorJsonPath = join(
        __dirname,
        "..",
        packageName,
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

      // Check if result succeeded
      if (extractorResult.succeeded) {
        console.log(`API Extractor completed successfully for ${packageName}`);
        process.exitCode = 0;
      } else {
        console.error(
          `API Extractor completed with ${extractorResult.errorCount} errors` +
            ` and ${extractorResult.warningCount} warnings`
        );
        process.exitCode = 1;
      }
    }
  }

  await Promise.all(
    config.packages.map((name) =>
      exec(`yarn --cwd ../${name} build`).then(({ stdout, stderr }) => {
        console.log(stdout);
        console.log(stderr);
      })
    )
  );

  // Generate the documentation files.
  generateDocFiles();
})();
