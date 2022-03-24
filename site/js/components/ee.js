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
        responseIncorrect: "Let's try that again.",
        answer: 2011,
      },
      {
        question: 'How many millions of students and educators use Chromebooks?',
        hint: 'Check the homepage.',
        responseCorrect: 'Nice!',
        responseIncorrect: 'Not quite.',
        answer: 50,
      },
      {
        question: "What's the codename for Linux on Chrome OS?",
        hint: 'We mention it on the Linux page.',
        responseCorrect: 'Nice!',
        responseIncorrect: 'Hmm, try again.',
        answer: 'Crostini',
      },
      {
        question: 'How many weeks are there between Chrome OS releases?',
        hint: 'Refer to Chromium Dash.',
        responseCorrect: 'Nice!',
        responseIncorrect: "You're almost there!",
        answer: 4,
      },
    ];
    this.text.reward = {
      headline: 'Huzzah!',
      body: ["You're officially a Chrome OS insider. We've got more exciting things coming your way for our 100th software release. To stay in the know, sign up for our newsletter, and keep exploring the all-new ChromeOS.dev to help you build your next big idea.", "Thank you for all of your support, we couldn't have reached this milestone without you!", 'The Chrome OS team'],
    };

    if (!this.quizStart) {
      console.warn('%c%s', 'font-weight: bold;', 'm100.start()');
    } else {
      this._promptQuestion(this.curPrompt);
    }
  }

  /**
   * Get started
   * @return {void}
   */
  start() {
    if (!this.quizStart) {
      this._setQuizStart(true);
      console.info('%c%s', 'font-weight: bold; background: #174ea6; color: white; padding: .25em;', this.text.intro.headline);
      for (const iterator of this.text.intro.body) {
        console.info(iterator);
      }
    }
    console.warn('Hint: to answer a question use: %c%s', 'font-family: monospace; font-weight: bold;', 'm100.answer(value);');
    this._promptQuestion(this.curPrompt);
  }

  /**
   * Answer
   * @param {string|number} value - Submit an answer to a prompted question
   * @return {void}
   */
  answer(value) {
    if (!this.quizStart) {
      console.error('Hmmm... what are you trying to answer?');
    } else {
      this._checkAnswer(this.curPrompt, value);
    }
  }

  /**
   * Start over
   * @return {void}
   */
  clear() {
    this._clearQuizStart();
    this._clearCurrentPrompt();
  }

  /**
   * Gets the current prompt value from local storage.
   * @return {number} - current prompt value
   */
  _getCurrentPrompt() {
    const curPrompt = parseInt(localStorage.getItem('chromeos-m100-current-prompt'));
    return curPrompt;
  }

  /**
   * Sets the current prompt value.
   * @param {number} value - the current prompt integer value
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
    this.curPrompt = 0;
  }

  /**
   * Gets the current quiz start value from local storage.
   * @return {number} - current quiz start value
   */
  _getQuizStart() {
    const quizStart = !!localStorage.getItem('chromeos-m100-quiz-start');
    return quizStart;
  }

  /**
   * Sets the current quiz start value.
   * @param {number} value - the current quiz start integer value
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
   * @param {number} prompt
   * @param {boolean} ret - return text (true) vs prompt text (false|default)
   * @return {string|void}
   */
  _promptQuestion(prompt = 0, ret = false) {
    if (prompt < this.text.prompts.length && this.text.prompts[prompt].question.length > 0) {
      if (ret) {
        return this.text.prompts[prompt].question;
      }
      console.info('Question #%s: %c%s', prompt + 1, 'font-weight: bold;', this.text.prompts[prompt].question);
    } else if ((prompt = this.text.prompts.length)) {
      this._promptReward();
    }
  }

  /**
   * Prompt the hint to the user
   * @param {number} prompt
   * @return {void}
   */
  _promptHint(prompt) {
    if (this.text.prompts[prompt].hint.length > 0) {
      console.info('Hint: %c%s', 'font-style: italic;', this.text.prompts[prompt].hint);
    }
  }

  /**
   * Prompt the hint to the user
   * @param {number} prompt
   * @return {void}
   */
  _promptHint(prompt) {
    if (this.text.prompts[prompt].hint.length > 0) {
      console.info('Hint: %c%s', 'font-style: italic;', this.text.prompts[prompt].hint);
    }
  }

  /**
   * Prompt reward
   * @return {void}
   */
  _promptReward() {
    console.info('%c%s', 'font-weight: bold; font-size: 1.25em;', this.text.reward.headline);
    for (const iterator of this.text.reward.body) {
      console.info(iterator);
    }
  }

  /**
   * Check the answer
   * @param {number} prompt
   * @param {string} value
   * @return {void}
   */
  _checkAnswer(prompt, value) {
    if (value.toString().toLowerCase() == this.text.promtps[prompt].answer.toString().toLowerCase()) {
      // Correct
      console.info('You answered: %c%s', 'font-weight: bold; font-style: italic; background: #0d652d; color: white; padding: .25em;', value.toString());
      console.info(this.text.prompts[prompt].responseCorrect);
      this._setCurrentPrompt(prompt + 1);
      if (this.curPrompt < this.text.prompts.length) {
        console.info('Question #%s: %c%s', this.curPrompt + 1, 'font-weight: bold;', this._promptQuestion(this.curPrompt, true));
      } else if ((this.curPrompt = this.text.prompts.length)) {
        this._promptReward();
      }
    } else {
      // Incorrect
      console.info('You answered: %c%s', 'font-weight: bold; background: #a50e0e; color: white; padding: .25em;', value);
      console.info('%c%s', 'font-weight: bold;', this.text.prompts[prompt].responseIncorrect);
      this._promptHint(prompt);
    }
  }

  /**
   * Set a delay timer
   * @param {number} milliseconds
   * @return {void}
   */
  _delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}
