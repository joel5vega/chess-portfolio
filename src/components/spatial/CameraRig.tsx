import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Vector3 } from 'three';

type CameraPreset = {
  position: [number, number, number];
  target: [number, number, number];
};

type CameraRigProps = {
  targetPreset: CameraPreset;
};

export function CameraRig({ targetPreset }: CameraRigProps) {
  const { camera } = useThree();
  const lookAtRef = useRef(new Vector3(0, 0, 0));

  const desiredPosition = useMemo(
    () => new Vector3(...targetPreset.position),
    [targetPreset]
  );

  const desiredTarget = useMemo(
    () => new Vector3(...targetPreset.target),
    [targetPreset]
  );

  useFrame((_, delta) => {
    const damp = 1 - Math.exp(-2.2 * delta);

    camera.position.lerp(desiredPosition, damp);
    lookAtRef.current.lerp(desiredTarget, damp);
    camera.lookAt(lookAtRef.current);
  });

  return null;
}