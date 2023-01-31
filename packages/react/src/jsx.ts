import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElement,
	ElementType
} from 'shared/ReactTypes';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE, // Symbol.for('react.element')
		type,
		key,
		ref,
		props,
		__mark: 'KaSong'
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			// 判断是否是自身属性
			props[prop] = val;
		}
	}
	const maybeChildrenLength = maybeChildren.length; // 传入的子元素的个数
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0]; // 只有一个子元素
		} else {
			props.children = maybeChildren; // 多个子元素
		}
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx; // 用于开发环境
