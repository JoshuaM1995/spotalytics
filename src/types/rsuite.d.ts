declare module "rsuite" {
  import { ReactNode } from "react";

  export interface TableColumnProps {
    children?: ReactNode;
    width?: number;
    align?: "left" | "center" | "right";
    resizable?: boolean;
    sortable?: boolean;
    fixed?: boolean;
    flexGrow?: number;
    minWidth?: number;
    [key: string]: any;
  }

  // Re-export all components as any to avoid type issues
  export const Table: any;
  export const Column: any;
  export const HeaderCell: any;
  export const Cell: any;
  export const Container: any;
  export const Badge: any;
  export const Col: any;
  export const Icon: any;
  export const IconButton: any;
  export const Panel: any;
  export const Rate: any;
  export const Row: any;
  export const Loader: any;
  export const FlexboxGrid: any;
  export const List: any;
  export const Placeholder: any;
  export const TagPicker: any;
  export const Content: any;
  export const Nav: any;
  export const PanelGroup: any;
  export const Progress: any;
  export const SelectPicker: any;
  export const Alert: any;
  export const Message: any;
  export const Button: any;
  export const ControlLabel: any;
  export const Form: any;
  export const HelpBlock: any;
  export const Slider: any;
  export const Tag: any;
  export const InputNumber: any;
  export const FormGroup: any;
  export const InputPicker: any;
  export const Input: any;
  export const Modal: any;
  export const Notification: any;
  export const Dropdown: any;
  export const Sidebar: any;
  export const Sidenav: any;
  export const Header: any;
  export const Tooltip: any;
  export const Navbar: any;
}
