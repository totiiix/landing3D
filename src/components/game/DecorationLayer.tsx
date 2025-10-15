import { PropModel } from './PropModel';
import { decorations, gridToWorld } from '../../config/decorations';

export const DecorationLayer = () => {
  return (
    <group name="decorations">
      {decorations.map((deco) => {
        const worldPos = gridToWorld(
          deco.gridPosition.x,
          deco.gridPosition.z,
          deco.yOffset || 0
        );

        return (
          <PropModel
            key={deco.id}
            modelPath={deco.modelPath}
            position={[worldPos.x, worldPos.y, worldPos.z]}
            rotation={deco.rotation}
            scale={deco.scale}
          />
        );
      })}
    </group>
  );
};
