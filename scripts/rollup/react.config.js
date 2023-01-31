import {
	getPackageJson,
	resolvePkgPath,
	getBaseRollupPlugin
} from './utils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJson('react');

//react 包路径
const pkgPath = resolvePkgPath(name);

// react 产物路径
const pkgDistPath = resolvePkgPath(name, true);

export default [
	//react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`, // 产物路径
			name: 'index.js', // 产物名称
			format: 'umd' // 产物格式
		},
		plugins: [
			...getBaseRollupPlugin(),
			generatePackageJson({
				inputFolder: pkgPath, // package.json所在的目录
				outputFolder: pkgDistPath, // 产物所在的目录
				baseContents: ({ name, description, version }) => ({
					// 生成的package.json内容
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	//jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			//jsx-runtime
			{
				file: `${pkgDistPath}/jsx-runtime.js`, // 产物路径
				name: 'jsx-runtime.js', // 产物名称
				format: 'umd' // 产物格式
			},
			//jsx-dev-runtime
			{
				file: `${pkgDistPath}/jsx-dev-runtime.js`, // 产物路径
				name: 'jsx-dev-runtime.js', // 产物名称
				format: 'umd' // 产物格式
			}
		],
		plugins: getBaseRollupPlugin()
	}
];
