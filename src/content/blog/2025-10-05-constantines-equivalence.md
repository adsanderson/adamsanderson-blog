---
title: Constantine's Equivalence 
description: 'or: How I learned to stop worrying and figure out the cost of software'
---

In Kent Beck's "Tidy First?" (Link to book) I was first introduced to the idea of "Constantine's equivalence".  An observation on the cost of creating software over its lifetime. Here is the  [explanation](https://tidyfirst.substack.com/p/constantines-equivalence) from Beck's Substack. 

> cost(software) ~= cost(change) ~= cost(big changes) ~= coupling

To break down what the equivalence means:

The cost of creating a software is equivalent to the cost of making changes to that software. Over the lifetime of a piece of software the majority of the investment is making changes to that software.

The cost of making those changes is equivalent to making large changes to the software. Making a large change would be when you need to change lots of parts of the software. 

The final part is making large changes is equivalent to the level of coupling in the system. So when you want to make a change 

### But, what is coupling

The original definition of coupling from "structured design" is

>  Two elements are coupled when changing one requires change in the other.

This means all coupling is in relation to a change.

---

## Scratchpad:

Kent Beck the introduction <https://tidyfirst.substack.com/p/constantines-equivalence> and some history

What is Constantine's Equivalence

What is coupling

Why is it a choice!

## 

So an example could be a function with a config object. So adding a property to the config object.



This seems like a convoluted way of saying the expensive part of making software is when you have to change lots of things. The important part here is understanding that there a choices you can make to direct these costs.

The problem is these costs aren't directly tied to the outputs. For example, cutting the average time down for a build has a cumulative effect that can be measured over time. Taking a couple of days work to speed the build up by a minute depending on the rate of which diffs are built will add up quickly over time, as every diff and every engineer will benefit.

