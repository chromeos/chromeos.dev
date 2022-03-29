/**
 * Import Theme
 */
import { Theme } from './theme';

/**
 * Bootstrap the M100 Console Quiz
 */
export class M100 {
  /**
   *
   * @return {void}
   */
  constructor() {
    this._theme = new Theme();
    this._current = parseInt(this._getCurrent()) || 0;
    this._started = this._isStarted() || false;

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

    if (this._started.toString() === 'true') {
      if (this._current < this._prompts.length) {
        console.warn('%c%s', 'font-weight: bold;', 'm100.help()');
        this._promptQuestion(this._current);
      } else {
        if (this._theme.name === 'phosphor') {
          console.warn('%c%s', 'font-weight: bold;', 'm100.reset()');
        } else {
          console.warn('%c%s', 'font-weight: bold;', 'm100.help()');
        }
      }
    } else {
      console.warn('%c%s', 'font-weight: bold;', 'm100.start()');
    }
  }

  /**
   * Get started
   * @return {void}
   */
  start() {
    if (this._started.toString() !== 'true') {
      this._setStarted(true);
      console.info('%c%s', 'font-weight: bold; background: #174ea6; color: white; padding: .25em;', this._intro.headline);
      for (const iterator of this._intro.body) {
        console.info(iterator);
      }
      window.tracking?.sendEvent('m100_quiz_start')();
    }
    console.warn('Hint: for help try: %c%s', 'font-family: monospace; font-weight: bold;', 'm100.help();');
    this._promptQuestion(this._current);
  }

  /**
   * Answer
   * @param {string|number} value - Submit an answer to a prompted question
   * @return {void}
   */
  answer(value) {
    if (this._started.toString() !== 'true') {
      console.error('Hmmm... what are you trying to answer?');
    } else {
      this._checkAnswer(this._current, value);
    }
  }

  /**
   * Start over
   * @return {void}
   */
  reset() {
    this._setStarted(false);
    this._setCurrent(0);
    this._theme.name = null;
    this._theme.update();
  }

  /**
   * Help me...
   * @return {void}
   */
  help() {
    console.warn("I'm here to help:");
    console.info('To get started: %c%s', 'font-weight: bold;', 'm100.start();');
    console.info('To answer a question: %c%s', 'font-weight: bold;', "m100.answer('value');");
    console.info('To start over: %c%s', 'font-weight: bold;', 'm100.reset();');
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
   * Gets the current quiz start value from local storage.
   * @return {number} - current quiz start value
   */
  _isStarted() {
    return localStorage.getItem('chromeos-m100-quiz-start');
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
   * Prompt current question
   * @param {number} current
   * @return {void}
   */
  _promptQuestion(current = 0) {
    if (typeof this._prompts[current] !== 'undefined') {
      const prompts = this._prompts[current];
      console.info('Question #%s: %c%s', current + 1, 'font-weight: bold;', prompts.question);
    }
  }

  /**
   * Prompt a hint
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
   * @param {boolean} giveYouUp
   * @return {void}
   */
  _promptReward() {
    window.tracking?.sendEvent('m100_quiz_complete')();
    console.info('%c%s', 'font-weight: bold; font-size: 1.25em;', this._reward.headline);
    for (const iterator of this._reward.body) {
      console.info(iterator);
    }
    this._countdown(3).then(() => {
      this._theme.name = 'phosphor';
      this._giveYouUp();
    });
  }

  /**
   * Check the answer
   * @param {number} current
   * @param {string} value
   * @return {void}
   */
  _checkAnswer(current, value) {
    const prompts = this._prompts[current];
    if (value.toString().toLowerCase() == prompts.answer.toString().toLowerCase()) {
      // Correct
      console.info('You answered: %c%s', 'font-weight: bold; font-style: italic; background: #0d652d; color: white; padding: .25em;', value.toString());
      console.info(prompts.responseCorrect);
      this._setCurrent(current + 1);
      if (this._current < this._prompts.length) {
        this._promptQuestion(this._current);
      } else if (this._current === this._prompts.length) {
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
   * Toggle ChromeOS theme
   * @param {string} theme
   * @return {void}
   */
  _setTheme(theme = null) {
    localStorage.setItem('chromeos-theme', theme);
  }

  /**
   * You know the rules and so do I
   * @return {void}
   */
  _giveYouUp() {
    window.location = 'https://www.youtube.com/v/dQw4w9WgXcQ';
  }

  /**
   * Countdown...
   * @param {number} count
   * @param {number} interval
   * @return {void}
   */
  _countdown(count, interval = 750) {
    return new Promise((resolve, reject) => {
      const timer = setInterval(function () {
        console.log(count);
        count = count - 1;
        if (count < 0) {
          clearInterval(timer);
          resolve(true);
          return;
        }
      }, interval);
    });
  }
}
