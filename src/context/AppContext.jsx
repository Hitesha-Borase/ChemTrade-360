import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CHEMICALS,
  INITIAL_BATCHES,
  INITIAL_CUSTOMERS,
  INITIAL_SUPPLIERS,
  INITIAL_LEADS,
  INITIAL_QUOTATIONS,
  INITIAL_SALES_ORDERS,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_INVOICES,
  INITIAL_DISPATCHES,
  INITIAL_COMPLIANCE_DOCS,
  INITIAL_AUDIT_LOGS,
  ROLE_DEFINITIONS
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Authentication & Session (starts on Login Page unless logged in)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('ct360_auth') === 'true';
  });

  // Perspective View: 'landing' (default) | 'login' | 'app'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const h = window.location.hash;
      if (h === '#login') return 'login';
      if (h === '#app' && sessionStorage.getItem('ct360_auth') === 'true') return 'app';
    }
    return 'landing';
  });

  const navigateToView = (view) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      if (view === 'login') {
        window.location.hash = '#login';
      } else if (view === 'app') {
        window.location.hash = '#app';
      } else {
        window.location.hash = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash;
      if (h === '#login') {
        setCurrentView('login');
      } else if (h === '#app') {
        if (sessionStorage.getItem('ct360_auth') === 'true') {
          setCurrentView('app');
        } else {
          setCurrentView('login');
        }
      } else if (h === '' || h.startsWith('#hero') || h.startsWith('#features') || h.startsWith('#showcase') || h.startsWith('#calculator') || h.startsWith('#pricing') || h.startsWith('#contact')) {
        setCurrentView('landing');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Roles & Navigation
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('ct360_role') || 'business_owner';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('ct360_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) {}
    }
    return {
      name: 'Sunil Mehta',
      email: 's.mehta@chemtrade360.com',
      designation: 'Managing Director',
      hub: 'Dahej Terminal & Corporate HQ',
      avatar: 'SM'
    };
  });

  const [activeNav, setActiveNav] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  // Active Modals
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Entities Data
  const [chemicals, setChemicals] = useState(INITIAL_CHEMICALS);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [quotations, setQuotations] = useState(INITIAL_QUOTATIONS);
  const [salesOrders, setSalesOrders] = useState(INITIAL_SALES_ORDERS);
  const [purchaseOrders, setPurchaseOrders] = useState(INITIAL_PURCHASE_ORDERS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [dispatches, setDispatches] = useState(INITIAL_DISPATCHES);
  const [complianceDocs, setComplianceDocs] = useState(INITIAL_COMPLIANCE_DOCS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Quotation QT-2026-0892 requires margin approval (6.2% < 7% threshold)', type: 'warning', time: '10m ago', unread: true },
    { id: 2, text: 'Batch BAT-2026-IP-04 (12 MT IPA) expiring in 83 days - FEFO Priority 1', type: 'info', time: '45m ago', unread: true },
    { id: 3, text: 'Batch BAT-2026-TD-05 placed in Quarantine: Lab sample sent to SGS', type: 'danger', time: '2h ago', unread: true },
    { id: 4, text: 'NIC E-Invoice IRN successfully generated for Asian Paints order', type: 'success', time: '3h ago', unread: false }
  ]);

  const login = (roleId = 'business_owner', customEmail = null) => {
    const roleMetaObj = ROLE_DEFINITIONS.find(r => r.id === roleId) || ROLE_DEFINITIONS[1];
    
    // Role-specific persona
    const personas = {
      super_admin: { name: 'Vikram Singhania', email: 'admin@chemtrade360.com', designation: 'Enterprise Administrator', hub: 'Corporate IT & Security', avatar: 'VS' },
      business_owner: { name: 'Sunil Mehta', email: 's.mehta@chemtrade360.com', designation: 'Managing Director & Partner', hub: 'Dahej Terminal & HQ', avatar: 'SM' },
      sales_manager: { name: 'Vikram Mehta', email: 'v.mehta@chemtrade360.com', designation: 'Head of Sales & Distribution', hub: 'Mumbai Commercial Office', avatar: 'VM' },
      sales_executive: { name: 'Rahul Sen', email: 'r.sen@chemtrade360.com', designation: 'Sr. Chemical Sales Executive', hub: 'Dahej Terminal Hub', avatar: 'RS' },
      purchase_manager: { name: 'Kavita Shah', email: 'k.shah@chemtrade360.com', designation: 'Head of Procurement & Sourcing', hub: 'Dahej Liquid Terminal', avatar: 'KS' },
      warehouse_manager: { name: 'Dinesh Patel', email: 'd.patel@chemtrade360.com', designation: 'Terminal & Warehouse Manager', hub: 'Dahej Bulk Storage Bay', avatar: 'DP' },
      accountant: { name: 'Pooja Iyer', email: 'p.iyer@chemtrade360.com', designation: 'Chief Financial Accountant', hub: 'Central Finance Division', avatar: 'PI' },
      logistics_manager: { name: 'Harish Nair', email: 'h.nair@chemtrade360.com', designation: 'Logistics & Tanker Fleet Head', hub: 'Western Dispatch Depot', avatar: 'HN' },
      customer_portal: { name: 'Rajesh Sharma', email: 'r.sharma@asianpaints.com', designation: 'Head of Sourcing (Asian Paints)', hub: 'Taloja Plant, Navi Mumbai', avatar: 'AP' },
      supplier_portal: { name: 'Hiren Mehta', email: 'h.mehta@gacl.co.in', designation: 'Commercial Sales Head (GACL)', hub: 'Vadodara / Dahej Complex', avatar: 'GA' }
    };

    const userObj = personas[roleId] || personas.business_owner;
    if (customEmail) userObj.email = customEmail;

    setCurrentUser(userObj);
    setCurrentRole(roleId);
    setIsAuthenticated(true);

    setCurrentView('app');
    sessionStorage.setItem('ct360_auth', 'true');
    localStorage.setItem('ct360_auth', 'true');
    localStorage.setItem('ct360_role', roleId);
    localStorage.setItem('ct360_user', JSON.stringify(userObj));

    if (roleId === 'customer_portal') {
      setActiveNav('customer_portal');
    } else if (roleId === 'supplier_portal') {
      setActiveNav('supplier_portal');
    } else {
      setActiveNav('overview');
    }

    showToast(`Welcome back, ${userObj.name}! Logged in as ${roleMetaObj.name}.`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);

    setCurrentView('landing');
    sessionStorage.removeItem('ct360_auth');
    localStorage.removeItem('ct360_auth');
    showToast('You have been securely logged out of ChemTrade 360.', 'info');
  };

  // Sync role changes
  const switchRole = (roleId) => {
    setCurrentRole(roleId);
    localStorage.setItem('ct360_role', roleId);
    if (roleId === 'customer_portal') {
      setActiveNav('customer_portal');
    } else if (roleId === 'supplier_portal') {
      setActiveNav('supplier_portal');
    } else {
      setActiveNav('overview');
    }
    showToast(`Switched perspective to ${ROLE_DEFINITIONS.find(r => r.id === roleId)?.name}`, 'info');
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openModal = (modalName, data = null) => {
    setActiveModal(modalName);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // Log Audit Action Helper
  const logAudit = (action, status = 'Success') => {
    const roleObj = ROLE_DEFINITIONS.find(r => r.id === currentRole);
    const newEntry = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userName: roleObj?.name || 'Authorized Staff',
      userRole: roleObj?.name || 'Staff',
      action,
      ipAddress: '192.168.1.45',
      status
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Business Action Handlers
  const addQuotation = (newQuote) => {
    setQuotations(prev => [newQuote, ...prev]);
    logAudit(`Created Quotation ${newQuote.id} for ${newQuote.customerName} (Grand Total: ₹${newQuote.grandTotal.toLocaleString('en-IN')})`);
    showToast(`Quotation ${newQuote.id} created successfully!`, 'success');
  };

  const approveQuotation = (quoteId) => {
    setQuotations(prev => prev.map(q => {
      if (q.id === quoteId) {
        return { ...q, status: 'Approved', approvedBy: 'Authorized Sales Manager' };
      }
      return q;
    }));
    logAudit(`Approved Quotation ${quoteId}`);
    showToast(`Quotation ${quoteId} has been approved.`, 'success');
  };

  const convertQuoteToSalesOrder = (quoteId) => {
    const quote = quotations.find(q => q.id === quoteId);
    if (!quote) return;

    const newSoId = `SO-2026-0${Math.floor(460 + Math.random() * 40)}`;
    const newOrder = {
      id: newSoId,
      quotationRef: quote.id,
      poNumber: `PO-VERBAL-${Math.floor(1000 + Math.random() * 9000)}`,
      poDate: new Date().toISOString().split('T')[0],
      customerId: quote.customerId,
      customerName: quote.customerName,
      orderDate: new Date().toISOString().split('T')[0],
      expectedDispatchDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      totalValue: quote.grandTotal,
      items: quote.items.map(it => ({
        chemicalName: it.name,
        batchNo: it.allocatedBatch || 'Auto-Allocated FEFO',
        qty: it.qty,
        uom: it.uom,
        warehouse: 'Dahej Liquid Terminal'
      })),
      status: 'Confirmed',
      paymentStatus: 'Pending Invoice',
      complianceChecked: true,
      transporterAssigned: 'To Be Allocated',
      assignedSalesExec: quote.createdBy
    };

    setSalesOrders(prev => [newOrder, ...prev]);
    setQuotations(prev => prev.map(q => q.id === quoteId ? { ...q, status: 'Accepted' } : q));
    logAudit(`Converted Quotation ${quoteId} to Sales Order ${newSoId}`);
    showToast(`Order ${newSoId} generated from ${quoteId}!`, 'success');
  };

  const addLead = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
    logAudit(`Added new lead: ${newLead.companyName} for ${newLead.chemicalNeeded}`);
    showToast(`Lead for ${newLead.companyName} registered.`, 'success');
  };

  const updateLeadStage = (leadId, newStage) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    logAudit(`Moved Lead ${leadId} to stage: ${newStage}`);
    showToast(`Lead moved to ${newStage}`, 'info');
  };

  const addChemical = (chemical) => {
    setChemicals(prev => [chemical, ...prev]);
    logAudit(`Registered new chemical master: ${chemical.name} (CAS: ${chemical.casNumber})`);
    showToast(`Chemical ${chemical.name} registered.`, 'success');
  };

  const updateBatchStatus = (batchNo, newStatus, reason) => {
    setBatches(prev => prev.map(b => {
      if (b.batchNo === batchNo) {
        const isQuarantine = newStatus === 'Quarantined';
        return {
          ...b,
          qualityStatus: newStatus,
          quarantinedQty: isQuarantine ? b.initialQty : 0,
          availableQty: isQuarantine ? 0 : b.initialQty,
          notes: `${b.notes || ''} | [${new Date().toISOString().split('T')[0]}]: ${reason}`
        };
      }
      return b;
    }));
    logAudit(`Updated batch ${batchNo} status to ${newStatus}. Reason: ${reason}`);
    showToast(`Batch ${batchNo} updated to ${newStatus}`, newStatus === 'Approved' ? 'success' : 'warning');
  };

  const scheduleDispatch = (dispatchData) => {
    setDispatches(prev => [dispatchData, ...prev]);
    // update order status
    if (dispatchData.orderRef) {
      setSalesOrders(prev => prev.map(so => so.id === dispatchData.orderRef ? { ...so, status: 'Ready to Dispatch' } : so));
    }
    logAudit(`Scheduled Dispatch Challan ${dispatchData.challanNo} via ${dispatchData.transporter}`);
    showToast(`Challan ${dispatchData.challanNo} prepared. Vehicle assigned.`, 'success');
  };

  const addInvoice = (newInv) => {
    setInvoices(prev => [newInv, ...prev]);
    logAudit(`Generated GST Tax Invoice ${newInv.invoiceNumber} (₹${newInv.grandTotal.toLocaleString('en-IN')})`);
    showToast(`Invoice ${newInv.invoiceNumber} generated & e-invoice pushed.`, 'success');
  };

  const markDelivered = (challanNo) => {
    setDispatches(prev => prev.map(d => d.challanNo === challanNo ? { ...d, status: 'Delivered', podStatus: 'Verified POD Signed' } : d));
    logAudit(`Confirmed delivery for Challan ${challanNo}. POD uploaded.`);
    showToast(`Delivery completed for Challan ${challanNo}!`, 'success');
  };

  const roleMeta = ROLE_DEFINITIONS.find(r => r.id === currentRole) || ROLE_DEFINITIONS[0];

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      currentUser,
      login,
      logout,
      currentRole,
      roleMeta,
      switchRole,
      activeNav,
      setActiveNav,
      searchQuery,
      setSearchQuery,
      toasts,
      showToast,
      removeToast,
      activeModal,
      modalData,
      openModal,
      closeModal,
      notifications,
      setNotifications,
      // Entities
      chemicals,
      batches,
      customers,
      suppliers,
      leads,
      quotations,
      salesOrders,
      purchaseOrders,
      invoices,
      dispatches,
      complianceDocs,
      auditLogs,
      // Actions
      addQuotation,
      approveQuotation,
      convertQuoteToSalesOrder,
      addLead,
      updateLeadStage,
      addChemical,
      updateBatchStatus,
      scheduleDispatch,
      addInvoice,
      markDelivered,
      logAudit,
      // View Navigation
      currentView,
      setCurrentView,
      navigateToView
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

