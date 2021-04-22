import 'draft-js/dist/Draft.css'

import {
  ContentBlock, ContentState, DefaultDraftBlockRenderMap, DraftEditorCommand, DraftHandleValue,
  Editor, EditorState, getDefaultKeyBinding, Modifier, RichUtils
} from 'draft-js'
import Immutable from 'immutable'
import React from 'react'

import { Section } from '../section/Section'
import { BlockStyleControls } from '../style-controls/BlockStyleControls'
import { FormatStyleControls } from '../style-controls/FormatStyleControls'
import { InlineStyleControls } from '../style-controls/InlineStyleControls'
import { StyleGroup } from '../style-group/StyleGroup'
import { Block, BlockType } from '../utils/BlockType'
import { FormatType } from '../utils/FormatType'
import { Style, StyleType } from '../utils/StyleType'
import styles from './rich-text-editor.module.scss'

type StyleGroups = {
  styles?: StyleType[][]
  blocks?: BlockType[][]
  formats?: FormatType[][]
}

type Props = {
  styleGroups?: StyleGroups
  onStateChange?: (contentState: ContentState) => void
}

export const RichTextEditor: React.FunctionComponent<Props> = props => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const editor = React.useRef<Editor>(null)

  const focusEditor = () => {
    !!editor.current && editor.current.focus()
  }

  const handleStateChange = (newEditorState: EditorState) => {
    if (newEditorState === editorState) return
    setEditorState(newEditorState)
    props.onStateChange && props.onStateChange(newEditorState.getCurrentContent())
  }

  const handleKeyBinding = (event: React.KeyboardEvent): DraftEditorCommand | null => {
    if (event.key === 'Tab') {
      const newState = RichUtils.onTab(event, editorState, 4)
      if (newState) {
        handleStateChange(newState)
      }
    }
    return getDefaultKeyBinding(event)
  }

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleStateChange(newState)
      return 'handled'
    } else return 'not-handled'
  }

  const handleReturn = (event: React.KeyboardEvent, state: EditorState): DraftHandleValue => {
    if (event.shiftKey) {
      handleStateChange(RichUtils.insertSoftNewline(state))
      return 'handled'
    } else return 'not-handled'
  }

  const insertSection = () => {
    console.log('insert section')
    const currentContent = editorState.getCurrentContent()
    const selection = editorState.getSelection()
    const textWithEntity = Modifier.splitBlock(currentContent, selection)
    handleStateChange(EditorState.push(editorState, textWithEntity, 'split-block'))
  }

  const blockStyle = (block: ContentBlock): string => {
    switch (block.getType()) {
      case Block.Blockquote: return styles.blockquote
      case Block.AlignLeft: return `${styles.align} ${styles.left}`
      case Block.AlignCenter: return `${styles.align} ${styles.center}`
      case Block.AlignRight: return `${styles.align} ${styles.right}`
      default: return ''
    }
  }

  const blockRenderer = (contentBlock: ContentBlock) => ({
    component: Section,
    editable: true,
    props: {
      foo: 'bar'
    }
  })

  const blockRenderMap = DefaultDraftBlockRenderMap.merge(Immutable.Map({
    'unstyled': {
      element: 'div',
      wrapper: <Section />
    }
  }))

  const renderInlineStyleControls = (styles: StyleType[][]): JSX.Element[] => (
    styles?.map((group, index) =>
      <StyleGroup key={index}>
        {group.map((type, index) => <InlineStyleControls key={index} editorState={editorState} type={type} onToggle={toggleInlineStyle} />)}
      </StyleGroup>)
  )

  const renderBlockTypeControls = (blocks: BlockType[][]): JSX.Element[] => (
    blocks?.map((group, index) =>
      <StyleGroup key={index}>
        {group.map((type, index) => <BlockStyleControls key={index} editorState={editorState} type={type} onToggle={toggleBlockType} />)}
      </StyleGroup>)
  )

  const renderFormatStyleControls = (formats: FormatType[][]): JSX.Element[] => (
    formats?.map((group, index) =>
      <StyleGroup key={index}>
        {group.map((type, index) => <FormatStyleControls key={index} type={type} onClick={() => null} />)}
      </StyleGroup>)
  )

  const toggleBlockType = (block: Block) => handleStateChange(RichUtils.toggleBlockType(editorState, block));
  const toggleInlineStyle = (style: Style) => handleStateChange(RichUtils.toggleInlineStyle(editorState, style));

  return (
    <React.Fragment>
      <button onClick={insertSection} style={{ marginBottom: 5 }}>Insert section</button>

      <div className={styles.root} onClick={focusEditor}>
        <div className={styles.styleControls}>
          {props.styleGroups?.styles && renderInlineStyleControls(props.styleGroups?.styles)}
          {props.styleGroups?.blocks && renderBlockTypeControls(props.styleGroups?.blocks)}
          {props.styleGroups?.formats && renderFormatStyleControls(props.styleGroups?.formats)}
        </div>

        <div className={styles.editor}>
          <Editor
            spellCheck
            ref={editor}
            editorState={editorState}
            handleReturn={handleReturn}
            textAlignment='left'
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={handleKeyBinding}
            onChange={handleStateChange}
            blockStyleFn={blockStyle}
            blockRendererFn={blockRenderer}
          />
        </div>
      </div>
    </React.Fragment>
  );
}