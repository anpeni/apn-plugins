export const exportToCSV = (data: any[], filename: string) => {
  let csvContent = 'data:text/csv;charset=utf-8,';

  if (data.length > 0) {
    csvContent += Object.keys(data[0]).join(',') + '\r\n';
  }

  data.forEach(obj => {
    const row = Object.values(obj)
      .map(value => {
        if (typeof value === 'string') {
          if (
            value.indexOf(',') >= 0 ||
            value.indexOf('\n') >= 0 ||
            value.indexOf('"') >= 0
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        } else if (value !== null && value !== undefined) {
          return value.toString();
        } else {
          return '';
        }
      })
      .join(',');
    csvContent += row + '\r\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename + '.csv');
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
};
