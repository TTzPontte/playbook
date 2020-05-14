# Performance improvements on mobile


## Add Preconnect 

We have some third party origins to connect and load some scripts, so we can establish a connection with these sources in advance using `preconnect`. thus saving time when loading the script. e.g

```html
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="preconnect" href="https://connect.facebook.net" />
<link rel="preconnect" href="https://api.segment.io" />
```

Resource: https://web.dev/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=devtools


## Add Critical CSS


When loading the page, the entire CSS is loaded, but 85% of these CSS are not used at first render:
![image](https://user-images.githubusercontent.com/19830660/81982806-b6dc0a00-9608-11ea-950e-989ba42b6cc5.png)

We can initially load only `Critical CSS` and load the rest asynchronously. To do this, we can use the webpack `plugin html-critical-webpack-plugin`. It generates an `index.html` file with a` style` tag that contains the critical CSS and a `link` tag to import the rest asynchronously. using in webpack:

```js 
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
...
new HtmlCriticalWebpackPlugin({
      base: resolve(__dirname, '../build/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false
      }
    })
```

Resource: 
- https://web.dev/unused-css-rules/?utm_source=lighthouse&utm_medium=unknown
- https://github.com/anthonygore/html-critical-webpack-plugin
