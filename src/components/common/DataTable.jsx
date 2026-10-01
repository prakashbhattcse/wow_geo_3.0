// Simple responsive table. columns: [{ label, render: row => node }]
export default function DataTable({ columns, rows, rowKey }) {
  return (
    <div className="table-wrap">
      <table className="cap-table">
        <thead><tr>{columns.map(c => <th key={c.label}>{c.label}</th>)}</tr></thead>
        <tbody>{rows.map(r => <tr key={rowKey(r)}>{columns.map(c => <td key={c.label}>{c.render(r)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
