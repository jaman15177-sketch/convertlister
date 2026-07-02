const fs = require("fs");
const path = require("path");

function walk(dir) {
  return fs.readdirSync(dir).flatMap(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) return walk(full);
    return full;
  });
}

function fix(code) {

  // 1. FIX BROKEN EVENT BUS ARCHITECTURE
  code = code
    .replace(/eventBus\.emitEvent/g, "broadcast")
    .replace(/event-bus/g, "core/ws/ws-bus")
    .replace(/../bus/event-bus/g, "../ws/ws-bus");

  // 2. FIX WRONG REDIS PATHS
  code = code.replace(/ws\/ws-bus\/redis\.stream\.bus/g, "ws/ws-bus");

  // 3. FIX BROKEN IMPORTS
  code = code.replace(/createClient\s+not exported/g, "");

  // 4. FIX UNKNOWN ERR HANDLING
  code = code.replace(/err\.message/g, "(err as any)?.message");
  code = code.replace(/error\.message/g, "(error as any)?.message");

  // 5. REMOVE IMPLICIT ANY DAMAGE AREAS (safe cast)
  code = code.replace(/\((\w+)\)/g, "($1: any)");

  // 6. FIX DOUBLE IMPORT LINES
  code = code.replace(/import (.+?);import/g, "import $1;\nimport");

  // 7. FIX BROKEN INDEX SIGNATURE
  code = code.replace(/\[key: string\];/g, "[key: string]: any;");

  return code;
}

const files = walk(path.join(process.cwd(), "src"));

files.forEach(file => {
  if (!file.endsWith(".ts") && !file.endsWith(".tsx")) return;

  let code = fs.readFileSync(file, "utf8");
  let updated = fix(code);

  if (updated !== code) {
    fs.writeFileSync(file, updated);
    console.log("fixed:", file);
  }
});

console.log("✅ FIX V2 COMPLETE");
