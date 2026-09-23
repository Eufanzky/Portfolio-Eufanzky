module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Plain JS project without the prop-types package.
    'react/prop-types': 'off',
  },
  overrides: [
    {
      // Sections are exported through the SectionWrapper HOC, which fast refresh can't track.
      files: ['src/components/*.jsx'],
      rules: { 'react-refresh/only-export-components': 'off' },
    },
    {
      // React Three Fiber elements take Three.js props that react/no-unknown-property doesn't know.
      files: ['src/components/canvas/**/*.jsx'],
      rules: { 'react/no-unknown-property': 'off' },
    },
    {
      files: ['*.config.js'],
      env: { node: true },
    },
  ],
}
