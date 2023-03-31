---
title: Prepare a ChromeOS app for launch on Google Play
metadesc: Grow with the Google Play audience. Best practices and policies for launching a ChromeOS app on Google Play.
date: 2023-03-23
weight: -8
---

ChromeOS supports [Android Apps](https://chromeos.dev/en/android) and [Progressive Web Apps](https://chromeos.dev/en/publish/pwa-in-play), both of which can be discovered by users on Android and Chromebooks via Google Play. When you publish to Google Play, your app becomes available to billions—but it still has to be optimized for better reach.

When an app is properly optimized for ChromeOS, it can take advantage of the features that make Chromebook apps shine, such as large screens and keyboard support. Follow the [ChromeOS optimization guidelines](https://chromeos.dev/en/android/optimizing) to identify changes that may need to be made to your app to provide the best user experience.

Specifically:

- **[X86 architecture](https://chromeos.dev/en/games/optimizing-games-publishing):** Many ChromeOS devices use an x86 architecture, whereas most Android phones have ARM chipsets. Apps with Android NDK code have additional publishing considerations.
- **[Large screens](https://chromeos.dev/en/games/optimizing-games-windowing):** ChromeOS devices have generally larger screens than most Android devices—and can support external monitors. Follow our [design recommendations](https://chromeos.dev/en/android/design) for a better user experience on larger screens.
- **[Resizable windows](https://chromeos.dev/en/android/window-management):** On ChromeOS, users may resize and reposition their windows on-the-fly, and apps may transition from portrait to landscape based on position.
- **[Multiple input devices](https://chromeos.dev/en/games/handling-input-changes):** ChromeOS devices may use a touch interface, keyboard and mouse, or controller—and may [switch between input methods](https://chromeos.dev/en/games/handling-input-changes).

For the best user experience, don't just support the unique features of ChromeOS—use them to your advantage. Once you've optimized your app for ChromeOS devices, you can move on to testing and publishing.

## Test your app or game before launch

As with Android apps, ChromeOS apps may be run on a wide variety of platforms. Thorough testing is critical to launching the best possible app or game. Visit the resources below to learn more about testing for Google Play:

- **[Linting](https://chromeos.dev/en/android-environment/lint-rules-for-chromeos-in-android-studio):** automatically check your app's code for potential issues for ChromeOS.
- **[Internal testing](https://play.google.com/console/about/internal-testing/):** test entirely new apps or features, focusing on early stability and performance.
- **[Closed testing](https://play.google.com/console/about/closed-testing/):** test the app with a private community without impacting ratings or reviews.
- **[Open testing](https://play.google.com/console/about/opentesting/):** test publicly and/or with a larger group of users without impacting ratings or reviews.

Run beta tests across various devices to get critical feedback before launch, then "soft launch" to select audiences to confirm KPIs and build up public ratings.

Finally, launch worldwide with confidence—and fewer surprises.

## Prepare your app for launch

Before you publish your game, coordinate your plans and build interest. Use the following Google Play checklists to prepare for the launch:

- **[Launch checklist](https://play.google.com/console/about/guides/releasewithconfidence/):** Ensure the app or game is compliant with all Google Play policies and quality requirements.
- **[Localization checklist](https://play.google.com/console/about/guides/growyouraudience/):** Research languages, cultures, and preferences if launching in multiple geographies. Test the app separately in each locality in which it will launch.
- **[Price set-up checklist](https://support.google.com/googleplay/android-developer/answer/6334373?hl=en):** Set your app as paid or free. On the [App Pricing](https://admin.google.com/a/cpanel/google.com/ServiceNotAllowed?service=androiddeveloper&continue=https%3A%2F%2Fplay.google.com%2Fconsole%2Fdevelopers%2Fapp%2Fpaid-app) page, you can set local prices, use pricing templates for multiple items, and create sales and promotions.
- **[Pre-registration checklist](https://play.google.com/console/about/pre-registration/):** Create excitement and awareness of apps and games before you're launched.
- (Optional) Setup a **[YouTube channel](https://support.google.com/youtube/answer/1646861?hl=en):**
  - Create a [YouTube channel](https://support.google.com/youtube/answer/1646861?hl=en) to build a loyal audience and share and comment on the content. ‘
  - Upload [YouTube Shorts](https://support.google.com/youtube/answer/12779649?hl=en&co=GENIE.Platform%3DDesktop) to give viewers an easy way to digest content.

!!! aside.message--note
**Note:** App price can change from paid to free after launch. However, once the app has been offered for free (including under a testing track), the app can't be changed to paid. To charge for the app, create a new app with a new package name and set a price.
!!!

## Sample launch schedule

Keep your publishing on track with the below schedule. When creating your schedule, allow enough time for your app to go through review.

<table>
  <thead>
    <tr>
      <th>Week</th>
      <th>Task</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Review the best practices for publishing and releasing your app or game <a href="https://play.google.com/academy/courses/launch/">on Google Play</a>.</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Review The <a href="https://support.google.com/googleplay/android-developer/topic/9858052?hl=en">Play Console Policy Center</a> to make sure your app is compliant.</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Finalize the build of your app for ChromeOS and supported architectures.</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Begin testing your app in phases, including internal, closed, and open testing.</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Submit your app for review via <a href="https://support.google.com/googleplay/android-developer/answer/9859654">managed publishing</a>. A typical review will take approximately 7 business days. Please do not resubmit your app during the review cycle as it will reset the cycle.  </td>
    </tr>
    <tr>
      <td>11</td>
      <td>Check your submission to make sure it has been approved. </td>
    </tr>
    <tr>
      <td>12</td>
      <td>Once your app is approved, you will be able to publish it <a href="https://support.google.com/googleplay/android-developer/answer/9859654#:~:text=Step%203%3A%20Publish%20your%20app%20update">on your launch date</a>.</td>
    </tr>
  </tbody>
</table>

## Additional resources

Increase your chances of a successful launch by reading more about Google Play's policies and standards— and by learning more about the process of developing and optimizing for ChromeOS.

### Policy and compliance

Meet Google Play's policies and standards by following Google's [Developer Program Policies](https://support.google.com/googleplay/android-developer/topic/9858052?hl=en). The earlier you work to meet these specifications, the smoother your development and publishing process will be.

- **[Policy Coverage](https://support.google.com/googleplay/android-developer/answer/10146128?hl=en&ref_topic=9877468):** Details on Google Play's policy coverage and enforcement process. This includes how Google Play Protect, malware protection, and privacy alerts work to prevent malicious activity by apps.
- **[Privacy Policy](https://support.google.com/googleplay/android-developer/answer/10144311#safetysection):** All apps must post a privacy policy link within Play Console and the app itself. The privacy policy must disclose how the app accesses, collects, uses, and shares user data.
- **[User Data](https://support.google.com/googleplay/android-developer/answer/10144311#safetysection):** Google Play requires that developers be transparent in how their app handles user data, including access, collection, use, handling, and sharing the data from the app.
- **[Target API Level](https://support.google.com/googleplay/android-developer/answer/11926878):** If you want your app to run on Android devices, you must meet a target API level. All apps must meet a target API level of 30 or above (existing apps) or 31 or above (new apps).
- **[App Promotion](https://support.google.com/googleplay/android-developer/answer/9899004?hl=en&ref_topic=9877064):** Apps that directly or indirectly engage in, or benefit from promotion practices that are deceptive or harmful to users or the developer ecosystem violate the Developer Program Policies. Follow [these guidelines](https://services.google.com/fh/files/helpcenter/google_play_promotional_content_guidelines.pdf) to ensure the content is of high quality and delivers the best experience for the users.
- **[Apps for Children and Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en&ref_topic=9877766):** Apps designed specifically for children must participate in the Designed for Families program and must follow the Google Play Families Policy requirements. Only select more than one age group for your app's target audience if your app is designed for and is appropriate for users within the selected age group(s).
- **[Payments Policy](https://support.google.com/googleplay/android-developer/answer/10281818?hl=en):** Google Play's billing system is required for developers offering in-app purchases of digital goods and services distributed on Google Play, and it must be used through [Billing Library version 4 or newer](https://developer.android.com/google/play/billing/deprecation-faq). Learn more about Google Play's Payments Policy on the [Policy Help Center page](https://support.google.com/googleplay/android-developer/answer/10281818#ucb&zippy=%2Ci-am-currently-offering-google-plays-billing-system-can-i-offer-google-plays-billing-system-alongside-an-alternative-billing-system).
- **[Play Console Policy Center](https://support.google.com/googleplay/android-developer/topic/9858052?hl=en):** The Play Console Policy Center contains all policies currently in effect—and the policy archive. Consult [Policy Deadlines](https://developer.android.com/distribute/play-policies) and [Policy Status](https://play.google.com/console/about/policystatus/) for more specific information.

### Tutorials and learning

Learn more about publishing on Google Play and developing for ChromeOS with these tutorials and resources.

- **[Google Play Console](https://play.google.com/console/about/):** a hub for best practices and relevant resources.
- **[List your Progressive Web App in Google Play](https://chromeos.dev/en/publish/pwa-in-play):** a guide to wrapping a Progressive Web App as an Android App for publishing in Google Play.
- **[Android Apps on ChromeOS:](https://chromeos.dev/en/android):** a guide to designing, building, optimizing, and publishing Android Apps on ChromeOS.
- **[Google Play Academy](https://play.google.com/academy/) (especially the [Prepare](https://play.google.com/academy/courses/prepare/) section):** short video-based courses covering quality, monetization, engagement, and other topics for developers at all stages of app development.
- **[Google Play Billing](https://developer.android.com/google/play/billing):** an overview of the service that enables sales of digital products and content.
- **[Pre-Launch Reports](https://play.google.com/console/about/pre-launchreports/):** reports that enable developers to spot issues before they affect users.
- **[The Google Play Developer Help Community](https://support.google.com/googleplay/android-developer/community?hl=en):** a forum for developers to raise questions.
- **[The Google Play Developer Newsletter](https://developer.android.com/newsletter/index.html?ref=inboxreads):** the latest developer news and tips to help developers succeed with Google Play, Android, and games.
- **[Android Developers Blog](https://android-developers.googleblog.com/):** the latest Android and Google Play news for app and game developers.
