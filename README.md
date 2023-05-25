# Vue 3 项目框架
> vite 、eslint、prettier、husky、commitlint、lint-staged、stylelint

### eslint
devDependencies:
+ eslint 8.41.0 (eslint核心库)
+ eslint-config-airbnb-base 15.0.0 (airbnb的代码规范:依赖plugin-import)
+ eslint-config-prettier 8.8.0    (eslint结合prettier的格式化)
+ eslint-plugin-import 2.27.5     (项目里支持eslint)
+ eslint-plugin-prettier 4.2.1    (将prettier和eslint结合)
+ eslint-plugin-vue 9.14.0 (eslint里vue的代码规范)
+ prettier 2.8.8 （prettier格式化）

### ts的插件
```npm 
pnpm install typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-alias @types/eslint @types/node -D

@typescript-eslint/parser				eslint解析器，解析typescript，检查规范typescript代码
@typescript-eslint/eslint-plugin		eslint插件，包含了各类定义好的检测typescript代码的规范
eslint-import-resolver-alias			让我们可以用import的时候使用@别名
```

### eslintrc 文件修改
```
module.exports = {
	// 环境:
	env: {
		// 浏览器
		browser: true,
		// 最新es语法
		es2021: true,
		// node环境
		node: true,
	},
	// 扩展的eslint规范语法，可以被继承的规则
	// 字符串数组：每个配置继承它前面的配置
	// 分别是：
	// eslint-plugin-vue提供的
	// eslint-config-airbnb-base提供的
	// eslint-config-prettier提供的
	// 前缀 eslint-config-, 可省略
	extends: [
		'plugin:vue/vue3-strongly-recommended',
		'airbnb-base',
		'prettier'
	],
	// eslint 会对我们的代码进行检验
	// parser的作用是将我们写的代码转换为ESTree（AST）
	// ESLint会对ESTree进行校验
	parser: 'vue-eslint-parser',
	// 解析器的配置项
	parserOptions: {
		// es的版本号，或者年份都可以
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		// 源码类型 默认是script，es模块用module
		sourceType: 'module',
		// 额外的语言类型
		ecmaFeatures: {
			tsx: true,
			jsx: true,
		},
	},
	// 全局自定义的宏，这样在源文件中使用全局变量就不会报错或者警告
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefault: 'readonly',
	},
	// 插件
	// 前缀 eslint-plugin-, 可省略
	// vue官方提供了一个ESLint插件 eslint-plugin-vue，它提供了parser和rules
	// parser为 vue-eslint-parser，放在上面的parsr字段，rules放在extends字段里，选择合适的规则
	plugins: [
		'vue',
		'@typescript-eslint'
	],
	settings: {
		// 设置项目内的别名
		'import/reslover': {
			alias: {
				map: [
					['@', './src']
				],
			},
		},
		// 允许的扩展名
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
	},
	// 自定义规则，覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
	rules: {
		'import/no-extraneous-dependencies': 0,
		'no-param-reassing': 0,
		'vue/multi-word-commponent-names': 0,
		'vue/attribute-hyphenation': 0,
		'vue/v-on-event-hyphenation': 0,
	},
};


```



### 修改vite.config.ts
```
pnpm install vite-plugin-eslint -D
vite的一个插件，让项目可以方便的得到eslint支持，完成eslint配置后，可以快速的将其集成进vite之中，便于在代码不符合eslint规范的第一时间看到提示

import eslintPlugin from 'vite-plugin-eslint'

plugins: [vue(), eslintPlugin()]
```


### 修改常见配置文件
新建文件 `.eslintrcignore`、`.prettierrc.cjs`、`.prettierignore`


### husky lint-staged commitlint 功能添加
> husky 是一个为git客户端增加hook钩子的工具,比如在commit/push之前做一些操作
> lint-staged 过滤出git代码暂存区 的工具，将暂存文件的列表传递给任务,其实就是尽量少的处理文件,只处理暂存区的
> commitlint是对我们git commit 提交的注释进行校验的工具

```
 pnpm install lint-staged husky -D 
 git init 
 npm run prepare 安装husky钩子

 然后就是添加各种git hooks
 pre-commit 一般添加的是lint-staged，去对git暂存区的代码做一些格式化的操作

 pnpm install @commitlint/config-conventional @commitlint/cli -D
安装这两个库，然后新建一个config文件(commitlint.config.cjs)

添加到git钩子里
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"
通过一个命令添加钩子

使用git commit -m "提交说明"，进行提交，提交说明应尽量清晰明了，说明本次提交的目的
推荐使用Angular规范，这是目前使用最广的写法

```

```js

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				// 编译相关的修改，例如发布版本，对项目构建或者依赖的改动
				'build',
				// 新功能(feature)
				'feat',
				// 修复bug
				'fix',
				// 更新某功能
				'update',
				// 重构
				'refactor',
				// 文档
				'docs',
				// 构建过程或者辅助工具的变动,如增加依赖库等
				'chore',
				// 不影响代码运行的变动
				'style',
				// 撤销commit,回滚到上一个版本
				'revert',
				// 性能优化
				'perf',
				// 测试(单元,集成测试)
				'test',
			],
		],
		'type-case': [0],
		'type-empty': [0],
		'scope-empty': [0],
		'scope-case': [0],
		'subject-full-stop': [0, 'never'],
		'subject-case': [0, 'never'],
		'header-max-length': [0, 'always', 74],
	},
};
```