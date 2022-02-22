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

### The choices for building a site 

The three main approaches to building a site I considered for the site were: "Server-side Rendering" (SSR), "Client-side Rendering" (CSR) and "Static Site Generation" (SSG). 

Comparing these there are two factors that come into play, where the page is built and how often it is built. 

SSR means a page will be rendered on the server each time there is a request, great as pages not requested are not rendered but potentially wasteful building the same identical page over and over again.

CSR means after a request is made by the user, a shell is sent down and then the client fetches the data and builds the page on the client machine.

### The third factor

There is a third factor





SSR the html is built on the server when there is a request.  

CSR the html is built on the client once the client has recieved a shell from the server and requests data required to build the page. 

SSG the html is built on the build server ready to be deployed.





### The third factor

There is a third factor to think of and that is caching. 

