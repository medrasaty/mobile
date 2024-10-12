export function transformToTypedData(data: any[] | undefined, type: any) {
  if (!data) return [];
  return data.map((d) => ({ type, payload: d }));
}
