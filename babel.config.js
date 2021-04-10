module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@vue/babel-preset-jsx', {
      // https://github.com/vuejs/jsx/pull/142
      // 不加会出现: Duplicate declaration "h"
      compositionAPI: true,
    }],
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', { isTSX: true }], // 开启 typescript
  ],
}
