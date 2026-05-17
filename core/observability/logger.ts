export const logger = {

  info: (msg: string, meta?: any) => {
    console.log(`🟢 INFO: ${msg}`, meta || "")
  },

  success: (msg: string, meta?: any) => {
    console.log(`✅ SUCCESS: ${msg}`, meta || "")
  },

  error: (msg: string, meta?: any) => {
    console.log(`❌ ERROR: ${msg}`, meta || "")
  },

  warn: (msg: string, meta?: any) => {
    console.log(`⚠️ WARN: ${msg}`, meta || "")
  }
}
