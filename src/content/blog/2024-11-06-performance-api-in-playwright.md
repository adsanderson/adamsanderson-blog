---
title: 'Performance API'
description: |
  'or: How I Learned to inject some performance into my tests'
tags:
  - Playwright
  - Performance
---

One of those tools that I don't here to much about is the [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance). This small API lets you unlock a world of measurments in your page. From simply setting marks during events on your page and measuring the duration. To more detailed breakdowns of resources the page is loading and when. This API allows for detailed measurment of exactly what and when things are happening on your page.

### What does it look like

```js
performance.mark('long-running-task-start');

longRunningTask();

performance.mark('long-running-task-end');

performance.measure('long-running-task-start', 'long-running-task-end');
```
