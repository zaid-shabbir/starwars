import { Character } from "@/types";

export interface CharacterCardProps {
  data: Character;
  handleClick: () => void;
}

export interface CharacterDialogProps {
  open: boolean;
  onClose: () => void;
  data: Character | null;
}

export interface SearchProps {
  onChange: (event: any) => void;
}
