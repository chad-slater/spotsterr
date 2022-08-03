export const instruments = {
  25: "Guitar Acoustic Steel",
  26: "Guitar Jazz",
  27: "Guitar Clean",
  30: "Guitar Distortion/Overdriven",
  33: "Bass Electric Finger",
  34: "Bass Electric",
  1024: "Drums",
};

export const tuningToPitch = (tuning) => {
  const pitch = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  return tuning.map((tune) => {
    const octave = Math.floor(tune / 12) - 1;
    return pitch[tuning % 12] + octave;
  });
};
