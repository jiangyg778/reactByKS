import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

// 创建更新
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	// 创建更新
	return {
		action // 更新的动作
	};
};

// 创建更新队列
export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			// 共享的
			pending: null // 待处理的
		}
	} as UpdateQueue<Action>;
};

// 将更新添加到更新队列中
export const enqueueUpdate = <Action>(
	UpdateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	UpdateQueue.shared.pending = update;
};

// 处理更新队列
export const processUpdateQueue = <State>(
	baseState: State, // 基础状态
	pendingUpdate: Update<State> | null // 待处理的更新
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			result.memoizedState = action(baseState);
		} else {
			result.memoizedState = action;
		}
	}
	return result;
};
