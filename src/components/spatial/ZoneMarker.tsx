type ZoneMarkerProps = {
  position: [number, number, number];
  color: string;
  active: boolean;
};

export function ZoneMarker({ position, color, active }: ZoneMarkerProps) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.24, 0.44, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={active ? 0.9 : 0.14}
        />
      </mesh>

      <mesh position={[0, active ? 0.26 : 0.14, 0]}>
        <sphereGeometry args={[active ? 0.075 : 0.05, 24, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={active ? 0.92 : 0.38}
        />
      </mesh>
    </group>
  );
}