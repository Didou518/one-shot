module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		indentation: ['tab', { ignore: 'inside-parens' }],
		'unit-allowed-list': ['em', 'rem', '%', 'px', 's', 'deg', 'fr', 'vh', 'vw', 'ms'],
		'declaration-colon-newline-after': null,
		'value-list-comma-newline-after': null
	}
}
