---
title: Linux setup
metadesc: Instructions to enable Linux, aka Crostini,  on Chrome OS for development.
date: 2020-06-10
weight: -7
---

It's easy to set up Linux, aka Crostini, on Chrome OS.
First, go to Chrome Settings and “turn on” Linux:

#1[Enable Linux from Chrome settings.](/images/develop/linux/getting-started/enable-linux.png)

Chrome OS will automatically download the necessary files and set up your Linux container. When it finishes, you'll see a new Terminal app and an open terminal window. We recommend pinning the application to your shelf as a handy way to access your Linux container in the future. Right-click on the Terminal app icon and choose "Pin".

#2[Pinning the Terminal app to the shelf.](/images/develop/linux/getting-started/pin-to-shelf.png)

Now your Debian Linux installation is ready to go! A good first thing to do is update the [APT](https://wiki.debian.org/Apt) repository index and install. APT is a command-line package manager for Debian, and keeping it up to date will ensure you're always installing the latest versions of tools in its repository:

```bash
sudo apt update
```

You're now set up and ready to use the Linux container!

## Sharing files to Linux

A simple way to access files in the Linux container is to make a copy. To do so, open the Files app, drag whatever directory or file you want to access, and drop it in “Linux files”.

![Drag and drop files or directories to "Linux files".](/images/develop/linux/getting-started/copy-to-linux.png)

If you don't want to make a copy, you can share directories, such as a project folder, from outside the Linux container with the Linux container. To do so:

1. Ensure that Linux is set up.
2. Open the Chrome OS Files app and find the directory you want to share.
3. Right-click on the folder you want to share and select the “Share with Linux” option.

![Right click on a directory to select "Share with Linux" option.](/images/develop/linux/getting-started/share-with-linux.png)

!!! aside.message--note
**Note:** When you right-click on a folder that's already shared, you will see a “Manage Linux sharing” option instead of "Share with Linux". This option will launch the Chrome OS Settings menu which is located at : “Settings” -> “Linux” -> “Linux” -> “Manage shared folders”.
!!!

4. Within the Linux container, these shared folders will be located at /mnt/chromeos. From the Terminal app run `cd /mnt/chromeos`.

## Installing Linux apps and packages

Now that Linux is set up, it's time to install your first apps! While you can always install apps and tools in the terminal via `sudo apt install`, Linux on Chrome OS supports double-click to install for `.deb` files (Debian software package) in the Files app, allowing you to download and install apps like you're used to. Visual Studio Code, for instance, offers a [`.deb`](https://code.visualstudio.com/download) package, that you can try this with. Once downloaded and double-clicked, you'll see a prompt with information about the app you're looking to install, along with the option to install the app!

#3[Install prompt for VS Code.](/images/develop/linux/getting-started/deb-install.jpg)

### Visual package management

If you prefer to find, install, and manage applications and tools through an application with a graphic user interface, you can install [GNOME's Software](https://wiki.gnome.org/Apps/Software) app and [PackageKit](https://www.freedesktop.org/software/PackageKit/). To do so, run the following:

```bash
sudo apt install -y gnome-software gnome-packagekit && \
sudo apt update
```

Installing these will add two new applications, [Software](#figure-4), which provides an app-store like interface for finding applications that can be installed from multiple sources, and [Package](#figure-5) and Package Update, which can be used for finding and updating applications, tools, fonts, and lots of other packages.

#4[Software running on Chrome OS.](/images/develop/linux/getting-started/software.png)

#5[Package running on Chrome OS.](/images/develop/linux/getting-started/package.png)

### Restarting the Linux container

If you are troubleshooting an issue with Linux, it may be helpful to restart the container without restarting your whole Chromebook. To do so, right-click on the Terminal app in your shelf and click "Shut down Linux".

#6[Shutting down the Linux container.](/images/develop/linux/getting-started/shut-down.png)

Once shut down, the applications should show up in the launcher, and choosing one will start up your Linux container again.

## Security and permissions

Linux on Chrome OS runs inside a container, [sandboxing](https://support.google.com/chromebook/answer/3438631#sandboxing) it from other web pages, applications, and the operating system itself. However, all apps installed in the Linux container _share_ that same sandbox, meaning that they share the permissions of the Linux container, and they can affect each other.

For security reasons, many permissions, such as USB access or microphone access, aren’t shared by default. To ensure you have the correct permissions enabled, go to your device settings and enable them. As always practice appropriate caution with permissions and never enable more than you need. Whenever you're interacting with Linux on Chrome OS, be especially mindful of [user data in the container](/{{locale.code}}/linux/linux-on-chromeos-deep-dive#user-data-in-the-container).

## Backing up and restoring

Because Linux on Chrome OS runs inside a container, you can back up your environment and restore it; files, apps, and all. This allows you to set up your Linux environment once, then take it with you without needing to reconfigure it again! For detailed instructions on how to do so, see the Chromebook Help page on [backing up and restoring your Linux container](https://support.google.com/chromebook/answer/9592813)

## Troubleshooting

For more help enabling or troubleshooting, please read the Chromebook Help page on [setting up the Linux container](https://support.google.com/chromebook/answer/9145439?hl={{locale.code}}).
