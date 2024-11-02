import reactCompiler from 'eslint-plugin-react-compiler'

export default {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-compiler/react-compiler': 'error'
  },
  plugins: {
    'react-compiler': reactCompiler
  }
}