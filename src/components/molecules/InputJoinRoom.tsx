export const InputJoinRoom = () => {
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Room Number"
        />
        <button className="btn btn-primary">join room</button>
      </div>
    </div>
  );
};
