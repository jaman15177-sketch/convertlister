export class ImportLogger {

  log(event: string, data: any) {
    console.log(`[IMPORT] ${event}`, {
      timestamp: Date.now(),
      data
    });
  }
}
