const KEYWORDS = ["proffesional", "casual", "fun", "friendly"];

export default function Keywords() {
  return (
    <>
      <div>
        {KEYWORDS.map((word) => {
          return (
            <div key={word}>
              <input type="checkbox" name={word} id={word} />
              <label>{word}</label>
            </div>
          );
        })}
      </div>
    </>
  );
}
