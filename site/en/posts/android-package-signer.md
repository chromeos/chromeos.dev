---
title: Introducing Android Package Signer
metadesc: Learn about signing Android packages client side in your browser with this new library.
tags:
  - technical
authors:
  - nohe
date: 2022-01-26
---

The Android Package Signer library is a new open-source JavaScript library that allows web developers to both generate signing keys and use signing keys to sign Android packages, all entirely in browser. It's designed to allow anyone who runs app building as a service to do so without requiring users to upload their credentials, an important part of [keeping signing keys secure](https://developer.android.com/studio/publish/app-signing#secure_key). As a bonus, this package also removes a dependency on Java for developers looking to sign their pre-built unsigned Android packages.

## Android Package Signer and Bubblewrap

[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) is a project created to help web developers package their Progressive Web Apps for distribution on Google Play that and has been used to be the foundation of app bundling services. Often, though, this meant users were handing over the Android signing keys and password when creating a new project without knowing if they were being stored or potentially leaked. Having a leaked key could allow a malicious party to impersonate a developer and release harmful package updates that would otherwise appear to be legitimate.

## Installation and Usage

The [Android Package Signer repository](https://github.com/chromeos/android-package-sign-js) is the best place to go to keep up-to-date with the package.

To add Android Package Signer to your project, first install it from NPM:

````bash {title="bash" .code-figure}
npm i @chromeos/android-package-signer
``` From there, require it in your project and initialize it:

```typescript {title="Typescript" .code-figure}
import { PackageSigner } from 'android-package-signer';
const packageSigner = new PackageSigner(password: string, alias: string = 'android');
````

The password is a string and should be a minimum of six characters long. This will protect your keystore, so the longer the password, the better.

This will instantiate a class that can be used to generate a key and sign a package with a key. To generate a key, pass the class's `generateKey` method a DName object, structured below.

```typescript {title="Typescript" .code-figure}
export interface DName {
  commonName: string;
  organizationName: string;
  organizationUnit: string;
  countryCode: string;
}

// In your code
import { PackageSigner } from '@chromeos/android-package-signer';
async function keyGen(): Promise<string> {
  const packageSigner = new PackageSigner(password, alias);
  const base64Der = await packageSigner.generateKey({
    commonName: 'Alexander Nohe',
    organizationName: 'Google, Inc',
    organizationUnit: 'DevRel',
    countryCode: 'US',
  });

  // To download the keys.
  const downloadElement: HTMLAnchorElement = document.querySelector('#key-gen-results');
  downloadElement.href = base64Der;
  downloadElement.download = 'generatedKey.p12';
  downloadElement.innerText = 'Download Generated Key';
}
```

The response from the generateKey function is a base64-encoded der formatted PKCS12 keystore. To save this keystore to a file, download the base64Der string contents to a file. In the above example we use an anchor element with a href attribute containing the base64 encoded keystore.

For signing the Android packages, using the following should be used:

```typescript {title="Typescript" .code-figure}
import { PackageSigner } from '@chromeos/android-package-signer';

function loadStoredKeystore(): string {
  // returns a base64 encoded keystore that was previously loaded
}

async function signBundle(): Promise<string> {
  const packageSigner = new PackageSigner(password, alias);
  let fileHandle;
  [fileHandle] = await window.showOpenFilePicker();
  const zipBlob = await fileHandle.getFile();
  const creator = '0.1.0 (Android App Signer JS)';
  const p12b64Der = loadStoredKeystore();
  await packageSigner.signPackage(zipBlob, p12b64Der, creator);
}
```

`signPackage` signs and zipaligns your android package returning a base64 encoded zip file which can be downloaded and distributed to your favorite Android application stores.

Please install the package and let us know what you think!
