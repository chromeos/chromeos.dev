/* eslint-disable */

/**
 * TO-DO
 *
 * Need a HELP function - to show question, available commands etc.
 */

/**
 * Bootstrap the M100 Console Quiz
 */
export class M100 {
  constructor() {
    this.curPrompt = this.getCurrentPrompt();

    this.i1 = 'Ace our quiz for a surprise.';
    this.i2 = 'Head on a short scavenger hunt to celebrate Chrome OS’s 100th release with us. All four answers can be found here on ChromeOS.dev; get them right for a fun surprise.';
    this.i3 = 'Let’s go!';
    this.q1 = 'What year did Chrome OS and the first Chromebooks launch?';
    this.h1 = 'We wrote a blog post about it.';
    this.a1 = '2011';
    this.q2 = 'How many millions of students and educators use Chromebooks?';
    this.h2 = 'Check the homepage.';
    this.a2 = '50';
    this.q3 = 'What’s the codename for Linux on Chrome OS?';
    this.h3 = 'We mention it on the Linux page.';
    this.a3 = 'Crostini';
    this.q4 = 'How many weeks are there between Chrome OS releases?';
    this.h4 = 'Refer to Chromium Dash.';
    this.a4 = '4';
    this.r1 = 'Huzzah!';
    this.r2 = 'You’re officially a Chrome OS insider. We’ve got more exciting things coming your way for our 100th software release. To stay in the know, sign up for our newsletter, and keep exploring the all-new ChromeOS.dev to help you build your next big idea.';
    this.r3 = 'Thank you for all of your support, we couldn’t have reached this milestone without you!';
    this.r4 = 'The Chrome OS team';
    this.e1 = 'It looks like you have already started the quiz.';
    this.e2 = '';

    if (!this.curPrompt) {
      // Quiz not started
      console.info('%c%s', 'font-weight: bold;', this.i1);
      console.info(this.i2);
      console.info(this.i3);
      console.info('Run %c%s', 'font-weight: bold; font-family: monospace;', 'm100.start()', 'to get started.');
    } else {
      this.promptQuestion(this.curPrompt);
    }
  }

  /**
   * Get started
   * @return {void}
   */
  start() {
    if (!this.curPrompt) {
      // Quiz not started
      this.setCurrentPrompt(1);
    } else {
      console.info(this.e1);
    }
    this.promptQuestion(this.curPrompt);
  }

  /**
   * Answer
   * @param {string} value - Submit an answer to a prompted question
   * @return {void}
   */
  answer(value) {
    if (!this.curPrompt) {
      console.error('uh oh!');
      return null;
    }
    this.checkAnswer(this.curPrompt, value);
  }

  /**
   * Gets the current prompt value from local storage.
   * @return {int} - current prompt value
   */
  getCurrentPrompt() {
    const curPrompt = parseInt(localStorage.getItem('chromeos-m100-current-prompt'));
    if (!curPrompt) {
      return false;
    }
    return curPrompt;
  }

  /**
   * Sets the current prompt value.
   * @param {int} value - the current prompt integer value
   * @return {void}
   */
  setCurrentPrompt(value) {
    localStorage.setItem('chromeos-m100-current-prompt', value);
    this.curPrompt = value;
  }

  /**
   * Clear the current prompt value.
   * @return {void}
   */
  clearCurrentPrompt() {
    localStorage.removeItem('chromeos-m100-current-prompt');
    this.curPrompt = false;
  }

  /**
   * Prompt the question to the user
   * @param {int} prompt
   */
  promptQuestion(prompt) {
    switch (prompt) {
      case 1:
        console.info(this.q1);
        break;
      case 2:
        console.info(this.q2);
        break;
      case 3:
        console.info(this.q3);
        break;
      case 4:
        console.info(this.q4);
        break;
      default:
        console.info('Prompt: ', prompt);
    }
  }

  /**
   * Prompt the hint to the user
   * @param {int} prompt
   */
  promptHint(prompt) {
    var hint = null;
    switch (prompt) {
      case 1:
        hint = this.h1;
        break;
      case 2:
        hint = this.h2;
        break;
      case 3:
        hint = this.h3;
        break;
      case 4:
        hint = this.h4;
        break;
      default:
        hint = 'No hints available at this time.';
    }
    console.info('Hint: %c%s', 'font-style: italic;', hint);
  }

  checkAnswer(prompt, value) {
    var isCorrect = false;
    var showHint = false;
    switch (prompt) {
      case 1:
        if (value == this.a1) {
          isCorrect = true;
          this.setCurrentPrompt(2);
        } else {
          showHint = true;
        }
        break;
      case 2:
        if (value == this.a2) {
          isCorrect = true;
          this.setCurrentPrompt(3);
        } else {
          showHint = true;
        }
        break;
      case 3:
        if (value == this.a3) {
          isCorrect = true;
          this.setCurrentPrompt(4);
        } else {
          showHint = true;
        }
        break;
      case 4:
        if (value == this.a4) {
          isCorrect = true;
          this.setCurrentPrompt(5);
        } else {
          showHint = true;
        }
        break;
    }
    if (isCorrect) {
      console.info('Correct!');
    } else {
      console.info('That is not correct. Try again.');
    }
    this.promptQuestion(this.curPrompt);
    if (showHint) {
      this.promptHint(this.curPrompt);
    }
  }
}
