const fs = require("fs");
const path = require("path");

const root = process.cwd();

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });

  return results;
}

function fix(file) {
  let code = fs.readFileSync(file, "utf8");
  let original = code;

  // 1. event-bus -> ws-bus
  code = code.replace(/event-bus/g, "ws/ws-bus");

  // 2. eventBus.emitEvent -> broadcast
  code = code.replace(/eventBus\.emitEvent/g, "broadcast");

  // 3. old redis path fix
  code = code.replace(
    /\.\.\/\.\.\/\.\.\/lib\/server\/redis/g,
    "../../../lib/redis"
  );

  // 4. double import same line fix (your recharge bug)
  code = code.replace(/import (.+?);import/g, "import $1;\nimport");

  // 5. remove ": any" in function calls
  code = code.replace(/\(\s*(\w+)\s*:\s*any\s*\)/g, "($1)");

  // 6. fix handler(any) style
  code = code.replace(/:\s*any/g, "");

  // 7. quick unsafe cleanup
  code = code.replace(/processAlert\((\w+): any\)/g, "processAlert($1)");

  if (code !== original) {
    fs.writeFileSync(file, code, "utf8");
    console.log("fixed:", file);
  }
}

const files = walk(path.join(root, "src"));

files
  .filter(f => f.endsWith(".ts") || f.endsWith(".tsx"))
  .forEach(fix);

console.log("✅ FULL AUTO FIX DONE");
