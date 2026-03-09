import next from 'eslint-config-next'

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.vercel/**',
      'out/**',
      'public/**',
      'tmp/**',
      'product/**',
    ],
  },
  ...next,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
]
