---
title: ChromeOS lint rules in Android Studio
metadesc: Use lint rules in Android Studio to enhance the experience of building 
for large screens and ChromeOS.
tags:
  - android
  - large screens
authors: 
  - jhale
date: 2022-12-23
---

At ChromeOS, we are committed to enhancing developer tools and frameworks that
enable Android app developers to seamlessly optimize their apps for Chromebooks.
In doing so, we need to explore ways to bring impactful tool sets to developers
to enhance the experience of building for large screens and ChromeOS.

## What are lint rules?

Linting is an automated checking of your source code for various programmatic
and stylistic errors such as correctness, security, performance, usability,
accessibility, and internationalization. A lint rule is the code that backs any
individual potential error. Android Studio has a built in lint tool that
notifies developers of any errors and the severity of those errors.

For more information on lint rules in your Android Studio environment, refer to
the documentation on
[improving your code with lint checks](https://developer.android.com/studio/write/lint).

## Linting for large screen testing

One of the largest challenges we face on ChromeOS is that the vast majority of
app developers are not aware that their app is automatically deployed to the
ChromeOS Play Store. As such, the normal development and testing processes of
many apps omit testing on large screens or ChromeOS. As a result, the overall
app experience on these devices will trail behind their phone counterparts, and
users on those platforms will suffer from a poor experience.

The goal of these initial lint rules is to start the process of bringing
ChromeOS and large screens to the forefront of app development, and start to
create a unified toolkit that developers can leverage easily to kickstart the
process of developing a great ChromeOS or other large screen application.

## How to test with lint rules

When you upgrade your development environment to Electric Eel or Flamingo
versions of Android Studio, you will get these lint rules for free. These lint
rules are enabled by default; if your application was violating these rules
previously you will be notified as soon as your application is done building and
the static analysis tools can be run.

Another way to test these is by launching your application on the Desktop
Emulator in Android Studio and seeing how your application performs in this
specialized environment. You can create a new Desktop emulator through the AVD
menus built into Android Studio.

![Android Virtual Device Creation for Desktop Emulator](ix:*.png)

## Feedback

The team is constantly looking to improve these tools and documentation
surrounding optimizations for large screens. A critical step in this process is
to give us feedback on the accuracy and usefulness of the lint rules that are
deployed in Android Studio.

You can do this by providing feedback for the rule. When the lint rule shows up
in Android Studio, click on "Provide feedback on this warning". You should be
taken to a dialog that looks similar to the one below. The more accurate and
descriptive the information given, the more we are able to iterate quickly on
making the appropriate changes.

![Provide Feedback Dialog in Android Studio](ix:*.png)

## What's next?

Optimizing for
[ChromeOS and Large Screen Guidance](https://developer.android.com/guide/topics/large-screens/get-started-with-large-screens)
will continue to evolve. We want to continue to improve our existing toolkits to
bring more awareness to developers early and often. 
We want developers to feel empowered to make large screen improvements for their
apps. Showcasing potential issues earlier in the development process is one way
to achieve this.

For further reading and a detailed recommendation on best practices for
ChromeOS and large screen guidance, refer to the
[large screen documentation](https://developer.android.com/guide/topics/large-screens/get-started-with-large-screens).