const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src");

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (f.endsWith(".ts") || f.endsWith(".tsx")) out.push(full);
  }
  return out;
}

function fixContent(file) {
  let code = fs.readFileSync(file, "utf8");

  // 1. Fix implicit any
  code = code.replace(/\(\s*ws\s*\)/g, "(ws: any)");
  code = code.replace(/\(\s*data\s*\)/g, "(data: any)");
  code = code.replace(/\(\s*client\s*\)/g, "(client: any)");
  code = code.replace(/\(\s*event\s*\)/g, "(event: any)");

  // 2. Fix missing optional chaining unsafe access patterns
  code = code.replace(/alert\?\.created/g, "alert && alert.created");
  code = code.replace(/alert\?\.updated/g, "alert && alert.updated");

  // 3. Force safe event.data access
  code = code.replace(/alert\.data/g, "(alert as any)?.data");

  fs.writeFileSync(file, code);
  console.log("fixed:", file);
}

const files = walk(SRC);
files.forEach(fixContent);

console.log("✅ Type cleanup done");
