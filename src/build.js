const fs = require("fs/promises");
const path = require("path");
const { build } = require("vite");
const dts = require("vite-plugin-dts");

const { version } = require("../package.json");

function handleError(err) {
  console.error(err);
  process.exit(1);
}

function handleSuccess() {
  process.exit(0);
}

async function generateLibraryVersion() {
  const providerPath = path.resolve(__dirname, "components/Provider.tsx");
  const providerFile = (await fs.readFile(providerPath, "utf8")).toString();
  const previousVersion = 'const version = "development"';
  const newVersion = `const version = "${version}"`;

  await fs.writeFile(
    providerPath,
    providerFile.replace(previousVersion, newVersion)
  );

  return () =>
    fs.writeFile(
      providerPath,
      providerFile.replace(newVersion, previousVersion)
    );
}

async function buildLibrary() {
  const undoVersion = await generateLibraryVersion();
  try {
    await build({
      build: {
        lib: {
          entry: path.resolve(__dirname, "index.ts"),
          formats: ["esm", "cjs"],
          fileName: "index",
        },
        rollupOptions: {
          external: ["react", "react-dom"],
        },
      },
      plugins: [dts()],
    });

    await undoVersion();
  } catch (err) {
    await undoVersion();
    handleError(err);
  }
}

buildLibrary().then(handleSuccess).catch(handleError);
