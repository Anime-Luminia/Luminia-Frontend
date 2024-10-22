export const tierToEnum = (tier: string | null) => {
  switch (tier) {
    case 'S':
      return 'S';
    case 'A+':
      return 'A_PLUS';
    case 'A':
      return 'A';
    case 'B+':
      return 'B_PLUS';
    case 'B':
      return 'B';
    case 'C+':
      return 'C_PLUS';
    case 'C':
      return 'C';
    case 'D+':
      return 'D_PLUS';
    case 'D':
      return 'D';
    case 'F':
      return 'F';
    default:
      return null;
  }
};

export const scoreToTier = (tier: number | null) => {
  if (tier === null) return null;

  if (tier > 4.5 && tier <= 5.0) {
    return 'S';
  } else if (tier > 4.0 && tier <= 4.5) {
    return 'A+';
  } else if (tier > 3.5 && tier <= 4.0) {
    return 'A';
  } else if (tier > 3.0 && tier <= 3.5) {
    return 'B+';
  } else if (tier > 2.5 && tier <= 3.0) {
    return 'B';
  } else if (tier > 2.0 && tier <= 2.5) {
    return 'C+';
  } else if (tier > 1.5 && tier <= 2.0) {
    return 'C';
  } else if (tier > 1.0 && tier <= 1.5) {
    return 'D+';
  } else if (tier > 0.5 && tier <= 1.0) {
    return 'D';
  } else {
    return 'F';
  }
};
