import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { GroupProps } from '@react-three/fiber';
import { CHESS_MODELS } from './chessModels';

type ChessPieceModelProps = GroupProps & {
  url: string;
  active?: boolean;
  dimmed?: boolean;
  tint?: string;
  metalness?: number;
  roughness?: number;
  targetFootprint?: number;
  targetHeight?: number;
};

const DEFAULT_TARGET_FOOTPRINT = 1.12;
const DEFAULT_TARGET_HEIGHT = 1.9;

function buildNormalizedModel(
  source: THREE.Object3D,
  {
    color,
    active,
    dimmed,
    metalness,
    roughness,
    targetFootprint,
    targetHeight,
  }: {
    color: string;
    active: boolean;
    dimmed: boolean;
    metalness: number;
    roughness: number;
    targetFootprint: number;
    targetHeight: number;
  }
) {
  const cloned = source.clone(true);
  const wrapper = new THREE.Group();
  wrapper.add(cloned);

  cloned.updateMatrixWorld(true);

  const initialBox = new THREE.Box3().setFromObject(cloned);
  const initialSize = new THREE.Vector3();
  const initialCenter = new THREE.Vector3();

  initialBox.getSize(initialSize);
  initialBox.getCenter(initialCenter);

  cloned.position.x -= initialCenter.x;
  cloned.position.z -= initialCenter.z;
  cloned.position.y -= initialBox.min.y;

  cloned.updateMatrixWorld(true);

  const normalizedBox = new THREE.Box3().setFromObject(cloned);
  const normalizedSize = new THREE.Vector3();
  normalizedBox.getSize(normalizedSize);

  const safeWidth = Math.max(normalizedSize.x, 0.0001);
  const safeDepth = Math.max(normalizedSize.z, 0.0001);
  const safeHeight = Math.max(normalizedSize.y, 0.0001);

  const footprint = Math.max(safeWidth, safeDepth);

  const scaleByFootprint = targetFootprint / footprint;
  const scaledHeight = safeHeight * scaleByFootprint;

  const finalScale =
    scaledHeight < targetHeight
      ? Math.max(scaleByFootprint, targetHeight / safeHeight)
      : scaleByFootprint;

  cloned.scale.setScalar(finalScale);
  cloned.updateMatrixWorld(true);

  const finalBox = new THREE.Box3().setFromObject(cloned);
  cloned.position.y -= finalBox.min.y;
  cloned.updateMatrixWorld(true);

  cloned.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: dimmed ? metalness * 0.45 : metalness,
        roughness: dimmed ? Math.min(roughness + 0.28, 1) : roughness,
        transparent: dimmed,
        opacity: dimmed ? 0.72 : 1,
        emissive: new THREE.Color(active ? '#7eaaff' : '#000000'),
        emissiveIntensity: active ? 0.16 : dimmed ? 0 : 0.01,
      });

      material.depthWrite = !dimmed;
      mesh.material = material;
    }
  });

  return wrapper;
}

export function ChessPieceModel({
  url,
  active = false,
  dimmed = false,
  tint = '#f5f5f5',
  metalness = 0.18,
  roughness = 0.34,
  targetFootprint = DEFAULT_TARGET_FOOTPRINT,
  targetHeight = DEFAULT_TARGET_HEIGHT,
  ...props
}: ChessPieceModelProps) {
  const gltf = useGLTF(url);

  const object = useMemo(() => {
    return buildNormalizedModel(gltf.scene, {
      color: tint,
      active,
      dimmed,
      metalness,
      roughness,
      targetFootprint,
      targetHeight,
    });
  }, [
    gltf.scene,
    tint,
    active,
    dimmed,
    metalness,
    roughness,
    targetFootprint,
    targetHeight,
  ]);

  return (
    <group {...props}>
      <primitive object={object} />
    </group>
  );
}

useGLTF.preload(CHESS_MODELS.king);
useGLTF.preload(CHESS_MODELS.queen);
useGLTF.preload(CHESS_MODELS.rook);
useGLTF.preload(CHESS_MODELS.bishop);
useGLTF.preload(CHESS_MODELS.knight);
useGLTF.preload(CHESS_MODELS.pawn);