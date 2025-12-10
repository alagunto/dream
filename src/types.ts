export interface State {
  max_turns: number;
  turn: number;
  phase: "opening" | "exploring" | "reflecting";
  metaphors: string[];
  morpheus: string[];
  before_raw: string | null;
  before_summary: string | null;
}

export interface MorpheusOpts {
  isClosing?: boolean;
  emotionalJourney?: string;
  phase?: string;
}
