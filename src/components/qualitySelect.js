export function QualitySelect({ setQuality }) {
  function changeQuality(e) {
    setQuality(() => Number(e.target.value));
  }
  return (
    <div className="qualitySelect">
      <p>Quality</p>
      <select id="select" onChange={changeQuality}>
        {Array.from({ length: 9 }, (_, idx) => {
          return (
            <option id="option" key={idx} value={idx * 10 + 10}>
              {idx * 10 + 10}%
            </option>
          );
        })}
      </select>
    </div>
  );
}
