export function sort(data: any[], orderKey: string) {
  /**
   * order questions based on the key, keys are of type orderKeys
   */

  // Do nothing when data is empty
  if (data.length === 0) return [];

  const key = clean_key(orderKey);

  // check if key exists on the question

  if (!data[0].hasOwnProperty(key)) {
    throw new Error("Key does not exist on data provided");
  }

  if (isDecending(orderKey)) {
    return data.sort((a, b) => b[key] - a[key]);
  }

  return data.sort((a, b) => a[key] - b[key]);
}

function clean_key(key: string) {
  /**
   * remove the "-" from the key
   */
  if (key[0] !== "-") return key;
  return key.slice(1);
}

function isDecending(key: string) {
  /**
   */
  return key[0] === "-";
}
