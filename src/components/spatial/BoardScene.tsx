import { Float, Line, Stars } from '@react-three/drei';
import {
  BOARD_SIZE,
  NAV_ITEMS,
  TILE_SIZE,
  squareToWorld,
  type BoardSquare,
  type SectionId,
} from '../../data/navigation';
import { ZoneMarker } from './ZoneMarker';
import { ChessPieceModel } from './ChessPieceModel';
import { CHESS_MODELS } from './chessModels';

type BoardSceneProps = {
  activeSection: SectionId;
  previewSection?: SectionId | null;
};

const FILES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

function BoardTiles() {
  const tiles = [];

  for (let rank = 1; rank <= BOARD_SIZE; rank += 1) {
    for (let file = 0; file < BOARD_SIZE; file += 1) {
      const square = `${FILES[file]}${rank}` as BoardSquare;
      const [x, y, z] = squareToWorld(square);
      const isDark = (file + rank) % 2 === 0;

      tiles.push(
        <mesh
          key={square}
          position={[x, y, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
          <meshStandardMaterial
            color={isDark ? '#151515' : '#f1f1f1'}
            roughness={0.92}
          />
        </mesh>
      );
    }
  }

  return <group>{tiles}</group>;
}

function BoardFrame() {
  return (
    <mesh
      position={[0, -0.02, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[TILE_SIZE * 8.6, TILE_SIZE * 8.6]} />
      <meshStandardMaterial color="#0b0b0b" metalness={0.08} roughness={0.9} />
    </mesh>
  );
}

function ControlledSquares({ section }: { section: SectionId }) {
  const item = NAV_ITEMS.find((entry) => entry.id === section) || NAV_ITEMS[0];
  const color = item.zone.color;

  const map: Record<SectionId, BoardSquare[]> = {
    identity: ['B4', 'C4', 'D4', 'B5', 'D5', 'B6', 'C6', 'D6'],
    leadership: ['D7', 'D6', 'D5', 'D4', 'E7', 'F7', 'E6', 'F5', 'C6', 'B5', 'E8', 'C8'],
    systems: ['A1', 'A2', 'A3', 'A5', 'A6', 'A7', 'A8', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4'],
    teaching: ['D3', 'E4', 'F5', 'G6', 'B1', 'B3', 'A4'],
    strategy: ['D3', 'D5', 'E2', 'E6', 'G2', 'G6', 'H3', 'H5'],
    community: ['H8', 'G7', 'G8', 'H7'],
  };

  return (
    <>
      {map[section].map((square) => {
        const [x, , z] = squareToWorld(square);

        return (
          <mesh
            key={square}
            position={[x, 0.035, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[TILE_SIZE * 0.92, TILE_SIZE * 0.92]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
        );
      })}
    </>
  );
}

function InfluenceLines({ section }: { section: SectionId }) {
  const get = (square: BoardSquare, y = 0.085) => {
    const [x, baseY, z] = squareToWorld(square);
    return [x, baseY + y, z] as [number, number, number];
  };

  const colorMap = Object.fromEntries(
    NAV_ITEMS.map((item) => [item.id, item.zone.color])
  ) as Record<SectionId, string>;

  const activeColor = colorMap[section];

  const lineProps = {
    color: activeColor,
    lineWidth: 2.2,
    transparent: true,
    opacity: 0.78,
  } as const;

  if (section === 'identity') {
    const king = get('C5');

    return (
      <>
        <Line points={[king, get('B4')]} {...lineProps} />
        <Line points={[king, get('C4')]} {...lineProps} />
        <Line points={[king, get('D4')]} {...lineProps} />
        <Line points={[king, get('B5')]} {...lineProps} />
        <Line points={[king, get('D5')]} {...lineProps} />
        <Line points={[king, get('B6')]} {...lineProps} />
        <Line points={[king, get('C6')]} {...lineProps} />
        <Line points={[king, get('D6')]} {...lineProps} />
      </>
    );
  }

  if (section === 'leadership') {
    return (
      <>
        <Line points={[get('D7'), get('D6'), get('D5')]} {...lineProps} />
        <Line points={[get('D7'), get('E6'), get('F5')]} {...lineProps} />
        <Line points={[get('D7'), get('C6'), get('B5')]} {...lineProps} />
        <Line points={[get('D7'), get('E7'), get('F7')]} {...lineProps} />
      </>
    );
  }

  if (section === 'systems') {
    return (
      <>
        <Line points={[get('A4'), get('A2')]} {...lineProps} />
        <Line points={[get('A4'), get('A6')]} {...lineProps} />
        <Line points={[get('A4'), get('C4')]} {...lineProps} />
      </>
    );
  }

  if (section === 'teaching') {
    return (
      <Line
        points={[get('C2'), get('D3'), get('E4'), get('F5'), get('G6')]}
        {...lineProps}
      />
    );
  }

  if (section === 'strategy') {
    return (
      <>
        <Line points={[get('F4'), get('D3')]} {...lineProps} />
        <Line points={[get('F4'), get('D5')]} {...lineProps} />
        <Line points={[get('F4'), get('E2')]} {...lineProps} />
        <Line points={[get('F4'), get('E6')]} {...lineProps} />
        <Line points={[get('F4'), get('G2')]} {...lineProps} />
        <Line points={[get('F4'), get('G6')]} {...lineProps} />
        <Line points={[get('F4'), get('H3')]} {...lineProps} />
        <Line points={[get('F4'), get('H5')]} {...lineProps} />
      </>
    );
  }

  if (section === 'community') {
    return (
      <Line
        points={[get('H8'), get('G7'), get('F6'), get('E5')]}
        {...lineProps}
      />
    );
  }

  return null;
}

function PromotionBurst({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.12}>
      <group position={[position[0], position[1] + 0.08, position[2]]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.64, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.26} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <ringGeometry args={[0.72, 0.94, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.14} />
        </mesh>

        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.12, 20, 20]} />
          <meshBasicMaterial color={color} transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

function SymbolicPieces({
  activeSection,
  previewSection,
}: {
  activeSection: SectionId;
  previewSection?: SectionId | null;
}) {
  const c5 = squareToWorld('C5');
  const e5 = squareToWorld('E5');
  const f4 = squareToWorld('F4');
  const c2 = squareToWorld('C2');
  const d7 = squareToWorld('D7');
  const a4 = squareToWorld('A4');
  const h8 = squareToWorld('H8');

  const communityItem =
    NAV_ITEMS.find((entry) => entry.id === 'community') || NAV_ITEMS[0];

  const showPromotion = activeSection === 'community';
  const showPromotionPreview =
    previewSection === 'community' && activeSection !== 'community';

  return (
    <group>
      <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.06}>
        <ChessPieceModel
          key="white-king-c5"
          url={CHESS_MODELS.king}
          position={[c5[0], 0.03, c5[2]]}
          active={activeSection === 'identity'}
          tint="#f5f5f5"
        />
      </Float>

      <ChessPieceModel
        key="black-king-e5"
        url={CHESS_MODELS.king}
        position={[e5[0], 0.03, e5[2]]}
        active={false}
        tint="#4046b5"
        roughness={0.42}
        metalness={0.12}
      />

      <ChessPieceModel
        key="white-knight-f4"
        url={CHESS_MODELS.knight}
        position={[f4[0], 0.03, f4[2]]}
        rotation={[0, Math.PI / 10, 0]}
        active={activeSection === 'strategy'}
        tint="#f5f5f5"
      />

      <ChessPieceModel
        key="white-bishop-c2"
        url={CHESS_MODELS.bishop}
        position={[c2[0], 0.03, c2[2]]}
        active={activeSection === 'teaching'}
        tint="#f5f5f5"
      />

      <ChessPieceModel
        key="white-queen-d7"
        url={CHESS_MODELS.queen}
        position={[d7[0], 0.03, d7[2]]}
        active={activeSection === 'leadership'}
        tint="#f5f5f5"
      />

      <ChessPieceModel
        key="white-rook-a4"
        url={CHESS_MODELS.rook}
        position={[a4[0], 0.03, a4[2]]}
        active={activeSection === 'systems'}
        tint="#f5f5f5"
      />

      {!showPromotion && (
        <ChessPieceModel
          key="white-pawn-h8"
          url={CHESS_MODELS.pawn}
          position={[h8[0], 0.03, h8[2]]}
          active={showPromotionPreview}
          tint="#f5f5f5"
        />
      )}

      {showPromotionPreview && (
        <PromotionBurst
          position={[h8[0], 0.03, h8[2]]}
          color={communityItem.zone.color}
        />
      )}

      {showPromotion && (
        <group>
          <Float speed={1} rotationIntensity={0.04} floatIntensity={0.08}>
            <ChessPieceModel
              key="promotion-queen-h8"
              url={CHESS_MODELS.queen}
              position={[h8[0], 0.03, h8[2]]}
              active
              tint="#ffffff"
              roughness={0.32}
              metalness={0.24}
            />
          </Float>

          <PromotionBurst
            position={[h8[0], 0.03, h8[2]]}
            color={communityItem.zone.color}
          />
        </group>
      )}
    </group>
  );
}


export function BoardScene({ activeSection, previewSection }: BoardSceneProps) {
  const previewItem = previewSection
    ? NAV_ITEMS.find((item) => item.id === previewSection) ?? null
    : null;

  const previewWorld = previewItem ? squareToWorld(previewItem.zone.square) : null;
  const sectionForBoard = activeSection === 'community'
    ? activeSection
    : previewSection ?? activeSection;

  return (
    <>
      <color attach="background" args={['#e9edf3']} />
      <fog attach="fog" args={['#e9edf3', 10, 22]} />

      <ambientLight intensity={0.82} />
      <directionalLight
        position={[6, 9, 4]}
        intensity={1.25}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 5, 0]} intensity={0.35} color="#cfdcff" />

      <Stars
        radius={40}
        depth={10}
        count={280}
        factor={0.8}
        saturation={0}
        fade
        speed={0.14}
      />

      <BoardFrame />
      <BoardTiles />
      <ControlledSquares section={sectionForBoard} />
      <InfluenceLines section={sectionForBoard} />

      {NAV_ITEMS.map((item) => {
        const world = squareToWorld(item.zone.square);

        return (
          <ZoneMarker
            key={item.id}
            position={world}
            color={item.zone.color}
            active={item.id === activeSection || item.id === previewSection}
          />
        );
      })}

      <SymbolicPieces
        activeSection={activeSection}
        previewSection={previewSection}
      />

      {previewItem && previewWorld && previewItem.id !== activeSection && (
        <mesh position={[previewWorld[0], 0.08, previewWorld[2]]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial
            color={previewItem.zone.color}
            transparent
            opacity={0.55}
          />
        </mesh>
      )}
    </>
  );
}