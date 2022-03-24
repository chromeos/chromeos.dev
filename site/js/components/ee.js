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
    this._current = this._getCurrent() || 0;
    this._started = this._isStarted();

    this._intro = {
      headline: 'Ace our quiz for a surprise.',
      body: ["Head on a short scavenger hunt to celebrate Chrome OS's 100th release with us. All four answers can be found here on ChromeOS.dev; get them right for a fun surprise.", "Let's go!"],
    };
    this._prompts = [
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
    this._reward = {
      headline: 'Huzzah!',
      body: ["You're officially a Chrome OS insider. We've got more exciting things coming your way for our 100th software release. To stay in the know, sign up for our newsletter, and keep exploring the all-new ChromeOS.dev to help you build your next big idea.", "Thank you for all of your support, we couldn't have reached this milestone without you!", 'The Chrome OS team'],
    };

    if (!this._started) {
      console.warn('%c%s', 'font-weight: bold;', 'm100.start()');
    } else {
      this._promptQuestion(this._current);
    }
  }

  /**
   * Get started
   * @return {void}
   */
  start() {
    if (!this._started) {
      this._setStarted(true);
      console.info('%c%s', 'font-weight: bold; background: #174ea6; color: white; padding: .25em;', this._intro.headline);
      for (const iterator of this._intro.body) {
        console.info(iterator);
      }
    }
    console.warn('Hint: to answer a question use: %c%s', 'font-family: monospace; font-weight: bold;', 'm100.answer(value);');
    this._promptQuestion(this._current);
  }

  /**
   * Answer
   * @param {string|number} value - Submit an answer to a prompted question
   * @return {void}
   */
  answer(value) {
    if (!this._started) {
      console.error('Hmmm... what are you trying to answer?');
    } else {
      this._checkAnswer(this._current, value);
    }
  }

  /**
   * Start over
   * @return {void}
   */
  restart() {
    this._clearStarted();
    this._clearCurrent();
  }

  /**
   * Gets the current prompt value from local storage.
   * @return {number} - current prompt value
   */
  _getCurrent() {
    return parseInt(localStorage.getItem('chromeos-m100-current-prompt'));
  }

  /**
   * Sets the current prompt value.
   * @param {number} value - the current prompt integer value
   * @return {void}
   */
  _setCurrent(value) {
    localStorage.setItem('chromeos-m100-current-prompt', value);
    this._current = value;
  }

  /**
   * Clear the current prompt value.
   * @return {void}
   */
  _clearCurrent() {
    localStorage.removeItem('chromeos-m100-current-prompt');
    this._current = 0;
  }

  /**
   * Gets the current quiz start value from local storage.
   * @return {number} - current quiz start value
   */
  _isStarted() {
    return !!localStorage.getItem('chromeos-m100-quiz-start');
  }

  /**
   * Sets the current quiz start value.
   * @param {number} value - the current quiz start integer value
   * @return {void}
   */
  _setStarted(value) {
    localStorage.setItem('chromeos-m100-quiz-start', value);
    this._started = value;
  }

  /**
   * Clear the current quiz start value.
   * @return {void}
   */
  _clearStarted() {
    localStorage.removeItem('chromeos-m100-quiz-start');
    this._started = false;
  }

  /**
   * Prompt the question to the user
   * @param {number} prompt
   * @param {boolean} ret - return text (true) vs prompt text (false|default)
   * @return {string|void}
   */
  _promptQuestion(prompt = 0, ret = false) {
    if (prompt < this._prompts.length && this._prompts[prompt].question.length > 0) {
      if (ret) {
        return this._prompts[prompt].question;
      }
      console.info('Question #%s: %c%s', prompt + 1, 'font-weight: bold;', this._prompts[prompt].question);
    } else if ((prompt = this._prompts.length)) {
      this._promptReward();
    }
  }

  /**
   * Prompt the hint to the user
   * @param {string} hint
   * @return {void}
   */
  _promptHint(hint) {
    if (hint) {
      console.info('Hint: %c%s', 'font-style: italic;', hint);
    }
  }

  /**
   * Prompt reward
   * @return {void}
   */
  _promptReward() {
    console.info('%c%s', 'font-weight: bold; font-size: 1.25em;', this._reward.headline);
    for (const iterator of this._reward.body) {
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
    const prompts = this._promtps[prompt];
    if (value.toString().toLowerCase() == prompts.answer.toString().toLowerCase()) {
      // Correct
      console.info('You answered: %c%s', 'font-weight: bold; font-style: italic; background: #0d652d; color: white; padding: .25em;', value.toString());
      console.info(prompts.responseCorrect);
      this._setCurrent(prompt + 1);
      if (this._current < this._prompts.length) {
        this._promptQuestion(this._current);
      } else if ((this._current = this._prompts.length)) {
        this._promptReward();
      }
    } else {
      // Incorrect
      console.info('You answered: %c%s', 'font-weight: bold; background: #a50e0e; color: white; padding: .25em;', value);
      console.info('%c%s', 'font-weight: bold;', prompts.responseIncorrect);
      this._promptHint(prompts.hint);
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
