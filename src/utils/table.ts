export function getFilteredTableData<T = any>(data: T[], page: number, displayLength: number) {
  return data.filter((v, i: number) => {
    const start = displayLength * (page - 1);
    const end = start + displayLength;
    return i >= start && i < end;
  });
}
