const postcssCssnext = require("postcss-cssnext");

module.exports = {
    plugins: [
		postcssCssnext({
			browsers: [
				'>1%',
				'last 2 versions'
			]
		}),
		require('postcss-custom-properties')({
			preserve: true // 设置为 `true` 以保留自定义属性在输出中
		})
    ]
}