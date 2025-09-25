import { type SetupWorker, setupWorker } from "msw/browser";
import { test } from "vitest";

interface BaseTest {
  mswServer: SetupWorker;
}

let globalMswServer: SetupWorker | null = null;

export const BaseIt = test.extend<BaseTest>({
  mswServer: async ({}, use) => {
    if (!globalMswServer) {
      const worker = setupWorker();
      await worker.start({ quiet: true, onUnhandledRequest: "bypass" });
      globalMswServer = worker;
    }
    const worker = globalMswServer;
    if (!worker) throw new Error("MSW worker failed to initialize");
    await use(worker);
    worker.resetHandlers();
  },
});
