export default function makeAIMove(squares) {
    const emptySquares = squares.reduce((acc, val, idx) => {
      if (val === null) {
        acc.push(idx);
      }
      return acc;
    }, []);
  
    if (emptySquares.length === 0) {
      return -1;
    }
  
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }
  