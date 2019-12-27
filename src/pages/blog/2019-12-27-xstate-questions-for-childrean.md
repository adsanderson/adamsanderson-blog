---
templateKey: blog-post
title: XState questions for childrean
date: 2019-12-27T10:15:41.554Z
description: 'or: '
tags:
  - Statecharts
  - XState
---
There are a number of ways we can deal with sub-states in XState. We will start with a list of the options and then follow up with questions you can ask yourself when helping to decide which pattern to use. 

## The patterns

### External

- This is when the parent service and child service no nothing of each other. 

### Hierarchy

- Sharing context
- communicate through ids 

### Invoked Machine service

- on done final state
- mocking in testing
- Belongs to a state

### Actor machine

- update state through message events
- dynamic
- manual stop
- Belong to the service

## The Questions

Do my sub-states need to keep up to date with the parent context.
Are the sub-states always the same.
Do I need to mock out the sub-states.
