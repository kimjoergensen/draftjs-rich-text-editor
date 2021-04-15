/*Do not change the values of these enums!
  They are draft.js specific.*/
export enum Style {
  HeaderOne = 'header-one',
  HeaderTwo = 'header-two',
  HeaderThree = 'header-three',
  Bold = 'BOLD',
  Italic = 'ITALIC',
  Underline = 'UNDERLINE',
  Code = 'CODE',
}

export class StyleType {
  icon: JSX.Element;
  style: Style;
}

export type OnToggle = (style: Style) => void;