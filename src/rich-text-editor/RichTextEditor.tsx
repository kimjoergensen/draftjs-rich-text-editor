import 'draft-js/dist/Draft.css';

import {
  ContentBlock, DraftEditorCommand, DraftHandleValue, Editor, EditorState, getDefaultKeyBinding,
  RichUtils
} from 'draft-js';
import React from 'react';

import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import FormatQuote from '@material-ui/icons/FormatQuote';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';

import { BlockStyleControl } from '../style-controls/BlockStyleControl';
import { FormatStyleControl } from '../style-controls/FormatStyleControl';
import { InlineStyleControl } from '../style-controls/InlineStyleControl';
import { StyleGroup } from '../style-group/StyleGroup';
import { Format, FormatType } from '../utils/FormatType';
import { Style, StyleType } from '../utils/StyleType';
import styles from './rich-text-editor.module.scss';

export const RichTextEditor: React.FunctionComponent = props => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const editor = React.useRef<Editor>(null);

  const TypographyInlineStyles: StyleType[] = [
    { icon: <FormatBold />, style: Style.Bold },
    { icon: <FormatItalic />, style: Style.Italic },
    { icon: <FormatUnderlined />, style: Style.Underline }
  ]

  const TextAlignmentStyles: StyleType[] = [
    { icon: <FormatAlignLeft />, style: Style.AlignLeft },
    { icon: <FormatAlignCenter />, style: Style.AlignCenter },
    { icon: <FormatAlignRight />, style: Style.AlignRight }
  ]

  const BlockStyles: StyleType[] = [
    { icon: <FormatListBulleted />, style: Style.UnorderedList },
    { icon: <FormatListNumbered />, style: Style.OrderedList },
    { icon: <FormatQuote />, style: Style.Blockquote }
  ]

  const FormatStyles: FormatType[] = [
    { icon: <FormatIndentIncreaseIcon />, format: Format.Indent },
    { icon: <FormatIndentDecreaseIcon />, format: Format.Outdent }
  ]

  React.useEffect(() => focusEditor())

  const focusEditor = () => {
    !!editor.current && editor.current.focus();
  }

  const handleKeyBinding = (event: React.KeyboardEvent): string | null => {
    if (event.key === 'Tab') {
      const newState = RichUtils.onTab(event, editorState, 4);
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
    }
    return getDefaultKeyBinding(event);
  }

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    } else return 'not-handled';
  }

  const getBlockStyle = (block: ContentBlock): string => {
    switch (block.getType()) {
      case Style.Blockquote: return styles.blockquote;
      default: return 'not-handled';
    }
  }

  const toggleBlockType = (style: Style) => setEditorState(RichUtils.toggleBlockType(editorState, style));
  const toggleInlineStyle = (style: Style) => setEditorState(RichUtils.toggleInlineStyle(editorState, style));

  return (
    <div className={styles.root} onClick={focusEditor}>
      <div className={styles.styleControls}>
        <StyleGroup>
          {TypographyInlineStyles.map(type => <InlineStyleControl key={type.style} editorState={editorState} type={type} onToggle={toggleInlineStyle} />)}
        </StyleGroup>
        <StyleGroup>
          {TextAlignmentStyles.map(type => <BlockStyleControl key={type.style} editorState={editorState} type={type} onToggle={toggleBlockType} />)}
          {FormatStyles.map(type => <FormatStyleControl key={type.format} editorState={editorState} type={type} onToggle={() => null} />)}
        </StyleGroup>
        <StyleGroup>
          {BlockStyles.map(type => <BlockStyleControl key={type.style} editorState={editorState} type={type} onToggle={toggleBlockType} />)}
        </StyleGroup>
      </div>
      <div className={styles.editor}>
        <Editor
          spellCheck
          ref={editor}
          editorState={editorState}
          textAlignment='left'
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={handleKeyBinding}
          onChange={setEditorState}
          blockStyleFn={getBlockStyle}
        />
      </div>
    </div>
  );
}