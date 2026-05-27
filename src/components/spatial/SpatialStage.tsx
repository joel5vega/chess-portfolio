import { Canvas } from '@react-three/fiber';
import type { NavItem, SectionId } from '../../data/navigation';
import { CameraRig } from './CameraRig';
import { BoardScene } from './BoardScene';

type SpatialStageProps = {
  activeItem: NavItem;
  previewItem: NavItem | null;
  previewSection?: SectionId | null;
};

export function SpatialStage({
  activeItem,
  previewItem,
  previewSection,
}: SpatialStageProps) {
  const target = previewItem || activeItem;

  return (
    <div className="spatial-stage" aria-hidden="true">
      <Canvas
        camera={{ position: activeItem.camera.position, fov: 40 }}
        dpr={[1, 1.8]}
      >
        <CameraRig targetPreset={target.camera} />
        <BoardScene
          activeSection={activeItem.id}
          previewSection={previewSection}
        />
      </Canvas>
    </div>
  );
}