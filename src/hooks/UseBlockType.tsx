import { EditorState } from 'draft-js';

export const useBlockType = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
}