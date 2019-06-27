const off = 'off'

module.exports = {
  extends: require.resolve('eslint-config-ostai'),
  rules: {
    'global-require': off,
    'import/no-dynamic-require': off,
    'no-restricted-syntax': off
  }
}
