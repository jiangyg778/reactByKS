import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

export function getPackageJson(pkgName) {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf8' });
	return JSON.parse(str);
}

export function getBaseRollupPlugin({ typescript = {} } = {}) {
	//1.ts->js
	//pnpm i -D -w rollup-plugin-typescript2
	//2.js->commjs
	//pnpm i -D -w @rollup/plugin-commonjs
	//3.清除之前的产物
	//pnpm i -D -w rimraf
	//4.生成package.json
	//pnpm i -D -w rollup-plugin-generate-package-json

	return [cjs(), ts(typescript)];
}
