import { PipelineEngine }
from "./pipeline.engine";

const engine = new PipelineEngine();

engine.process({
  id: "1",
  title: "Premium Bottle",
  image: "input.jpg",
  marketplace: "amazon"
})
.then(result => {

  console.log("\n===== FINAL RESULT =====\n");

  console.log(result);

})
.catch(error => {

  console.error(error);

});
