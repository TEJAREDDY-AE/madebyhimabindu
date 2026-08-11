import React from 'react';
import { SolderPrintingScene } from './SolderPrintingScene';
import { PlacementScene } from './PlacementScene';
import { ReflowOvenScene } from './ReflowOvenScene';
import { AOIScene } from './AOIScene';

interface WorkflowSceneProps {
  activeStage: number; // 0: Printing, 1: Placement, 2: Soldering, 3: Inspection
}

export const WorkflowScene: React.FC<WorkflowSceneProps> = ({ activeStage }) => {
  return (
    <div className="w-full h-full relative">
      {activeStage === 0 && <SolderPrintingScene />}
      {activeStage === 1 && <PlacementScene />}
      {activeStage === 2 && <ReflowOvenScene />}
      {activeStage === 3 && <AOIScene />}
    </div>
  );
};
