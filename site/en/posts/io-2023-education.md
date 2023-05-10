---
title: 'Google I/O: Building for education, 100+ million users'
metadesc: 'Connect with one of the largest audiences in the world: students. Build for education on ChromeOS.'
tags:
  - event
  - web
hero:
  youtube: feAahFti-BA
  alt: 'Google I/O talk on building for education, covering education trends, products, and deployment.'
authors:
  - hzou
  - joreilly

date: 2023-05-10
---

_Edited transcript of “Building for education: 100+ million users” talk at Google I/O 2023 by Helen Zou (Product Manager for ChromeOS) and James O’Reilly (Developer Relations Engineering Manager for ChromeOS)._

---

Think back to when you were in high school. If you're anything like me, you probably remember having a bunch of textbooks, each of which weighed a couple pounds. Homework was boring. I used to put Skittles at the end of each paragraph to get myself just to keep reading. And the curriculum was static—sometimes the only way to learn something was to read the same content over and over.

Now, if you step into many classrooms, you'll notice things have transformed. Those same textbooks are still there, but collecting dust in a corner. Every student has a Chromebook—and is using it to search, explore, collaborate, and learn. Students sing to their laptops for music class and program robots to race each other. Teachers explain topics with 3D models while students excitedly point to each other's screens.

Learning is fun, dynamic, and engaging. This is all possible because developers like yourselves are out there building great tools and leading the change.

## Education today

The role that devices play in education is so different from what it was before. For anyone who was in school over a decade or two ago, you might remember computer labs—where you'd go for some typing practice or maybe a test, but otherwise rely on textbooks and static content.

Or for those of you in school 10 years ago, you might remember metal carts that got wheeled around into different classrooms, and inside those carts were shared devices that you could borrow for a class period to do a research assignment or work on a paper.

It wasn't a very personalized experience, and it definitely didn't feel like it was your device.

Now, we see that in many countries like the US, Japan, and Sweden, schools have moved to a 1:1 model. What this means is that, in many schools in those countries, each student gets assigned a laptop, like a Chromebook, at the beginning of the year—and that laptop stays with them throughout all their classes and with them when they go home.

To get a more concrete example, Iet's hop over to Ben's school district in Illinois. Ben is the IT administrator. He has worked in education for over 20 years, and he's seen how tech has evolved from merely replacing paper with digital into redefining how to teach and learn.

Ben's district moved to 1:1 devices almost 10 years ago, because they saw an opportunity to make education more personalized and more equitable. Teachers are also trained to use tech to make learning more personal in the classroom.

If you visit one of the classes in Ben's district, you'll see students split up into smaller groups based on learning speeds and getting differentiated instruction. One group of students might be working on an immersive reading app to practice vocabulary. Another might be working on creating a commercial of a book using Google Slides, screencasting, and cartoon tools.

Finally, once the school day ends, these devices go home with the students, where they get to benefit from having access to a device with a keyboard at home for homework.

This trend towards using technology in education was already becoming mainstream. The pandemic accelerated that.

That's why in the last year or two, we've been able to reach 50M students on Chromebooks, and 170M using Google Workspace for Education, which includes Google Classroom. And what this means for you is that there is an opportunity to reach millions of users by building for education.

%[(50M, Students on Chromebooks), (170M, Users on Google Workspace for Education)]

## Products for education

If you're wondering where to start, I'm going to share a couple examples of products that we at Google are building in education. Hopefully some themes that emerge might spark some ideas for you.

In the adaptive learning space, we built practice sets, leveraging AI to help teachers create formative assessments for students to practice problems and access helpful tooltips to get themselves unstuck. To make education accessible for everyone, we just launched **Reading Mode** for Chrome browser, which reads text out loud and lets readers adjust the font, coloring, and sizing of text to suit their own preferences and needs.

We also recognize that folks are accessing content from a variety of contexts. So, to help support those still learning in a remote or hybrid environment, we continue to make improvements to video conferencing with features like live captions and background noise cancellation. And to help with the return to the classroom, we created **Cast Moderator** to enable teachers and students to wirelessly cast their screen to the front of the classroom.

**Screencast** captures many of the themes in edtech—around the rise in video, the need for personalized learning, and the power of encouraging students to create. It works as a built-in screen recording tool that comes with every Chromebook starting with version M103. Teachers and students can annotate, get automatic transcriptions, and share screen recordings with other people at school. We also recently announced how, to make Screencast useful for people around the world, we use a mix of on-device and cloud-based transcription so that users can record in multiple languages.

When I was chatting with a teacher recently about her use of Screencast, she shared how she has students record screencasts for parent/guardian-teacher conference day. Because of the power of the automatic transcription and translation, Screencast enables her to reach parents who are non-native English speakers, and give those parents a chance to understand what their kids are learning in the classroom. It's truly been a gamechanger for her.

## How apps get deployed: Google Admin Console and Google Classroom

Unlike consumers, students aren't downloading their own apps off the Play Store. Instead, school leaders choose apps for the students.

Teachers or curriculum leaders find applications that solve some need in the classroom and then the IT admin reviews them to make sure they're safe to use.

The IT admin can then deploy those apps to specific groups of students and teachers through Google Admin Console. That way, those apps get automatically installed when a student signs into their Chromebook. Plus, admins can specify which apps get pinned to the shelf, so that common apps are easy for students to find.

Another way that students access apps is through Google Classroom. Teachers and students use Google Classroom to share coursework and assignments. Often, you'll see students go into Google Classroom to figure out what assignments they have due in a day, and to communicate with their teachers or fellow students.

## Integrations for developers

Google Classroom add-ons is a new feature that allows educators to bring their favorite content, activities, and lessons from top EdTech tools right inside Classroom. As a developer, you can integrate your learning tool with Classroom using the add-ons API. Note, while individual add-on availability may vary by region or language, the add-ons feature will be available worldwide to Google Classroom users with the Google Workspace for Education Plus edition or Teaching and Learning upgrade.

To make it easy for your add-on to be discovered and installed, we have a **Works with Classroom** filter in Google Workspace Marketplace. Once an admin sets up an add-on, a teacher can find it within Classroom and get logged in with just a few clicks.

Teachers can seamlessly browse and assign Classroom add-ons directly within an assignment, meeting teachers where they are in their workflow.

Add-ons use Sign In with Google, so teachers and students who have signed into Classroom can seamlessly sign into your add-on with the same secure login, removing the need to remember multiple passwords.

Add-ons may provide features to teachers such as the ability to review student work, see grades, see student performance insights, or even give students feedback—all within Classroom.

### Adobe Express add-on

This add-on empowers students to **demonstrate their learning** in more **creative, visually appealing ways**. Adobe Express is a **fun, easy, and engaging tool** that students can use to create posters, infographics, web pages, videos, and more.

> As a company, we are supporting educators of all grade-levels and content areas as they empower their students to demonstrate learning in more creative ways. Integrating with the Google Workspace ecosystem, upon which so many teachers and students rely for their daily work, is crucial to reducing barriers to entry and unlocking creativity across grades and subjects.
> {cite="Ben Forta, Senior Director, Education Initiatives at Adobe"}

### Pear Deck for Classroom add-on

The second add-on is the **Pear Deck for Classroom add-on**. Educators can transform presentations into classroom conversations and create powerful learning moments for every student, every day. For example, creating powerful formative assessments and active learning experiences with the Pear Deck add-on is as easy as 1, 2, 3.

> In our experience, partnering with Google to build product integrations is a smart way to drive growth. The Pear Deck for Google Classroom add-on is an excellent example of how working with the Google partnership and developer teams to expand the functionality of our products drives value for our mutual users. We attribute the successful launch of our Google Classroom integration in large part to the exceptional support we received from the Google team.
> {cite="Max Kirsch, General Manager, Learning & Engagement at GoGuardian"}

Interested in creating a Classroom add-on? Express your interest via our [Classroom add-ons form](https://goo.gle/classroom-add-ons-eap).

## App Licensing Program

Another tool we've built is the App Licensing Program. School admins often purchase app licenses in bulk—sometimes requiring tens of thousands of licenses—which can make it difficult to deploy them to the right students and teachers.

This is also challenging for developers, who then have to maintain some way to make sure the right students get access to the right licenses. The App Licensing Program solves these challenges, by making it possible for schools to directly provision licenses in Google Admin Console. If an IT admin wants to deploy a specific app to only their 11th grade class, they can do so using Google Admin Console. All they need to do is buy the licenses from the developers, redeem them in Google Admin Console, and flip a switch for their 11th graders. Then boom, every student in that grade has access.

This has made developers' lives easier too.

### Squid

For example, Squid is a popular Android-based note taking app that was already popular in schools and is optimized to run on ChromeOS. But, they faced a variety of challenges when it came to helping admins get the app set up for the right set of students and teachers.

> In addition to making schools happy, the App Licensing Program helps us by not having to build a front end to support managing licenses and simplifies how we license by tying it to the students' Google account. This allows a license to be detected seamlessly when Squid is opened without any user input.
> {cite="Andrew Hughes, Founder, Steadfast Innovation, LLC"}

### Figma

In 2022, Figma, a popular design tool made for the web, wasn't being used in K12 education at all, and their team wasn't sure how to get their tools into schools. But, thanks to the App Licensing program, they were able to quickly build an end-to-end integration with just a few hours of development work and make themselves available for deployment by school administrators.

> We couldn't recommend the experience enough. Without the App Licensing Program, Figma for EDU and our mission to make design accessible to every student in the world would have been stuck in an endless loop of "maybe next quarter.
> {cite="Lauren McCann, Head of Figma for Education"}

## The Google Classroom API

A Student Information System (SIS), is one of the key operational systems in schools that create value for users. SIS are used to manage enrollment, create student and teacher schedules, manage attendance, grades, behavior, and more.

There are two primary types of value a SIS can offer with Google Classroom: **Roster Import** and **Grade Export**. There are a few ways SIS integrations can leverage the Classroom API to enable value for IT administrators and education leaders:

- Classes and class rosters may be imported directly into Classroom, which can help eliminate manual work for teachers while scaling operations.
- Automate access controls, including making sure only specific staff can access students they work with.
- Automate parent and guardian account management so parents and guardians can access your tools as needed.
- Assignment and grade export from Classroom to a third-party SIS to reduce friction between systems.

### Google Classroom API: Example Application

I'm going to take a moment to give a quick overview of an example application using the Apps Script, Google Sheets, and Google Classroom APIs together.

In this example application, we'll:

1.  Fetch the course list of the signed-in user.
1.  Render the course list to the active spreadsheet.

First, we need to add our Classroom API to our Apps Script project:

1.  Within our **Apps Script** project, we click on **Add a Service**.
1.  We Select **Google Classroom API**.

Now we can begin to code. We'll start by establishing a reference to the Spreadsheet we want to modify. Apps Script provides the `SpreadsheetApp` class, making it very easy to use the `Sheets API` from within Apps Script.

```java {title="Java" .code-figure}
function main() {
   const sheet = SpreadsheetApp.getActiveSheet();
   sheet.clear();
}
```

Next, we'll set up error handling before making `Classroom API` requests. In practice, you will configure error handling in a way that meets the needs of your application. Here, I'll just log to the console any error message we may receive.

```java {title="Java" .code-figure}
function main() {
   const sheet = SpreadsheetApp.getActiveSheet();
   sheet.clear();
   try {

   } catch (err) {
      console.log(‘Failed with error %s', err.message);
   }
}
```

Finally, we'll use the `Classroom API` to retrieve the course list. The list returned will be dependent on the user executing the script. Once the list has returned, we use the `Sheets API` to append the list directly to the Sheet, row by row.

```java {title="Java" .code-figure}
function main() {
   const sheet = SpreadsheetApp.getActiveSheet();
   sheet.clear();
   try {
      const response = Classroom.Courses.list();
      for (const course of response.courses) {
         sheet.appendRow([[course.id](course.id), [course.name](course.name), course.courseState]);
      }
   } catch (err) {
      console.log(‘Failed with error %s', err.message);
   }
}
```

That's it. You're ready to run the script! Your spreadsheet will now be updated with your course list.

And that's just the beginning. Imagine the possibilities you can achieve using Classroom and other Workspace APIs in education.

## Compatibility with modern platforms

There's another aspect of designing an app for education—considering which platform you want to build your app on. Progressive web apps are our recommended way to build for the modern classroom. Other options include extensions and Android apps.

### PWAs

PWAs allow you to reach a wide user base across any device with powerful capabilities, like file system access and push notifications, all from a single codebase. From video conferencing apps, audio/video/photo editing tools, fully featured IDEs, and coding environments, you can build a diverse set of education software all on the web.

You can even have them work offline!

PWAs are also versatile because they can be accessed through the browser or installed and opened in a stand-alone experience. Codeacademy for example whipped up their PWA in under a month and have seen that users accessing their coding content via the PWA are twice as engaged as those who enter on the browser.

Across the industry, we've seen an increased investment in the web—with developers who previously relied on Chrome Apps or native apps migrating to a web app instead to improve their reach and reduce their development costs, while supporting a rich user experience.

### Extensions

Extensions are still the most popular type of application being used in education today. They work best when you're trying to add to or enhance the web experience. For example, Texthelp offers a popular extension called Read&Write. Read&Write is a literacy support and accessibility tool that offers help with everyday tasks like reading text out loud, understanding unfamiliar words, researching assignments, and proofing written work.

If you're already building extensions, you'll be excited to learn that we've also introduced some new changes to Manifest V3 to support longer service workers.

### Android apps

Finally, Android apps continue to be a widespread way for developers to build for mobile and computer form factors. If you already have a mobile app, you'll be pleased to hear that ChromeOS supports Android applications, such as top video editor Lumafusion.

Developers using Unity to build rich, immersive educational tools will be happy to know that there are easy build options for ChromeOS right in the Editor that will help you get the best performance. You can read more in [Optimize your app for the classroom](/{{locale.code}}/education/optimize-for-the-classroom).

## Build for students with ChromeOS

If there's one thing we would share with developers, it would be this: Build for students.

Even though Ben, the IT administrator we discussed earlier, spends most of his time worrying about student safety and compliance, what he cares most about is making the student experience more fulfilling and more equitable.

So, as you're considering what ideas you might want to bring to education, keep in mind the end user—the teachers we're thankful for and the students we want to inspire.

We at Google are committed to continuing to innovate in this space, and we're excited to work alongside you to transform teaching and learning for everyone. To find out more, take a look at the education resources on [ChromeOS.dev](/{{locale.code}}/education) and [developers.google.com](https://developers.google.com/edu).
