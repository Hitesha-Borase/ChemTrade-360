// ChemTrade 360 - Comprehensive Realistic Chemical Industry Mock Data

export const INITIAL_CHEMICALS = [
  {
    id: 'CHEM-001',
    name: 'Caustic Soda Lye',
    chemicalFormula: 'NaOH (aq)',
    casNumber: '1310-73-2',
    hsnCode: '28151200',
    category: 'Alkali / Basic Chemicals',
    grade: 'Rayon / Industrial Grade',
    purity: '48.0% Min',
    form: 'Liquid',
    packaging: 'SS Tanker / IBC Containers (1000L)',
    uom: 'MT',
    basePricePerUnit: 34500,
    manufacturer: 'Gujarat Alkalies & Chemicals (GACL)',
    hazardClass: 'Class 8: Corrosive',
    unNumber: 'UN 1824',
    storageConditions: 'Store in dedicated SS316 / rubber-lined tanks. Keep above 15°C to avoid crystallization.',
    isRestricted: false,
    requiresCOA: true,
    sdsAvailable: true,
    currentStock: 340.5,
    reorderLevel: 100.0,
    status: 'Active'
  },
  {
    id: 'CHEM-002',
    name: 'Methanol Pure',
    chemicalFormula: 'CH3OH',
    casNumber: '67-56-1',
    hsnCode: '29051100',
    category: 'Solvents & Alcohols',
    grade: 'Industrial Pure Grade',
    purity: '99.85%',
    form: 'Clear Liquid',
    packaging: 'MS Tanker / Barrels (160 kg)',
    uom: 'MT',
    basePricePerUnit: 28200,
    manufacturer: 'GNFC / Deepak Fertilizers',
    hazardClass: 'Class 3: Flammable Liquid / Class 6.1: Toxic',
    unNumber: 'UN 1230',
    storageConditions: 'Nitrogen blanketed underground storage tank, flame-proof electricals required.',
    isRestricted: true,
    requiresCOA: true,
    sdsAvailable: true,
    currentStock: 185.0,
    reorderLevel: 80.0,
    status: 'Active'
  },
  {
    id: 'CHEM-003',
    name: 'Sulfuric Acid',
    chemicalFormula: 'H2SO4',
    casNumber: '7664-93-9',
    hsnCode: '28070010',
    category: 'Inorganic Acids',
    grade: 'Technical Concentrated',
    purity: '98.0%',
    form: 'Dense Oily Liquid',
    packaging: 'Dedicated Lead-lined Tanker / HDPE Carboys',
    uom: 'MT',
    basePricePerUnit: 14800,
    manufacturer: 'Hindalco / Birla Copper',
    hazardClass: 'Class 8: Corrosive / Acidic',
    unNumber: 'UN 1830',
    storageConditions: 'Dry, well-ventilated area away from alkaline materials and water sources. Secondary containment mandatory.',
    isRestricted: true,
    requiresCOA: true,
    sdsAvailable: true,
    currentStock: 120.0,
    reorderLevel: 60.0,
    status: 'Active'
  },
  {
    id: 'CHEM-004',
    name: 'Isopropyl Alcohol (IPA)',
    chemicalFormula: 'C3H8O',
    casNumber: '67-63-0',
    hsnCode: '29051220',
    category: 'Solvents',
    grade: 'Pharma / Electronic Grade',
    purity: '99.9%',
    form: 'Colorless Liquid',
    packaging: 'Steel Drums (160 kg) / Road Tanker',
    uom: 'MT',
    basePricePerUnit: 98500,
    manufacturer: 'Deepak Phenolics Ltd',
    hazardClass: 'Class 3: Flammable Liquid',
    unNumber: 'UN 1219',
    storageConditions: 'Store below 30°C in certified explosive-proof solvent shed.',
    isRestricted: false,
    requiresCOA: true,
    sdsAvailable: true,
    currentStock: 48.2,
    reorderLevel: 25.0,
    status: 'Active'
  },
  {
    id: 'CHEM-005',
    name: 'Titanium Dioxide Rutile',
    chemicalFormula: 'TiO2',
    casNumber: '13463-67-7',
    hsnCode: '32061110',
    category: 'Pigments & Coatings',
    grade: 'R-996 Coating Grade',
    purity: '94.5% TiO2 Min',
    form: 'Ultra Fine White Powder',
    packaging: '25 KG Multiwall Paper Bags (Palletized)',
    uom: 'MT',
    basePricePerUnit: 242000,
    manufacturer: 'Lomon Billions / Tronox',
    hazardClass: 'Non-Hazardous / Dust Mask Required',
    unNumber: 'NA',
    storageConditions: 'Ambient temperature, protect from moisture and torn pallets.',
    isRestricted: false,
    requiresCOA: true,
    sdsAvailable: true,
    currentStock: 32.5,
    reorderLevel: 15.0,
    status: 'Active'
  },
  {
    id: 'CHEM-006',
    name: 'Acetone Technical',
    chemicalFormula: 'CH3COCH3',
    casNumber: '67-64-1',
    hsnCode: '29141100',
    category: 'Ketones / Solvents',
    grade: 'High Purity Virgin Grade',
    purity: '99.5%',
    form: 'Clear Volatile Liquid',
    packaging: 'Epoxy-lined Drums (160 kg) / Bulk Tanker',
    uom: 'MT',
    basePricePerUnit: 78000,
    manufacturer: 'Deepak Nitrite Ltd',
    hazardClass: 'Class 3: Highly Flammable',
    unNumber: 'UN 1090',
    storageConditions: 'Controlled precursor inventory. PESO and NCB compliant storage mandatory.',
    isRestricted: true,
    requiresCOA: true,
    sdsAvailable: true,
    currentStock: 64.0,
    reorderLevel: 30.0,
    status: 'Active'
  },
  {
    id: 'CHEM-007',
    name: 'Soda Ash Dense',
    chemicalFormula: 'Na2CO3',
    casNumber: '497-19-8',
    hsnCode: '28362010',
    category: 'Inorganic Salts',
    grade: 'Glass / Detergent Grade',
    purity: '99.2%',
    form: 'Granular White Solid',
    packaging: '50 KG HDPE Laminated Bags / 1 MT Jumbo Bags',
    uom: 'MT',
    basePricePerUnit: 29500,
    manufacturer: 'Tata Chemicals Ltd (Mithapur)',
    hazardClass: 'Class 9: Mild Irritant',
    unNumber: 'NA',
    storageConditions: 'Dry indoor storage. Keep moisture levels strictly below 0.5%.',
    isRestricted: false,
    requiresCOA: true,
    sdsAvailable: true,
    currentStock: 210.0,
    reorderLevel: 90.0,
    status: 'Active'
  },
  {
    id: 'CHEM-008',
    name: 'Toluene Commercial',
    chemicalFormula: 'C7H8',
    casNumber: '108-88-3',
    hsnCode: '29023000',
    category: 'Aromatic Hydrocarbons',
    grade: 'Pure Solvent Grade',
    purity: '99.8%',
    form: 'Liquid',
    packaging: 'ISO Tank Container / MS Tanker',
    uom: 'MT',
    basePricePerUnit: 84000,
    manufacturer: 'Reliance Industries Ltd',
    hazardClass: 'Class 3: Flammable / Health Hazard',
    unNumber: 'UN 1294',
    storageConditions: 'Grounding bonding during transfer, keep away from sparks and sunlight.',
    isRestricted: true,
    requiresCOA: true,
    sdsAvailable: true,
    currentStock: 92.0,
    reorderLevel: 40.0,
    status: 'Active'
  }
];

export const INITIAL_BATCHES = [
  {
    batchNo: 'BAT-2026-CS-01',
    chemicalId: 'CHEM-001',
    chemicalName: 'Caustic Soda Lye',
    warehouse: 'Dahej Liquid Terminal (Tank T-104)',
    mfgDate: '2026-08-10',
    expiryDate: '2027-08-10',
    receivedDate: '2026-08-15',
    initialQty: 180.0,
    availableQty: 140.5,
    reservedQty: 39.5,
    quarantinedQty: 0.0,
    uom: 'MT',
    unitCost: 31200,
    supplier: 'Gujarat Alkalies & Chemicals (GACL)',
    coaStatus: 'Verified & Approved',
    coaDocument: 'COA-GACL-260810-CSL.pdf',
    qualityStatus: 'Approved',
    feFoPriority: 1,
    notes: 'Meets Rayon Grade spec. Purity 48.4% verified by internal QC lab.'
  },
  {
    batchNo: 'BAT-2026-ME-02',
    chemicalId: 'CHEM-002',
    chemicalName: 'Methanol Pure',
    warehouse: 'Hazira Tank Terminal (Tank M-02)',
    mfgDate: '2026-09-01',
    expiryDate: '2027-09-01',
    receivedDate: '2026-09-05',
    initialQty: 120.0,
    availableQty: 85.0,
    reservedQty: 35.0,
    quarantinedQty: 0.0,
    uom: 'MT',
    unitCost: 25400,
    supplier: 'GNFC Bharuch',
    coaStatus: 'Verified & Approved',
    coaDocument: 'COA-GNFC-ME-901.pdf',
    qualityStatus: 'Approved',
    feFoPriority: 2,
    notes: 'Water content 0.03%, Permanganate time > 60 mins.'
  },
  {
    batchNo: 'BAT-2026-SA-03',
    chemicalId: 'CHEM-003',
    chemicalName: 'Sulfuric Acid',
    warehouse: 'Dahej Liquid Terminal (Tank S-01)',
    mfgDate: '2026-09-15',
    expiryDate: '2027-09-15',
    receivedDate: '2026-09-18',
    initialQty: 90.0,
    availableQty: 70.0,
    reservedQty: 20.0,
    quarantinedQty: 0.0,
    uom: 'MT',
    unitCost: 12900,
    supplier: 'Hindalco Copper Div',
    coaStatus: 'Verified & Approved',
    coaDocument: 'COA-HD-SA98-15.pdf',
    qualityStatus: 'Approved',
    feFoPriority: 3,
    notes: 'Purity 98.2%. Iron content < 30 ppm.'
  },
  {
    batchNo: 'BAT-2026-IP-04',
    chemicalId: 'CHEM-004',
    chemicalName: 'Isopropyl Alcohol (IPA)',
    warehouse: 'Bhiwandi Central Depot (Shed B2)',
    mfgDate: '2026-07-20',
    expiryDate: '2027-01-20', // Near expiry (< 90 days)
    receivedDate: '2026-07-28',
    initialQty: 30.0,
    availableQty: 12.0,
    reservedQty: 0.0,
    quarantinedQty: 0.0,
    uom: 'MT',
    unitCost: 91000,
    supplier: 'Deepak Phenolics Ltd',
    coaStatus: 'Verified & Approved',
    coaDocument: 'COA-DPL-IPA-720.pdf',
    qualityStatus: 'Approved',
    feFoPriority: 1, // High priority because near expiry
    notes: 'FEFO priority: Expiring in 83 days. Allocate first!'
  },
  {
    batchNo: 'BAT-2026-TD-05',
    chemicalId: 'CHEM-005',
    chemicalName: 'Titanium Dioxide Rutile',
    warehouse: 'Bhiwandi Central Depot (Pallet Bay P-12)',
    mfgDate: '2026-06-10',
    expiryDate: '2028-06-10',
    receivedDate: '2026-06-25',
    initialQty: 40.0,
    availableQty: 0.0,
    reservedQty: 0.0,
    quarantinedQty: 10.0,
    uom: 'MT',
    unitCost: 220000,
    supplier: 'Lomon Billions (Imported)',
    coaStatus: 'Under Laboratory Verification',
    coaDocument: 'COA-LB-R996-IMPORT.pdf',
    qualityStatus: 'Quarantined',
    feFoPriority: 99,
    notes: 'Quarantined: Moisture ingress suspected on 400 bags during ocean transit. Sample sent to SGS Lab.'
  },
  {
    batchNo: 'BAT-2026-AC-06',
    chemicalId: 'CHEM-006',
    chemicalName: 'Acetone Technical',
    warehouse: 'JNPT Bonded Terminal (Bay 4)',
    mfgDate: '2026-08-25',
    expiryDate: '2027-08-25',
    receivedDate: '2026-09-02',
    initialQty: 75.0,
    availableQty: 50.0,
    reservedQty: 14.0,
    quarantinedQty: 0.0,
    uom: 'MT',
    unitCost: 71500,
    supplier: 'Deepak Nitrite Ltd',
    coaStatus: 'Verified & Approved',
    coaDocument: 'COA-DNL-ACT-825.pdf',
    qualityStatus: 'Approved',
    feFoPriority: 4,
    notes: 'NCB License quota reconciled. Ready for dispatch against authorized POs.'
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-001',
    companyName: 'Asian Paints Ltd',
    contactPerson: 'Rajesh Sharma (Head of Sourcing)',
    email: 'r.sharma@asianpaints.com',
    phone: '+91 98201 44521',
    city: 'Mumbai',
    state: 'Maharashtra',
    gstin: '27AAACA1234A1Z5',
    pan: 'AAACA1234A',
    tier: 'Tier 1 Enterprise',
    creditLimit: 5000000,
    creditDays: 45,
    outstandingBalance: 1240000,
    overdueAmount: 0,
    activeOrdersCount: 2,
    lifetimeSpend: 42800000,
    status: 'Active',
    authorizedChemicals: ['Caustic Soda Lye', 'Titanium Dioxide Rutile', 'Acetone Technical', 'Methanol Pure']
  },
  {
    id: 'CUST-002',
    companyName: 'Pidilite Industries Ltd',
    contactPerson: 'Anjali Desai (Procurement Lead)',
    email: 'a.desai@pidilite.com',
    phone: '+91 98210 99882',
    city: 'Vapi',
    state: 'Gujarat',
    gstin: '24AAACP4567B1Z8',
    pan: 'AAACP4567B',
    tier: 'Tier 1 Enterprise',
    creditLimit: 3500000,
    creditDays: 30,
    outstandingBalance: 420000,
    overdueAmount: 0,
    activeOrdersCount: 1,
    lifetimeSpend: 28400000,
    status: 'Active',
    authorizedChemicals: ['Caustic Soda Lye', 'Isopropyl Alcohol (IPA)', 'Toluene Commercial']
  },
  {
    id: 'CUST-003',
    companyName: 'UPL Agro-Solutions India',
    contactPerson: 'Vikas Kulkarni (Sr. Buyer)',
    email: 'vikas.kulkarni@upl-ltd.com',
    phone: '+91 98790 33411',
    city: 'Ankleshwar',
    state: 'Gujarat',
    gstin: '24AAACU7890C1Z2',
    pan: 'AAACU7890C',
    tier: 'Mid-Market',
    creditLimit: 2500000,
    creditDays: 30,
    outstandingBalance: 890000,
    overdueAmount: 310000, // Overdue!
    activeOrdersCount: 1,
    lifetimeSpend: 16500000,
    status: 'Active (Credit Warning)',
    authorizedChemicals: ['Sulfuric Acid', 'Methanol Pure', 'Caustic Soda Lye']
  },
  {
    id: 'CUST-004',
    companyName: 'Sun Pharma Advanced Research',
    contactPerson: 'Dr. Nitin Patel (API Sourcing)',
    email: 'nitin.patel@sunpharma.com',
    phone: '+91 99090 11223',
    city: 'Dahej SEZ',
    state: 'Gujarat',
    gstin: '24AAACS9999D1Z4',
    pan: 'AAACS9999D',
    tier: 'Pharma / High Compliance',
    creditLimit: 4000000,
    creditDays: 60,
    outstandingBalance: 650000,
    overdueAmount: 0,
    activeOrdersCount: 1,
    lifetimeSpend: 31200000,
    status: 'Active',
    authorizedChemicals: ['Isopropyl Alcohol (IPA)', 'Methanol Pure', 'Acetone Technical']
  },
  {
    id: 'CUST-005',
    companyName: 'Aarti Industries Ltd',
    contactPerson: 'Sameer Joshi (Materials Mgr)',
    email: 'sameer.joshi@aarti-industries.com',
    phone: '+91 98200 77112',
    city: 'Tarapur',
    state: 'Maharashtra',
    gstin: '27AAACA5555E1Z6',
    pan: 'AAACA5555E',
    tier: 'Mid-Market',
    creditLimit: 2000000,
    creditDays: 30,
    outstandingBalance: 0,
    overdueAmount: 0,
    activeOrdersCount: 0,
    lifetimeSpend: 9800000,
    status: 'Active',
    authorizedChemicals: ['Sulfuric Acid', 'Toluene Commercial', 'Soda Ash Dense']
  }
];

export const INITIAL_SUPPLIERS = [
  {
    id: 'SUPP-001',
    companyName: 'Gujarat Alkalies & Chemicals Ltd (GACL)',
    contactPerson: 'Hiren Mehta (Sales Head)',
    email: 'h.mehta@gacl.co.in',
    phone: '+91 265 2232681',
    city: 'Vadodara / Dahej',
    state: 'Gujarat',
    gstin: '24AAACG1234A1Z9',
    category: 'Chlor-Alkali Manufacturer',
    rating: 4.8,
    paymentTerms: 'Advance / 15 Days LC',
    suppliedChemicals: ['Caustic Soda Lye', 'Caustic Soda Flakes', 'Hydrogen Peroxide'],
    status: 'Approved & Verified'
  },
  {
    id: 'SUPP-002',
    companyName: 'Deepak Phenolics Ltd',
    contactPerson: 'Amit Trivedi (Commercial)',
    email: 'amit.t@deepakphenolics.com',
    phone: '+91 265 2774411',
    city: 'Dahej',
    state: 'Gujarat',
    gstin: '24AAACD9876E1Z3',
    category: 'Petrochemicals & Solvents',
    rating: 4.9,
    paymentTerms: '30 Days Credit',
    suppliedChemicals: ['Isopropyl Alcohol (IPA)', 'Acetone Technical', 'Phenol'],
    status: 'Approved & Verified'
  },
  {
    id: 'SUPP-003',
    companyName: 'Hindalco Industries Ltd',
    contactPerson: 'Karan Sen (Chemical Marketing)',
    email: 'karan.sen@adityabirla.com',
    phone: '+91 2641 251200',
    city: 'Dahej Copper Complex',
    state: 'Gujarat',
    gstin: '24AAACH1122K1Z0',
    category: 'Acid & Minerals',
    rating: 4.7,
    paymentTerms: '15 Days Credit',
    suppliedChemicals: ['Sulfuric Acid', 'Phosphoric Acid'],
    status: 'Approved & Verified'
  },
  {
    id: 'SUPP-004',
    companyName: 'Tata Chemicals Ltd',
    contactPerson: 'Rohan Sen (Inorganic Sourcing)',
    email: 'rohan.sen@tatachemicals.com',
    phone: '+91 2892 234100',
    city: 'Mithapur',
    state: 'Gujarat',
    gstin: '24AAACT4433P1Z5',
    category: 'Inorganic Salts',
    rating: 4.9,
    paymentTerms: '30 Days Net',
    suppliedChemicals: ['Soda Ash Dense', 'Sodium Bicarbonate'],
    status: 'Approved & Verified'
  }
];

export const INITIAL_LEADS = [
  {
    id: 'LEAD-2026-101',
    companyName: 'Kansai Nerolac Paints',
    contactPerson: 'Manish Verma',
    phone: '+91 98199 88776',
    email: 'm.verma@nerolac.com',
    chemicalNeeded: 'Titanium Dioxide Rutile',
    estimatedQty: 25.0,
    uom: 'MT',
    targetPrice: 240000,
    stage: 'Quotation Sent',
    assignedTo: 'Rahul Sen (Sales Exec)',
    source: 'Trade Portal Inquiry',
    leadScore: 85,
    nextFollowUp: '2026-10-30',
    notes: 'Interested in R-996 equivalent grade for automotive primer line.'
  },
  {
    id: 'LEAD-2026-102',
    companyName: 'Cipla Laboratories Pithampur',
    contactPerson: 'Dr. Archana Rao',
    phone: '+91 97555 43210',
    email: 'archana.rao@cipla.com',
    chemicalNeeded: 'Isopropyl Alcohol (IPA)',
    estimatedQty: 18.0,
    uom: 'MT',
    targetPrice: 97000,
    stage: 'Technical Review',
    assignedTo: 'Priya Sharma (Sales Exec)',
    source: 'Direct Website RFQ',
    leadScore: 92,
    nextFollowUp: '2026-10-31',
    notes: 'Requires IP grade with endotoxin test report and dedicated clean tanker.'
  },
  {
    id: 'LEAD-2026-103',
    companyName: 'Alok Industries Textile Div',
    contactPerson: 'Dharmesh Kapadia',
    phone: '+91 98251 12345',
    email: 'dkapadia@alokind.com',
    chemicalNeeded: 'Caustic Soda Lye',
    estimatedQty: 60.0,
    uom: 'MT',
    targetPrice: 34000,
    stage: 'New Inquiry',
    assignedTo: 'Rahul Sen (Sales Exec)',
    source: 'Referral',
    leadScore: 70,
    nextFollowUp: '2026-10-29',
    notes: 'Immediate requirement for Silvassa processing plant.'
  },
  {
    id: 'LEAD-2026-104',
    companyName: 'Coromandel International',
    contactPerson: 'K. S. Narayanan',
    phone: '+91 98400 99112',
    email: 'ksnarayanan@coromandel.biz',
    chemicalNeeded: 'Sulfuric Acid',
    estimatedQty: 100.0,
    uom: 'MT',
    targetPrice: 14500,
    stage: 'Price Negotiation',
    assignedTo: 'Vikram Mehta (Sales Mgr)',
    source: 'Annual Tender Tender-2026',
    leadScore: 95,
    nextFollowUp: '2026-11-02',
    notes: 'Bulk volume. Freight rebate discussed for dedicated rake/tanker fleet.'
  }
];

export const INITIAL_QUOTATIONS = [
  {
    id: 'QT-2026-0891',
    rfqRef: 'RFQ-AP-4402',
    customerId: 'CUST-001',
    customerName: 'Asian Paints Ltd',
    customerContact: 'Rajesh Sharma',
    date: '2026-10-25',
    validUntil: '2026-11-10',
    paymentTerms: '45 Days from Invoice Date',
    deliveryTerms: 'FOR Taloja Works (Freight Paid)',
    items: [
      {
        chemicalId: 'CHEM-001',
        name: 'Caustic Soda Lye (48%)',
        cas: '1310-73-2',
        grade: 'Rayon Grade',
        qty: 40.0,
        uom: 'MT',
        internalCostRate: 31200,
        quotedRate: 34800,
        discountPercent: 1.5,
        taxPercent: 18,
        allocatedBatch: 'BAT-2026-CS-01',
        itemTotal: 1371120
      },
      {
        chemicalId: 'CHEM-006',
        name: 'Acetone Technical (99.5%)',
        cas: '67-64-1',
        grade: 'High Purity Virgin',
        qty: 15.0,
        uom: 'MT',
        internalCostRate: 71500,
        quotedRate: 78500,
        discountPercent: 0,
        taxPercent: 18,
        allocatedBatch: 'BAT-2026-AC-06',
        itemTotal: 1177500
      }
    ],
    subtotal: 2548620,
    freightCharges: 42000,
    taxTotal: 466311,
    grandTotal: 3056931,
    // Internal Staff ONLY metrics:
    internalTotalCost: 2320500,
    grossMarginAmount: 228120,
    grossMarginPercent: 8.95,
    status: 'Approved', // Draft, Pending Approval, Approved, Sent, Accepted, Expired
    createdBy: 'Rahul Sen (Sales Exec)',
    approvedBy: 'Vikram Mehta (Sales Mgr)',
    pdfReady: true
  },
  {
    id: 'QT-2026-0892',
    rfqRef: 'RFQ-PID-889',
    customerId: 'CUST-002',
    customerName: 'Pidilite Industries Ltd',
    customerContact: 'Anjali Desai',
    date: '2026-10-27',
    validUntil: '2026-11-05',
    paymentTerms: '30 Days Net',
    deliveryTerms: 'Ex-Dahej Terminal',
    items: [
      {
        chemicalId: 'CHEM-004',
        name: 'Isopropyl Alcohol (IPA)',
        cas: '67-63-0',
        grade: 'Electronic Grade',
        qty: 12.0,
        uom: 'MT',
        internalCostRate: 91000,
        quotedRate: 99000,
        discountPercent: 2.0,
        taxPercent: 18,
        allocatedBatch: 'BAT-2026-IP-04',
        itemTotal: 1164240
      }
    ],
    subtotal: 1164240,
    freightCharges: 0,
    taxTotal: 209563,
    grandTotal: 1373803,
    internalTotalCost: 1092000,
    grossMarginAmount: 72240,
    grossMarginPercent: 6.2,
    status: 'Pending Approval', // Needs manager approval because margin < 7%
    createdBy: 'Priya Sharma (Sales Exec)',
    approvedBy: null,
    approvalNote: 'Customer requested 2% discount; margin is 6.2% which triggers Sales Mgr threshold rule.'
  },
  {
    id: 'QT-2026-0893',
    rfqRef: 'RFQ-SP-1090',
    customerId: 'CUST-004',
    customerName: 'Sun Pharma Advanced Research',
    customerContact: 'Dr. Nitin Patel',
    date: '2026-10-28',
    validUntil: '2026-11-15',
    paymentTerms: '60 Days Credit',
    deliveryTerms: 'FOR Dahej SEZ',
    items: [
      {
        chemicalId: 'CHEM-002',
        name: 'Methanol Pure (99.85%)',
        cas: '67-56-1',
        grade: 'Industrial Pure Grade',
        qty: 35.0,
        uom: 'MT',
        internalCostRate: 25400,
        quotedRate: 28800,
        discountPercent: 0,
        taxPercent: 18,
        allocatedBatch: 'BAT-2026-ME-02',
        itemTotal: 1008000
      }
    ],
    subtotal: 1008000,
    freightCharges: 18000,
    taxTotal: 184680,
    grandTotal: 1210680,
    internalTotalCost: 889000,
    grossMarginAmount: 119000,
    grossMarginPercent: 11.8,
    status: 'Sent',
    createdBy: 'Rahul Sen (Sales Exec)',
    approvedBy: 'Vikram Mehta (Sales Mgr)',
    pdfReady: true
  }
];

export const INITIAL_SALES_ORDERS = [
  {
    id: 'SO-2026-0451',
    quotationRef: 'QT-2026-0888',
    poNumber: 'PO-APL-2026-9901',
    poDate: '2026-10-20',
    customerId: 'CUST-001',
    customerName: 'Asian Paints Ltd',
    orderDate: '2026-10-21',
    expectedDispatchDate: '2026-10-30',
    totalValue: 2450000,
    items: [
      {
        chemicalName: 'Caustic Soda Lye (48%)',
        batchNo: 'BAT-2026-CS-01',
        qty: 35.0,
        uom: 'MT',
        warehouse: 'Dahej Liquid Terminal'
      }
    ],
    status: 'Ready to Dispatch', // Draft, Confirmed, Partially Fulfilled, Ready to Dispatch, Dispatched, Delivered, Closed
    paymentStatus: 'Credit (45 Days)',
    complianceChecked: true,
    transporterAssigned: 'ChemiCarrier Fleet (Tanker GJ-16-Z-8890)',
    assignedSalesExec: 'Rahul Sen'
  },
  {
    id: 'SO-2026-0452',
    quotationRef: 'QT-2026-0885',
    poNumber: 'PO-UPL-OCT-44',
    poDate: '2026-10-22',
    customerId: 'CUST-003',
    customerName: 'UPL Agro-Solutions India',
    orderDate: '2026-10-23',
    expectedDispatchDate: '2026-11-01',
    totalValue: 1890000,
    items: [
      {
        chemicalName: 'Sulfuric Acid (98%)',
        batchNo: 'BAT-2026-SA-03',
        qty: 20.0,
        uom: 'MT',
        warehouse: 'Dahej Liquid Terminal'
      }
    ],
    status: 'Confirmed',
    paymentStatus: 'Partial Advance Received',
    complianceChecked: true,
    transporterAssigned: 'Patel Roadways',
    assignedSalesExec: 'Priya Sharma'
  },
  {
    id: 'SO-2026-0453',
    quotationRef: 'QT-2026-0879',
    poNumber: 'PO-SPAR-SEP-12',
    poDate: '2026-10-18',
    customerId: 'CUST-004',
    customerName: 'Sun Pharma Advanced Research',
    orderDate: '2026-10-19',
    expectedDispatchDate: '2026-10-28',
    totalValue: 1420000,
    items: [
      {
        chemicalName: 'Methanol Pure (99.85%)',
        batchNo: 'BAT-2026-ME-02',
        qty: 25.0,
        uom: 'MT',
        warehouse: 'Hazira Tank Terminal'
      }
    ],
    status: 'In Transit',
    paymentStatus: 'Credit (60 Days)',
    complianceChecked: true,
    transporterAssigned: 'V-Trans ChemFleet',
    assignedSalesExec: 'Rahul Sen'
  }
];

export const INITIAL_PURCHASE_ORDERS = [
  {
    id: 'PO-2026-0312',
    supplierId: 'SUPP-001',
    supplierName: 'Gujarat Alkalies & Chemicals Ltd (GACL)',
    orderDate: '2026-10-15',
    deliveryDueDate: '2026-10-28',
    totalAmount: 3120000,
    status: 'Partially Received', // Draft, Pending Approval, Approved, Sent, Partially Received, Received, Closed
    items: [
      {
        chemicalName: 'Caustic Soda Lye (48%)',
        orderedQty: 100.0,
        receivedQty: 60.0,
        pendingQty: 40.0,
        uom: 'MT',
        rate: 31200
      }
    ],
    destinationWarehouse: 'Dahej Liquid Terminal',
    grnRef: 'GRN-2026-0188',
    paymentStatus: 'Advance 20% Paid'
  },
  {
    id: 'PO-2026-0313',
    supplierId: 'SUPP-002',
    supplierName: 'Deepak Phenolics Ltd',
    orderDate: '2026-10-24',
    deliveryDueDate: '2026-11-04',
    totalAmount: 1820000,
    status: 'Approved',
    items: [
      {
        chemicalName: 'Isopropyl Alcohol (IPA)',
        orderedQty: 20.0,
        receivedQty: 0.0,
        pendingQty: 20.0,
        uom: 'MT',
        rate: 91000
      }
    ],
    destinationWarehouse: 'Bhiwandi Central Depot',
    grnRef: null,
    paymentStatus: 'Pending Invoice'
  }
];

export const SUPPLIER_QUOTE_COMPARISONS = [
  {
    rfqId: 'RFQ-PR-2026-092',
    chemical: 'Caustic Soda Lye (48%)',
    requiredQty: 100.0,
    uom: 'MT',
    deliveryLocation: 'Dahej Terminal',
    quotes: [
      {
        supplierName: 'GACL Dahej',
        baseRate: 31200,
        freightRate: 650,
        creditDays: 15,
        deliveryLeadDays: 3,
        qualityScore: 98,
        totalLandedCost: 31850,
        recommended: true,
        notes: 'Lowest landed cost, pipeline delivery available to terminal.'
      },
      {
        supplierName: 'Grasim Industries (Vilayat)',
        baseRate: 31600,
        freightRate: 900,
        creditDays: 30,
        deliveryLeadDays: 5,
        qualityScore: 96,
        totalLandedCost: 32500,
        recommended: false,
        notes: 'Offers longer credit but higher freight due to road tanker transit.'
      },
      {
        supplierName: 'DCW Ltd',
        baseRate: 31900,
        freightRate: 1100,
        creditDays: 21,
        deliveryLeadDays: 6,
        qualityScore: 94,
        totalLandedCost: 33000,
        recommended: false,
        notes: 'Backup supplier in case of plant turnaround at Dahej.'
      }
    ]
  }
];

export const INITIAL_INVOICES = [
  {
    invoiceNumber: 'INV-2026-0689',
    salesOrderRef: 'SO-2026-0448',
    customerName: 'Asian Paints Ltd',
    customerId: 'CUST-001',
    invoiceDate: '2026-10-18',
    dueDate: '2026-12-02',
    amount: 1450000,
    gstAmount: 261000,
    grandTotal: 1711000,
    irnStatus: 'Generated (NIC e-Invoice)',
    irnNumber: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
    eWayBillNo: '241908234190',
    status: 'Issued', // Draft, Issued, Partially Paid, Paid, Overdue
    paidAmount: 0,
    balanceDue: 1711000
  },
  {
    invoiceNumber: 'INV-2026-0690',
    salesOrderRef: 'SO-2026-0442',
    customerName: 'Pidilite Industries Ltd',
    customerId: 'CUST-002',
    invoiceDate: '2026-10-05',
    dueDate: '2026-11-04',
    amount: 850000,
    gstAmount: 153000,
    grandTotal: 1003000,
    irnStatus: 'Generated (NIC e-Invoice)',
    irnNumber: '11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
    eWayBillNo: '241908234195',
    status: 'Partially Paid',
    paidAmount: 583000,
    balanceDue: 420000
  },
  {
    invoiceNumber: 'INV-2026-0675',
    salesOrderRef: 'SO-2026-0420',
    customerName: 'UPL Agro-Solutions India',
    customerId: 'CUST-003',
    invoiceDate: '2026-09-12',
    dueDate: '2026-10-12',
    amount: 750000,
    gstAmount: 135000,
    grandTotal: 885000,
    irnStatus: 'Generated (NIC e-Invoice)',
    irnNumber: '99887766554433221100fedcba9876543210fedcba9876543210fedcba987654',
    eWayBillNo: '241908234120',
    status: 'Overdue',
    paidAmount: 575000,
    balanceDue: 310000
  }
];

export const INITIAL_DISPATCHES = [
  {
    challanNo: 'DC-2026-0341',
    orderRef: 'SO-2026-0451',
    customer: 'Asian Paints Ltd',
    destination: 'Taloja Plant, Navi Mumbai',
    chemical: 'Caustic Soda Lye (48%)',
    qty: 35.0,
    uom: 'MT',
    batchNo: 'BAT-2026-CS-01',
    transporter: 'ChemiCarrier Bulk Tankers',
    vehicleNo: 'GJ-16-Z-8890',
    driverName: 'Rameshwar Yadav (+91 94280 12891)',
    dispatchDate: '2026-10-29',
    estimatedArrival: '2026-10-30 18:00',
    status: 'Ready for Dispatch', // Planned, Ready, Dispatched, In Transit, Delivered, Delayed
    eWayBill: '241908234190',
    tremcardAttached: true,
    podStatus: 'Pending Delivery'
  },
  {
    challanNo: 'DC-2026-0340',
    orderRef: 'SO-2026-0453',
    customer: 'Sun Pharma Advanced Research',
    destination: 'Dahej SEZ Plot 44',
    chemical: 'Methanol Pure (99.85%)',
    qty: 25.0,
    uom: 'MT',
    batchNo: 'BAT-2026-ME-02',
    transporter: 'V-Trans SafeChemicals',
    vehicleNo: 'GJ-06-AV-3122',
    driverName: 'Suresh Parmar (+91 98980 44109)',
    dispatchDate: '2026-10-28',
    estimatedArrival: '2026-10-29 14:00',
    status: 'In Transit',
    eWayBill: '241908234188',
    tremcardAttached: true,
    podStatus: 'GPS Tracking Active'
  }
];

export const INITIAL_COMPLIANCE_DOCS = [
  {
    id: 'DOC-PESO-01',
    title: 'PESO Bulk Petroleum & Solvent Storage License',
    type: 'Regulatory License',
    authority: 'Petroleum and Explosives Safety Organization (PESO)',
    licenseNumber: 'P/HQ/GJ/15/4491(P1029)',
    validFrom: '2024-01-01',
    validUntil: '2027-12-31',
    status: 'Active',
    facility: 'Dahej Liquid Terminal Tanks T101-T108',
    documentUrl: 'docs/PESO_License_Dahej.pdf'
  },
  {
    id: 'DOC-CPCB-02',
    title: 'Consent to Operate (CTO) - Air & Water Acts',
    type: 'Environmental Clearance',
    authority: 'Gujarat Pollution Control Board (GPCB)',
    licenseNumber: 'GPCB/CCA-BH-1044/9801',
    validFrom: '2023-04-01',
    validUntil: '2028-03-31',
    status: 'Active',
    facility: 'Hazira Tank Terminal',
    documentUrl: 'docs/GPCB_Consent_2028.pdf'
  },
  {
    id: 'DOC-NCB-03',
    title: 'NCB Quota Registration for Controlled Precursors (Acetone & Toluene)',
    type: 'Controlled Substance Quota',
    authority: 'Narcotics Control Bureau (NCB) New Delhi',
    licenseNumber: 'NCB/WR/REG/2026/0942',
    validFrom: '2026-01-01',
    validUntil: '2026-12-31', // Approaching year end
    status: 'Renewal Due in 63 Days',
    facility: 'All Hubs & Warehouses',
    documentUrl: 'docs/NCB_Quota_2026.pdf'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-001',
    timestamp: '2026-10-29 11:42:15',
    userName: 'Vikram Mehta',
    userRole: 'Sales Manager',
    action: 'Approved Quotation QT-2026-0891 for Asian Paints Ltd with special price discount 1.5%.',
    ipAddress: '192.168.1.45',
    status: 'Success'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-10-29 10:15:02',
    userName: 'Dinesh Patel',
    userRole: 'Warehouse Manager',
    action: 'Placed Batch BAT-2026-TD-05 (10 MT Titanium Dioxide) into Quarantine due to suspected transit dampness.',
    ipAddress: '192.168.2.18',
    status: 'Action Logged'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-10-28 17:30:40',
    userName: 'Pooja Iyer',
    userRole: 'Accountant',
    action: 'Generated IRN and E-Way Bill 241908234190 for Invoice INV-2026-0689.',
    ipAddress: '192.168.1.52',
    status: 'Success'
  },
  {
    id: 'AUD-004',
    timestamp: '2026-10-28 14:05:11',
    userName: 'Super Admin',
    userRole: 'Super Admin',
    action: 'Updated GST HSN Tax Rate matrix and verified API connection to NIC E-Way Bill Portal.',
    ipAddress: '192.168.1.10',
    status: 'Configuration Saved'
  }
];

export const ROLE_DEFINITIONS = [
  {
    id: 'admin',
    name: 'Admin',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Full system management, users, settings, chemicals, orders, inventory and billing',
    allowedNav: [
      'dashboard', 'customers', 'chemicals', 'quotations', 'sales-orders', 'inventory', 'purchases', 'billing', 'reports', 'settings',
      'overview', 'crm', 'catalog', 'sales', 'procurement', 'finance', 'admin'
    ]
  },
  {
    id: 'sales_staff',
    name: 'Sales Staff',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Customer inquiries, quotations, sales orders and sales reports',
    allowedNav: [
      'dashboard', 'customers', 'chemicals', 'quotations', 'sales-orders', 'reports',
      'overview', 'crm', 'catalog', 'sales'
    ]
  },
  {
    id: 'inventory_staff',
    name: 'Inventory Staff',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Chemical stock, batch tracking, stock in/out, purchases and stock alerts',
    allowedNav: [
      'dashboard', 'chemicals', 'inventory', 'purchases', 'reports',
      'overview', 'catalog', 'procurement'
    ]
  },
  // Compatibility aliases for previously saved sessions
  {
    id: 'business_owner',
    name: 'Admin',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Full system management, users, settings, chemicals, orders, inventory and billing',
    allowedNav: [
      'dashboard', 'customers', 'chemicals', 'quotations', 'sales-orders', 'inventory', 'purchases', 'billing', 'reports', 'settings',
      'overview', 'crm', 'catalog', 'sales', 'procurement', 'finance', 'admin'
    ]
  },
  {
    id: 'super_admin',
    name: 'Admin',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Full system management, users, settings, chemicals, orders, inventory and billing',
    allowedNav: [
      'dashboard', 'customers', 'chemicals', 'quotations', 'sales-orders', 'inventory', 'purchases', 'billing', 'reports', 'settings',
      'overview', 'crm', 'catalog', 'sales', 'procurement', 'finance', 'admin'
    ]
  },
  {
    id: 'sales_manager',
    name: 'Sales Staff',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Customer inquiries, quotations, sales orders and sales reports',
    allowedNav: [
      'dashboard', 'customers', 'chemicals', 'quotations', 'sales-orders', 'reports',
      'overview', 'crm', 'catalog', 'sales'
    ]
  },
  {
    id: 'sales_executive',
    name: 'Sales Staff',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Customer inquiries, quotations, sales orders and sales reports',
    allowedNav: [
      'dashboard', 'customers', 'chemicals', 'quotations', 'sales-orders', 'reports',
      'overview', 'crm', 'catalog', 'sales'
    ]
  },
  {
    id: 'purchase_manager',
    name: 'Inventory Staff',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Chemical stock, batch tracking, stock in/out, purchases and stock alerts',
    allowedNav: [
      'dashboard', 'chemicals', 'inventory', 'purchases', 'reports',
      'overview', 'catalog', 'procurement'
    ]
  },
  {
    id: 'warehouse_manager',
    name: 'Inventory Staff',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Chemical stock, batch tracking, stock in/out, purchases and stock alerts',
    allowedNav: [
      'dashboard', 'chemicals', 'inventory', 'purchases', 'reports',
      'overview', 'catalog', 'procurement'
    ]
  },
  {
    id: 'accountant',
    name: 'Admin',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Full system management, users, settings, chemicals, orders, inventory and billing',
    allowedNav: [
      'dashboard', 'customers', 'chemicals', 'quotations', 'sales-orders', 'inventory', 'purchases', 'billing', 'reports', 'settings',
      'overview', 'crm', 'catalog', 'sales', 'procurement', 'finance', 'admin'
    ]
  },
  {
    id: 'logistics_manager',
    name: 'Inventory Staff',
    type: 'internal',
    defaultPath: 'dashboard',
    description: 'Chemical stock, batch tracking, stock in/out, purchases and stock alerts',
    allowedNav: [
      'dashboard', 'chemicals', 'inventory', 'purchases', 'reports',
      'overview', 'catalog', 'procurement'
    ]
  }
];


export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-2026-101',
    date: '2026-10-29',
    type: 'Income',
    category: 'Customer Advance Payment',
    description: 'Advance payment received from Asian Paints Ltd for SO-2026-0451',
    mode: 'RTGS / Bank',
    referenceNo: 'RTGS/HDFC/992817',
    amount: 500000,
    recordedBy: 'Sunil Mehta'
  },
  {
    id: 'TXN-2026-102',
    date: '2026-10-29',
    type: 'Expense',
    category: 'Tanker Freight & Diesel',
    description: 'ChemiCarrier Bulk Tankers freight advance for Taloja dispatch',
    mode: 'Online Transfer',
    referenceNo: 'IMPS/394821',
    amount: 32000,
    recordedBy: 'Vikram Mehta'
  },
  {
    id: 'TXN-2026-103',
    date: '2026-10-28',
    type: 'Expense',
    category: 'Lab Testing & QC Fees',
    description: 'SGS India sample purity and moisture testing charges (BAT-2026-TD-05)',
    mode: 'UPI / Card',
    referenceNo: 'UPI/9823412',
    amount: 8500,
    recordedBy: 'Dinesh Patel'
  },
  {
    id: 'TXN-2026-104',
    date: '2026-10-28',
    type: 'Income',
    category: 'Customer Bill Clearance',
    description: 'Full payment received from Sun Pharma for INV-2026-0689',
    mode: 'NEFT / Bank',
    referenceNo: 'NEFT/ICIC/881203',
    amount: 850000,
    recordedBy: 'Sunil Mehta'
  },
  {
    id: 'TXN-2026-105',
    date: '2026-10-27',
    type: 'Expense',
    category: 'Terminal Unloading & Handling',
    description: 'Drum shifting and palletizing labor charges at Bhiwandi Depot',
    mode: 'Cash',
    referenceNo: 'VOUCHER-088',
    amount: 6200,
    recordedBy: 'Dinesh Patel'
  }
];
