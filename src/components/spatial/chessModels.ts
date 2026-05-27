const base = import.meta.env.BASE_URL;

export const CHESS_MODELS = {
  king: `${base}models/rey.glb`,
  queen: `${base}models/dama.glb`,
  rook: `${base}models/torre.glb`,
  bishop: `${base}models/alfil.glb`,
  knight: `${base}models/caballo.glb`,
  pawn: `${base}models/peon.glb`,
} as const;