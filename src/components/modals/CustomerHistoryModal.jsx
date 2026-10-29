import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import {
  X,
  Building,
  Phone,
  Mail,
  Receipt,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function CustomerHistoryModal() {
  const { closeModal, modalData, salesOrders, invoices, openModal } = useApp();
  const customer = modalData || {};

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'invoices'

  // Match orders & invoices for this customer
  const customerOrders = salesOrders.filter(so => 
    so.customerId === customer.id || 
    so.customerName?.toLowerCase().includes(customer.companyName?.toLowerCase()) ||
    customer.companyName?.toLowerCase().includes(so.customerName?.toLowerCase())
  );

  const customerInvoices = invoices.filter(inv =>
    inv.customerId === customer.id ||
    inv.customerName?.toLowerCase().includes(customer.companyName?.toLowerCase()) ||
    customer.companyName?.toLowerCase().includes(inv.customerName?.toLowerCase())
  );

  const totalOrderValue = customerOrders.reduce((sum, o) => sum + (Number(o.totalValue) || 0), 0);
  const totalInvoiced = customerInvoices.reduce((sum, inv) => sum + (Number(inv.grandTotal) || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-[#E3E8DF] my-auto max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E3E8DF]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DDE9D9] text-[#075C46] flex items-center justify-center flex-shrink-0 font-bold text-base border border-[#C6A66A]/30">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#17372F] tracking-tight">{customer.companyName}</h2>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {customer.id}
                </span>
                <Badge status={customer.status || 'Active'} size="xs" />
              </div>
              <p className="text-xs text-[#7A8980] mt-0.5">
                {customer.city}, {customer.state} • GSTIN: <span className="font-mono">{customer.gstin || '24AAACD9901M1Z2'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Dossier Snapshot Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="p-3 rounded-xl bg-[#F7F5EC] border border-[#E3E8DF]">
            <p className="text-[10px] text-[#7A8980] uppercase font-bold">Total Orders</p>
            <p className="text-lg font-extrabold text-[#17372F] mt-0.5">{customerOrders.length || customer.activeOrdersCount || 1}</p>
            <p className="text-[10px] text-emerald-700">All-time Purchase Count</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F5EC] border border-[#E3E8DF]">
            <p className="text-[10px] text-[#7A8980] uppercase font-bold">Total Billed</p>
            <p className="text-lg font-extrabold text-[#17372F] mt-0.5">
              ₹{((totalOrderValue || customer.lifetimeSpend || 2450000) / 100000).toFixed(1)} L
            </p>
            <p className="text-[10px] text-slate-500">Cumulative Volume</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F5EC] border border-[#E3E8DF]">
            <p className="text-[10px] text-[#7A8980] uppercase font-bold">Credit Terms</p>
            <p className="text-lg font-extrabold text-[#075C46] mt-0.5">{customer.creditDays || 30} Days</p>
            <p className="text-[10px] text-slate-500">Limit: ₹{((customer.creditLimit || 2500000)/100000).toFixed(1)} L</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F5EC] border border-[#E3E8DF]">
            <p className="text-[10px] text-[#7A8980] uppercase font-bold">Outstanding</p>
            <p className={`text-lg font-extrabold mt-0.5 ${(customer.outstandingBalance || 0) > 0 ? 'text-[#C43232]' : 'text-emerald-700'}`}>
              ₹{((customer.outstandingBalance || 0) / 100000).toFixed(1)} L
            </p>
            <p className="text-[10px] text-slate-500">{customer.overdueAmount > 0 ? `Overdue: ₹${(customer.overdueAmount/100000).toFixed(1)}L` : 'Payment Current'}</p>
          </div>
        </div>

        {/* Tab Navigation & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3E8DF] pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'orders' ? 'bg-[#075C46] text-white shadow-xs' : 'text-slate-600 hover:bg-[#F7F5EC]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Purchase Orders History ({customerOrders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'invoices' ? 'bg-[#075C46] text-white shadow-xs' : 'text-slate-600 hover:bg-[#F7F5EC]'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Invoices & Payments ({customerInvoices.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeModal();
                openModal('create_quote', { customerName: customer.companyName });
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] flex items-center gap-1 shadow-xs active:scale-95"
            >
              <Plus className="w-3 h-3 text-[#C6A66A]" />
              <span>New Quotation</span>
            </button>
            <button
              onClick={() => {
                const phone = (customer.phone || '').replace(/[^0-9]/g, '');
                const msg = encodeURIComponent(`Hello ${customer.contactPerson || customer.companyName}, here is your account summary and ledger statement from ChemTrade 360.`);
                window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
              }}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[#E3E8DF] hover:bg-emerald-50 text-emerald-700 flex items-center gap-1"
              title="Share account summary on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Statement</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="mt-3 overflow-x-auto">
            {customerOrders.length > 0 ? (
              <table className="w-full text-left text-xs border border-[#E3E8DF] rounded-xl overflow-hidden">
                <thead className="bg-[#F7F5EC] text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Order ID</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">PO Reference</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Chemical Items</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Order Value</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Order Date</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E8DF] bg-white">
                  {customerOrders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-[#17372F] font-mono whitespace-nowrap">
                        {order.id}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono whitespace-nowrap">
                        {order.poNumber}
                      </td>
                      <td className="py-2.5 px-3">
                        {order.items?.map((it, idx) => (
                          <div key={idx} className="font-medium text-[#17372F]">
                            {it.chemicalName} <span className="text-slate-500 font-mono">({it.qty} {it.uom})</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#17372F] whitespace-nowrap">
                        ₹{order.totalValue?.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono whitespace-nowrap">
                        {order.orderDate}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <Badge status={order.status} size="xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                <ShoppingBag className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                <p className="font-semibold text-slate-700">No past orders registered yet</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Generate a quotation or convert an inquiry to record an order.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Invoices & Payment History */}
        {activeTab === 'invoices' && (
          <div className="mt-3 overflow-x-auto">
            {customerInvoices.length > 0 ? (
              <table className="w-full text-left text-xs border border-[#E3E8DF] rounded-xl overflow-hidden">
                <thead className="bg-[#F7F5EC] text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Invoice No</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Order Ref</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Invoice Date</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Total Amount</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Balance Due</th>
                    <th className="py-2.5 px-3 whitespace-nowrap font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E8DF] bg-white">
                  {customerInvoices.map(inv => (
                    <tr key={inv.invoiceNumber} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-[#17372F] font-mono whitespace-nowrap">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono whitespace-nowrap">
                        {inv.salesOrderRef}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono whitespace-nowrap">
                        {inv.invoiceDate}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#17372F] whitespace-nowrap">
                        ₹{inv.grandTotal?.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold whitespace-nowrap text-red-600">
                        ₹{inv.balanceDue?.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <Badge status={inv.status} size="xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                <Receipt className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                <p className="font-semibold text-slate-700">No invoices issued for this customer yet</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Invoices appear here once sales orders are billed.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
