export const createMessageIdGenerator = (prefix: string) => {
  let messageId = 0;
  return () => {
    const id = prefix + messageId;
    messageId = (messageId + 1) % Number.MAX_SAFE_INTEGER;
    return id;
  }
};
