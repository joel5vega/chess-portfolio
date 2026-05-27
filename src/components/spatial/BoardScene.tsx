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

type BoardSceneProps = {
  activeSection: SectionId;
  previewSection?: SectionId | null;
};

const FILES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

function BoardTiles() {
  const tiles: JSX.Element[] = [];

  for (let rank = 1; rank <= BOARD_SIZE; rank += 1) {
    for (let file = 0; file < BOARD_SIZE; file += 1) {
      const square = `${FILES[file]}${rank}` as BoardSquare;
      const [x, y, z] = squareToWorld(square);
      const isDark = (file + rank) % 2 === 0;

      tiles.push(
        <mesh key={square} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
          <meshStandardMaterial color={isDark ? '#1a1a1a' : '#f2f2f2'} />
        </mesh>
      );
    }
  }

  return <group>{tiles}</group>;
}

function BoardFrame() {
  return (
    <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[TILE_SIZE * 8.6, TILE_SIZE * 8.6]} />
      <meshStandardMaterial color="#0d0d0d" metalness={0.08} roughness={0.88} />
    </mesh>
  );
}

function ControlledSquares({ activeSection }: { activeSection: SectionId }) {
  const item = NAV_ITEMS.find((entry) => entry.id === activeSection) || NAV_ITEMS[0];
  const color = item.zone.color;

  const map: Record<SectionId, BoardSquare[]> = {
    identity: ['D1', 'E1', 'F1', 'E2'],
    leadership: ['D4', 'C5', 'E5', 'B6', 'F6', 'C3', 'E3'],
    systems: ['A1', 'H1'],
    teaching: ['B2', 'C3', 'D4', 'E5', 'F6', 'G7'],
    strategy: ['F5', 'E7', 'G7', 'D6', 'D4', 'E3', 'G3', 'H4'],
    community: ['H8', 'H7', 'H6', 'H5', 'H4', 'G8'],
  };

  return (
    <>
      {map[activeSection].map((square) => {
        const [x, , z] = squareToWorld(square);

        return (
          <mesh
            key={square}
            position={[x, 0.035, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[TILE_SIZE * 0.92, TILE_SIZE * 0.92]} />
            <meshBasicMaterial color={color} transparent opacity={0.11} />
          </mesh>
        );
      })}
    </>
  );
}

function InfluenceLines({ activeSection }: { activeSection: SectionId }) {
  const get = (square: BoardSquare) => {
    const [x, y, z] = squareToWorld(square);
    return [x, y + 0.02, z] as [number, number, number];
  };

  const colorMap = Object.fromEntries(
    NAV_ITEMS.map((item) => [item.id, item.zone.color])
  ) as Record<SectionId, string>;

  const activeColor = colorMap[activeSection];

  if (activeSection === 'systems') {
    return (
      <Line
        points={[get('A1'), get('H1')]}
        color={activeColor}
        lineWidth={2}
        transparent
        opacity={0.45}
      />
    );
  }

  if (activeSection === 'teaching') {
    return (
      <Line
        points={[get('B2'), get('C3'), get('D4'), get('E5'), get('F6'), get('G7')]}
        color={activeColor}
        lineWidth={1.8}
        transparent
        opacity={0.34}
      />
    );
  }

  if (activeSection === 'strategy') {
    return (
      <>
        <Line points={[get('F5'), get('E7')]} color={activeColor} lineWidth={1.4} transparent opacity={0.24} />
        <Line points={[get('F5'), get('G7')]} color={activeColor} lineWidth={1.4} transparent opacity={0.24} />
        <Line points={[get('F5'), get('D6')]} color={activeColor} lineWidth={1.4} transparent opacity={0.24} />
        <Line points={[get('F5'), get('D4')]} color={activeColor} lineWidth={1.4} transparent opacity={0.24} />
        <Line points={[get('F5'), get('E3')]} color={activeColor} lineWidth={1.4} transparent opacity={0.24} />
        <Line points={[get('F5'), get('G3')]} color={activeColor} lineWidth={1.4} transparent opacity={0.24} />
        <Line points={[get('F5'), get('H4')]} color={activeColor} lineWidth={1.4} transparent opacity={0.24} />
      </>
    );
  }

  if (activeSection === 'community') {
    return (
      <Line
        points={[get('H8'), get('H7'), get('H6'), get('H5'), get('H4')]}
        color={activeColor}
        lineWidth={1.8}
        transparent
        opacity={0.28}
      />
    );
  }

  if (activeSection === 'leadership') {
    return (
      <Line
        points={[get('D4'), get('C5'), get('E5'), get('F6'), get('E3'), get('D4')]}
        color={activeColor}
        lineWidth={1.6}
        transparent
        opacity={0.26}
      />
    );
  }

  return (
    <>
      <Line
        points={[get('D1'), get('E1'), get('F1')]}
        color={activeColor}
        lineWidth={1.2}
        transparent
        opacity={0.22}
      />
      <Line
        points={[get('E1'), get('E2')]}
        color={activeColor}
        lineWidth={1.2}
        transparent
        opacity={0.22}
      />
    </>
  );
}

function SymbolicPieces({ activeSection }: { activeSection: SectionId }) {
  const item = NAV_ITEMS.find((entry) => entry.id === activeSection) || NAV_ITEMS[0];
  const color = item.zone.color;
  const base = squareToWorld(item.zone.square);
  const center: [number, number, number] = [base[0], 0.02, base[2]];

  if (activeSection === 'systems') {
    const a1 = squareToWorld('A1');
    const h1 = squareToWorld('H1');

    return (
      <group>
        <mesh position={[a1[0], 0.55, a1[2]]}>
          <boxGeometry args={[0.36, 0.92, 0.36]} />
          <meshStandardMaterial color="#fafafa" emissive={color} emissiveIntensity={0.16} />
        </mesh>
        <mesh position={[h1[0], 0.55, h1[2]]}>
          <boxGeometry args={[0.36, 0.92, 0.36]} />
          <meshStandardMaterial color="#fafafa" emissive={color} emissiveIntensity={0.16} />
        </mesh>
      </group>
    );
  }

  if (activeSection === 'teaching') {
    return (
      <mesh position={[center[0], 0.72, center[2]]}>
        <coneGeometry args={[0.22, 0.92, 24]} />
        <meshStandardMaterial color="#fafafa" emissive={color} emissiveIntensity={0.14} />
      </mesh>
    );
  }

  if (activeSection === 'strategy') {
    return (
      <mesh position={[center[0], 0.72, center[2]]}>
        <torusKnotGeometry args={[0.18, 0.06, 96, 16]} />
        <meshStandardMaterial color="#fafafa" emissive={color} emissiveIntensity={0.14} />
      </mesh>
    );
  }

  if (activeSection === 'leadership') {
    const c5 = squareToWorld('C5');
    const e5 = squareToWorld('E5');

    return (
      <group>
        <mesh position={[center[0], 0.84, center[2]]}>
          <cylinderGeometry args={[0.18, 0.24, 1.08, 24]} />
          <meshStandardMaterial color="#fafafa" emissive={color} emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[c5[0], 0.5, c5[2]]}>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshStandardMaterial color="#fafafa" emissive={color} emissiveIntensity={0.16} />
        </mesh>
        <mesh position={[e5[0], 0.5, e5[2]]}>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshStandardMaterial color="#fafafa" emissive={color} emissiveIntensity={0.16} />
        </mesh>
      </group>
    );
  }

  if (activeSection === 'community') {
    const h4 = squareToWorld('H4');

    return (
      <group>
        <mesh position={[center[0], 0.45, center[2]]}>
          <cylinderGeometry args={[0.13, 0.18, 0.55, 24]} />
          <meshStandardMaterial color="#fafafa" emissive={color} emissiveIntensity={0.12} />
        </mesh>
        <mesh position={[h4[0], 1.02, h4[2]]}>
          <octahedronGeometry args={[0.18]} />
          <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={0.18} />
        </mesh>
      </group>
    );
  }

  return (
    <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.2}>
      <mesh position={[center[0], 0.8, center[2]]}>
        <cylinderGeometry args={[0.22, 0.28, 0.95, 32]} />
        <meshStandardMaterial
          color="#fafafa"
          metalness={0.15}
          roughness={0.25}
          emissive={color}
          emissiveIntensity={0.14}
        />
      </mesh>
      <mesh position={[center[0], 1.3, center[2]]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

export function BoardScene({ activeSection, previewSection }: BoardSceneProps) {
  const previewItem = previewSection
    ? NAV_ITEMS.find((item) => item.id === previewSection) ?? null
    : null;

  const previewWorld = previewItem ? squareToWorld(previewItem.zone.square) : null;

  return (
    <>
      <color attach="background" args={['#e9edf3']} />
      <fog attach="fog" args={['#e9edf3', 10, 22]} />

      <ambientLight intensity={0.95} />
      <directionalLight position={[6, 9, 4]} intensity={1.15} color="#ffffff" />
      <pointLight position={[0, 5, 0]} intensity={0.45} color="#cfdcff" />

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
      <ControlledSquares activeSection={activeSection} />
      <InfluenceLines activeSection={activeSection} />

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

      <SymbolicPieces activeSection={activeSection} />

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