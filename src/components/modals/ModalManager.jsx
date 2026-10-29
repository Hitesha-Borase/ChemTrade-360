import React from 'react';
import { useApp } from '../../context/AppContext';
import CreateQuotationModal from './CreateQuotationModal';
import ViewPDFQuotationModal from './ViewPDFQuotationModal';
import CreateLeadModal from './CreateLeadModal';
import CreateGRNModal from './CreateGRNModal';
import CreateChemicalModal from './CreateChemicalModal';
import DispatchScheduleModal from './DispatchScheduleModal';
import QuarantineReviewModal from './QuarantineReviewModal';
import InvoiceModal from './InvoiceModal';
import ViewCOAModal from './ViewCOAModal';
import ViewSDSModal from './ViewSDSModal';

export default function ModalManager() {
  const { activeModal } = useApp();

  if (!activeModal) return null;

  switch (activeModal) {
    case 'create_quote':
      return <CreateQuotationModal />;
    case 'view_quote_pdf':
      return <ViewPDFQuotationModal />;
    case 'create_lead':
      return <CreateLeadModal />;
    case 'create_grn':
      return <CreateGRNModal />;
    case 'create_chemical':
      return <CreateChemicalModal />;
    case 'schedule_dispatch':
      return <DispatchScheduleModal />;
    case 'quarantine_review':
      return <QuarantineReviewModal />;
    case 'create_invoice':
      return <InvoiceModal />;
    case 'view_coa':
      return <ViewCOAModal />;
    case 'view_sds':
      return <ViewSDSModal />;
    default:
      return null;
  }
}
