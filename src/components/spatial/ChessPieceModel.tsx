import { useGLTF } from '@react-three/drei';
import type { GroupProps } from '@react-three/fiber';

type ChessPieceModelProps = GroupProps & {
  url: string;
  color?: string;
};

export function ChessPieceModel({
  url,
  color = '#fafafa',
  ...props
}: ChessPieceModelProps) {
  const gltf = useGLTF(url);

  return (
    <primitive
      object={gltf.scene.clone()}
      {...props}
    />
  );
}