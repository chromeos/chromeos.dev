---
title: 'Bluetooth Microphone Super Resolution: Better NBS sound quality through machine learning'
metadesc: 'How we improved Bluetooth microphone audio on older Chromebooks using AI/ML upscaling.'
tags:
  - foundations
  - announcement
  - product news
  - technical
  - input devices
authors:
  - cranelwong
  - paulhsia
  - penli
  - marcotagliasacchi
  - jimmychengyichiang
date: 2024-03-22
---

Convenient and well-supported, Bluetooth microphones are a popular choice for Chromebook users. However, the audio quality of Bluetooth microphones is often limited when using [narrow bandwidth speech](https://www.bluetooth.com/specifications/specs/hands-free-profile-1-8/) (NBS) codecs. Audio quality is influenced by several factors, one of which is the sampling rate. Bluetooth NBS transmission limits the sampling rate to 8 kHz, limiting the maximum audio frequency that it can encode to 4 kHz (see [Nyquist-Shannon sampling theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem)).

Even when we use good microphones, the sampling rate is still capped at 8 kHz when using NBS. The higher frequency components of the audio signal are lost, resulting in sound perceived as muffled or distorted. Because of hardware limitations, many older Chromebooks only support NBS. Thus, we wanted to improve Bluetooth audio quality on those devices through software.

Bluetooth Microphone Super Resolution aims to improve the audio quality of Bluetooth microphones on older Chromebooks. With ChromeOS 118, we introduced this feature as beta to older Chromebooks—devices with room for improvement regarding audio sampling rate.

Based on subjective evaluation results from US users, we found that 82.8% of 450 users preferred the processed audio clips.

%[(82.8%, Perceived improvement in sound quality)]

## Rebuilding audio quality with Machine Learning

To increase perceived audio quality on older hardware, we developed a new feature called "Bluetooth Microphone Super Resolution" It uses a machine learning model called Sound EnhAncement Network ([SEANet](https://arxiv.org/abs/2009.02095)), which adopts U-Net-based architecture and adversarial training, to reconstruct the high-frequency details from low-frequency audio signals, resulting in clearer and more natural-sounding audio from a Bluetooth NBS microphone.

!!! aside.message--note
**Note:** See the papers [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597) and [Generative Adversarial Nets](https://arxiv.org/pdf/1406.2661.pdf) for more details on SEANet, U-Net, and adversarial training.
!!!

To train the model, we need paired audio signals: audio from a Bluetooth NBS connection and high-quality target audio. We used software simulation to create audio signals that resembled what we would get from a Bluetooth NBS connection. The Continuously Variable Slope Delta (CVSD) codec, used in Bluetooth NBS connection, was incorporated into the simulation process to model the distribution of audio signals. In addition to removing the high-frequency components in the audio signal, we also suppressed the frequency components below 510 Hz in a stochastic manner to mimic the recommended Bluetooth frequency mask.

The final processing steps were:

1.  **Augmentation**: The input audio signal was augmented with random cropping, gain adjustment, band-pass filtering, and Gaussian noise.
1.  **Downsampling**: Audio was down-sampled to 8 kHz; the sampling rate of narrow-band speech.
1.  **Encoding and decoding**: The CVSD codec was added to make the audio signal distribution similar to that from narrow-band speech connection.
1.  **Upsampling**: Finally, the audio signal was upsampled to the target sampling rate before feeding into the model. Note that the upsampling here does not reconstruct high-frequency components; instead, it fills the high-frequency bins with aliases of low-frequency bins or simply with zeros.

We also collected audio samples from different Bluetooth microphones for model evaluation, selecting models based on the evaluation results.

## Results preferred by over 80% of users

We presented users with two versions of an audio clip recorded on Airpods: one before processing and one after processing. Our model was able to reconstruct high frequency components generating a sound quality preferred by 82.8% of 450 users.

Listen to the below before and after demo samples processed by the model.

<table>
  <thead>
    <tr>
      <th>Audio signal from Bluetooth NBS connections</th>
      <th>Audio signal processed by the model</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <figure>
            <a href="https://firebasestorage.googleapis.com/v0/b/cros-staging.appspot.com/o/posts%2Fbluetooth-nbs%2Fnbs_input_4_airpods_pro.wav?alt=media">nbs_input_4_airpods_pro.wav</a>
            <img src="ix://posts/bluetooth-nbs/Inline-2.png" alt="A spectrogram representing the unprocessed audio clip. The scale measures from 0 to 12 kHz, with heat colors presenting a spectrum from -80 dB to +0 dB. The spectrogram shows that the audio clip does not exceed 4 kHz.">
            <figcaption>From the spectrogram, we can see that the highest frequency is capped at 4 kHz.</figcaption>
        </figure>
        </td>
        <td>
        <figure>
            <a href="https://firebasestorage.googleapis.com/v0/b/cros-staging.appspot.com/o/posts%2Fbluetooth-nbs%2Fnbs_processed_4_airpods_pro.wav?alt=media">nbs_processed_airpods_pro.wav</a>
        <img src="ix://posts/bluetooth-nbs/Inline-3.png" alt="A spectrogram representing the processed audio clip. The scale measures from 0 to 12 kHz, with heat colors presenting a spectrum from -80 dB to +0 dB. The spectrogram shows that the audio clip now peaks up to 12 kHz.">
        <figcaption>The highest frequency becomes 12 kHz and some of the higher frequency components are reconstructed.</figcaption>
        </figure>
    </td>
    </tr>
  </tbody>
</table>

## Try it out

Bluetooth Microphone Super Resolution is available on older Chromebooks that only support NBS connections and have sufficient computing resources.

The feature is behind an experimental flag as of ChromeOS 122. If switched on, it will take effect whenever a Bluetooth NBS microphone is used.

To use the feature:

1.  Start Chrome, type `chrome://flags#audio-hfp-mic-sr-toggle` in the search bar, and press [[enter]].
    ![A Chrome browser window with 'chrome://flags#audio-hfp-mic-sr-toggle' typed into the search bar.](ix://posts/bluetooth-nbs/Inline-4.png)

2.  Set the `audio-hfp-mic-sr-toggle` flag to `Enabled` and click **Restart**.
    ![A settings page titled 'Experiments' with two tabs: Available and Unavailable. The Available tab is active. Below the Available tab is a setting named: Audio toggle for hfp-mic-sr. This setting has been enabled.](ix://posts/bluetooth-nbs/Inline-5.png)

3.  In **Settings** > **Audio**, click **Bluetooth Super Resolution** to toggle the feature on.
    ![The Audio settings page for Chrome. At the bottom of the page is a setting named: Bluetooth Super Resolution. It is enabled.](ix://posts/bluetooth-nbs/Inline-6.png)

You are now ready to use your enhanced Bluetooth microphone with any audio recording apps on your device, such as Meet.

Because machine learning models have significant performance requirements, we've focused our efforts thus far on a set of KabyLake devices with Core i3/i5/i7 CPUs. Support for this feature includes the following devices:

- Pixelbook
- Acer Chromebook 13 / Spin 13
- [Google Pixel Slate](https://support.google.com/pixelslate/answer/9131383?hl=en)
- [ASUS Chromebook Flip C434](https://www.asus.com/us/Commercial-Laptops/ASUS-Chromebook-Flip-C434TA/)
- [Lenovo Chromebook C340-15](https://www.lenovo.com/us/en/laptops/lenovo/student-chromebooks/Lenovo-Chromebook-C340-15/p/88LGCC31290)
- Dell Inspiron 14 2-in-1 Model 7486
- Yoga Chromebook C630
- ASUS Chromebook C425
- ASUS Chromebook Flip C433TA
