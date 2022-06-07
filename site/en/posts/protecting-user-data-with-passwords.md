---
title: Protecting user data in Chrome OS with passwords
metadesc: How the oldest user authentication method, passwords, work with special security hardware to secure user data, and the considerations taken into account to design that process.
tags:
  - foundations
  - security
  - technical
authors:
  - apronin
date: 2022-05-03
---

Providing a secure environment for our users is one of the [core principles](https://www.chromium.org/developers/core-principles/) of Chrome OS. That starts with making sure user data stored on a Chromebook cannot be accessed by others, even if the Chromebook is lost or stolen.

To achieve that, Chrome OS encrypts the stored user data and only produces the decryption key when the user signs into the device. The OS supports several authentication methods for sign-in, including providing a password or using a smart card, with more methods planned to be added in the future.

Let’s dive into the original authentication method Chrome OS supports, and has supported since its very first day: password-based authentication. Password-based authentication has gone through several modifications since it was launched to add new features and protections from new types of attacks. Its current implementation, though based on the same principles, is completely different from what came out with the first revision of the OS. Though the method is planned to be replaced with a unified approach used for passwords and PINs in the future, it has endured because it works with third-party security modules that don't support Google-specific protocols.

Password-based authentication takes the user’s password and, through a series of steps, generates a decryption key. The resulting key is called the [Vault Keyset Key (VKK)](https://chromium.googlesource.com/chromiumos/platform2/+/refs/heads/main/cryptohome/docs/decrypt.md#VKK-current_to-be-deprecated), and it is used to unlock user secrets, including the key to the user's on-disk data.

## Protection from brute force attacks

An important type of attack for password-based authentication is guessing the password by brute force. Brute force attacks require time, so they usually start with an attacker getting unlimited access to the encrypted user data by stealing a device or copying the data out of a device after gaining temporary access. The attacker then goes through a list of possible passwords until one of them works. This attack significantly benefits from the ability to parallelize these password guessing attempts when multiple cores try different passwords in parallel.

This attack is not exclusive to password-based authentication. However, the methods used for protecting from this kind of attack depend on the characteristics of the authentication method used. For example, PINs consisting of a few decimal digits are even more susceptible to brute force because the number of potential combinations is small. With PINs, Chrome OS relies on limiting the number of failed attempts before it completely locks the ability to sign-in with the PIN until a different credential, like password, is provided. This attempt-limiting mechanism relies on custom features provided by Titan security modules used in modern Chromebooks.

With passwords, a different approach, which can work even with older, pre [Titan C](https://showcase.withgoogle.com/titan-c/) era Chromebooks, was originally taken. Passwords, especially good passwords, have higher [entropy](https://en.wikipedia.org/wiki/Password_strength) than PINs. Instead of limiting the number of attempts, Chrome OS ties decryption key generation to the hardware of a specific device and limits the rate at which this key generation can be performed. To go through all possible password combinations for the brute force attack, attackers would have to do it on the device where the user data is stored, and can't do it faster than at the rate enforced by the hardware.

## Hardware-backed steps in authentication

To tie decryption key generation to a specific machine, Chrome OS requires special security modules to be present in each Chromebook: [Trusted Platform Modules](https://trustedcomputinggroup.org/work-groups/trusted-platform-module/) (or TPMs) for older devices and [Titan C](https://showcase.withgoogle.com/titan-c/) chips for all modern Chromebooks. Password authentication process includes the following hardware-backed steps that use those security modules:

- **Rate-limiting:** a chain of one or more raw decrypt operations designed to take a certain minimum amount of time, allowing the security module to limit the number of the attempts in a given period of time. Each raw decrypt operation uses a security-module-backed asymmetric key pair: cryptographic key, consisting of a non-secret public part that is known to Chrome OS and a private part that is only known to the security module and is never exposed to the rest of the world. These operations are chosen to always succeed and produce some output for every possible input. They can only be performed on a specific device as the key pair is unique for the security module installed in it. When a single operation is not slow enough to impose a sufficient minimum time required to go through all possible combinations, multiple decrypt operations are chained together.
- **Unsealing:** decryption of the stored data. Unsealing relies on the ability of security modules to encrypt data stored outside of it with a key known only to the security module, and perform decryption only if the right password, called authorization value, is provided. Additional policies, like not accepting the password if the device is in a wrong state, can also be applied here, but these details are out of scope for this post.

## Password authentication flow

The diagram below outlines the steps of the password authentication flow. Some small details that don't affect the overall logic are omitted for clarity.

![Diagram of data protection flow. Detailed description follows.](ix://posts/protecting-user-data-with-passwords/flow-diagram.svg)

1. Sign-in UI asks the user for the password, hashes it, and passes it to Chrome OS.
2. The first key-derivation step (KDF1) takes the password hash and user-specific salt stored on disk and uses the [Scrypt](https://en.wikipedia.org/wiki/Scrypt) algorithm to produce binary data which is split into two parts: an input blob for hardware-backed steps (SPassBlob) and software material for VKK generation (SVKKM). This step always produces some SPassBlob and SVKKM for each possible hash value: correct values for the right password, incorrect for a wrong password.
3. The SPassBlob is sent through the rate-limiting step, described in the previous section, which is guaranteed to take at least some minimum amount of time and always succeeds regardless of input.
4. The result of the rate-limiting step is used as the authorization value in the unsealing step, as described in the previous section. This step takes an encrypted value stored from disk and, if the authorization value is correct, decrypts it to produce the hardware material for VKK generation (HVKKM).
5. The SVKKM and HVKKM are concatenated and used as an input for a hash-based key derivation step (KDF2), which produces Vault Keyset Key (VKK).
6. The result of this flow, [Vault Keyset Key (VKK)](https://chromium.googlesource.com/chromiumos/platform2/+/refs/heads/main/cryptohome/docs/decrypt.md#VKK-current_to-be-deprecated), is used to decrypt user secrets, including the key to on-disk user data.

## Who guards the guardians?

Chrome OS employs security modules to make sure that passwords are not vulnerable to brute force attacks. Security modules are designed to keep their private keys and other secrets protected by them safe against software and physical attacks, are rigorously tested, and often have to pass independent certification. However, following the [defense in depth principle](<https://en.wikipedia.org/wiki/Defense_in_depth_(computing)>), Chrome OS is designed to minimize the impact even in the situations when a vulnerability is discovered in a security module.

Such a vulnerability might lead to security modules "leaking" the results of their steps, or using weaker implementation of asymmetric keys, which simplify cracking the private key to bypass the rate-limiting hardware-backed step. One real-life example of such vulnerability is the "[Return of the Coppersmith Attack](https://en.wikipedia.org/wiki/ROCA_vulnerability)", which affected some security modules in 2017.

To prevent such vulnerabilities from allowing attackers to recover user secrets based on just observing the security module communications or examining the data stored on disk, Chrome OS uses more than the result of hardware-backed steps, HVKKM, to generate the Vault Keyset Key. A correct SVKKM, which is derived from user password and is not exposed to the security module, is required to produce the right VKK. Thus, both the right password and the specific security module instance are required to unlock user data.

These additional software layers reduce the threat of [supply-chain attacks](https://en.wikipedia.org/wiki/Supply_chain_attack) targeting security modules and complicate brute-force attacks. But they don't provide absolute protection. If the hardware security module is compromised and leaks HVKKM, generating VKK from a password is no longer tied to a specific device. Attackers then can try all possible password combinations on their own hardware, parallelizing the process to brute-force the password in a reasonable time. This provides another argument for strong passwords. Using long passwords that include lower and uppercase letters, digits, and special symbols increases the number of combinations attackers need to go through to find the right sequence, and thus the time and cost of the attack.
