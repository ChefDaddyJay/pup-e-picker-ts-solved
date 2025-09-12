import { ReactNode } from "react";

export type Dog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};

export type Tab = {
  label: string;
  content: ReactNode;
};

export type TTabKey = "all" | "favorite" | "unfavorite" | "create";

export type TTabSet = Record<TTabKey, Tab>;
