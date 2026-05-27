import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type CameraPreset = {
  position: [number, number, number];
  target: [number, number, number];
};

type CameraRigProps = {
  targetPreset: CameraPreset;
};

export function CameraRig({ targetPreset }: CameraRigProps) {
  const { camera } = useThree();

  const currentTarget = useMemo(() => new THREE.Vector3(), []);
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const isFirstMount = useRef(true);

  useLayoutEffect(() => {
    desiredPosition.set(...targetPreset.position);
    desiredTarget.set(...targetPreset.target);

    if (isFirstMount.current) {
      camera.position.copy(desiredPosition);
      currentTarget.copy(desiredTarget);
      isFirstMount.current = false;
    }
  }, [camera, targetPreset, desiredPosition, desiredTarget, currentTarget]);

  useFrame((_, delta) => {
    desiredPosition.set(...targetPreset.position);
    desiredTarget.set(...targetPreset.target);

    const positionAlpha = 1 - Math.exp(-10 * delta);
    const targetAlpha = 1 - Math.exp(-12 * delta);

    camera.position.lerp(desiredPosition, positionAlpha);
    currentTarget.lerp(desiredTarget, targetAlpha);
    camera.lookAt(currentTarget);
  });

  return null;
}