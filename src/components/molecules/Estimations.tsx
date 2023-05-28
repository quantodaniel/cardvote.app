import { useRoomData } from "@/hooks/useRoomData";
import { CardUserEstimation } from "../atoms/CardUserEstimation";

export const Estimations = () => {
  const { estimations } = useRoomData();

  return (
    <div className="mb-4">
      <h3 className="text-xl">Estimations</h3>
      <div className="grid grid-cols-4 gap-4">
        {estimations.map((userEstimation) => (
          <CardUserEstimation
            key={`card-estimation-${userEstimation.uid}`}
            {...userEstimation}
          />
        ))}
      </div>
    </div>
  );
};
