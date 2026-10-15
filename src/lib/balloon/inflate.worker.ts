import { inflate, InflateJob } from "./inflate";

// typed loosely on purpose: the dom and webworker libs can't share one program
const scope = self as unknown as {
	onmessage: ((e: MessageEvent<InflateJob & { id: number }>) => void) | null;
	postMessage(message: unknown, transfer: Transferable[]): void;
};

scope.onmessage = e => {
	const { id, ...job } = e.data;
	const out = inflate(job);
	scope.postMessage({ id, ...out }, [out.positions.buffer, out.normals.buffer, out.index.buffer]);
};

export {};
