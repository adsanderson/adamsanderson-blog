---
templateKey: blog-post
title: 'Modelling with Statecharts in XState '
date: 2019-12-21T14:47:10.233Z
description: 'or: How I learned to '
tags:
  - Statecharts
  - XState
---
In this post we will be looking at a process for modelling behaviour in a statechart. The goal of this post is to give you an approach to help ask the questions you need when creating an application and thinking in states, events and transitions.

We will start with a simple application, that is reasonably complex, realistic, self contained and has options to grow. We'll identify some requirements and then start the process of modelling the application.

## The problem

We will build an RSS feed reader. The requirements for this feed reader are:

1. View a feed
2. Add a feed
3. Remove a feed
4. Mark an item as read
5. Mark an item as unread

## The first wave of states

As you can see from the requirements above a lot has been left for us to interpret. So our goal first of all is just to think of the states we require, but not group them yet.

Here is the first wave of states that I could think of, with some details against each:

- View a feed
  - When someone pictures the app in their mind this is what they should see. The feed with the items displayed.
- Fetching a feed
  - This is a transition state while a feed is being fetched, this tends to be the home of spinners.
- Error fetching feed
  - If we can't load the feed the user selected then we should let them know. An error state is not always need but sometimes having something explicit is needed.
- Feed item marked as read
  - an item is marked as read, this should give a visual clue to the user that when they return this should not be visible.
- Feed item un-read
  - This is the feed item equivalent of what the user pictures for the feed itself but for the item.
- Adding a feed
  - Some visual feedback that a feed is being fetched and added
- Removing a feed
  - Some visual feedback that a feed is being removed
- No feed exists
  - Most likely the initial state of the application, or when all the feeds have been removed.
- Initialising feed reader
  - The app needs to do something to start and usually it's best to give the user feedback when that happens.

This list won't be every state, but it gives us a starting point for grouping and to start an initial configuration.

1. Intro about modelling
2. Define the problem
3. Identify first wave of states
4. Identify actions
5. Group states
6. Think about 0, 1 and n.

 
