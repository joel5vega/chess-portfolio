import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { SectionId } from '../../data/navigation';
import { NAV_ITEMS } from '../../data/navigation';
import { ChessPieceModel } from './ChessPieceModel';
import { CHESS_MODELS } from './chessModels';
import { PromotionBurst } from './PromotionBurst';

type PromotionTransitionProps = {
  position: [number, number, number];
  active: boolean;
};

export function PromotionTransition({
  position,
  active,
}: PromotionTransitionProps) {
  const [phase, setPhase] = useState<'pawn' | 'animating' | 'queen'>(
    active ? 'queen' : 'pawn'
  );

  const progress = useRef(active ? 1 : 0);
  const burstShown = useRef(false);

  useEffect(() => {
    if (active) {
      setPhase('animating');
      burstShown.current = false;
    } else {
      progress.current = 0;
      burstShown.current = false;
      setPhase('pawn');
    }
  }, [active]);

  useFrame((_, delta) => {
    if (phase !== 'animating') return;

    progress.current = Math.min(progress.current + delta * 1.8, 1);

    if (progress.current >= 0.5 && !burstShown.current) {
      burstShown.current = true;
    }

    if (progress.current >= 1) {
      setPhase('queen');
    }
  });

  const communityItem =
    NAV_ITEMS.find((entry) => entry.id === 'community') || NAV_ITEMS[0];

  const t = progress.current;
  const pawnLift = t < 0.5 ? t / 0.5 : 1;
  const queenEnter = t < 0.35 ? 0 : (t - 0.35) / 0.65;

  const pawnVisible = phase === 'pawn' || phase === 'animating';
  const queenVisible = phase === 'queen' || phase === 'animating';

  const pawnY = position[1] + pawnLift * 0.22;
  const queenY = position[1] + (1 - queenEnter) * 0.38;
  const queenScale = 0.82 + queenEnter * 0.18;

  return (
    <group>
      {pawnVisible && (
        <group
          position={[position[0], pawnY, position[2]]}
          scale={[
            1 - Math.min(t, 0.5) * 0.18,
            1 + Math.min(t, 0.5) * 0.12,
            1 - Math.min(t, 0.5) * 0.18,
          ]}
        >
          <ChessPieceModel
            url={CHESS_MODELS.pawn}
            active={phase === 'pawn'}
            dimmed={false}
            tint="#f5f5f5"
            targetFootprint={1.0}
            targetHeight={1.7}
          />
        </group>
      )}

      {queenVisible && (
        <group
          position={[position[0], queenY, position[2]]}
          scale={[queenScale, queenScale, queenScale]}
        >
          <ChessPieceModel
            url={CHESS_MODELS.queen}
            active={active}
            dimmed={false}
            tint="#ffffff"
            roughness={0.32}
            metalness={0.24}
            targetFootprint={1.02}
            targetHeight={1.9}
          />
        </group>
      )}

      {(phase === 'animating' || phase === 'queen') && burstShown.current && (
        <PromotionBurst
          position={[position[0], position[1] + 0.02, position[2]]}
          color={communityItem.zone.color}
        />
      )}
    </group>
  );
}