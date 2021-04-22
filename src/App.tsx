import { ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactJson from 'react-json-view'

import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter'
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft'
import FormatAlignRight from '@material-ui/icons/FormatAlignRight'
import FormatBold from '@material-ui/icons/FormatBold'
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease'
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease'
import FormatItalic from '@material-ui/icons/FormatItalic'
import FormatListBulleted from '@material-ui/icons/FormatListBulleted'
import FormatListNumbered from '@material-ui/icons/FormatListNumbered'
import FormatQuote from '@material-ui/icons/FormatQuote'
import FormatUnderlined from '@material-ui/icons/FormatUnderlined'

import { RichTextEditor } from './rich-text-editor/RichTextEditor'
import { Block, BlockType } from './utils/BlockType'
import { Format, FormatType } from './utils/FormatType'
import { Style, StyleType } from './utils/StyleType'

export const App: React.FunctionComponent = props => {
  const [contentState, setContentState] = React.useState<ContentState>(ContentState.createFromText(''));

  const TypographyInlineStyles: StyleType[] = [
    { icon: <FormatBold />, style: Style.Bold },
    { icon: <FormatItalic />, style: Style.Italic },
    { icon: <FormatUnderlined />, style: Style.Underline }
  ]

  const TextAlignmentStyles: BlockType[] = [
    { icon: <FormatAlignLeft />, block: Block.AlignLeft },
    { icon: <FormatAlignCenter />, block: Block.AlignCenter },
    { icon: <FormatAlignRight />, block: Block.AlignRight }
  ]

  const BlockStyles: BlockType[] = [
    { icon: <FormatListBulleted />, block: Block.UnorderedList },
    { icon: <FormatListNumbered />, block: Block.OrderedList },
    { icon: <FormatQuote />, block: Block.Blockquote }
  ]

  const FormatStyles: FormatType[] = [
    { icon: <FormatIndentIncreaseIcon />, format: Format.Indent },
    { icon: <FormatIndentDecreaseIcon />, format: Format.Outdent }
  ]

  const handleStateChange = (newContentState: ContentState) => setContentState(newContentState);

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <RichTextEditor onStateChange={handleStateChange} styleGroups={{
        styles: [TypographyInlineStyles],
        blocks: [TextAlignmentStyles, BlockStyles],
        formats: [FormatStyles]
      }} />
      <div style={{ margin: '5px 0' }}>
        <label htmlFor="html-output" style={{ fontSize: 12, padding: 0, margin: 0 }}>HTML format</label>
        <pre id="html-output" style={{ whiteSpace: 'pre-wrap', border: '1px groove #eee', padding: 2, margin: 0 }}>
          {stateToHTML(contentState)}
        </pre>
        <ReactJson collapsed src={contentState} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);