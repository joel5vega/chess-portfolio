export type SectionId =
  | 'identity'
  | 'leadership'
  | 'systems'
  | 'teaching'
  | 'strategy'
  | 'community';

export type BoardSquare =
  | 'A1' | 'B1' | 'C1' | 'D1' | 'E1' | 'F1' | 'G1' | 'H1'
  | 'A2' | 'B2' | 'C2' | 'D2' | 'E2' | 'F2' | 'G2' | 'H2'
  | 'A3' | 'B3' | 'C3' | 'D3' | 'E3' | 'F3' | 'G3' | 'H3'
  | 'A4' | 'B4' | 'C4' | 'D4' | 'E4' | 'F4' | 'G4' | 'H4'
  | 'A5' | 'B5' | 'C5' | 'D5' | 'E5' | 'F5' | 'G5' | 'H5'
  | 'A6' | 'B6' | 'C6' | 'D6' | 'E6' | 'F6' | 'G6' | 'H6'
  | 'A7' | 'B7' | 'C7' | 'D7' | 'E7' | 'F7' | 'G7' | 'H7'
  | 'A8' | 'B8' | 'C8' | 'D8' | 'E8' | 'F8' | 'G8' | 'H8';

export type NavItem = {
  id: SectionId;
  piece: string;
  label: string;
  position: BoardSquare;
  focus: string;
  pieceName: string;
  description: string;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
  };
  zone: {
    square: BoardSquare;
    color: string;
  };
};

export const BOARD_SIZE = 8;
export const TILE_SIZE = 1.4;

export const squareToWorld = (square: BoardSquare): [number, number, number] => {
  const file = square.charCodeAt(0) - 65;
  const rank = Number(square[1]) - 1;

  const x = (file - 3.5) * TILE_SIZE;
  const z = ((7 - rank) - 3.5) * TILE_SIZE;

  return [x, 0.02, z];
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'identity',
    piece: '♔',
    label: 'Identity',
    position: 'E1',
    focus: 'Mission & Philosophy',
    pieceName: 'King',
    description: 'Centralized king. Quiet confidence, purpose, and stable identity.',
    camera: {
      position: [1.1, 5.8, 8.6],
      target: [0.7, 0, 4.9],
    },
    zone: {
      square: 'E1',
      color: '#8eb6ff',
    },
  },
  {
    id: 'leadership',
    piece: '♕',
    label: 'Leadership',
    position: 'D4',
    focus: 'Experience & Impact',
    pieceName: 'Queen',
    description: 'Coordinated influence. Leadership as orchestration and guidance.',
    camera: {
      position: [1.6, 4.6, 4.8],
      target: [-0.7, 0, 0.7],
    },
    zone: {
      square: 'D4',
      color: '#91b8ff',
    },
  },
  {
    id: 'systems',
    piece: '♖',
    label: 'Systems',
    position: 'A1',
    focus: 'Projects & Infrastructure',
    pieceName: 'Rook',
    description: 'Connected rooks. Architecture, reliability, and execution.',
    camera: {
      position: [-6.7, 4.6, 8.2],
      target: [-4.9, 0, 4.9],
    },
    zone: {
      square: 'A1',
      color: '#4f8fff',
    },
  },
  {
    id: 'teaching',
    piece: '♗',
    label: 'Teaching',
    position: 'C3',
    focus: 'Education & Mentorship',
    pieceName: 'Bishop',
    description: 'Long diagonal control. Teaching as guidance, vision, and formation.',
    camera: {
      position: [-3.9, 5.2, 5.6],
      target: [-2.1, 0, 2.1],
    },
    zone: {
      square: 'C3',
      color: '#b3ceff',
    },
  },
  {
    id: 'strategy',
    piece: '♘',
    label: 'Strategy',
    position: 'F5',
    focus: 'Analytics & Thinking',
    pieceName: 'Knight',
    description: 'Knight outpost. Non-linear thinking, calculated creativity, deep analysis.',
    camera: {
      position: [4.6, 5.5, 2.4],
      target: [2.1, 0, -0.7],
    },
    zone: {
      square: 'F5',
      color: '#9fc4ff',
    },
  },
  {
    id: 'community',
    piece: '♙',
    label: 'Community',
    position: 'H8',
    focus: 'Contact & Connection',
    pieceName: 'Pawn',
    description: 'Promotion path. Growth, service, and human impact.',
    camera: {
      position: [7.2, 4.2, -4.2],
      target: [4.9, 0, -4.9],
    },
    zone: {
      square: 'H8',
      color: '#d2e2ff',
    },
  },
];

export const NAV_MAP = Object.fromEntries(
  NAV_ITEMS.map((item) => [item.id, item])
) as Record<SectionId, NavItem>;