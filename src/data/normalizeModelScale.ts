import * as THREE from 'three';

export function normalizeModelScale(
  object: THREE.Object3D,
  targetHeight = 1.9
) {
  object.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);

  const currentHeight = size.y;

  if (!currentHeight || Number.isNaN(currentHeight)) return 1;

  const scale = targetHeight / currentHeight;
  object.scale.setScalar(scale);
  object.updateMatrixWorld(true);

  return scale;
}