// type是什么类型的节点

export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0; // 函数组件
export const HostRoot = 3; // 根节点,也就是react-dom.render的第一个参数
export const HostComponent = 5; // 原生组件,比如div,span 等
export const HostText = 6; // 文本节点,比如<div>hello world</div> 中的hello world
