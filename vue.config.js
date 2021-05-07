/*
 * @Author: 余畅畅
 * @Date: 2021-05-07 10:26:56
 * @LastEditTime: 2021-05-07 11:33:49
 * @LastEditors: 余畅畅
 * @Description:
 * @FilePath: \new-projects\demo1\vue.config.js
 *
 */
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        // 生成文件的路径，也可以与webpakc打包的一致。
        // 下面这句话非常重要！！！
        // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        staticDir: path.join(__dirname, './dist'),

        // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        routes: ['/HelloWorld', '/A'],

        // 这个很重要，如果没有配置这段，也不会进行预编译
        renderer: new Renderer({
          inject: {
            foo: 'bar',
          },
          // headless: false,
          renderAfterDocumentEvent: 'render-event', // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }),
      }),
    ],
  },
}
