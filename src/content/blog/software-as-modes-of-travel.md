---
title: Software Development as Modes of Travel
description: Exploring how different software approaches mirror the trade-offs between rockets, cars, and trains
tags:
  - software-engineering
  - methodology
  - agile
---

There's something revealing about how we choose to move through space that mirrors how we build software. The preparation, feedback, and adaptability required for each mode of travel maps surprisingly well onto different software development approaches.

## The Rocket: Precision Through Preparation

A rocket launch is the ultimate expression of "measure twice, cut once." Every variable must be calculated in advance. The trajectory is computed to exacting precision. Fuel loads, atmospheric conditions, orbital mechanics - all accounted for before ignition. Once you light that fuse, course correction becomes exponentially more expensive.

This is waterfall development in its purest form. Extensive requirements gathering. Detailed design documents. Architecture reviews. The promise is that with enough upfront planning, you can land exactly where you intended. And when the destination is known, stable, and precisely defined - like putting a satellite in geosynchronous orbit - this approach works remarkably well.

The catch? You need to know exactly where you're going before you start. Get the requirements wrong, and you've launched a multi-million dollar mission to the wrong coordinates. Want to change course mid-flight? That'll require more fuel than you have on board.

## The Car: Constant Correction

Driving is the opposite philosophy. You have a general direction, but the route emerges through continuous feedback. Road closed? Take a detour. Better scenery this way? Change course. Unexpected traffic? Adapt in real-time.

This is iterative development. You're constantly sensing your environment and adjusting. The steering wheel is in your hands, making hundreds of micro-corrections every minute. You can't travel at rocket speeds - that level of feedback and adjustment has a natural velocity limit. But you can handle uncertainty. If you're not quite sure where you're going, or if the destination itself is moving, this is the only viable approach.

The software equivalent is sprints, retrospectives, continuous integration. You're never more than a few weeks from being able to change direction entirely. The cost is that you can't go as fast in a straight line - all that feedback gathering and course correction takes time.

## The Train: Automated Repetition

And then there's the train. Someone else laid the tracks. The route is predetermined, optimized, and repeatable. You can achieve remarkable efficiency once the infrastructure is in place. No driver needed to make steering decisions - the path is encoded in the rails themselves.

This is automation, CI/CD pipelines, infrastructure as code. The journey from commit to production is a well-worn path. You're not discovering anything new here - that's not the point. The value is in repeatability and efficiency. Deploy a dozen times a day, all following the same reliable route.

But discovery requires leaving the rails. You can't explore new territory on train tracks. The infrastructure investment makes sense when you're making the same journey repeatedly, not when you're still figuring out where you need to go.

## Choosing Your Vehicle

The uncomfortable truth is that you need all three approaches at different times, sometimes even within the same project.

Building a regulated financial system with clear compliance requirements? That's rocket territory. The destination is defined by law. Get it wrong and you don't just miss your orbit - you face regulatory consequences.

Early-stage startup trying to find product-market fit? Get in the car. You need the ability to change direction weekly based on user feedback. Rocket-level planning would be wasteful when you're still figuring out where you're going.

Deploying the same application across hundreds of environments? Lay the tracks. Automating the known and repeatable frees your team to focus on the unknown.

## The Meta-Level Question

Perhaps the real skill isn't mastering any one mode of travel, but knowing which one you're on at any given moment. Are you preparing for a one-shot launch, steering through unknown territory, or running on rails you've already laid?

The danger is bringing rocket-level planning to a road trip, or trying to lay train tracks when you haven't decided on the destination yet. Or worse, not realizing that you've unconsciously committed to one approach when another would serve you better.

Software development, like travel, is about getting from here to there. How you make that journey matters less than whether your chosen mode matches the territory you're crossing.
