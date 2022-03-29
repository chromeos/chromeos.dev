---
title: Web development
metadesc: How to set up your Chrome OS device for developing web apps and how to configure port forwarding to access them on other devices.
hero:
  image:
    top: ix://landings/heros/web-environment.svg
    bottom: ix://landings/heros/web-environment-small.svg
date: 2020-06-01
weight: -8
tags:
  - developer tools
---

<!-- prettier-ignore -->
*[IDE]: Integrated Development Environment
*[LAMP]: Abbreviation for a common PHP development stack
*[JAM]: Abbreviation for a common Node.js development stack

Developing web apps on Chrome OS is almost the same as developing web apps on any other operating system. Any code editor, IDE, tool, or language that will run in Linux runs on Chrome OS. Chrome OS even has features specifically designed to aid in web development, too.

## Code editors and IDEs

Any code editor or IDE that will run on Linux will run on Chrome OS. [Linux on Chrome OS](/{{locale.code}}/linux) is a [Debian](https://www.debian.org/) install, and code editors and IDEs for Debian are usually installed in one of three ways. Visual Studio Code, for instance, [provides a`.deb`file](https://code.visualstudio.com/#alt-downloads) that you can double-click to install from the Files app. IntelliJ, on the other hand, [has you download a tar file](https://www.jetbrains.com/idea/download/#section=linux) containing its executable that you can extract into your Linux container and run. Sublime Text has you [install it from`apt`](https://www.sublimetext.com/docs/3/linux_repositories.html#apt).

## Languages and tools

No matter if your stack is JAM or LAMP or if you’re a Python or a Gopher, if it’ll run on Linux, you can run it on Chrome OS. When installing languages and tools, we recommend using language version managers to both simplify the install and upgrade process and allow you to swap between multiple versions of the language for each project you work on. [RVM](https://rvm.io/), the Ruby version manager, is one of the oldest and best examples of a language version manager, allowing you to manage both Ruby and dependencies (called gems) for multiple versions of Ruby. Most other languages have similar version managers. This site, built on Node.js, supports [Volta](https://volta.sh/) and [NVM](http://nvm.sh/) for Node version management. If you prefer your language and tool management via Docker you can do that, too.

## Localhost tunneling and port forwarding

While Linux for Chrome OS is running inside a VM, servers running in the Linux environment are automatically forwarded to the main Chrome browser. This means that that you can use all of the [Chrome tools you love](#the-chrome-you-love) to develop your web apps and not have to worry about figuring out how to test what you’re building. Sometimes, though, you want to share a port off of your computer to other devices on the same network. When you need to do that, read how to [set up port-forwarding](/{{locale.code}}/web-environment/port-forwarding).

## The Chrome you love

All of the development tools you know and love from Chrome are on Chrome OS, too. Because [Linux ports are forward to Chrome](/{{locale.code}}/web-environment/port-forwarding), you can use all of the power of [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools), including [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to develop your apps with, along with great Chrome extensions, like [Accessibility Insights of Web](https://accessibilityinsights.io/docs/en/web/overview). To do so, start up your web server in the Linux environment and navigate to `localhost:PORT` (replacing `PORT` with your server’s port number) in your main Chrome browser. You can also use `penguin.linux.test` as a fallback for `localhost` if needed.

### More than Chrome

Developing web apps on Chrome OS has a super power that no other desktop operating system can boast, platform-level support for real mobile browsers. When developing web apps on Chrome OS, you are not tied to just testing in Chrome. With the Google Play store, you can install real mobile browsers and use them to test your web app. You can even install other full desktop browsers that run on Linux, and test there too. While Chrome OS users will use your web app in Chrome, we understand the importance of building web applications that reach everyone, regardless of browser choice.

Testing your web app in other Linux browsers is fairly straightforward: install those browsers per their Linux installation instructions and use them as normal, complete with access to `localhost`. Browsers installed through the Google Play store, however, need to be treated as if they were on an external device. To have your server available in those browsers, find your IP address by running `hostname -I` in the Terminal and use the resulting IP address in place of `localhost` when navigating, remembering to include the port, too.
