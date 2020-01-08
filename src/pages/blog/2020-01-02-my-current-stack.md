---
templateKey: blog-post
title: My Current Stack
date: 2020-01-02T14:49:29.028Z
description: "or: How"
tags:
  - XState
  - RxJS
  - React
---

A look at how I'd go about creating a significant application right now (2020).

The foundation is XState, this is where the behaviour of the application is modelled.

Then actors are used for creating more actors, sending messages to other actors and isolating state within themselves.

The second library I look to use is RxJS. I have found the flexibility of Observable services really liberating.

Finally a UI library, React, Vue, Svelte, Web Components. When the behaviour of an application is fully modelled in XState, the UI code becomes extremely light and UI focused.

With React for example you using the `useMachine`, or `useService` hooks. Your code uses `matches`, `context` and `send`. Finally when imperative effects are still needed, there are a few cases of `useRef`, and `useEffect`.
