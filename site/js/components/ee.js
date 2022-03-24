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
    this.curPrompt = this._getCurrentPrompt() || 0;
    this.quizStart = this._getQuizStart();

    this.text = {};
    this.text.intro = {
      headline: 'Ace our quiz for a surprise.',
      body: ["Head on a short scavenger hunt to celebrate Chrome OS's 100th release with us. All four answers can be found here on ChromeOS.dev; get them right for a fun surprise.", "Let's go!"],
    };
    this.text.prompts = [
      {
        question: 'What year did Chrome OS and the first Chromebooks launch?',
        hint: 'We wrote a blog post about it.',
        responseCorrect: 'Nice!',
        responseIncorrect: 'Let’s try that again.',
      },
      {
        question: 'How many millions of students and educators use Chromebooks?',
        hint: 'Check the homepage.',
        responseCorrect: 'Nice!',
        responseIncorrect: 'Not quite.',
      },
      {
        question: "What's the codename for Linux on Chrome OS?",
        hint: 'We mention it on the Linux page.',
        responseCorrect: 'Nice!',
        responseIncorrect: 'Hmm, try again.',
      },
      {
        question: 'How many weeks are there between Chrome OS releases?',
        hint: 'Refer to Chromium Dash.',
        responseCorrect: 'Nice!',
        responseIncorrect: 'You’re almost there!',
      },
    ];
    this.text.answers = ['2011', '50', 'Crostini', '4'];
    this.text.reward = {
      headline: 'Huzzah!',
      body: ["You're officially a Chrome OS insider. We've got more exciting things coming your way for our 100th software release. To stay in the know, sign up for our newsletter, and keep exploring the all-new ChromeOS.dev to help you build your next big idea.", "Thank you for all of your support, we couldn't have reached this milestone without you!"],
      citation: 'The Chrome OS team',
    };

    if (!this.quizStart) {
      console.info('%c%s', 'font-weight: bold;', 'm100.start()');
    } else {
      this._promptQuestion(this.curPrompt);
    }
  }

  /**
   * Get started
   * @return {void}
   */
  async start() {
    await this.delay(200);
    if (!this.quizStart) {
      this._setQuizStart(true);
      console.info('%c%s', 'font-weight: bold;', this.text.intro.headline);
      await this.delay(500);
      for (const iterator of this.text.intro.body) {
        console.info(iterator);
        await this.delay(500);
      }
    }
    this._promptQuestion(this.curPrompt);
  }

  /**
   * Answer
   * @param {string} value - Submit an answer to a prompted question
   * @return {void}
   */
  answer(value) {
    if (!this.quizStart) {
      console.error("I'm not sure what you are trying to answer.");
      console.info('m100.start();');
    }
    this._checkAnswer(this.curPrompt, value);
  }

  /**
   * Start over
   * @return {void}
   */
  clear() {
    localStorage.removeItem('chromeos-m100-quiz-start');
    this._clearCurrentPrompt();
  }

  /**
   * Gets the current prompt value from local storage.
   * @return {int} - current prompt value
   */
  _getCurrentPrompt() {
    const curPrompt = parseInt(localStorage.getItem('chromeos-m100-current-prompt'));
    return curPrompt;
  }

  /**
   * Sets the current prompt value.
   * @param {int} value - the current prompt integer value
   * @return {void}
   */
  _setCurrentPrompt(value) {
    localStorage.setItem('chromeos-m100-current-prompt', value);
    this.curPrompt = value;
  }

  /**
   * Clear the current prompt value.
   * @return {void}
   */
  _clearCurrentPrompt() {
    localStorage.removeItem('chromeos-m100-current-prompt');
    this.curPrompt = false;
  }

  /**
   * Gets the current quiz start value from local storage.
   * @return {int} - current quiz start value
   */
  _getQuizStart() {
    const quizStart = !!localStorage.getItem('chromeos-m100-quiz-start');
    return quizStart;
  }

  /**
   * Sets the current quiz start value.
   * @param {int} value - the current quiz start integer value
   * @return {void}
   */
  _setQuizStart(value) {
    localStorage.setItem('chromeos-m100-quiz-start', value);
    this.quizStart = value;
  }

  /**
   * Clear the current quiz start value.
   * @return {void}
   */
  _clearQuizStart() {
    localStorage.removeItem('chromeos-m100-quiz-start');
    this.quizStart = false;
  }

  /**
   * Prompt the question to the user
   * @param {int} prompt
   */
  _promptQuestion(prompt, ret = false) {
    if (this.text.prompts[prompt].question.length > 0) {
      if (ret) {
        return this.text.prompts[prompt].question;
      }
      console.info('%c%s', 'font-weight: bold;', this.text.prompts[prompt].question);
    }
  }

  /**
   * Prompt the hint to the user
   * @param {int} prompt
   */
  _promptHint(prompt) {
    if (this.text.prompts[prompt].hint.length > 0) {
      console.info('Hint: %c%s', 'font-style: italic;', this.text.prompts[prompt].hint);
    }
  }

  /**
   * Check the answer
   * @param {int} prompt
   * @param {string} value
   * @return {void}
   */
  async _checkAnswer(prompt, value) {
    await this.delay(200);
    console.info('Question: %c%s', 'font-weight: bold; font-style: italic;', this._promptQuestion(prompt, true));
    console.info('You answered: %c%s', 'font-weight: bold; font-style: italic;', value);
    await this.delay(500);
    if (value == this.text.answers[prompt]) {
      // Correct
      console.info(this.text.prompts[prompt].responseCorrect);
      this._setCurrentPrompt(prompt + 1);
      await this.delay(500);
      console.info('Next question: %c%s', 'font-weight: bold; font-style: italic;', this._promptQuestion(this.curPrompt, true));
    } else {
      // Incorrect
      console.info(this.text.prompts[prompt].responseIncorrect);
      await this.delay(1000);
      this._promptHint(prompt);
    }
  }

  /**
   * Set a delay timer
   * @param {int} milliseconds
   * @return {void}
   */
  delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}
