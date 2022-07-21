import { exec as _exec } from "node:child_process";
import util from "node:util";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

console.log(__dirname);

import path from "path";
import {
  Extractor,
  ExtractorConfig,
  ExtractorResult,
} from "@microsoft/api-extractor";

const exec = util.promisify(_exec);

const { stdout, stderr } = await exec("yarn --cwd ../foo build");

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
