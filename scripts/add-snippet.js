const { execSync } = require("child_process");
const name = process.argv[2];

if (!name) {
  console.error(
    "❌ Please provide a snippet name.\nExample: yarn add:snippet button"
  );
  process.exit(1);
}

try {
  execSync(`npx @chakra-ui/cli snippet add ${name}`, { stdio: "inherit" });
} catch (err) {
  console.error(`❌ Failed to add snippet: ${name}`);
  process.exit(1);
}
