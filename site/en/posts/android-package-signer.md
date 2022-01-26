---
title: Introducing Android Package Signer
metadesc: Bringing Android package signing to the browser.
tags:
  - technical
authors:
  - nohe
date: 2022-01-26
---

The Android Package Signer library is a new open-source JavaScript library that allows web developers to both generate signing keys and use signing keys to sign Android packages, all entirely in browser. It's design to allow anyone who runs app building as a service to do so without requiring users to upload their credentials, and important part of [keeping signing keys secure](https://developer.android.com/studio/publish/app-signing#secure_key). As a bonus, this package also removes a dependency on Java for developers looking to sign their pre-built unsigned Android packages.

## Android Package Signer and Bubblewrap

[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) is a project created to help web developers package their Progressive Web Apps for distribution on Google Play that a has been used to create as the foundation of app bundling services. Often, though, this meant users were handing over the Android signing keys and password when creating a new project without knowing if they were being stored or potentially leaked. Having a leaked key could allow a malicious party to impersonate a developer and release harmful package updates that would otherwise appear to be legitimate.

## Installation and Usage

The [Android Package Signer repository](https://github.com/chromeos/android-package-sign-js) is the best place to go to keep up-to-date with the package.

To add Android Package Signer to your project, first install it from NPM:

```bash {title="bash" .code-figure}
npm i @chromeos/android-package-signer
``` From there, require it in your project and initialize it:

```typescript {title="Typescript" .code-figure}
import { PackageSigner } from 'android-package-signer';
const packageSigner = new PackageSigner(password: string, alias: string = 'android');
```

This will instantiate a class that can be used to generate a key and sign a package with a key. To generate a key, pass the class's `generateKey` method a DName object, structured below.

```typescript {title="Typescript" .code-figure}
export interface DName {
  commonName: string;
  organizationName: string;
  organizationUnit: string;
  countryCode: string;
}

// In your code
await packageSigner.generateKey(dname: DName): Promise<string>;
```

The password is a string and should be a minimum of six characters long. This will protect your keystore, so the longer the password, the better. The response from the generateKey function is a base64-encoded der formatted PKCS12 keystore.

For signing the Android packages, we provide this function signature:

```typescript {title="Typescript" .code-figure}
async signPackage(
    zipBlob: File,
    base64DerKey: string | undefined = undefined,
    creator: string = `Web Package Signer (${VERSION})`,
  ): Promise<string>;
```

`signPackage` signs a zip file that is read into the system and returns a base64 encoded zip file which the user can write to disk. The base64DerKey can either be used from the previous step or can be read from disk. The creator field is optional since by default it uses this package as the creator string.

Please install the package and let us know what you think!
