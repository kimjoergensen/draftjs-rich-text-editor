export enum Format {
  Indent,
  Outdent
}

export class FormatType {
  icon: JSX.Element;
  format: Format;
}

export type OnToggle = (format: Format) => void;