/*Do not change the values of these enums!
  They are draft.js specific.*/
  export enum Block {
    Blockquote = 'blockquote',
    UnorderedList = 'unordered-list-item',
    OrderedList = 'ordered-list-item',
    CodeBlock = 'code-block',
    AlignLeft = 'left',
    AlignCenter = 'center',
    AlignRight = 'right',
  }

  export class BlockType {
    icon: JSX.Element;
    block: Block;
  }

  export type OnToggle = (block: Block) => void;