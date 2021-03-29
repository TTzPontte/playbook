# Best practices for Performance improvements on website Desktop/Mobile

Today on our code base we have multiple components, scss styles, assets, third party javascripts etc. All of this things have a heavy impact on how our website perfoms on the web.
"Optimizing for quality of user experience is key to the long-term success of any site on the web. Whether you're a business owner, marketer, or developer, Web Vitals can help you quantify the experience of your site and identify opportunities to improve." [Google Core Web Vitals](https://web.dev/vitals/)

Based on the reasearch, there are some aspects of the performance we can look to improve (Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)) and there are multiple ways to help us deal with, some of these we implemented on our code base and helped to improve our website's performance a LOT:

## Setting priorities in Chrome

### Reducing javascript loading times

We have third party origins to connect our application that needs to load some heavy scripts, meaning, this can block the paint of layout until the request to this parties are finished impacting the load time and performance of the site. To mitigate this, on de `ìndex.html` we can use the attribute `rel=preconnect`. The preconnect directive allows the browser to setup early connections before an HTTP request is actually sent to the server, this in turn eliminates roundtrip latency and saves time for users.

```html
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="preconnect" href="https://connect.facebook.net" />
<link rel="preconnect" href="https://api.segment.io" />
```

Resource: https://web.dev/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=devtools

On that same note with loading heavy javascripts, we also have inline scripts like Google Tag Manager that takes a lot of the performance because of it's long time to process. Besides that, this is not a type of script that is ultimately essential to load early, so a simple solution we used to solve this problem is to set a function that will only trigger the script when the loading of the page's layout is finished. That way it will not have a great impact on performance.

### Reducing css loading times

When accessing the page, the loading of the entire CSS code triggered to load, but 85% of that CSS code is not used at first render, because it belongs to other pages and components.
Ex:
![image](https://user-images.githubusercontent.com/19830660/81982806-b6dc0a00-9608-11ea-950e-989ba42b6cc5.png)

To solve this problem we can try and figure out which parts of this CSS is actually critical to the initial load and remaining code can be called asynchronously. We have several ways to do this, the one solution we chose was to divide the bundle in chunks, and call the minified specific CSS chunk containing the critical CSS we needed and preload on the `index.html` file with a `style` and `rel=preload` attributes. That way the critical CSS is loaded earlier preventing the blocking load time.

```html
<link
  as="style"
  rel="stylesheet preload prefetch"
  href="/swiper~6cbe72ba.css"
  type="text/css"
/>
```

## Code-splitting

### Lazy-loading components with React Suspense

"What is that - Suspense and lazy?
In short, Suspense — is the feature that allows you to defer rendering part of your application tree until some condition is met (for example data from an endpoint or a resource is loaded). As about Lazy — it is a wrapper for dynamic import. So, the example for usage is below:

```javascript
import React, {lazy, Suspense} from 'react';
const DynamicComponent = lazy(() => import('./someComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicComponent />
    </Suspense>
  );
}
```

Using this approach we can make the app more lightweight by delivering only parts of code that it's really needed to interaction with the costumers.

### Improving webpack build

To improve build and website perfomance we can adapt webpack to our needs. Some adpatations we made to improve our codebase were:
- Minify code CSS, javascript, assets. We can remove spacings and comments etc to reduce the code and help build faster.
- Split the code bundle in chunks. With smaller code chunks the browser can figure out what piece of code is really needed at the first loading time and only load specific code, the remaining being loaded later, that way we can have first initial paint faster.

Resource:
- https://web.dev/vitals/ 
- https://web.dev/unused-css-rules/?utm_source=lighthouse&utm_medium=unknown 
- https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
- https://outline.com/eBHv26 

[Back to the index](..)
