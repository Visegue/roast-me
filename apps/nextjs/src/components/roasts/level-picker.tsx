"use client";

import type { RoastLevel } from "@roastme/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@roastme/ui/select";

const LevelPicker: React.FC<{
  onChange?: (level: RoastLevel) => void
  disabled: boolean
}> = ({ onChange, disabled }) => {
  const onSelectChange = (value: RoastLevel) => {
    onChange?.(value);
  };

  return (
    <Select onValueChange={onSelectChange} disabled={disabled}>
      <SelectTrigger className="mx-auto border-pink-600">
        <SelectValue placeholder="Roast level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Nice">Nice</SelectItem>
        <SelectItem value="Borderline">Borderline</SelectItem>
        <SelectItem value="Ruthless">Ruthless</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LevelPicker;
