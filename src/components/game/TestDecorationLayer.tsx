import { testDecorations, gridToWorld } from '../../config/testDecorations';

export const TestDecorationLayer = () => {
  return (
    <group name="test-decorations">
      {testDecorations.map((deco) => {
        const worldPos = gridToWorld(
          deco.gridPosition.x,
          deco.gridPosition.z,
          deco.yOffset || 0
        );

        const Component = deco.Component;

        return (
          <Component
            key={deco.id}
            position={[worldPos.x, worldPos.y, worldPos.z]}
            rotation={deco.rotation || [0, 0, 0]}
            scale={deco.scale || 1}
            gridPosition={deco.gridPosition}
          />
        );
      })}
    </group>
  );
};
