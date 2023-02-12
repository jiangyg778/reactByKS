import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null; // 当前正在工作的fiberNode

//初始化
function prepareFreshStack(fiber: FiberNode) {
	workInProgress = fiber;
}

// 递归中的递阶段
function renderRoot(root: FiberNode) {
	//初始化
	prepareFreshStack(root);
	do {
		try {
			workLoop();
			break;
		} catch {
			console.warn('workLoop 发生错误');
			workInProgress = null;
		}
	} while (true);
}

function workLoop() {
	// 递归中的递阶段
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	// 递归中的递阶段
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeUnitOfWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
