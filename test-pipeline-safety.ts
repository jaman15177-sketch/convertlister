import { PipelineSafety } from "./core/governance/safety/pipeline.safety";

const safety = new PipelineSafety();

//
// ✅ VALID PRODUCT TEST
//

try {

  const result = safety.protect({
    title: "Premium Bottle",
    price: 25
  });

  console.log("VALID PRODUCT PASSED");
  console.log(result);

} catch (err: any) {

  console.log("VALID PRODUCT FAILED");
  console.log(err.message);
}

//
// ❌ INVALID PRODUCT TEST
//

try {

  const result = safety.protect({
    title: "",
    price: "25"
  });

  console.log("INVALID PRODUCT PASSED");
  console.log(result);

} catch (err: any) {

  console.log("INVALID PRODUCT BLOCKED");
  console.log(err.message);
}
