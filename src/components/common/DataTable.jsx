import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Download, Filter, Eye } from 'lucide-react';

export default function DataTable({
  columns = [],
  data = [],
  searchPlaceholder = 'Search records...',
  filterOptions = [],
  activeFilter,
  onFilterChange,
  onRowClick,
  emptyMessage = 'No records found matching criteria',
  actions
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return data.filter(row => {
      // Global search string matching
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matches = Object.values(row).some(val => {
          if (val === null || val === undefined) return false;
          if (typeof val === 'object') return false;
          return String(val).toLowerCase().includes(query);
        });
        if (!matches) return false;
      }
      return true;
    });
  }, [data, searchTerm]);

  // Sort logic
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key) => {
    if (sortColumn === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const ids = new Set(paginatedData.map((_, i) => i));
      setSelectedRows(ids);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index) => {
    const updated = new Set(selectedRows);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedRows(updated);
  };

  const exportCSV = () => {
    if (data.length === 0) return;
    const headers = columns.map(c => c.header).join(',');
    const rows = sortedData.map(row => {
      return columns.map(c => {
        const val = row[c.accessor];
        return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
      }).join(',');
    }).join('\n');

    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ChemTrade_Export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E3E8DF] shadow-sm overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-[#E3E8DF] flex flex-col md:flex-row items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8980]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#F7F5EC] border border-[#E3E8DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075C46]/20 focus:border-[#075C46] text-[#17372F]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {filterOptions.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onFilterChange?.(opt.value);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                    activeFilter === opt.value
                      ? 'bg-[#075C46] text-white border-[#075C46]'
                      : 'bg-white text-[#7A8980] border-[#E3E8DF] hover:bg-[#F7F5EC]'
                  }`}
                >
                  {opt.label}
                  {opt.count !== undefined && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                      {opt.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={exportCSV}
            title="Export CSV"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#17372F] bg-white border border-[#E3E8DF] hover:bg-[#F7F5EC] rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#7A8980]" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {actions}
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto w-full min-h-[300px]">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#F7F5EC] border-b border-[#E3E8DF] text-xs font-semibold text-[#7A8980] uppercase tracking-wider">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                  onChange={handleSelectAll}
                  className="rounded border-[#E3E8DF] text-[#17372F] focus:ring-[#C6A66A]"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.accessor || col.header}
                  onClick={() => col.sortable !== false && col.accessor && handleSort(col.accessor)}
                  className={`py-3 px-4 ${col.sortable !== false ? 'cursor-pointer hover:bg-slate-100/60' : ''} ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable !== false && col.accessor && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          sortColumn === col.accessor
                            ? sortDirection === 'desc'
                              ? 'rotate-180 text-[#17372F]'
                              : 'text-[#17372F]'
                            : 'text-[#98A2B3] opacity-40'
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E8DF]">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => {
                const isSelected = selectedRows.has(idx);
                return (
                  <tr
                    key={row.id || row.batchNo || row.invoiceNumber || row.challanNo || idx}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#DDE9D9]' : 'hover:bg-[#F7F5EC]/80'
                    } ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(idx)}
                        className="rounded border-[#E3E8DF] text-[#17372F] focus:ring-[#C6A66A]"
                      />
                    </td>
                    {columns.map((col) => (
                      <td key={col.accessor || col.header} className={`py-3 px-4 text-sm text-[#17372F] ${col.cellClassName || ''}`}>
                        {col.cell ? col.cell(row) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="py-12 text-center text-[#7A8980]">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <Filter className="w-8 h-8 text-[#98A2B3] mb-2" />
                    <p className="font-medium text-sm text-[#17372F]">{emptyMessage}</p>
                    <p className="text-xs text-[#7A8980] mt-1">Try resetting search filters or keywords</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-[#E3E8DF] bg-[#F7F5EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A8980]">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white border border-[#E3E8DF] rounded px-2 py-1 text-xs text-[#17372F] focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2">
            Showing {sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} records
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-[#E3E8DF] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-[#17372F]" />
          </button>
          <span className="px-2 font-medium text-[#17372F]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-[#E3E8DF] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 text-[#17372F]" />
          </button>
        </div>
      </div>
    </div>
  );
}

