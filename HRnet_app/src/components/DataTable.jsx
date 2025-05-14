import React, { useState } from 'react';
import './DataTable.css'; // Importer le fichier CSS

const DataTable = ({ columns, data, rowsPerPage = 10 }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage); // État pour les lignes par page

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const isSameKey = prev.key === key;
      const newDirection = isSameKey && prev.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction: newDirection };
    });
  };

  // Filtrer les données en fonction de la recherche
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const cellValue = row[col.accessor]?.toString().toLowerCase() || '';
        return cellValue.includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, columns]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || '';
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || '';

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPageState);
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPageState;
    const endIndex = startIndex + rowsPerPageState;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, rowsPerPageState]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPageState(Number(e.target.value));
    setCurrentPage(1); // Réinitialiser à la première page
  };

  // Calcul des indices de début et de fin
  const startIndex = (currentPage - 1) * rowsPerPageState + 1;
  const endIndex = Math.min(currentPage * rowsPerPageState, sortedData.length);

  return (
    <div className="data-table-container">
      <div className="data-table-header">
      {/* Dropdown pour le nombre de lignes par page */}
      <div className="rows-per-page-container">
          <span>Shows</span>
        <select
          id="rowsPerPage"
          value={rowsPerPageState}
          onChange={handleRowsPerPageChange}
          className="rows-per-page-select"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select> 
        <span>entries</span>
      </div>

              {/* Champ de recherche */}
      <div className="search-container">
        <label htmlFor="search" className="search-label">
          Search: 
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      </div>
      

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                onClick={() => handleSort(col.accessor)}
                className="sortable-column"
              >
                {col.header}
                {sortConfig.key === col.accessor && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="data-table-empty">
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {typeof col.render === 'function'
                      ? col.render(row)
                      : row[col.accessor] instanceof Date
                      ? row[col.accessor].toLocaleDateString('en-US')
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="data-table-info">
        <div className="entries-info">
          Showing {startIndex} to {endIndex} of {sortedData.length} entries
        </div>
        {/* Pagination controls */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;