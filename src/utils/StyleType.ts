// Do not change the values of these enums!
// They are draft.js specific.
export enum Style {
  HeaderOne = 'header-one',
  HeaderTwo = 'header-two',
  HeaderThree = 'header-three',
  Bold = 'BOLD',
  Italic = 'ITALIC',
  Underline = 'UNDERLINE',
  Blockquote = 'blockquote',
  UnorderedList = 'unordered-list-item',
  OrderedList = 'ordered-list-item',
  Code = 'CODE',
  CodeBlock = 'code-block',
  AlignLeft = 'left',
  AlignCenter = 'center',
  AlignRight = 'right'
}

export class StyleType {
  icon: JSX.Element;
  style: Style;
}

export type OnToggle = (style: Style) => void;