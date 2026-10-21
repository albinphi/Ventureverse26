// Text splitting utility for character and line animation reveals.
// Provides accessible DOM wrappers for staggered GSAP animations with fallbacks.

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register SplitText with GSAP if available
if (SplitText) {
  gsap.registerPlugin(SplitText);
}

/**
 * Splits text into individual characters with an overflow-hidden mask for each char.
 * Preserves accessibility via aria-label on the parent and aria-hidden on split pieces.
 */
export function splitChars(element) {
  if (!element) return [];

  const rawText = element.textContent.trim();
  element.setAttribute('aria-label', rawText);

  // If GSAP SplitText is available and functional
  if (SplitText) {
    try {
      const split = new SplitText(element, {
        type: 'chars,words',
        charsClass: 'split-char',
        wordsClass: 'split-word'
      });
      // Ensure words never wrap internally
      split.words.forEach(word => {
        word.style.display = 'inline-block';
        word.style.whiteSpace = 'nowrap';
      });
      // Add aria-hidden to characters
      split.chars.forEach(char => char.setAttribute('aria-hidden', 'true'));
      return {
        chars: split.chars,
        words: split.words,
        revert: () => split.revert()
      };
    } catch {
      // Fall through to manual split
    }
  }

  // Robust manual character split fallback
  const text = element.innerText;
  element.innerHTML = '';
  const charElements = [];

  const words = text.split(' ');
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'split-word';
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    wordSpan.setAttribute('aria-hidden', 'true');

    for (const char of word) {
      const maskSpan = document.createElement('span');
      maskSpan.className = 'split-char-mask';
      maskSpan.style.display = 'inline-block';
      maskSpan.style.overflow = 'hidden';
      maskSpan.style.verticalAlign = 'top';

      const charSpan = document.createElement('span');
      charSpan.className = 'split-char';
      charSpan.style.display = 'inline-block';
      charSpan.textContent = char;

      maskSpan.appendChild(charSpan);
      wordSpan.appendChild(maskSpan);
      charElements.push(charSpan);
    }

    element.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      const space = document.createTextNode(' ');
      element.appendChild(space);
    }
  });

  return {
    chars: charElements,
    revert: () => {
      element.textContent = rawText;
      element.removeAttribute('aria-label');
    }
  };
}

/**
 * Splits heading or paragraph text into lines with overflow-hidden line wrappers.
 */
export function splitLines(element) {
  if (!element) return { lines: [], revert: () => {} };

  const rawText = element.textContent.trim();
  element.setAttribute('aria-label', rawText);

  if (SplitText) {
    try {
      const split = new SplitText(element, {
        type: 'lines',
        linesClass: 'split-line'
      });
      split.lines.forEach(line => {
        line.setAttribute('aria-hidden', 'true');
        // Wrap line in mask
        const mask = document.createElement('div');
        mask.className = 'split-line-mask';
        mask.style.overflow = 'hidden';
        mask.style.display = 'block';
        line.parentNode.insertBefore(mask, line);
        mask.appendChild(line);
      });
      return {
        lines: split.lines,
        revert: () => split.revert()
      };
    } catch {
      // Fall through
    }
  }

  // Fallback: simple line wrapper
  const lines = [element];
  return {
    lines,
    revert: () => {
      element.textContent = rawText;
    }
  };
}
