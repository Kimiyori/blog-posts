import { afterEach, vi } from "vitest";
import { cleanup as vbrCleanup } from "vitest-browser-react";

afterEach(() => {
	vbrCleanup();
	vi.clearAllMocks();
});
