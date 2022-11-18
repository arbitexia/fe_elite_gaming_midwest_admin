export interface DropdownItems {
  text: string;
  isSelected: boolean;
  route?: string;
  disabled?: boolean;
}

export interface MenuItemObj {
  id: number;
  text: string;
  isSelected: boolean;
  dropdown?: DropdownItems[];
  route?: string;
  disabled?: boolean;
  isService?: boolean;
}
