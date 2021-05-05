import { CompositeDecorator, ContentBlock, ContentState } from 'draft-js'

import { HashtagDecorator } from '../decorators/HashtagDecorator'

const HASHTAG_REGEX = /[#]((?:\w+[.])*\w+)/g
type Callback = (start: number, end: number) => void

const findWithRegex = (regex: RegExp, content: ContentBlock, callback: Callback) => {
  const text = content.getText()
  let matchArr: RegExpExecArray | null, start: number
  while (!!(matchArr = regex.exec(text))) {
    start = matchArr.index
    callback(start, start + matchArr[0].length)
  }
}

const hashtagStrategy = (content: ContentBlock, callback: Callback, _state: ContentState) => {
  findWithRegex(HASHTAG_REGEX, content, callback)
}

export const compositeDecorator = new CompositeDecorator([
  {
    strategy: hashtagStrategy,
    component: HashtagDecorator
  }
])