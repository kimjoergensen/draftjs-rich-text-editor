import { DraftEditorCommand } from 'draft-js';

namespace KeyBindingUtil {
  const isOSX = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const isCtrlKeyCommand = (event: React.KeyboardEvent): boolean => {
    return !!event.ctrlKey && !event.altKey;
  }

  const hasCommandModifier = (event: React.KeyboardEvent): boolean => {
    return isOSX
      ? !!event.metaKey && !event.altKey
      : isCtrlKeyCommand(event);
  }

  const shouldRemoveWord = (event: React.KeyboardEvent): boolean => {
    return (isOSX && event.altKey) || hasCommandModifier(event);
  }

  export const getDefaultKeyBinding = (event: React.KeyboardEvent): DraftEditorCommand | null => {
    switch (event.key) {
      case 'B':
        return hasCommandModifier(event) ? 'bold' : null;
      case 'D':
        return hasCommandModifier(event) ? 'delete' : null;
      case 'H':
        return hasCommandModifier(event) ? 'backspace' : null;
      case 'I':
        return hasCommandModifier(event) ? 'italic' : null;
      case 'J':
        return hasCommandModifier(event) ? 'code' : null;
      case 'K':
        return isOSX && isCtrlKeyCommand(event) ? 'secondary-cut' : null;
      case 'M':
        return isCtrlKeyCommand(event) ? 'split-block' : null;
      case 'O':
        return isCtrlKeyCommand(event) ? 'split-block': null;
      case 'T':
        return isOSX && isCtrlKeyCommand(event) ? 'transpose-characters' : null;
      case 'U':
        return hasCommandModifier(event) ? 'underline' : null;
      case 'W':
        return isOSX && isCtrlKeyCommand(event) ? 'backspace-word' : null;
      case 'X':
        return hasCommandModifier(event) && event.shiftKey ? 'strikethrough' : null;
      case 'Y':
        return isCtrlKeyCommand(event)
          ? isOSX ? 'secondary-paste' : 'redo'
          : null;
      case 'Z':
        return hasCommandModifier(event)
          ? event.shiftKey ? 'redo' : 'undo'
          : null;
      case 'Enter':
        return 'split-block';
      case 'Delete':
        return shouldRemoveWord(event)
          ? 'delete-word'
          : 'delete';
      case 'Backspace':
        return isOSX && hasCommandModifier(event)
          ? 'backspace-to-start-of-line'
          : shouldRemoveWord(event) ? 'backspace-word' : 'backspace'
      default: return null;
    }
  }
}

export default KeyBindingUtil;
