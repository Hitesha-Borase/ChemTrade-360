import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  Receipt,
  Plus,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Download,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Calendar,
  X
} from 'lucide-react';

export default function FinanceModule() {
  const { invoices, dailyTransactions = [], addTransaction, openModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' | 'cashbook'
  const [cashbookFilter, setCashbookFilter] = useState('all'); // 'all' | 'Income' | 'Expense'
  const [showAddTxnModal, setShowAddTxnModal] = useState(false);

  // New Transaction Form State
  const [txnType, setTxnType] = useState('Income');
  const [txnCategory, setTxnCategory] = useState('Customer Advance Payment');
  const [txnDesc, setTxnDesc] = useState('');
  const [txnAmount, setTxnAmount] = useState('');
  const [txnMode, setTxnMode] = useState('RTGS / Bank');
  const [txnRef, setTxnRef] = useState('');

  // Cashbook calculations
  const totalIncome = dailyTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalExpense = dailyTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const netBalance = totalIncome - totalExpense;

  const filteredTransactions = dailyTransactions.filter(t => {
    if (cashbookFilter === 'all') return true;
    return t.type === cashbookFilter;
  });

  const handleCreateTransaction = (e) => {
    e.preventDefault();
    if (!txnAmount || Number(txnAmount) <= 0) {
      showToast('Please enter a valid amount', 'warning');
      return;
    }

    const newTxn = {
      id: `TXN-2026-${Math.floor(106 + Math.random() * 90)}`,
      date: new Date().toISOString().split('T')[0],
      type: txnType,
      category: txnCategory,
      description: txnDesc || (txnType === 'Income' ? 'Payment received' : 'Operational expense paid'),
      mode: txnMode,
      referenceNo: txnRef || `REF-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: Number(txnAmount),
      recordedBy: 'Sunil Mehta'
    };

    if (addTransaction) {
      addTransaction(newTxn);
    } else {
      showToast(`Recorded ${txnType} of ₹${Number(txnAmount).toLocaleString('en-IN')}`, 'success');
    }

    // Reset and close
    setTxnDesc('');
    setTxnAmount('');
    setTxnRef('');
    setShowAddTxnModal(false);
  };

  const invoiceColumns = [
    {
      header: 'Invoice No & Ref',
      accessor: 'invoiceNumber',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#17372F] text-sm font-mono">{row.invoiceNumber}</div>
          <div className="text-[11px] text-slate-500 font-mono">SO: {row.salesOrderRef}</div>
          <div className="text-[10px] text-slate-400">Date: {row.invoiceDate}</div>
        </div>
      )
    },
    {
      header: 'Customer / Debtor',
      accessor: 'customerName',
      cell: (row) => <span className="font-semibold text-slate-800 text-xs">{row.customerName}</span>
    },
    {
      header: 'Grand Total & Tax',
      accessor: 'grandTotal',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-sm text-[#17372F]">
            ₹{row.grandTotal.toLocaleString('en-IN')}
          </span>
          <span className="block text-[10px] text-slate-500 font-mono">
            GST (18%): ₹{row.gstAmount.toLocaleString('en-IN')}
          </span>
        </div>
      )
    },
    {
      header: 'Balance Due',
      accessor: 'balanceDue',
      cell: (row) => (
        <div>
          <span className={`font-mono font-bold text-sm ${
            row.balanceDue > 0 ? (row.status === 'Overdue' ? 'text-[#C43232]' : 'text-[#17372F]') : 'text-[#0F795C]'
          }`}>
            ₹{row.balanceDue.toLocaleString('en-IN')}
          </span>
          <span className="block text-[10px] text-slate-500 font-mono">
            Paid: ₹{row.paidAmount.toLocaleString('en-IN')}
          </span>
        </div>
      )
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      cell: (row) => (
        <span className="font-mono text-xs font-medium text-slate-700 whitespace-nowrap">
          {row.dueDate}
        </span>
      )
    },
    {
      header: 'NIC E-Invoice IRN & E-Way',
      accessor: 'irnStatus',
      cell: (row) => (
        <div className="text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> IRN Active
          </span>
          <span className="block font-mono text-[10px] text-slate-500 mt-0.5 whitespace-nowrap">
            E-Way: {row.eWayBillNo}
          </span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <Badge status={row.status} />
    },
    {
      header: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <button
            onClick={() => showToast(`Printing GST Tax Invoice ${row.invoiceNumber}`, 'info')}
            className="p-1.5 rounded-lg border border-[#E3E8DF] hover:bg-[#F7F5EC] text-slate-700 shadow-2xs active:scale-95 transition-all"
            title="Print Tax Invoice"
          >
            <Printer className="w-3.5 h-3.5 text-[#C6A66A]" />
          </button>
          {row.balanceDue > 0 && (
            <button
              onClick={() => {
                setShowAddTxnModal(true);
                setTxnType('Income');
                setTxnCategory('Customer Bill Clearance');
                setTxnDesc(`Payment receipt for ${row.invoiceNumber} (${row.customerName})`);
                setTxnAmount(String(row.balanceDue));
              }}
              className="px-2.5 py-1 text-xs bg-[#075C46] text-white rounded-lg font-semibold hover:bg-[#063F32] shadow-xs active:scale-95 transition-all"
            >
              Collect
            </button>
          )}
        </div>
      )
    }
  ];

  const cashbookColumns = [
    {
      header: 'Date & ID',
      accessor: 'id',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#17372F]">{row.id}</span>
          <span className="block text-[10px] text-slate-500 font-mono">{row.date}</span>
        </div>
      )
    },
    {
      header: 'Type',
      accessor: 'type',
      cell: (row) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${
          row.type === 'Income'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {row.type === 'Income' ? <ArrowUpRight className="w-3 h-3 text-emerald-600" /> : <ArrowDownLeft className="w-3 h-3 text-red-600" />}
          {row.type === 'Income' ? 'Income (Aawak)' : 'Expense (Kharcha)'}
        </span>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      cell: (row) => (
        <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
          {row.category}
        </span>
      )
    },
    {
      header: 'Description & Ref',
      accessor: 'description',
      cell: (row) => (
        <div className="max-w-xs sm:max-w-md">
          <p className="text-xs text-slate-700 line-clamp-1">{row.description}</p>
          <span className="text-[10px] text-slate-400 font-mono">Ref: {row.referenceNo}</span>
        </div>
      )
    },
    {
      header: 'Mode',
      accessor: 'mode',
      cell: (row) => (
        <span className="text-xs text-slate-600 font-medium whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded">
          {row.mode}
        </span>
      )
    },
    {
      header: 'Amount (₹)',
      accessor: 'amount',
      cell: (row) => (
        <span className={`font-mono font-bold text-sm whitespace-nowrap ${
          row.type === 'Income' ? 'text-[#0F795C]' : 'text-red-600'
        }`}>
          {row.type === 'Income' ? '+' : '-'} ₹{Number(row.amount).toLocaleString('en-IN')}
        </span>
      )
    },
    {
      header: 'Recorded By',
      accessor: 'recordedBy',
      cell: (row) => (
        <span className="text-[11px] text-slate-500 whitespace-nowrap">
          {row.recordedBy}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Payments, Invoicing & Daily Cashbook</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            GST compliant tax invoices, daily income & expense tracking, receivables ledger, and cash-inflow records.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddTxnModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Record Income / Expense</span>
          </button>

          <button
            onClick={() => openModal('create_invoice')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Generate GST Invoice</span>
          </button>
        </div>
      </div>

      {/* Segmented Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E3E8DF] pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'invoices' ? 'bg-[#075C46] text-white shadow-xs' : 'text-slate-600 hover:bg-[#F7F5EC]'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>GST Tax Invoices ({invoices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cashbook')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'cashbook' ? 'bg-[#075C46] text-white shadow-xs' : 'text-slate-600 hover:bg-[#F7F5EC]'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>Daily Income & Expenses Cashbook ({dailyTransactions.length})</span>
        </button>
      </div>

      {/* RENDER INVOICES TAB */}
      {activeTab === 'invoices' && (
        <DataTable
          columns={invoiceColumns}
          data={invoices}
          searchPlaceholder="Search invoice no., customer, sales order ref..."
        />
      )}

      {/* RENDER CASHBOOK TAB */}
      {activeTab === 'cashbook' && (
        <div className="space-y-4">
          {/* Cashbook Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white rounded-xl border border-[#E3E8DF] shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Received (Income)</p>
                <p className="text-xl font-black text-[#0F795C] mt-1 font-mono">+ ₹{totalIncome.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Advances, bill clearances, inward receipts</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F795C] flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E3E8DF] shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Paid Out (Expenses)</p>
                <p className="text-xl font-black text-red-600 mt-1 font-mono">- ₹{totalExpense.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Freight, tanker diesel, lab QC, depot labor</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <ArrowDownLeft className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E3E8DF] shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Net Cashbook Balance</p>
                <p className="text-xl font-black text-[#17372F] mt-1 font-mono">₹{netBalance.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-emerald-700 mt-0.5">Net cash & bank surplus position</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#DDE9D9] text-[#075C46] flex items-center justify-center flex-shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Cashbook Table */}
          <DataTable
            columns={cashbookColumns}
            data={filteredTransactions}
            searchPlaceholder="Search category, description, voucher ref..."
            filterOptions={[
              { label: 'All Transactions', value: 'all' },
              { label: 'Income (Aawak)', value: 'Income' },
              { label: 'Expense (Kharcha)', value: 'Expense' }
            ]}
            activeFilter={cashbookFilter}
            onFilterChange={setCashbookFilter}
          />
        </div>
      )}

      {/* Record Income/Expense Modal */}
      {showAddTxnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E3E8DF] my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#C6A66A]" />
                <h2 className="text-base font-bold text-[#17372F]">Record Daily Cashbook Entry</h2>
              </div>
              <button
                onClick={() => setShowAddTxnModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="mt-4 space-y-3.5 text-xs">
              {/* Type Switcher */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Entry Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTxnType('Income');
                      setTxnCategory('Customer Advance Payment');
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      txnType === 'Income'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span>Income (Aawak)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTxnType('Expense');
                      setTxnCategory('Tanker Freight & Diesel');
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      txnType === 'Expense'
                        ? 'bg-red-50 border-red-500 text-red-800 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ArrowDownLeft className="w-4 h-4 text-red-600" />
                    <span>Expense (Kharcha)</span>
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={txnCategory}
                  onChange={(e) => setTxnCategory(e.target.value)}
                  className="w-full p-2.5 border border-[#E3E8DF] rounded-xl text-xs font-semibold text-slate-800 bg-white"
                >
                  {txnType === 'Income' ? (
                    <>
                      <option value="Customer Advance Payment">Customer Advance Payment</option>
                      <option value="Customer Bill Clearance">Customer Bill Clearance</option>
                      <option value="GST Refund / Incentive">GST Refund / Duty Drawback</option>
                      <option value="Packaging Deposit Return">Packaging / Drum Return</option>
                      <option value="Other Income">Other Commercial Inflow</option>
                    </>
                  ) : (
                    <>
                      <option value="Tanker Freight & Diesel">Tanker Freight & Diesel Advance</option>
                      <option value="Lab Testing & QC Fees">Lab Testing & SGS Assay Fees</option>
                      <option value="Terminal Unloading & Handling">Terminal Unloading & Labor</option>
                      <option value="Supplier Advance Payment">Supplier Chemical Purchase</option>
                      <option value="Office & Petty Cash">Office Petty Cash / Miscellaneous</option>
                    </>
                  )}
                </select>
              </div>

              {/* Amount & Mode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={txnAmount}
                    onChange={(e) => setTxnAmount(e.target.value)}
                    placeholder="e.g. 25000"
                    className="w-full p-2.5 border border-[#E3E8DF] rounded-xl text-xs font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Mode</label>
                  <select
                    value={txnMode}
                    onChange={(e) => setTxnMode(e.target.value)}
                    className="w-full p-2.5 border border-[#E3E8DF] rounded-xl text-xs"
                  >
                    <option value="RTGS / Bank">RTGS / Bank</option>
                    <option value="NEFT / Bank">NEFT / Bank</option>
                    <option value="UPI / Online">UPI / QR Code</option>
                    <option value="Cash">Cash at Depot</option>
                    <option value="Cheque">Bank Cheque</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description / Particulars</label>
                <input
                  type="text"
                  value={txnDesc}
                  onChange={(e) => setTxnDesc(e.target.value)}
                  placeholder="e.g. Advance paid to tanker driver for Taloja trip"
                  className="w-full p-2.5 border border-[#E3E8DF] rounded-xl text-xs"
                  required
                />
              </div>

              {/* Reference */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reference / Voucher No. (Optional)</label>
                <input
                  type="text"
                  value={txnRef}
                  onChange={(e) => setTxnRef(e.target.value)}
                  placeholder="e.g. UTR / Cheque / Voucher #"
                  className="w-full p-2.5 border border-[#E3E8DF] rounded-xl text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTxnModal(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#075C46] text-white hover:bg-[#063F32] shadow-sm active:scale-95 transition-all"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
