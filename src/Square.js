function Square(props) {
  return (
    <button
      className={props.winSquare ? "win-square" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
export default Square;