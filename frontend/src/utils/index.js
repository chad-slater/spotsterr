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

export const instruments = {
  4: "Piano Electric Honher Electra",
  14: "Tubular Bells",
  25: "Guitar Acoustic Steel",
  26: "Guitar Jazz",
  27: "Guitar Clean",
  30: "Guitar Distortion/Overdriven",
  33: "Bass Electric Finger",
  34: "Bass Electric",
  44: "Strings Tremolo",
  66: "Vocals Sax Tenor",
  67: "Vocals Sax Baritone",
  74: "Recorder",
  81: "Vocals Sax/Clarinet Tenor",
  85: "Vocals Lead 6",
  1024: "Drums",
};
