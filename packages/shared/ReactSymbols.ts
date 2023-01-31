//宿主环境是否支持Symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 生产一个Symbol
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
