export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  if (chunkSize === 0) {
    throw Error("0 size chunks will cause an infinite loop");
  }

  const chunks: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return chunks;
};
