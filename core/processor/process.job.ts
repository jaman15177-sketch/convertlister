export async function processJob(job: any) {

  console.log(`⚙️ PROCESSING: ${job.url}`)

  await new Promise((resolve) =>
    setTimeout(resolve, 3000)
  )

  console.log(`✅ JOB COMPLETED: ${job.url}`)
}
