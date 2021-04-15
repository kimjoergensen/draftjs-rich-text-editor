import 'draft-js/dist/Draft.css';

import {
  ContentBlock, DraftEditorCommand, DraftHandleValue, Editor, EditorState, getDefaultKeyBinding,
  RichUtils
} from 'draft-js';
import React from 'react';

import { BlockStyleControls } from '../style-controls/BlockStyleControls';
import { FormatStyleControls } from '../style-controls/FormatStyleControls';
import { InlineStyleControls } from '../style-controls/InlineStyleControls';
import { StyleGroup } from '../style-group/StyleGroup';
import { extendedBlockRenderMap } from '../utils/BlockRenderMap';
import { Block, BlockType } from '../utils/BlockType';
import { Format, FormatType } from '../utils/FormatType';
import { Style, StyleType } from '../utils/StyleType';
import styles from './rich-text-editor.module.scss';

type StyleGroups = {
  styles?: StyleType[][];
  blocks?: BlockType[][];
  formats?: FormatType[][];
}

type Props = {
  styleGroups: StyleGroups;
}

export const RichTextEditor: React.FunctionComponent<Props> = props => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const editor = React.useRef<Editor>(null);

  React.useEffect(() => focusEditor())

  const focusEditor = () => {
    !!editor.current && editor.current.focus();
  }

  const handleKeyBinding = (event: React.KeyboardEvent): DraftEditorCommand | null => {
    if (event.key === 'Tab') {
      const newState = RichUtils.onTab(event, editorState, 4);
      if (newState) {
        setEditorState(newState);
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
      case Block.Blockquote: return styles.blockquote;
      case Block.AlignLeft: return `${styles.align} ${styles.left}`;
      case Block.AlignCenter: return `${styles.align} ${styles.center}`;
      case Block.AlignRight: return `${styles.align} ${styles.right}`;
      default: return '';
    }
  }

  const toggleBlockType = (block: Block) => setEditorState(RichUtils.toggleBlockType(editorState, block));
  const toggleInlineStyle = (style: Style) => setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  const handleFormat = (format: Format) => setEditorState(RichUtils.toggleInlineStyle(editorState, format));

  return (
    <div className={styles.root} onClick={focusEditor}>
      {!!(props.styleGroups.styles || props.styleGroups.blocks) &&
        <div className={styles.styleControls}>
          {props.styleGroups.styles
            ?.map(group =>
              <StyleGroup>
                {group.map(type => <InlineStyleControls key={type.style} editorState={editorState} type={type} onToggle={toggleInlineStyle} />)}
              </StyleGroup>)}
          {props.styleGroups.blocks
            ?.map(group =>
              <StyleGroup>
                {group.map(type => <BlockStyleControls key={type.block} editorState={editorState} type={type} onToggle={toggleBlockType} />)}
              </StyleGroup>)}
        </div>
      }
      {!!props.styleGroups.formats &&
        <div className={styles.styleControls}>
          {props.styleGroups.formats
            ?.map(group =>
              <StyleGroup>
                {group.map(type => <FormatStyleControls key={type.format} type={type} onClick={() => null} />)}
              </StyleGroup>)}
        </div>
      }
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
          blockRenderMap={extendedBlockRenderMap}
        />
      </div>
    </div>
  );
}