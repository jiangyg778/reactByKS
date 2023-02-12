// 存放fiberNode的数据结构
import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
	type: any;
	key: Key;
	tag: WorkTag;
	pendingProps: Props;
	stateNode: any;
	return: FiberNode | null;
	child: FiberNode | null;
	sibling: FiberNode | null;
	index: number;
	ref: Ref;
	memoizedProps: Props | null;
	alterbate: FiberNode | null;
	flags: Flags | null;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		//实例
		this.tag = tag; // 指向节点的类型
		this.key = key; // 指向节点的key
		this.stateNode = null; // 指向真实的dom节点
		this.type = null; // 指向组件的类型

		//构成树状结构
		this.return = null; // 指向父节点
		this.child = null; // 指向第一个子节点
		this.sibling = null; // 指向下一个兄弟节点
		this.index = 0; // 指向当前节点在父节点的子节点中的索引

		this.ref = null; // 指向ref

		//作为工作单位
		this.pendingProps = pendingProps; // 刚开始准备工作时的props
		this.memoizedProps = null; // 工作wan完成后的props

		//更新
		this.alterbate = null; // 指向更新后的fiberNode

		//副作用
		this.flags = NoFlags; // 指向更新的类型
	}
}
