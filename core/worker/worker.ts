import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })import "dotenv/config"

console.log("🚀 WORKER STARTED")

async function startWorker() {
  try {

    console.log("♻️ RECOVERY STARTED")

    // 🔥 TEST LOOP (replace later with real queue)
    for (let i = 1; i <= 5; i++) {

      console.log("⚙️ PROCESSING JOB:", i)

      await new Promise((r) =>
        setTimeout(r, 500)
      )

      console.log("✅ DONE:", i)
    }

    console.log("🏁 READY")
  }

  catch (err) {
    console.error("❌ WORKER ERROR:", err)
  }
}

startWorker()
