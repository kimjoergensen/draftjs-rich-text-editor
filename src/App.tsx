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

import { Vacancy } from './data/models/vacancy'
import { VacancyService } from './data/service'
import { RichTextEditor } from './rich-text-editor/RichTextEditor'
import { Block, BlockType } from './utils/block-type'
import { Format, FormatType } from './utils/format-type'
import { Style, StyleType } from './utils/style-type'

type DataSourceModel = {
  vacancy: Vacancy
}

export const App: React.FunctionComponent = props => {
  const VACANCY_ID = 1
  const [contentState, setContentState] = React.useState<ContentState>(ContentState.createFromText(''))
  const [autocomplete, setAutocomplete] = React.useState(null)
  const [dataSource, setDataSource] = React.useState<DataSourceModel>()

  const fetchVacancy = React.useCallback(async () => {
    const delay = async (milliSeconds: number): Promise<void> =>
      new Promise(resolve => setTimeout(resolve, milliSeconds))

    try {
      // await delay(1000)
      const vacancy = await VacancyService.get(VACANCY_ID)
      setDataSource({ vacancy: vacancy })
    } catch (error) {
      console.error(error)
    }
  }, [VACANCY_ID])

  React.useEffect(() => {
    fetchVacancy()
  }, [fetchVacancy])

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

  const handleStateChange = (state: ContentState) => setContentState(state)

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      {!!dataSource &&
        <React.Fragment>
          <RichTextEditor
            onStateChange={handleStateChange}
            styleGroups={{
              styles: [TypographyInlineStyles],
              blocks: [TextAlignmentStyles, BlockStyles],
              formats: [FormatStyles]
            }} />
          <div style={{ margin: '5px 0' }}>
            <label htmlFor="html-output" style={{ fontSize: 12, padding: 0, margin: 0 }}>HTML format</label>
            <pre id="html-output" style={{ whiteSpace: 'pre-wrap', border: '1px groove #eee', padding: 2, margin: 0 }}>
              {stateToHTML(contentState)}
            </pre>
            <ReactJson src={dataSource} />
            {/* <ReactJson collapsed src={contentState} /> */}
          </div>
        </React.Fragment> || <p>Loading...</p>}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)