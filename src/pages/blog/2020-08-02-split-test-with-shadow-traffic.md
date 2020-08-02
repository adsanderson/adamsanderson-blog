---
templateKey: blog-post
title: Split test with Shadow Traffic
date: 2020-08-02T12:46:18.709Z
description: "or: How I learned that B doesn't have to exist and A can be B
  while still being A"
tags:
  - Devops
  - Monitoring
---
A/B or split testing is a well thought out path at this point. Give 2 users slightly different experiences and measure how they behave. The uses of this technique can help in identifying optimal designs, measure feature impact, and to roll out new functionality to a small sample of your user base.

A video from thoughtworks built on that final use case and introduced the concept of **"Shadow Traffic"**.

["Technique for decision making based on real user behavior - Klaus Fleerkötter & Irene Torres". ](https://youtu.be/I84PKrXP3Yw)

### One way experience

The traditional model is for a user to make a request through an interface, some logic to be run through and then a response to return. While at the same time this interaction is being monitored by some tooling to make sure there are no issues, or potential issues.

![User making a request to a server and getting a response while the server is monitored](https://res.cloudinary.com/lazydayed/image/upload/v1596374270/blog/shadow-traffic.png)

When the application requires an update to the logic, under this 

### A/B or Split testing



### Shadow traffic