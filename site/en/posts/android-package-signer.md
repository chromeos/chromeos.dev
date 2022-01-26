---
title: Introducing Android Package Signer Library
metadesc: Bringing Android package signing to the browser.
tags:
  - technical
authors:
  - nohe
date: 2022-01-26
---

# Introducing Android Package Signer Library

# What is it and why did we build it?

The Android Package Signer library is a JavaScript library that allows web developers to generate signing keys and use those signing keys in the browser to sign Android packages. This library was built so anyone who runs app building as a service can prevent asking their user to transfer credentials to a third party service. This is part of our advice we provide in regards to [keeping signing keys secure](https://developer.android.com/studio/publish/app-signing#secure_key). This package also helps remove a dependency on Java for developers looking to sign their pre-built unsigned Android packages.

# Android package signer and bubblewrap

[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) is a project created to help web developers package their progressive web apps for distribution on Google Play. Lots of third parties have used the bubblewrap project to create their own app bundling service. The drawback to this was that users were handing over their android signing keys and passwords when creating a new project which users were unaware if the servers that they were sending their credentials to were storing their keys or potentially leaking their keys. Having a leaked key could allow a malicious party to impersonate the developer and release malicious packages in place of the android packages the developer originally intended to release.

# Where can I find this tool and how can I use it?

For the latest information on this tool, please see our [GitHub repository](https://github.com/chromeos/android-package-sign-js). To add the package to your project, call `npm i @chromeos/android-package-signer` to add to your project. From there, you can call

```
const packageSigner = new PackageSigner(password: string, alias: string = 'android');
```

This allows you to generate a class that can both generate a key and then later reuse that key to sign a package. For generating a key, all that is needed from the class is a DName object. The structure of the DName object we have written below with the signature for generating the key listed below it.

```
export interface DName {
  commonName: string;
  organizationName: string;
  organizationUnit: string;
  countryCode: string;
}

async generateKey(dname: DName): Promise<string>;
```

The password is a string and should be a minimum of six characters long. This will protect your keystore, so the longer the password, the better. The response from the generateKey function is a base64-encoded der formatted PKCS12 keystore.

For signing the Android packages, we provide this function signature:

```
async signPackage(
    zipBlob: File,
    base64DerKey: string | undefined = undefined,
    creator: string = `Web Package Signer (${VERSION})`,
  ): Promise<string>;
```

`signPackage` signs a zip file that is read into the system and returns a base64 encoded zip file which the user can write to disk. The base64DerKey can either be used from the previous step or can be read from disk. The creator field is optional since by default it uses this package as the creator string.

Please install the package and let us know what you think!
