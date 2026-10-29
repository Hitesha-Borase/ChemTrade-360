# ChemTrade 360 — Chemical Trading CRM + ERP

A full-featured, enterprise-grade Chemical Trading CRM + ERP operations platform built with **React.js, Vite, and Tailwind CSS**, strictly adhering to the architectural specification and wireframe in `Chemical_Trading_CRM_ERP_UI_Wireframe.md`.

---

## 🌟 Key Highlights & Implementation Scope

### 1. Visual Design System (Section 9 Baseline Palette)
- **Midnight Navy (`#101828`)**: Deep navigation, headings, contrast surfaces.
- **Champagne Gold (`#C6A66B`)**: Accents, highlights, and status tags.
- **Warm Off-White (`#F7F6F2`)**: Industrial background canvas.
- **Pure White (`#FFFFFF`)**: High-contrast, clean data tables and operational grids.
- **Restrained Glassmorphism**: Frosted header (`glass-header`), subtle summary cards (`glass-card`, `glass-card-accent`), without compromising dense operational data readability.

---

### 2. 10 Role-Specific Dashboard Perspectives (Section 2 & 5)
Switch between any role live via the **Active Role** dropdown in the top bar or the top perspective ribbon:
1. **Super Admin**: System governance, active user counts, multi-hub entities, integration health checks, and immutable security audit logs.
2. **Business Owner**: Trading revenue (₹4.28 Cr), gross margin percentage (11.45%), receivables outstanding, open sales orders, business exceptions & pending approvals.
3. **Sales Manager**: Team pipeline by stage, quote pipeline value (₹56.4 L), sales win rate (68.5%), and 1-click quotation margin authorization queue.
4. **Sales Executive**: Assigned chemical inquiries, follow-up calendar with quick contact tools, open quotes, and order progress.
5. **Purchase Manager**: Sourcing RFQs, purchase orders, due goods receipts, and a **Supplier Landed Cost Quote Comparison Matrix** (evaluating base rate, freight, credit days, and lead time).
6. **Warehouse Manager**: Stock valuation (₹1.84 Cr), low stock alerts, **FEFO (First-Expiry First-Out)** lot allocation priority, and quarantine hold management.
7. **Accountant**: GST tax invoices, debtor receivables aging (0–30, 31–60, 61–90, 90+ days), collections trend, and live NIC E-Invoice IRN status.
8. **Logistics Manager**: Dedicated chemical tanker allocation, delivery challans, Hazchem Tremcard compliance, GPS tracking, and Proof of Delivery (POD) confirmations.
9. **Customer Portal (External)**: Dedicated client self-service portal (e.g. Asian Paints). Allows submitting RFQs, reviewing formal quotations, tracking orders, and downloading certified COA/SDS documents. **Internal gross margins and supplier costs are strictly masked.**
10. **Supplier Portal (External)**: Dedicated vendor portal (e.g. GACL). Allows viewing assigned RFQs, submitting confidential commercial quotations, managing POs, and uploading batch test certificates.

---

### 3. 13 Primary Navigation Areas (Section 3)
- **Overview**: Active role-specific dashboard.
- **CRM & Accounts**: Chemical lead inquiries, pipeline Kanban, and enterprise customer directory with credit limits.
- **Chemical Catalog**: Chemical master database with CAS numbers, HS/HSN codes, grades, purity percentages, packaging, hazard pictograms, and certified SDS/COA links.
- **Quotations**: Dynamic quotation builder with live margin calculator, automated 18% GST and freight calculations, approval threshold flags, and printable PDF previews.
- **Sales Orders**: Customer purchase orders, allocated batches, fulfillment progress, and dispatch triggers.
- **Inventory & Batches**: Stock overview, warehouse terminals (Dahej, Bhiwandi, Hazira, JNPT), batch register, and quarantine review workflows.
- **Procurement & POs**: Chemical supplier directory, quote comparisons, PO tracking, and Goods Receipt Notes (GRN).
- **Finance & GST**: Tax invoices, balance due tracking, and NIC E-Invoicing IRN compliance.
- **Logistics & Dispatch**: Chemical tanker scheduling, transporter directory, delivery challans, and signed PODs.
- **Quality & Compliance**: Statutory clearances (PESO, CPCB, NCB precursor quotas), batch inspection records, and COA downloads.
- **Reports & Analytics**: Realized gross margin definitions, product-line profitability breakdown, and turnover analytics.
- **AI & Automation**: NLP RFQ text extraction (with 1-click quote prefill), demand forecasting, and automated payment reminder drafting.
- **Administration**: 10-role RBAC permission matrix, company profile settings, and tamper-evident audit logs.

---

### 4. Interactive Dialog Modals
- **Quotation Builder Modal**: Add multiple chemical lines, dynamic quantities, custom discounts, live gross margin calculation, and threshold-based approval triggers.
- **Printable Quotation PDF Modal**: Clean, client-facing PDF preview strictly excluding internal cost and margins.
- **Add Lead Modal**: Quick customer inquiry capture.
- **Goods Receipt Note (GRN) Modal**: Inward chemicals to specific warehouse bays with lot assignment and QC checks.
- **Chemical Master Modal**: Add new chemical with CAS, HSN, hazard classification, and specs.
- **Schedule Tanker Dispatch Modal**: Assign transporter fleet, vehicle registration, driver contact, and Hazchem Tremcard.
- **QC Laboratory Release Modal**: Review quarantined lots and release to active saleable inventory.
- **GST Tax Invoice Modal**: Generate compliant invoices with auto-calculated GST and mock NIC IRN hashes.

---

## 🚀 Running the Project

```bash
# 1. Start Development Server
npm run dev

# 2. Production Build
npm run build

# 3. Preview Production Build
npm run preview
```

The application runs at **`http://localhost:3000`** (or `http://localhost:3001` if port 3000 is occupied).

