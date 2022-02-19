---
title: Cloudflare workers
---

- Side project
 - Lot of pages
 - dont change very often
- Static site generation isn't a great fit
 - Data added regularly
 - Changes less regularly
- Solution Caching

I have a side-project for a content site that has more than a thousand individual pages. Most of these pages once created will hardly ever change, but at the same time these pages are complex with multiple data sources and can take some time to build.

### How to build a page

There are three main approaches to building a site. "Server-side Rendering", "Client-side Rendering" and "Static Site Generation". At its simplist the difference between each approach is where the HTML for a page is built; on the server when there is a request; on the client once the client has recieved a shell from the server; or, on the build server when the site is built and deployed.

Each have there advantages and disadvantages. 

Comparing these there are two factors that come into play, where the page is built and how often it is built.

### The third factor

There is a third factor to think of and that is caching. 

