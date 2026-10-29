# Chemical Trading CRM + ERP

## Product Definition, UI Wireframe & Dashboard Architecture

**Document type:** Product/UI Wireframe Specification\
**Purpose:** Project repository reference for designers, developers, QA,
and stakeholders\
**Version:** 1.0\
**Status:** Proposed baseline --- validate business rules and
integrations with the client before production implementation

------------------------------------------------------------------------

## 1. Project Overview

Chemical Trading CRM + ERP is a business management platform for
chemical traders, distributors, wholesalers, importers, exporters, and
suppliers. It connects customer inquiries and sales activities with
chemical product data, quotations, purchasing, batch-controlled
inventory, compliance documents, invoicing, logistics, payments, and
business reporting.

The product should feel like a **premium, dependable B2B industrial SaaS
application**. The UI must prioritize operational clarity, quick data
entry, searchable tables, batch traceability, clear approvals, and
role-based access---not just decorative dashboards.

### Core business outcome

Enable the business to manage the complete trading lifecycle in one
connected system:

**Customer Inquiry → RFQ → Quotation → Approval → Sales Order →
Stock/Batch & Compliance Verification → Invoice → Dispatch → Delivery →
Payment → Reporting**

The connected procurement lifecycle is:

**Reorder Need / Supplier RFQ → Supplier Quote Comparison → Purchase
Order → Goods Receipt (GRN) → Quality/Document Check → Available Stock →
Supplier Payment**

### Product positioning

-   **Product category:** Chemical Trading CRM + ERP
-   **Primary users:** Chemical trading and distribution businesses
-   **Core value:** One system for sales, procurement, inventory,
    documentation, finance, and logistics
-   **Experience:** Professional, clean, premium, glass-inspired UI used
    selectively
-   **Business model support:** One company initially, with a
    configurable path to multiple branches/companies if approved by the
    client

> **Scope note:** This document defines the proposed UI and functional
> architecture. It does not claim that integrations such as WhatsApp,
> email, GST e-invoicing, e-way bills, Tally, live shipment tracking, or
> AI are already connected. Each integration must be confirmed,
> implemented, and tested separately.

------------------------------------------------------------------------

## 2. Roles and Dashboard Count

The proposed architecture contains **10 role-specific dashboard
experiences**: 8 internal roles and 2 external portals.

  ------------------------------------------------------------------------
                            \# Role / Portal         Main purpose
  ---------------------------- --------------------- ---------------------
                             1 Super Admin           System setup, users,
                                                     roles, permissions,
                                                     company
                                                     configuration,
                                                     integrations, audit
                                                     visibility

                             2 Business Owner        Business-wide
                                                     revenue, margin,
                                                     outstanding, sales,
                                                     purchasing, inventory
                                                     and performance
                                                     overview

                             3 Sales Manager         Team pipeline,
                                                     quotations,
                                                     approvals, targets
                                                     and sales conversion

                             4 Sales Executive       Assigned leads,
                                                     customer
                                                     requirements,
                                                     follow-ups,
                                                     quotations and orders

                             5 Purchase Manager      Suppliers, RFQs,
                                                     quote comparisons,
                                                     purchase orders, GRNs
                                                     and purchasing costs

                             6 Warehouse Manager     Stock, batches,
                                                     warehouse movements,
                                                     reservations, expiry,
                                                     quarantine and
                                                     dispatch readiness

                             7 Accountant            Invoices,
                                                     receivables,
                                                     payables, receipts,
                                                     tax documents and
                                                     accounting reports

                             8 Logistics Manager     Dispatch planning,
                                                     transporters,
                                                     vehicles, delivery
                                                     documents, shipments
                                                     and proof of delivery

                             9 Customer Portal       Customer's own RFQs,
                                                     quotations, orders,
                                                     invoices, payment
                                                     status and approved
                                                     documents

                            10 Supplier Portal       Supplier's own RFQs,
                                                     submitted quotations,
                                                     purchase orders,
                                                     delivery updates and
                                                     relevant payment/GRN
                                                     status
  ------------------------------------------------------------------------

### Dashboard rules

-   All dashboards belong to one connected product, not ten unrelated
    applications.
-   Users should land on the dashboard associated with their assigned
    role.
-   Permissions must be enforced by the backend/API as well as reflected
    in the UI.
-   Customer and Supplier are external portals. They must not access
    internal company-wide dashboards or another customer's/supplier's
    data.
-   A person may hold multiple roles only if the business explicitly
    permits it; the effective access should be defined and audited.
-   Dashboard cards and reports must use real, permission-filtered data.
    Do not invent revenue, stock, margin, or compliance metrics.

------------------------------------------------------------------------

## 3. Information Architecture: Main Navigation

The proposed internal application has 13 primary navigation areas. The
visible sidebar changes according to the logged-in user's permissions.

1.  **Overview**
    -   Role dashboard
    -   Alerts and pending actions
    -   My tasks and approvals
2.  **CRM**
    -   Leads and inquiries
    -   Customer / company directory
    -   Lead pipeline
    -   Follow-up activities
    -   Calls, emails, WhatsApp activity (only where integration is
        available)
    -   Customer purchase history and requirements
3.  **Chemical Catalog**
    -   Chemical master
    -   CAS number and HS/HSN code
    -   Category, grade, purity, concentration and specifications
    -   Physical form and packaging type
    -   Units of measure
    -   Manufacturer / brand
    -   SDS and COA documents
    -   Hazard and storage information
4.  **Quotations**
    -   Customer RFQs
    -   Quotation builder
    -   Customer-specific price lists
    -   Supplier quotation comparison
    -   Quantity pricing and margin calculation
    -   Discount, freight and tax
    -   Approval workflow
    -   PDF quotation and version history
5.  **Sales**
    -   Sales orders
    -   Proforma invoices
    -   Purchase order references
    -   Order approval
    -   Partial fulfilment
    -   Sales returns and credit notes
    -   Repeat orders
6.  **Inventory**
    -   Stock overview
    -   Warehouses and storage locations
    -   Batch / lot register
    -   Stock inward and outward
    -   Stock reservation
    -   Warehouse transfers
    -   Minimum stock and reorder alerts
    -   Expiry and shelf-life monitoring
    -   Damaged, expired and quarantined stock
    -   Stock ledger and valuation
    -   FIFO / FEFO allocation
    -   Hazardous-material segregation controls
7.  **Procurement**
    -   Supplier directory and verification
    -   Supplier RFQs
    -   Supplier quotations
    -   Purchase orders
    -   Goods Receipt Notes (GRN)
    -   Purchase returns
    -   Landed cost and import purchase tracking
    -   Supplier performance
8.  **Finance**
    -   GST invoices and tax summaries
    -   Receivables and customer outstanding
    -   Supplier payables
    -   Receipts and partial / advance payments
    -   Credit / debit notes
    -   Tax documents
    -   Profit and loss reports
    -   Accounting integration status
9.  **Logistics**
    -   Transporter directory
    -   Vehicle and driver details
    -   Dispatch calendar
    -   Delivery challans
    -   Packing lists
    -   Shipment and delivery status
    -   Freight charges
    -   Proof of delivery (POD)
    -   Delivery returns / exceptions
10. **Quality & Compliance**
    -   Batch quality status
    -   Batch-wise COA and SDS links
    -   Quality holds and release checks
    -   Hazard labels and storage requirements
    -   Supplier/customer compliance documents
    -   License and document expiry reminders
    -   Import/export documents
    -   Restricted-chemical approval workflow
    -   Audit trail and document history
    -   Complaints and product recall tracking
11. **Reports & Analytics**
    -   Sales and revenue
    -   Gross margin and net profit
    -   Product and customer profitability
    -   Supplier purchasing
    -   Inventory aging and valuation
    -   Batch expiry
    -   Outstanding and overdue payments
    -   Salesperson performance
    -   Lead conversion
    -   Order fulfilment and delivery
12. **AI & Automation**
    -   AI sales assistant
    -   Quotation drafting assistance
    -   Follow-up suggestions
    -   RFQ / PO document extraction
    -   Chemical product search assistance
    -   Demand forecast and reorder suggestions
    -   Customer buying-pattern insights
    -   Payment reminder drafts
    -   SDS / COA retrieval assistance
    -   Management insights
13. **Administration**
    -   Users, roles and permissions
    -   Company and branch settings
    -   Workflow and approval configuration
    -   Units, tax and currency settings
    -   Notification preferences
    -   Integration configuration
    -   Audit logs
    -   Security and session settings

**Important:** AI output must be presented as a suggestion until an
authorized user reviews and approves it. Restricted-chemical,
quality-release, pricing, finance, and stock-changing actions must
follow explicit permission and approval rules.

------------------------------------------------------------------------

## 4. Global Application Shell

### Desktop layout

``` text
┌─────────────────────────────────────────────────────────────────────────────┐
│ BRAND / LOGO     Global Search              Notifications   Help   Profile  │
├──────────────────┬──────────────────────────────────────────────────────────┤
│ SIDEBAR          │ Breadcrumbs                         Page actions         │
│                  ├──────────────────────────────────────────────────────────┤
│ Overview         │ Page title                                               │
│ CRM              │ Short description / period / status                     │
│ Chemical Catalog ├──────────────────────────────────────────────────────────┤
│ Quotations       │ KPI cards (only when useful for this page)               │
│ Sales            ├──────────────────────────────────────────────────────────┤
│ Inventory        │ Filters / tabs / search                                  │
│ Procurement      ├──────────────────────────────────────────────────────────┤
│ Finance          │ Main content: table, chart, form, timeline or split view │
│ Logistics        │                                                          │
│ Quality & Comp.  │                                                          │
│ Reports          │                                                          │
│ AI & Automation  │                                                          │
│ Administration   │                                                          │
│                  │                                                          │
│ Help / Collapse  │ Pagination / footer / contextual actions                 │
└──────────────────┴──────────────────────────────────────────────────────────┘
```

### Global shell requirements

-   Collapsible left sidebar with role-specific navigation.
-   Top bar with global search, notifications, help, and profile menu.
-   Breadcrumbs for nested pages.
-   Clear page title, supporting text, and one primary action where
    appropriate.
-   Search, filters, sort, pagination, and saved views for data-heavy
    lists.
-   Consistent loading, empty, validation, error, success, and
    permission-denied states.
-   Confirmation for destructive or financially significant actions.
-   Responsive behavior for tablet and mobile; complex operational
    tables may use horizontal scrolling or a carefully designed compact
    view.
-   Keyboard accessibility, visible focus states, readable contrast, and
    clear labels.

------------------------------------------------------------------------

## 5. Role-Specific Dashboard Wireframes

### 5.1 Super Admin Dashboard

**Purpose:** Configure and govern the platform rather than carry out
daily warehouse or sales work.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Super Admin Overview                         [Add User] [Settings]│
├───────────────┬───────────────┬──────────────┬───────────────────┤
│ Active Users  │ Roles         │ Companies    │ Integration Health│
├───────────────────────────────┬──────────────────────────────────┤
│ User / Access Activity        │ System & Integration Status      │
├───────────────────────────────┼──────────────────────────────────┤
│ Recent Audit Events           │ Setup Tasks / Configuration      │
└───────────────────────────────┴──────────────────────────────────┘
```

**Key pages:** User management, roles and permissions, company/branch
setup, configuration, integration settings, audit logs, security
settings.

### 5.2 Business Owner Dashboard

**Purpose:** High-level business performance and exceptions requiring
management attention.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Business Overview                 [Date Range] [Export Report]   │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ Revenue    │ Gross Margin│ Receivables│ Open Sales Orders        │
├───────────────────────────────┬──────────────────────────────────┤
│ Revenue / Margin Trend        │ Sales & Purchase Summary         │
├───────────────────────────────┼──────────────────────────────────┤
│ Top Products / Customers       │ Overdue / Low Stock / Expiry    │
├───────────────────────────────┴──────────────────────────────────┤
│ Pending Approvals and Business Exceptions                        │
└──────────────────────────────────────────────────────────────────┘
```

**Key pages:** Business overview, profitability, cash/receivables
summary, sales and purchasing performance, inventory risk, management
reports.

**Metric rule:** Revenue, gross margin, and net profit must have
documented calculation definitions. Do not label gross margin as net
profit.

### 5.3 Sales Manager Dashboard

**Purpose:** Manage team performance, sales pipeline, quotation
approvals, and order conversion.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Sales Management                   [Period] [Create Report]       │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ Open Leads │ Quote Value│ Win Rate   │ Pending Approvals         │
├───────────────────────────────┬──────────────────────────────────┤
│ Pipeline by Stage             │ Team Target vs Actual            │
├───────────────────────────────┼──────────────────────────────────┤
│ Quotes Awaiting Approval      │ Follow-ups / Stale Opportunities │
├───────────────────────────────┴──────────────────────────────────┤
│ Sales Team Activity and Recent Orders                             │
└──────────────────────────────────────────────────────────────────┘
```

**Key pages:** Team leads, pipeline, quotation approvals, targets,
salesperson performance, sales order tracking.

### 5.4 Sales Executive Dashboard

**Purpose:** Make daily sales work and follow-ups easy.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ My Sales Workspace                     [Add Lead] [Create Quote] │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ My Leads   │ Follow-ups │ Open Quotes│ Orders in Progress        │
├───────────────────────────────┬──────────────────────────────────┤
│ Today's Tasks / Reminders     │ My Lead Pipeline                │
├───────────────────────────────┼──────────────────────────────────┤
│ Recent Customer Activity      │ Quick Actions                   │
├───────────────────────────────┴──────────────────────────────────┤
│ Recent Leads and Customer Inquiries                               │
└──────────────────────────────────────────────────────────────────┘
```

**Key pages:** Lead list/detail, customer profile, activity timeline,
follow-up calendar, RFQ, quotation builder, assigned orders.

### 5.5 Purchase Manager Dashboard

**Purpose:** Control sourcing, supplier pricing, purchase orders, and
expected receipts.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Procurement Overview                  [Create Supplier RFQ]      │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ Open RFQs  │ Pending POs│ Due Receipts│ Reorder Requests          │
├───────────────────────────────┬──────────────────────────────────┤
│ Supplier Quote Comparison     │ Purchase Spend Trend             │
├───────────────────────────────┼──────────────────────────────────┤
│ PO Approval Queue             │ Expected Deliveries / Delays     │
├───────────────────────────────┴──────────────────────────────────┤
│ Supplier Performance and Recent Procurement Activity              │
└──────────────────────────────────────────────────────────────────┘
```

**Key pages:** Supplier directory, supplier RFQs, quote comparison,
purchase order, GRN coordination, returns, landed cost, supplier
performance.

### 5.6 Warehouse Manager Dashboard

**Purpose:** Maintain reliable stock visibility and safe, traceable
inventory movement.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Warehouse Operations                 [Receive Stock] [Transfer]  │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ Stock Value│ Low Stock  │ Near Expiry│ Quarantined Batches       │
├───────────────────────────────┬──────────────────────────────────┤
│ Stock by Warehouse            │ Stock Movement Summary           │
├───────────────────────────────┼──────────────────────────────────┤
│ Batch / Expiry Alerts         │ Pending GRN / Dispatch Picks     │
├───────────────────────────────┴──────────────────────────────────┤
│ Recent Movements and Inventory Exceptions                        │
└──────────────────────────────────────────────────────────────────┘
```

**Key pages:** Warehouse list, chemical stock, batch register, stock
ledger, GRN, reservation, picking, transfers, adjustment approvals,
expiry, quarantine, dispatch preparation.

**Stock rule:** Distinguish physical, available, reserved, quarantined,
damaged, and expired quantities. A quarantined or expired batch must not
be treated as saleable stock.

### 5.7 Accountant Dashboard

**Purpose:** Monitor invoicing, collections, supplier liabilities, and
tax/accounting workflow.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Finance Overview                       [Create Invoice]           │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ Receivables│ Overdue    │ Payables   │ Receipts This Period      │
├───────────────────────────────┬──────────────────────────────────┤
│ Receivables Aging             │ Collections / Payments Trend     │
├───────────────────────────────┼──────────────────────────────────┤
│ Due Customer Payments         │ Supplier Payments Due            │
├───────────────────────────────┴──────────────────────────────────┤
│ Recent Invoices, Receipts, Credit Notes and Integration Status   │
└──────────────────────────────────────────────────────────────────┘
```

**Key pages:** Sales invoices, payment receipts, customer ledger,
supplier payable, credit/debit notes, tax reports, reconciliation,
accounting integration.

**Finance rule:** Tax rates, invoice numbering, e-invoicing eligibility,
e-way bill rules, and accounting behavior must be validated for the
applicable jurisdiction and business setup.

### 5.8 Logistics Manager Dashboard

**Purpose:** Coordinate dispatches and deliveries and identify shipment
exceptions.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Logistics Operations                    [Schedule Dispatch]      │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ To Dispatch│ In Transit │ Delivered  │ Delivery Exceptions       │
├───────────────────────────────┬──────────────────────────────────┤
│ Dispatch Schedule             │ Shipment / Delivery Status       │
├───────────────────────────────┼──────────────────────────────────┤
│ Pending Documents             │ Transporter / Vehicle Allocation │
├───────────────────────────────┴──────────────────────────────────┤
│ Recent Deliveries and Proof of Delivery                           │
└──────────────────────────────────────────────────────────────────┘
```

**Key pages:** Dispatch queue, delivery schedule, transporter,
vehicle/driver, packing list, delivery challan, shipment tracking,
freight, POD, returns.

**Tracking rule:** Show live tracking only if a real carrier/provider
integration exists. Otherwise show internally maintained shipment
status.

### 5.9 Customer Portal Dashboard --- External

**Purpose:** Give each customer secure self-service access to their own
business records.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Customer Portal                         [Submit Chemical RFQ]    │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ Open RFQs  │ Quotes     │ Active Orders│ Outstanding (if allowed)│
├───────────────────────────────┬──────────────────────────────────┤
│ Recent Orders / Delivery      │ Quotes Awaiting Response         │
├───────────────────────────────┼──────────────────────────────────┤
│ Invoices / Payment Status     │ Available SDS / COA Documents    │
├───────────────────────────────┴──────────────────────────────────┤
│ Recent Activity and Support / Contact                              │
└──────────────────────────────────────────────────────────────────┘
```

**Customer pages:** Submit RFQ, RFQ history, quotation details and
response, order history, order status, invoices, payment status,
downloadable approved SDS/COA, account profile.

**Access rule:** A customer can only access records belonging to their
authorized customer account/company. Commercially sensitive internal
margin, supplier pricing, internal notes, and other customers' data must
remain hidden.

### 5.10 Supplier Portal Dashboard --- External

**Purpose:** Allow approved suppliers to respond to sourcing requests
and coordinate their own purchase orders and deliveries.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Supplier Portal                           [View Open RFQs]        │
├────────────┬────────────┬────────────┬───────────────────────────┤
│ RFQs       │ Quotes Sent│ Active POs │ Deliveries Due             │
├───────────────────────────────┬──────────────────────────────────┤
│ RFQs Requiring Response       │ Purchase Orders / Due Dates      │
├───────────────────────────────┼──────────────────────────────────┤
│ Delivery Updates              │ Document Requests / Status       │
├───────────────────────────────┴──────────────────────────────────┤
│ Relevant GRN / Payment Status and Recent Activity                  │
└──────────────────────────────────────────────────────────────────┘
```

**Supplier pages:** Assigned RFQs, quotation submission, quote history,
purchase orders, delivery schedule, dispatch updates, document upload,
relevant GRN status, payment status where authorized.

**Access rule:** A supplier must only see RFQs assigned or published to
them and their own quotations, purchase orders, delivery records, and
permitted payment details. Supplier quotations and costs must not be
exposed to other suppliers.

------------------------------------------------------------------------

## 6. Core Page Wireframes

### 6.1 List / Table Page

Use for leads, customers, chemicals, batches, quotations, sales orders,
suppliers, purchase orders, invoices, shipments, and documents.

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Page Title                                      [Primary Action]  │
│ Supporting description                                            │
├──────────────────────────────────────────────────────────────────┤
│ Search...   Status ▾   Date Range ▾   Warehouse ▾   More Filters │
├──────────────────────────────────────────────────────────────────┤
│ □  ID / Name    Related Entity   Date    Status    Owner   Actions│
│ □  ...                                                         ⋯ │
│ □  ...                                                         ⋯ │
│ □  ...                                                         ⋯ │
├──────────────────────────────────────────────────────────────────┤
│ Selected actions (permission-based)       Rows per page  1–20    │
└──────────────────────────────────────────────────────────────────┘
```

**Requirements:** Column sorting, filters, pagination, row details,
export permission, bulk actions with confirmation, saved filters where
useful, and clear no-results/empty states.

### 6.2 Record Detail Page

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Breadcrumbs                                                      │
│ Record Name / ID                  Status         [Actions ▾]     │
├──────────────────────────────────────────────────────────────────┤
│ Overview | Activity | Documents | Related Orders | Audit History│
├───────────────────────────────────┬──────────────────────────────┤
│ Main record details               │ Summary / Owner / Dates      │
│ Related line items                │ Status / Approval history    │
│ Notes and editable fields         │ Related records              │
├───────────────────────────────────┴──────────────────────────────┤
│ Timeline: Created → Updated → Approved → Fulfilled (as applicable)│
└──────────────────────────────────────────────────────────────────┘
```

### 6.3 Create / Edit Form

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Create / Edit [Record]                                           │
├──────────────────────────────────────────────────────────────────┤
│ Section 1: Basic information                                     │
│ Label                         [Input / Select]                   │
│ Label                         [Input / Select]                   │
├──────────────────────────────────────────────────────────────────┤
│ Section 2: Commercial / Chemical / Logistics details (as relevant)│
│ Dynamic line items, units, quantities, rates, documents          │
├──────────────────────────────────────────────────────────────────┤
│ Attachments / Notes / Validation messages                        │
├──────────────────────────────────────────────────────────────────┤
│ [Cancel]                         [Save Draft] [Submit for Review]│
└──────────────────────────────────────────────────────────────────┘
```

**Form rules:** Group related fields, mark required fields, validate
units and quantities, explain errors beside the relevant field, preserve
draft data when appropriate, and prevent duplicate submissions.

### 6.4 Quotation Builder

``` text
┌──────────────────────────────────────────────────────────────────┐
│ New Quotation                  Draft / Pending Approval           │
├──────────────────────────────────────────────────────────────────┤
│ Customer ▾  RFQ Reference  Valid Until  Currency  Payment Terms  │
├──────────────────────────────────────────────────────────────────┤
│ Chemical | Grade | Batch* | Qty | Unit | Unit Price | Discount   │
│ ...                                                              │
├───────────────────────────────────┬──────────────────────────────┤
│ Internal Cost / Margin (authorized│ Customer-facing totals       │
│ staff only)                       │ Subtotal / Tax / Freight     │
│                                   │ Total / Validity              │
├───────────────────────────────────┴──────────────────────────────┤
│ Notes / Terms / Attachments / Version History                    │
│ [Save Draft] [Request Approval] [Generate PDF] [Convert to Order]│
└──────────────────────────────────────────────────────────────────┘
```

\* Batch selection can be required at quotation time or deferred until
fulfilment, depending on the business's stock allocation process. Do not
force a batch selection before it is operationally appropriate.

**Pricing safeguards:** Internal cost and margin must not appear in
customer PDFs or the Customer Portal. Apply approval rules for discounts
or margin thresholds configured by the business.

### 6.5 Chemical Master and Batch Detail

``` text
┌──────────────────────────────────────────────────────────────────┐
│ Chemical Name / Internal Code                    [Edit]          │
├──────────────────────────────────────────────────────────────────┤
│ Overview | Specifications | Inventory Batches | SDS / COA | Audit│
├───────────────────────────────────┬──────────────────────────────┤
│ CAS / HS- HSN / Category           │ Hazard / Storage Conditions  │
│ Grade / Purity / Concentration     │ Physical Form / Packaging    │
│ Manufacturer / Brand / Units       │ Compliance / Document Status │
├───────────────────────────────────┴──────────────────────────────┤
│ Batch table: Lot | Warehouse | Received | Expiry | Qty | Quality │
├──────────────────────────────────────────────────────────────────┤
│ Batch genealogy / stock movement / document history              │
└──────────────────────────────────────────────────────────────────┘
```

**Chemical data safeguards:** CAS and HS/HSN fields must be validated
according to the intended use. Hazard classification, storage
compatibility, shelf-life, and document requirements must be
configurable and verified against authoritative sources and applicable
regulations.

------------------------------------------------------------------------

## 7. End-to-End Business Workflows

### 7.1 Sales workflow

1.  Capture inquiry or RFQ.
2.  Create or match the customer account.
3.  Identify chemical, grade, quantity, unit, specifications,
    destination, and required documents.
4.  Check product availability and/or request procurement pricing.
5.  Prepare quotation with applicable price, tax, freight, terms, and
    validity.
6.  Submit for approval when required.
7.  Send the approved quotation to the customer.
8.  Record customer acceptance and convert to a sales order.
9.  Reserve eligible stock or plan procurement.
10. Verify batch quality, expiry, SDS/COA, hazard/storage, and
    destination-specific requirements.
11. Prepare invoice and dispatch documents according to the configured
    process.
12. Dispatch and record shipment status and proof of delivery.
13. Record receipts and outstanding balances.
14. Close the order and include the transaction in reports.

### 7.2 Procurement workflow

1.  Reorder alert, sales demand, or manual purchase request is raised.
2.  Purchase manager creates supplier RFQs.
3.  Supplier quotations and terms are compared.
4.  Purchase order is created and approved.
5.  Goods arrive and are checked against the PO.
6.  GRN records received quantities, batch/lot details, documents, and
    discrepancies.
7.  Stock is placed in quarantine or quality review if required.
8.  Only eligible stock becomes available for sale or allocation.
9.  Landed cost and supplier payable are recorded as configured.
10. Supplier payment and performance reporting are updated.

### 7.3 Inventory and batch lifecycle

**Expected / In Transit → Received → Quarantine or Inspection (if
required) → Approved / Available → Reserved → Dispatched**

Alternative exception states include **Rejected, Damaged, Expired,
Returned, Recalled**. These states must be controlled by permissions and
documented transitions. Stock ledger movements should preserve a
traceable history rather than silently overwriting quantities.

### 7.4 Compliance and document workflow

1.  Attach SDS, COA, license, or other required documents to the
    relevant chemical, batch, supplier, customer, or shipment.
2.  Record document type, issue date, expiry date where applicable,
    version, and source.
3.  Configure requirements by chemical, location, transaction type, and
    applicable regulation.
4.  Notify authorized users of missing or expiring documents.
5.  Apply approval or dispatch holds where business rules require them.
6.  Retain document version and audit history.

### 7.5 Customer and Supplier portal workflow

-   External users sign in and see only their authorized account
    records.
-   Customer submits an RFQ; internal sales staff review it and prepare
    a response.
-   Supplier responds only to RFQs made available to that supplier.
-   Portal actions update the relevant internal workflow and create an
    activity/audit record.
-   External users see clear status updates, required next actions, and
    permitted documents.

------------------------------------------------------------------------

## 8. Status and Alert Design

Use consistent status labels and never rely on colour alone. Exact
statuses should be finalized with the client.

  -----------------------------------------------------------------------
  Area                                Example statuses
  ----------------------------------- -----------------------------------
  Lead                                New, Assigned, Contacted,
                                      Qualified, Quotation, Won, Lost

  RFQ                                 Draft, Submitted, Under Review,
                                      Quoted, Accepted, Rejected, Closed

  Quotation                           Draft, Pending Approval, Approved,
                                      Sent, Accepted, Rejected, Expired

  Sales Order                         Draft, Confirmed, Partially
                                      Fulfilled, Ready to Dispatch,
                                      Dispatched, Delivered, Closed,
                                      Cancelled

  Purchase Order                      Draft, Pending Approval, Approved,
                                      Sent, Partially Received, Received,
                                      Closed, Cancelled

  Batch / Quality                     Quarantined, Under Inspection,
                                      Approved, Rejected, Damaged,
                                      Expired, Recalled

  Invoice                             Draft, Issued, Partially Paid,
                                      Paid, Overdue, Cancelled / Credited
                                      as permitted

  Shipment                            Planned, Ready, Dispatched, In
                                      Transit, Delivered, Delayed,
                                      Exception, Returned

  Document                            Missing, Uploaded, Under Review,
                                      Approved, Rejected, Expiring,
                                      Expired
  -----------------------------------------------------------------------

### Alerts

-   Follow-up due / overdue
-   Quotation approval pending
-   Low stock / reorder threshold reached
-   Batch approaching expiry
-   Required SDS/COA or compliance document missing/expired
-   Purchase receipt delayed or quantity discrepancy
-   Customer payment overdue
-   Dispatch delayed / POD missing
-   Integration failure or failed document processing

Alerts should link to the relevant record and respect the user's
permissions.

------------------------------------------------------------------------

## 9. Visual Design System: Premium Glass-Inspired Industrial SaaS

### Recommended baseline palette

  -----------------------------------------------------------------------
  Token                   Colour                  Intended use
  ----------------------- ----------------------- -----------------------
  Midnight Navy           `#101828`               Primary navigation,
                                                  headings, strong
                                                  contrast areas

  Champagne Gold          `#C6A66B`               Primary accent,
                                                  selected states,
                                                  restrained highlights

  Warm Off-White          `#F7F6F2`               Main app background

  Pure White              `#FFFFFF`               Content surfaces and
                                                  readable tables

  Slate                   `#667085`               Secondary text and
                                                  supporting labels

  Border Grey             `#E4E7EC`               Dividers, table
                                                  borders, card outlines

  Success Green           `#16805D`               Positive/approved
                                                  status

  Warning Amber           `#B7791F`               Warning/attention
                                                  states

  Danger Red              `#C43232`               Errors, blocked
                                                  actions, critical
                                                  hazards

  Info Blue               `#2E6FBB`               Informational status
  -----------------------------------------------------------------------

### Glassmorphism usage

-   Use subtle frosted-glass surfaces for the global header, selected
    summary cards, dropdowns, modal overlays, and occasional highlight
    panels.
-   Use a translucent white surface, low-opacity border, modest backdrop
    blur, and soft shadow where supported.
-   Keep primary content tables, forms, invoices, batch records, and
    dense data grids mostly solid white/off-white for legibility.
-   Do not put low-contrast glass effects behind small text, hazard
    warnings, complex tables, or financial figures.
-   Use gradients sparingly; the product should look industrial,
    trustworthy, and premium---not futuristic or decorative.
-   Provide a solid-background fallback for browsers or contexts where
    backdrop blur is unavailable.

### Typography and spacing

-   Use a highly legible modern sans-serif such as Inter or a comparable
    available font.
-   Establish a clear type scale: page title, section heading, card
    label, body, helper text, and table text.
-   Use consistent spacing, aligned labels, consistent field heights,
    and restrained border radii.
-   Format currency, dates, quantities, and units consistently.
-   Use icons consistently and pair critical icons with labels.

### UI principles

1.  Data clarity over decoration.
2.  Strong contrast and accessible status indicators.
3.  Tables optimized for real operational work.
4.  Primary action is visually clear on each page.
5.  Search and filtering are easy to discover.
6.  No fake metrics or unconnected buttons.
7.  Every status has a meaningful definition and permitted transitions.
8.  All screens have loading, empty, error, and success states.
9.  Responsive layouts preserve critical actions.
10. Confirm destructive actions and record significant changes in the
    audit trail.

------------------------------------------------------------------------

## 10. Shared Components

Build reusable components so all role dashboards remain consistent:

-   Application shell, sidebar, top bar, breadcrumbs
-   Page header and primary action
-   KPI card
-   Searchable, sortable, filterable data table
-   Status badge with text label
-   Filter bar and date-range selector
-   Tabs and segmented navigation
-   Customer / supplier selector
-   Chemical selector with CAS and grade details
-   Quantity + unit input
-   Currency / tax / pricing summary
-   Batch selector and batch status indicator
-   Document uploader and document preview
-   Activity timeline and audit history
-   Approval stepper and approval action panel
-   Confirmation dialog
-   Toast / inline notification
-   Empty state and loading skeleton
-   Pagination
-   Responsive drawer
-   Permission-denied state
-   Export / print controls where permitted

------------------------------------------------------------------------

## 11. Role Access Matrix (High-Level)

This is a starting point. Final permissions must be agreed with the
client and enforced on the backend.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Module / Action Super Admin Owner       Sales Manager  Sales          Purchase Manager    Warehouse       Accountant           Logistics Manager  Customer          Supplier
                                                         Executive                          Manager                                                                   
  --------------- ----------- ----------- -------------- -------------- ------------------- --------------- -------------------- ------------------ ----------------- -----------
  User / role     Configure   View        No             No             No                  No              No                   No                 No                No
  configuration               limited                                                                                                                                 

  Business-wide   Configure   View        Sales scope    Own scope      Purchase scope      Stock scope     Finance scope        Logistics scope    No                No
  analytics       access                                                                                                                                              

  Leads /         Admin       View as     Team scope     Assigned scope Limited reference   Limited         Billing reference    Delivery reference Own account       No
  customers       access      permitted                                                     reference                                                                 

  Quotations      Admin       View as     Manage /       Create /       Supplier quotes     Availability    Billing reference    Delivery reference Own quotes        Own
                  access      permitted   approve        manage                             reference                                                                 submitted
                                                         assigned                                                                                                     quotes

  Sales orders    Admin       View        Team scope     Assigned scope Demand reference    Pick / reserve  Invoice scope        Dispatch scope     Own orders        No
                  access                                                                    scope                                                                     

  Purchase /      Admin       View        Limited        No or limited  Manage              Receipt         Payable reference    Delivery reference No                Assigned
  supplier RFQs   access                  reference                                         reference                                                                 RFQs only

  Stock / batches Configure   View        Availability   Availability   Reorder reference   Manage within   Valuation/report     Dispatch scope     No internal stock No internal
                  access                  view           view                               permission      scope                                   ledger            stock
                                                                                                                                                                      ledger

  Invoices /      Configure   View        Limited status Limited status Payable reference   No              Manage               Freight/delivery   Own               Own
  payments        access                                                                                                         reference          invoices/status   permitted
                                                                                                                                                                      status

  Dispatch / POD  Admin       View        View           View assigned  Inbound reference   Prepare /       Freight/accounting   Manage             Own delivery      Own inbound
                  access                                                                    handoff         reference                               status            delivery
                                                                                                                                                                      status

  Compliance      Configure   View        Relevant       Relevant       Supplier/purchase   Batch/storage   Tax/finance docs     Shipment docs      Approved own docs Own
  documents       access                  documents      documents      docs                docs                                                                      permitted
                                                                                                                                                                      docs

  Audit trail     System      Business    Team scope as  Own activity   Procurement scope   Inventory scope Finance scope        Logistics scope    Own portal        Own portal
                  audit       audit scope permitted      where                                                                                      activity if       activity if
                                                         permitted                                                                                  exposed           exposed
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Least privilege:** "Admin access" does not mean bypassing all business
controls. Critical changes, quality release, financial actions,
restricted-chemical approval, and audit access must follow defined
authorization rules.

------------------------------------------------------------------------

## 12. Integrations and AI: Design as Explicit Capabilities

The UI may reserve space for these capabilities, but implementation
status must be transparent.

### External integrations to validate

-   WhatsApp Business messaging / approved provider
-   Email provider
-   GST e-invoicing and e-way bill service, where applicable
-   Tally or other accounting system
-   Shipment/carrier tracking provider
-   Barcode / QR scanning hardware or device support
-   Currency / exchange-rate source for multi-currency transactions
-   Document storage and secure file access

For each integration, define authentication, configuration, error
states, retry behavior, data mapping, permissions, audit events, and a
visible connection status. Do not display "Connected" unless the
integration has actually been configured and verified.

### AI capabilities to validate

-   RFQ / PO document extraction
-   Draft quotation generation
-   Follow-up suggestions
-   Product search assistance
-   Demand forecasting and reorder recommendations
-   Customer purchase-pattern analysis
-   Payment reminder drafts
-   Management insights

AI-generated fields must be reviewable and editable. AI must not
autonomously approve restricted chemicals, release quarantined stock,
send unreviewed commercial offers, or execute financial actions unless a
separately approved and controlled workflow explicitly permits the
action.

------------------------------------------------------------------------

## 13. Security, Auditability, and Data Integrity

-   Authenticate users securely and enforce authorization on every
    protected API.
-   Separate internal roles from external customer and supplier
    accounts.
-   Enforce tenant/company/branch boundaries where multi-company support
    is enabled.
-   Validate access to every record and attachment server-side.
-   Store documents securely; use authorized access links and
    appropriate retention controls.
-   Record important changes to price, quantity, batch status,
    approvals, invoices, payment status, and permissions.
-   Keep a stock movement ledger with source, destination, quantity,
    timestamp, actor, and reason.
-   Prevent unauthorized editing or deletion of finalized financial and
    traceability records; use controlled corrections and credit/reversal
    workflows.
-   Use configurable approval thresholds and separation of duties where
    required.
-   Never rely on hiding a UI button as the only security control.
-   Avoid placing sensitive internal notes, supplier pricing, cost, or
    margin in customer-facing PDFs or portals.
-   Define backup, recovery, retention, and incident-handling policies
    before production use.

------------------------------------------------------------------------

## 14. Suggested Implementation Phases

### Phase 1 --- Core CRM and Sales UI

-   Login and role-based access experience
-   Super Admin and Business Owner shells
-   Sales Manager and Sales Executive dashboards
-   Leads, customers, chemical catalog, RFQs, quotations, approvals,
    sales orders
-   Shared component library and design tokens

### Phase 2 --- Inventory, Procurement and Quality

-   Purchase Manager and Warehouse Manager dashboards
-   Supplier management, supplier RFQs, purchase orders, GRN
-   Warehouses, batches, stock ledger, reservations, expiry and
    quarantine
-   SDS / COA linking and compliance review

### Phase 3 --- Finance and Logistics

-   Accountant and Logistics Manager dashboards
-   Invoices, receipts, payables, tax documents
-   Dispatch, transporter, delivery challan, shipment and POD workflows
-   Integration setup and error handling

### Phase 4 --- External Portals and Advanced Features

-   Customer Portal and Supplier Portal
-   Portal-specific authentication, access controls, and account
    isolation
-   AI-assisted workflows, barcode/QR, forecasting, import/export,
    advanced analytics
-   Multi-branch / multi-company capabilities if approved

Phases can overlap depending on project resources, but the underlying
data model and authorization rules should be planned before UI screens
are wired to production APIs.

------------------------------------------------------------------------

## 15. Definition of Done for UI Screens

A screen should not be marked complete just because it looks finished.
Verify that:

-   [ ] Its purpose and intended role are documented.
-   [ ] Navigation and breadcrumbs are correct.
-   [ ] Every visible button has a defined action.
-   [ ] Inputs have validation and helpful error messages.
-   [ ] Loading, empty, error, success, and access-denied states exist.
-   [ ] Tables support the required search, filtering, sorting, and
    pagination.
-   [ ] Responsive behavior has been checked.
-   [ ] Keyboard focus and contrast are usable.
-   [ ] Sensitive data is hidden from unauthorized roles.
-   [ ] Dashboard KPIs are connected to defined data sources or clearly
    marked as placeholders in a prototype.
-   [ ] Destructive and approval actions require appropriate
    confirmation.
-   [ ] Status changes and important actions are traceable.
-   [ ] Customer-facing PDFs and portal screens exclude internal
    cost/margin.
-   [ ] The screen follows the shared design system.

------------------------------------------------------------------------

## 16. Decisions Requiring Client Confirmation

Before final implementation, confirm:

1.  Is the first release CRM-only, full CRM + ERP, or phased delivery?
2.  Is the business India-focused, international, or both?
3.  Which currencies, tax jurisdictions, GST/e-invoice/e-way bill
    requirements apply?
4.  Is the initial deployment single-company or multi-company /
    multi-branch?
5.  Which chemical categories and hazard / storage rules are in scope?
6.  At what point is a batch allocated: quotation, sales order, picking,
    or dispatch?
7.  Which quality checks block stock availability or dispatch?
8.  Which roles can approve discounts, purchase orders, credit limits,
    invoices, stock adjustments, and quality release?
9.  Which messaging, accounting, shipment, barcode, and AI providers are
    approved?
10. Which portal actions and payment details may external users see?
11. Which reports define revenue, gross margin, net profit, landed cost,
    and inventory valuation?
12. What document retention, audit, and regulatory requirements apply?

------------------------------------------------------------------------

## 17. Final Product Summary

The intended product is a **single, connected Chemical Trading CRM +
ERP** with:

-   **10 dashboard experiences** --- 8 internal roles plus Customer and
    Supplier external portals.
-   **13 proposed internal navigation areas** --- Overview, CRM,
    Chemical Catalog, Quotations, Sales, Inventory, Procurement,
    Finance, Logistics, Quality & Compliance, Reports & Analytics, AI &
    Automation, Administration.
-   **End-to-end workflows** --- inquiry to payment and sourcing to
    available stock.
-   **Chemical-specific controls** --- CAS/HSN, grade/purity, SDS/COA,
    batch/lot tracking, expiry, hazard/storage information, quality
    holds, and traceability.
-   **Premium UI direction** --- Midnight Navy `#101828`, Champagne Gold
    `#C6A66B`, Warm Off-White `#F7F6F2`, and white surfaces, with
    restrained glassmorphism.
-   **Security by role and record ownership** --- especially for
    customer and supplier portals.
-   **Integration-ready architecture** --- without claiming integrations
    are live until verified.

This document is the baseline wireframe and product structure reference.
The final data model, regulatory behavior, permissions, integrations,
and release scope must be confirmed against the client's actual
operating procedures before production deployment.
