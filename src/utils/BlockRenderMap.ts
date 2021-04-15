import Draft from 'draft-js';
import Immutable from 'immutable';

const blockRenderMap = Immutable.Map({
  'indent': {
    element: 'blockquote'
  }
})

export const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);