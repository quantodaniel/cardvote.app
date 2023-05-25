import { ButtonCreateRoom } from "../molecules/ButtonCreateRoom";
import { InputJoinRoom } from "../molecules/InputJoinRoom";

export const HomeHero = () => {
  return (
    <div className="hero py-16 bg-base-200">
      <div className="hero-content flex-col">
        <ButtonCreateRoom />
        <div className="divider">OR</div>
        <InputJoinRoom />
      </div>
    </div>
  );
};
