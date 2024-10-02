export const createIdGenerator = (prefix: string) => {
  let idCounter = 0;
  return () => {
    const id = prefix + idCounter;
    idCounter = (idCounter + 1) % Number.MAX_SAFE_INTEGER;
    return id;
  }
};
