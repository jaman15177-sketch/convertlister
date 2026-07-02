const fs = require("fs");
const path = require("path");

const SRC_ROOT = path.join(__dirname, "src");

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full, files);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

// convert "@/lib/x" → relative path
function resolveRelative(fromFile, targetPath) {
  const fromDir = path.dirname(fromFile);

  const libIndex = targetPath.indexOf("lib/");
  if (libIndex === -1) return targetPath;

  const libPath = targetPath.slice(libIndex); // lib/...
  const absoluteTarget = path.join(SRC_ROOT, libPath);

  let rel = path.relative(fromDir, absoluteTarget);
  if (!rel.startsWith(".")) rel = "./" + rel;

  return rel.replace(/\\/g, "/");
}

function fixFile(file) {
  let code = fs.readFileSync(file, "utf8");

  // Fix "@/lib/..."
  code = code.replace(/@\/lib\/[a-zA-Z0-9\/\-_]+/g, (match) => {
    return resolveRelative(file, match);
  });

  // Fix "@/providers/..."
  code = code.replace(/@\/providers\/[a-zA-Z0-9\/\-_]+/g, (match) => {
    const target = match.replace("@/", "");
    const absoluteTarget = path.join(SRC_ROOT, target);

    let rel = path.relative(path.dirname(file), absoluteTarget);
    if (!rel.startsWith(".")) rel = "./" + rel;

    return rel.replace(/\\/g, "/");
  });

  fs.writeFileSync(file, code);
  console.log("fixed:", file);
}

const files = walk(SRC_ROOT);

for (const file of files) {
  fixFile(file);
}

console.log("\n✅ All imports fixed");
