module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  // vant 配置按需导入
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
