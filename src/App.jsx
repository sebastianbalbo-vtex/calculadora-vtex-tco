import React, { useState, useMemo, useRef } from 'react';
import { DollarSign, TrendingUp, Users, ShoppingCart, Clock, AlertTriangle, CheckCircle, XCircle, TrendingDown, Calendar, Info, Download, Phone } from 'lucide-react';

// ===== TABLAS DE DATOS =====
const vtexSubscriptionTable = [
  { gmv: 200000, subscription: 11000 }, { gmv: 400000, subscription: 13875 }, { gmv: 600000, subscription: 21000 },
  { gmv: 800000, subscription: 23250 }, { gmv: 1000000, subscription: 23250 }, { gmv: 1200000, subscription: 32625 },
  { gmv: 1400000, subscription: 32625 }, { gmv: 1600000, subscription: 42000 }, { gmv: 1800000, subscription: 42000 },
  { gmv: 2000000, subscription: 42000 }, { gmv: 2250000, subscription: 51375 }, { gmv: 2500000, subscription: 51375 },
  { gmv: 2750000, subscription: 60750 }, { gmv: 3000000, subscription: 60400 }, { gmv: 3250000, subscription: 63100 },
  { gmv: 3500000, subscription: 65800 }, { gmv: 3750000, subscription: 68500 }, { gmv: 4000000, subscription: 71200 },
  { gmv: 4250000, subscription: 73900 }, { gmv: 4500000, subscription: 76600 }, { gmv: 4750000, subscription: 79300 },
  { gmv: 5000000, subscription: 82000 }, { gmv: 5250000, subscription: 84700 }, { gmv: 5500000, subscription: 87400 },
  { gmv: 5750000, subscription: 90100 }, { gmv: 6000000, subscription: 92800 }, { gmv: 6250000, subscription: 95500 },
  { gmv: 6500000, subscription: 98200 }, { gmv: 6750000, subscription: 100900 }, { gmv: 7000000, subscription: 103600 },
  { gmv: 7250000, subscription: 106300 }, { gmv: 7500000, subscription: 109000 }, { gmv: 7750000, subscription: 111700 },
  { gmv: 8000000, subscription: 114400 }, { gmv: 8250000, subscription: 117100 }, { gmv: 8500000, subscription: 119800 },
  { gmv: 8750000, subscription: 122500 }, { gmv: 9000000, subscription: 125200 }, { gmv: 9250000, subscription: 127900 },
  { gmv: 9500000, subscription: 130600 }, { gmv: 9750000, subscription: 133300 }, { gmv: 10000000, subscription: 136000 },
  { gmv: 11000000, subscription: 143300 }, { gmv: 12000000, subscription: 148800 }, { gmv: 13000000, subscription: 154300 },
  { gmv: 14000000, subscription: 159800 }, { gmv: 15000000, subscription: 165300 }, { gmv: 16000000, subscription: 170800 },
  { gmv: 17000000, subscription: 176300 }, { gmv: 18000000, subscription: 181800 }, { gmv: 19000000, subscription: 187300 },
  { gmv: 20000000, subscription: 192800 }, { gmv: 21000000, subscription: 198300 }, { gmv: 22000000, subscription: 203800 },
  { gmv: 23000000, subscription: 209300 }, { gmv: 24000000, subscription: 214800 }, { gmv: 25000000, subscription: 220300 },
  { gmv: 26000000, subscription: 225800 }, { gmv: 27000000, subscription: 231300 }, { gmv: 28000000, subscription: 234400 },
  { gmv: 29000000, subscription: 236900 }, { gmv: 30000000, subscription: 239400 },
];

const implementationBaseTable = [
  { gmv: 200000, cost: 12000 }, { gmv: 400000, cost: 12000 }, { gmv: 600000, cost: 12000 },
  { gmv: 800000, cost: 12000 }, { gmv: 1000000, cost: 12000 }, { gmv: 1200000, cost: 12000 },
  { gmv: 1400000, cost: 14000 }, { gmv: 1600000, cost: 14000 }, { gmv: 1800000, cost: 14000 },
  { gmv: 2000000, cost: 14000 }, { gmv: 2250000, cost: 14000 }, { gmv: 2500000, cost: 14000 },
  { gmv: 2750000, cost: 18750 }, { gmv: 3000000, cost: 18750 }, { gmv: 3250000, cost: 18750 },
  { gmv: 3500000, cost: 18750 }, { gmv: 3750000, cost: 18750 }, { gmv: 4000000, cost: 20000 },
  { gmv: 4250000, cost: 20000 }, { gmv: 4500000, cost: 20000 }, { gmv: 4750000, cost: 20000 },
  { gmv: 5000000, cost: 25000 }, { gmv: 5250000, cost: 25000 }, { gmv: 5500000, cost: 25000 },
  { gmv: 5750000, cost: 25000 }, { gmv: 6000000, cost: 30000 }, { gmv: 6250000, cost: 31250 },
  { gmv: 6500000, cost: 32500 }, { gmv: 6750000, cost: 33750 }, { gmv: 7000000, cost: 35000 },
  { gmv: 7250000, cost: 36250 }, { gmv: 7500000, cost: 37500 }, { gmv: 7750000, cost: 38750 },
  { gmv: 8000000, cost: 40000 }, { gmv: 8250000, cost: 41250 }, { gmv: 8500000, cost: 42500 },
  { gmv: 8750000, cost: 43750 }, { gmv: 9000000, cost: 45000 }, { gmv: 9250000, cost: 46250 },
  { gmv: 9500000, cost: 47500 }, { gmv: 9750000, cost: 48750 }, { gmv: 10000000, cost: 50000 },
  { gmv: 11000000, cost: 55000 }, { gmv: 12000000, cost: 60000 }, { gmv: 13000000, cost: 65000 },
  { gmv: 14000000, cost: 70000 }, { gmv: 15000000, cost: 75000 }, { gmv: 16000000, cost: 80000 },
  { gmv: 17000000, cost: 85000 }, { gmv: 18000000, cost: 90000 }, { gmv: 19000000, cost: 95000 },
  { gmv: 20000000, cost: 100000 }, { gmv: 21000000, cost: 105000 }, { gmv: 22000000, cost: 110000 },
  { gmv: 23000000, cost: 115000 }, { gmv: 24000000, cost: 120000 }, { gmv: 25000000, cost: 125000 },
  { gmv: 26000000, cost: 130000 }, { gmv: 27000000, cost: 135000 }, { gmv: 28000000, cost: 140000 },
  { gmv: 29000000, cost: 145000 }, { gmv: 30000000, cost: 150000 },
];

// ===== FUNCIONES AUXILIARES =====
const interpolate = (table, gmvUSD, valueKey) => {
  if (gmvUSD <= table[0].gmv) return table[0][valueKey];
  const lastTwo = table.slice(-2);
  if (gmvUSD >= lastTwo[1].gmv) {
    const rate = (lastTwo[1][valueKey] - lastTwo[0][valueKey]) / (lastTwo[1].gmv - lastTwo[0].gmv);
    return lastTwo[1][valueKey] + (gmvUSD - lastTwo[1].gmv) * rate;
  }
  for (let i = 0; i < table.length - 1; i++) {
    if (gmvUSD >= table[i].gmv && gmvUSD < table[i + 1].gmv) {
      const ratio = (gmvUSD - table[i].gmv) / (table[i + 1].gmv - table[i].gmv);
      return table[i][valueKey] + ratio * (table[i + 1][valueKey] - table[i][valueKey]);
    }
  }
  return table[table.length - 1][valueKey];
};

const getVtexSubscription = (gmvUSD) => interpolate(vtexSubscriptionTable, gmvUSD, 'subscription');
const getImplementationBase = (gmvUSD) => interpolate(implementationBaseTable, gmvUSD, 'cost');

const getStoreCost = (storeCount) => {
  if (storeCount === 0) return 0;
  if (storeCount <= 3) return 1000;
  if (storeCount <= 6) return 900;
  if (storeCount <= 16) return 800;
  if (storeCount <= 22) return 700;
  if (storeCount <= 30) return 600;
  if (storeCount <= 40) return 500;
  if (storeCount <= 50) return 400;
  return 300;
};

const getStoreCoverageFactor = (stores) => {
  if (stores === 0) return 0;
  if (stores <= 5) return 0.20;
  if (stores <= 15) return 0.40;
  if (stores <= 30) return 0.60;
  if (stores <= 60) return 0.80;
  return 1.00;
};

const getStoreUpliftBonus = (stores) => {
  if (stores === 0) return 0;
  if (stores <= 5) return 0.02;
  if (stores <= 15) return 0.04;
  if (stores <= 30) return 0.055;
  if (stores <= 50) return 0.07;
  return 0.08;
};

// ===== CONSTANTES =====
const featureImplementationCosts = {
  nativeMarketplace: 5000, intelligentSearch: 0, smartCheckout: 0, oms: 0, stock360: 5000,
  advancedPromos: 0, subscriptions: 4000, vtexInStore: 5000, liveShopping: 2500,
  aiRecommendations: 3000, pricingManagement: 2000, multiCurrency: 5000,
};

const industryBaseUplift = {
  fashion: 0.22, beauty: 0.24, pharmacy: 0.19, grocery: 0.18, sports: 0.20,
  electronics: 0.21, home: 0.19, toys: 0.22, department: 0.20, marketplace: 0.23,
};

const featureUpliftBonus = {
  nativeMarketplace: 0.020, intelligentSearch: 0.015, smartCheckout: 0.015, oms: 0.010,
  stock360: 0.015, advancedPromos: 0.010, subscriptions: 0.020, vtexInStore: 0.015,
  liveShopping: 0.010, aiRecommendations: 0.015, pricingManagement: 0.010, multiCurrency: 0.005,
};

const maturityUpliftDiscount = { none: 0, basic: 0.03, pilot: 0.06, stock360: 0.09, operational: 0.12, advanced: 0.15 };
const maturityFactors = { none: 1.0, basic: 0.85, pilot: 0.70, stock360: 0.55, operational: 0.40, advanced: 0.25 };

const maturityDescriptions = {
  none: { label: 'Sin omnicanalidad', desc: 'E-commerce y tiendas físicas operan 100% separados' },
  basic: { label: 'Integración básica', desc: 'Consulta manual de stock, sin fulfillment cruzado' },
  pilot: { label: 'Piloto (2-5 tiendas)', desc: 'Algunas tiendas con Ship-from-store o BOPIS en prueba' },
  stock360: { label: 'Stock 360° implementado', desc: 'Visibilidad unificada de inventario, fulfillment limitado' },
  operational: { label: 'Operativo (>70% tiendas)', desc: 'Ship-from-Store y BOPIS activo en mayoría de tiendas' },
  advanced: { label: 'Avanzado (Unified Commerce)', desc: 'Omnicanalidad completa: endless aisle, clienteling, OMS unificado' },
};

const featureLabels = {
  nativeMarketplace: { name: 'Marketplace nativo', desc: 'Vendé productos de terceros en tu tienda' },
  intelligentSearch: { name: 'Search IA', desc: 'Búsqueda inteligente con autocomplete y sinónimos' },
  smartCheckout: { name: 'SmartCheckout + pagos locales', desc: 'Checkout optimizado con medios de pago LATAM' },
  oms: { name: 'OMS distribuido', desc: 'Gestión de pedidos desde múltiples orígenes' },
  stock360: { name: 'Stock 360° / Omnicanal', desc: 'Visibilidad de inventario unificada en tiempo real' },
  advancedPromos: { name: 'Promos avanzadas', desc: 'Reglas de descuento complejas y segmentadas' },
  subscriptions: { name: 'Subscripciones', desc: 'Ventas recurrentes y membresías' },
  vtexInStore: { name: 'VTEX inStore / POS', desc: 'Punto de venta integrado con el e-commerce' },
  liveShopping: { name: 'Live shopping & conversacional', desc: 'Venta en vivo y chat commerce' },
  aiRecommendations: { name: 'Recomendaciones IA', desc: 'Productos sugeridos personalizados por usuario' },
  pricingManagement: { name: 'Pricing avanzado', desc: 'Precios dinámicos por región, canal o segmento' },
  multiCurrency: { name: 'Multi-moneda & multi-idioma', desc: 'Operación internacional con localización' },
};

const platformNames = {
  magento: 'Magento / Adobe Commerce', shopify: 'Shopify Plus', salesforce: 'Salesforce Commerce Cloud',
  woocommerce: 'WooCommerce', prestashop: 'PrestaShop', e3: 'E3 ecommerce', otros: 'Plataforma Actual',
};

// Matriz de comparación por plataforma (scores 1-5)
const platformComparison = {
  magento: { omnichannel: 2, latam: 2, tco: 2, scalability: 3, timeToMarket: 2, marketplace: 2, headless: 3, support: 2 },
  shopify: { omnichannel: 3, latam: 2, tco: 3, scalability: 4, timeToMarket: 5, marketplace: 3, headless: 4, support: 4 },
  salesforce: { omnichannel: 4, latam: 3, tco: 1, scalability: 5, timeToMarket: 2, marketplace: 2, headless: 3, support: 4 },
  woocommerce: { omnichannel: 1, latam: 2, tco: 4, scalability: 2, timeToMarket: 4, marketplace: 2, headless: 2, support: 2 },
  prestashop: { omnichannel: 1, latam: 2, tco: 4, scalability: 2, timeToMarket: 3, marketplace: 2, headless: 2, support: 2 },
  e3: { omnichannel: 2, latam: 3, tco: 3, scalability: 2, timeToMarket: 3, marketplace: 1, headless: 2, support: 3 },
  otros: { omnichannel: 2, latam: 2, tco: 2, scalability: 2, timeToMarket: 2, marketplace: 2, headless: 2, support: 2 },
};

const vtexScores = { omnichannel: 5, latam: 5, tco: 4, scalability: 5, timeToMarket: 4, marketplace: 5, headless: 5, support: 5 };

const criteriaLabels = {
  omnichannel: { label: 'Omnicanalidad', weight: 20, desc: 'OMS nativo, Ship-from-Store, BOPIS, Stock 360' },
  latam: { label: 'LATAM Ready', weight: 20, desc: 'Pagos locales, facturación electrónica, logística regional' },
  tco: { label: 'TCO 3 años', weight: 15, desc: 'Costo total de propiedad incluyendo mantenimiento' },
  scalability: { label: 'Escalabilidad', weight: 15, desc: 'Performance en picos, uptime SLA, multi-tenant' },
  timeToMarket: { label: 'Time-to-Market', weight: 10, desc: 'Velocidad de implementación y go-live' },
  marketplace: { label: 'Marketplace', weight: 10, desc: 'Capacidad de operar como seller y operator' },
  headless: { label: 'Headless/Composable', weight: 5, desc: 'Arquitectura desacoplada y APIs' },
  support: { label: 'Soporte & Ecosystem', weight: 5, desc: 'Partners, documentación, comunidad' },
};

// ===== COMPONENTE PRINCIPAL =====
const MigrationROICalculator = () => {
  const dashboardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportHtmlContent, setExportHtmlContent] = useState('');
  const [currentPlatform, setCurrentPlatform] = useState('magento');
  const [gmv, setGmv] = useState(10);
  const [industry, setIndustry] = useState('fashion');
  const [period, setPeriod] = useState(3);
  const [profitMargin, setProfitMargin] = useState(20);
  const [internalTeam, setInternalTeam] = useState(5);
  const [agencyHours, setAgencyHours] = useState(160);
  const [agencyRate, setAgencyRate] = useState(100);
  const [physicalStores, setPhysicalStores] = useState(10);
  const [omnichannelMaturity, setOmnichannelMaturity] = useState('none');

  const [selectedFeatures, setSelectedFeatures] = useState({
    nativeMarketplace: true, intelligentSearch: true, smartCheckout: true, oms: true,
    stock360: true, advancedPromos: true, subscriptions: false, vtexInStore: false,
    liveShopping: false, aiRecommendations: true, pricingManagement: true, multiCurrency: false,
  });

  const handleGmvChange = (value) => setGmv(Math.max(0.1, Math.min(200, Math.round(parseFloat(value || 0) * 10) / 10)));
  const handleGmvStep = (delta) => {
    const step = gmv < 1 ? 0.2 : gmv < 10 ? 0.5 : 1;
    handleGmvChange(gmv + (delta * step));
  };

  const calculations = useMemo(() => {
    const gmvUSD = gmv * 1000000;
    const averageOrderValue = 150;
    const annualOrders = gmvUSD / averageOrderValue;
    const marginMultiplier = profitMargin / 100;
    
    // UPLIFT
    const baseUplift = industryBaseUplift[industry];
    let featuresUpliftBonus = 0;
    Object.keys(selectedFeatures).forEach(f => { if (selectedFeatures[f]) featuresUpliftBonus += featureUpliftBonus[f] || 0; });
    const storesUpliftBonus = getStoreUpliftBonus(physicalStores);
    const maturityDiscount = maturityUpliftDiscount[omnichannelMaturity];
    
    const upliftYear1Percent = Math.max(0.25, Math.min(0.45, baseUplift + featuresUpliftBonus + storesUpliftBonus - maturityDiscount));
    const upliftYear2Percent = upliftYear1Percent * 0.72;
    const upliftYear3Percent = upliftYear2Percent * 0.965;
    
    const revenueUpliftYear1 = gmvUSD * upliftYear1Percent;
    const revenueUpliftYear2 = gmvUSD * upliftYear2Percent;
    const revenueUpliftYear3 = gmvUSD * upliftYear3Percent;
    
    // OMNI
    const maturityFactor = maturityFactors[omnichannelMaturity];
    const storeCoverageFactor = getStoreCoverageFactor(physicalStores);
    let omniTotal = 0;
    if (physicalStores > 0) {
      const stock360Impact = gmvUSD * 0.10 * 0.70 * maturityFactor * storeCoverageFactor +
                            gmvUSD * 0.25 * 0.09 * maturityFactor * storeCoverageFactor +
                            gmvUSD * 0.25 * 0.27 * 0.08 * maturityFactor * storeCoverageFactor;
      const shipFromStore = annualOrders * 3.30 * maturityFactor * storeCoverageFactor +
                           gmvUSD * 0.12 * maturityFactor * storeCoverageFactor +
                           annualOrders * 0.06 * 22.5 * maturityFactor * storeCoverageFactor +
                           gmvUSD * 0.11 * maturityFactor * storeCoverageFactor;
      const bopis = gmvUSD * 0.18 * maturityFactor * storeCoverageFactor +
                   annualOrders * 0.20 * 6.40 * maturityFactor * storeCoverageFactor +
                   annualOrders * 0.20 * 0.35 * 45 * maturityFactor * storeCoverageFactor;
      const endlessAisle = gmvUSD * 0.40 * 0.12 * 0.75 * maturityFactor + gmvUSD * 0.40 * 0.49 * maturityFactor;
      const workingCapital = gmvUSD * 0.60 * 22 / 365 * 0.10 * maturityFactor * storeCoverageFactor;
      omniTotal = (stock360Impact + shipFromStore + bopis + endlessAisle + workingCapital) * 0.50;
    }
    
    // FEATURE GAP
    const featureCosts = {
      magento: { nativeMarketplace: 120000, intelligentSearch: 60000, smartCheckout: 45000, oms: 60000, stock360: 50000, advancedPromos: 40000, subscriptions: 30000, vtexInStore: 70000, liveShopping: 35000, aiRecommendations: 50000, pricingManagement: 30000, multiCurrency: 25000 },
      shopify: { nativeMarketplace: 90000, intelligentSearch: 45000, smartCheckout: 35000, oms: 45000, stock360: 40000, advancedPromos: 30000, subscriptions: 20000, vtexInStore: 50000, liveShopping: 30000, aiRecommendations: 40000, pricingManagement: 25000, multiCurrency: 20000 },
      salesforce: { nativeMarketplace: 90000, intelligentSearch: 45000, smartCheckout: 35000, oms: 45000, stock360: 40000, advancedPromos: 30000, subscriptions: 20000, vtexInStore: 50000, liveShopping: 30000, aiRecommendations: 40000, pricingManagement: 25000, multiCurrency: 20000 },
      woocommerce: { nativeMarketplace: 60000, intelligentSearch: 30000, smartCheckout: 25000, oms: 35000, stock360: 30000, advancedPromos: 25000, subscriptions: 15000, vtexInStore: 40000, liveShopping: 20000, aiRecommendations: 30000, pricingManagement: 20000, multiCurrency: 15000 },
      prestashop: { nativeMarketplace: 60000, intelligentSearch: 30000, smartCheckout: 25000, oms: 35000, stock360: 30000, advancedPromos: 25000, subscriptions: 15000, vtexInStore: 40000, liveShopping: 20000, aiRecommendations: 30000, pricingManagement: 20000, multiCurrency: 15000 },
      e3: { nativeMarketplace: 65000, intelligentSearch: 32000, smartCheckout: 26000, oms: 36000, stock360: 32000, advancedPromos: 26000, subscriptions: 16000, vtexInStore: 42000, liveShopping: 22000, aiRecommendations: 32000, pricingManagement: 21000, multiCurrency: 16000 },
      otros: { nativeMarketplace: 70000, intelligentSearch: 35000, smartCheckout: 28000, oms: 38000, stock360: 34000, advancedPromos: 28000, subscriptions: 18000, vtexInStore: 45000, liveShopping: 24000, aiRecommendations: 34000, pricingManagement: 22000, multiCurrency: 17000 },
    };
    let featureGapSavings = 0;
    Object.keys(selectedFeatures).forEach(f => { if (selectedFeatures[f]) featureGapSavings += featureCosts[currentPlatform][f] || 0; });
    
    // TEAM
    const currentTeamCostAnnual = (internalTeam * 80000) + (agencyHours * agencyRate * 12);
    const size = gmv < 5 ? 'small' : gmv < 20 ? 'medium' : gmv < 50 ? 'large' : 'enterprise';
    const teamReduction = { small: 0.30, medium: 0.40, large: 0.45, enterprise: 0.50 }[size];
    const vtexInternalTeam = Math.ceil(internalTeam * (1 - teamReduction));
    const vtexAgencyHours = Math.ceil(agencyHours * 0.35);
    const vtexTeamCostAnnual = (vtexInternalTeam * 80000) + (vtexAgencyHours * agencyRate * 12);
    const teamSavingsAnnual = currentTeamCostAnnual - vtexTeamCostAnnual;
    
    // MIGRATION
    const migrationMonths = { small: 3, medium: 5, large: 7, enterprise: 9 }[size];
    const vtexAnnualSubscription = getVtexSubscription(gmvUSD);
    const implementationBase = getImplementationBase(gmvUSD);
    const costPerStore = getStoreCost(physicalStores);
    const storeIntegrationCost = physicalStores * costPerStore;
    let featureImplementationCost = 0;
    Object.keys(selectedFeatures).forEach(f => { if (selectedFeatures[f]) featureImplementationCost += featureImplementationCosts[f] || 0; });
    const migrationTotal = implementationBase + storeIntegrationCost + featureImplementationCost;
    
    // TCO
    const currentPlatformCosts = {
      magento: { license: gmv < 5 ? 30000 : gmv < 20 ? 60000 : 150000, hosting: 24000, maintenance: gmv < 5 ? 40000 : 90000, support: 25000 },
      shopify: { license: gmv < 5 ? 24000 : 72000, hosting: 0, maintenance: gmv < 5 ? 18000 : 60000, support: 12000 },
      salesforce: { license: gmv < 5 ? 50000 : 250000, hosting: 0, maintenance: gmv < 5 ? 30000 : 100000, support: 30000 },
      woocommerce: { license: 0, hosting: gmv < 5 ? 3600 : 36000, maintenance: gmv < 5 ? 35000 : 110000, support: gmv < 5 ? 15000 : 50000 },
      prestashop: { license: 0, hosting: gmv < 5 ? 4800 : 39600, maintenance: gmv < 5 ? 32000 : 105000, support: gmv < 5 ? 12000 : 45000 },
      e3: { license: gmv < 5 ? 25000 : 120000, hosting: gmv < 5 ? 18000 : 42000, maintenance: gmv < 5 ? 28000 : 95000, support: gmv < 5 ? 18000 : 55000 },
      otros: { license: gmv < 5 ? 35000 : 140000, hosting: gmv < 5 ? 15000 : 42000, maintenance: gmv < 5 ? 38000 : 115000, support: gmv < 5 ? 20000 : 60000 }
    };
    const currentCosts = currentPlatformCosts[currentPlatform];
    const currentPlatformAnnual = Object.values(currentCosts).reduce((a, b) => a + b, 0);
    const vtexAnnualTechOnly = vtexAnnualSubscription + 8000;
    const tcoSavingsAnnual = currentPlatformAnnual - vtexAnnualTechOnly;
    const tcoSavings = tcoSavingsAnnual * period;
    const tcoSavingsPercent = currentPlatformAnnual > 0 ? ((tcoSavingsAnnual / currentPlatformAnnual) * 100).toFixed(1) : 0;
    
    // REVENUE UPLIFT TOTAL
    let totalRevenueUplift = revenueUpliftYear1;
    if (period >= 2) totalRevenueUplift += revenueUpliftYear2;
    if (period >= 3) totalRevenueUplift += revenueUpliftYear3;
    const totalProfitFromUplift = totalRevenueUplift * marginMultiplier;
    
    // TOTAL BENEFITS
    const totalSavingsValue = (teamSavingsAnnual * period) + tcoSavings + featureGapSavings;
    const totalBenefits = totalProfitFromUplift + totalSavingsValue;
    
    // INVERSIÓN SEPARADA
    const inversionSetup = migrationTotal; // Inversión única
    const costoOperativoAnual = vtexAnnualSubscription; // Costo recurrente
    const totalInvestment = inversionSetup + (costoOperativoAnual * period);
    
    // BENEFICIO INCREMENTAL
    const beneficioIncremental = totalBenefits - totalInvestment;
    
    // ROI
    const roi = totalInvestment > 0 ? ((beneficioIncremental / totalInvestment) * 100).toFixed(0) : 0;
    const roiMultiplier = totalInvestment > 0 ? (beneficioIncremental / totalInvestment).toFixed(2) : 0;
    
    // PAYBACK CORREGIDO - Lógica clara
    const monthlyUpliftProfit = (revenueUpliftYear1 * marginMultiplier) / 12;
    const monthlyTeamSavings = teamSavingsAnnual / 12;
    const monthlyTcoSavings = tcoSavingsAnnual / 12;
    const monthlyFeatureGapSavings = featureGapSavings / 36;
    
    // Beneficio mensual NETO post go-live
    const monthlyBenefitNet = monthlyUpliftProfit + monthlyTeamSavings + monthlyTcoSavings + monthlyFeatureGapSavings;
    
    // Payback = meses de implementación + meses para recuperar setup
    const monthsToRecoverSetup = monthlyBenefitNet > 0 ? (inversionSetup / monthlyBenefitNet) : 999;
    const paybackMonths = monthlyBenefitNet > 0 
      ? (migrationMonths + monthsToRecoverSetup).toFixed(1) 
      : 'N/A';
    
    // COSTO DE OPORTUNIDAD
    const dailyBenefitLost = monthlyBenefitNet / 30;
    const monthlyBenefitLost = monthlyBenefitNet;
    
    // CASHFLOW MENSUAL
    const cashflowData = [];
    let cumulative = 0;
    const monthsToShow = Math.max(period * 12, 24);
    
    for (let m = 1; m <= monthsToShow; m++) {
      let monthCost = 0;
      let monthBenefit = 0;
      
      if (m <= migrationMonths) {
        if (m === 1) {
          monthCost = inversionSetup;
        }
        monthBenefit = 0;
      } else {
        const monthsOperating = m - migrationMonths;
        const yearOfOperation = Math.ceil(monthsOperating / 12);
        
        let upliftThisMonth = 0;
        if (yearOfOperation === 1) upliftThisMonth = revenueUpliftYear1 / 12;
        else if (yearOfOperation === 2) upliftThisMonth = revenueUpliftYear2 / 12;
        else upliftThisMonth = revenueUpliftYear3 / 12;
        
        monthBenefit = (upliftThisMonth * marginMultiplier) + (teamSavingsAnnual / 12) + (tcoSavingsAnnual / 12) + (featureGapSavings / 36);
        monthCost = 0;
      }
      
      const netFlow = monthBenefit - monthCost;
      cumulative += netFlow;
      
      const prevCumulative = cashflowData.length > 0 ? cashflowData[cashflowData.length - 1].cumulative : 0;
      
      cashflowData.push({
        month: m,
        cost: monthCost,
        benefit: monthBenefit,
        net: netFlow,
        cumulative: cumulative,
        isImplementation: m <= migrationMonths,
        isBreakeven: cumulative >= 0 && prevCumulative < 0
      });
    }
    
    const breakevenMonth = cashflowData.find(d => d.cumulative >= 0 && d.month > migrationMonths)?.month || null;
    
    return {
      gmvUSD, size, migrationMonths,
      upliftYear1Percent, upliftYear2Percent, upliftYear3Percent,
      revenueUpliftYear1, revenueUpliftYear2, revenueUpliftYear3,
      baseUplift, featuresUpliftBonus, storesUpliftBonus, maturityDiscount,
      omniTotal, featureGapSavings,
      currentTeamCost: currentTeamCostAnnual, teamSavings: teamSavingsAnnual,
      internalTeamBefore: internalTeam, internalTeamAfter: vtexInternalTeam,
      agencyHoursBefore: agencyHours, agencyHoursAfter: vtexAgencyHours,
      currentPlatformAnnual, vtexAnnualTechOnly, tcoSavings, tcoSavingsAnnual, tcoSavingsPercent,
      vtexAnnualSubscription, inversionSetup, costoOperativoAnual,
      implementationBase, storeIntegrationCost, featureImplementationCost,
      totalRevenueUplift, totalProfitFromUplift, totalBenefits,
      totalInvestment, beneficioIncremental, roi, roiMultiplier, paybackMonths,
      monthlyBenefitNet, dailyBenefitLost, monthlyBenefitLost,
      cashflowData, breakevenMonth
    };
  }, [currentPlatform, gmv, industry, period, profitMargin, internalTeam, agencyHours, agencyRate, physicalStores, omnichannelMaturity, selectedFeatures]);

  const formatMoney = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);
  const toggleFeature = (f) => setSelectedFeatures(prev => ({ ...prev, [f]: !prev[f] }));
  const selectedFeatureCount = Object.values(selectedFeatures).filter(Boolean).length;

  // URL de Calendly
  const calendlyUrl = 'https://calendly.com/sebastian-balbo/hablemos-de-vtex';

  // Función de exportación PDF - Análisis Ejecutivo Completo
  const handleExportPDF = () => {
    setIsExporting(true);
    
    const selectedFeaturesNames = Object.entries(selectedFeatures)
      .filter(([_, v]) => v)
      .map(([k]) => featureLabels[k]?.name || k);
    
    const selectedFeaturesDetails = Object.entries(selectedFeatures)
      .filter(([_, v]) => v)
      .map(([k]) => ({
        key: k,
        name: featureLabels[k]?.name || k,
        uplift: featureLabels[k]?.uplift || 0
      }))
      .sort((a, b) => b.uplift - a.uplift);
    
    // Calcular contribuciones porcentuales de cada beneficio
    const benefitContributions = {
      revenueUplift: calculations.totalProfitFromUplift,
      teamSavings: calculations.teamSavings * period,
      tcoSavings: calculations.tcoSavings,
      featureGap: calculations.featureGapSavings
    };
    
    const totalBenefits = calculations.totalBenefits;
    const sortedBenefits = Object.entries(benefitContributions)
      .map(([key, value]) => ({ key, value, percentage: Math.round((value / totalBenefits) * 100) }))
      .sort((a, b) => b.value - a.value);
    
    const primaryBenefit = sortedBenefits[0];
    
    // Casos de éxito por industria
    const industryCases = {
      fashion: [
        { company: 'Grupo Soma (Farm, Animale)', country: 'Brasil', result: '+35% conversión móvil, 40% reducción time-to-market', source: 'VTEX Case Study 2023' },
        { company: 'C&A Latinoamérica', country: 'Regional', result: 'Unificación de 17 países, +28% ventas online YoY', source: 'VTEX Enterprise Report' },
        { company: 'Dafiti Group', country: 'LATAM', result: 'Marketplace con +2000 sellers, arquitectura headless', source: 'VTEX Commerce Platform' }
      ],
      retail: [
        { company: 'Carrefour Brasil', country: 'Brasil', result: 'Integración O2O completa, +45% ordenes BOPIS', source: 'VTEX Grocery Report 2023' },
        { company: 'Cencosud (Jumbo, Easy)', country: 'Chile/Argentina', result: 'Omnicanalidad en 6 meses, +52% NPS digital', source: 'VTEX Retail Excellence' },
        { company: 'Liverpool México', country: 'México', result: 'Click & Collect en 100+ tiendas, +38% ticket promedio', source: 'VTEX Enterprise' }
      ],
      electronics: [
        { company: 'Samsung LATAM', country: 'Regional', result: 'D2C unificado en 8 países, +25% margen vs distribuidores', source: 'VTEX D2C Report' },
        { company: 'Sony Store Brasil', country: 'Brasil', result: 'Experiencia premium, +42% conversión con personalización', source: 'VTEX Case Study' },
        { company: 'Motorola Argentina', country: 'Argentina', result: 'Lanzamientos en 72hrs, integración con carriers', source: 'VTEX Electronics' }
      ],
      food: [
        { company: 'Nestlé D2C', country: 'Brasil', result: 'Suscripciones +200% YoY, CAC reducido 35%', source: 'VTEX CPG Report' },
        { company: 'AB InBev (Zé Delivery)', country: 'Brasil', result: '+10M pedidos/mes, delivery en 30min', source: 'VTEX Marketplace Study' },
        { company: 'Arcor', country: 'Argentina', result: 'B2B2C integrado, +60% penetración digital', source: 'VTEX Food & Beverage' }
      ],
      beauty: [
        { company: "L'Oréal LATAM", country: 'Regional', result: 'Plataforma unificada 12 marcas, +48% engagement', source: 'VTEX Beauty Report' },
        { company: 'Natura &Co', country: 'Brasil', result: 'Social selling integrado, +1M consultoras digitales', source: 'VTEX Social Commerce' },
        { company: 'Sephora México', country: 'México', result: 'Omnichannel loyalty, +55% retention rate', source: 'VTEX Retail Excellence' }
      ],
      b2b: [
        { company: 'Votorantim Cimentos', country: 'Brasil', result: 'Portal B2B, +70% pedidos self-service', source: 'VTEX B2B Report 2023' },
        { company: 'Whirlpool', country: 'Regional', result: 'B2B + B2C unificado, -40% costo de servicio', source: 'VTEX Manufacturing' },
        { company: 'Stanley Black & Decker', country: 'LATAM', result: 'Distribuidores digitalizados, +85% adopción', source: 'VTEX B2B Case Study' }
      ]
    };
    
    // Comparación detallada de plataformas
    const platformDetails = {
      magento: {
        name: 'Adobe Commerce (Magento)',
        weaknesses: [
          'Alta complejidad técnica requiere equipo especializado costoso',
          'Actualizaciones de versión complejas y riesgosas (promedio 3-6 meses)',
          'Performance degradada sin optimización continua',
          'Costo de hosting y mantenimiento escalable',
          'Integraciones LATAM requieren desarrollo custom extensivo'
        ],
        vtexAdvantages: [
          'SaaS nativo elimina gestión de infraestructura',
          'Actualizaciones automáticas sin downtime',
          'Performance optimizada out-of-the-box',
          'Pricing basado en GMV, predecible y escalable',
          'Integraciones LATAM nativas (medios de pago, logística, fiscal)'
        ],
        migrationComplexity: 'Media-Alta',
        typicalTimeframe: '4-6 meses'
      },
      vtexlegacy: {
        name: 'VTEX Legacy (Portal/CMS)',
        weaknesses: [
          'Arquitectura monolítica limita flexibilidad',
          'Frontend acoplado dificulta personalización',
          'APIs limitadas para integraciones modernas',
          'No soporta arquitectura headless/composable',
          'Menor performance en escenarios de alto tráfico'
        ],
        vtexAdvantages: [
          'VTEX IO con arquitectura de microservicios',
          'Store Framework para desarrollo ágil',
          'FastStore para headless commerce',
          'APIs GraphQL modernas y documentadas',
          'Edge computing para máxima performance'
        ],
        migrationComplexity: 'Media',
        typicalTimeframe: '3-4 meses'
      },
      salesforce: {
        name: 'Salesforce Commerce Cloud',
        weaknesses: [
          'Costos de licenciamiento significativamente mayores',
          'Dependencia del ecosistema Salesforce completo',
          'Implementaciones típicamente más largas',
          'Menor flexibilidad en customizaciones',
          'Soporte regional LATAM limitado'
        ],
        vtexAdvantages: [
          'TCO 30-50% menor en promedio',
          'Plataforma independiente y abierta',
          'Time-to-market más rápido',
          'Mayor flexibilidad con VTEX IO',
          'Equipo y soporte local en LATAM'
        ],
        migrationComplexity: 'Alta',
        typicalTimeframe: '5-8 meses'
      },
      shopify: {
        name: 'Shopify / Shopify Plus',
        weaknesses: [
          'Limitaciones en B2B y escenarios complejos',
          'Checkout customization restringido',
          'Multi-país y multi-moneda limitado',
          'Marketplace nativo no disponible',
          'Integraciones fiscales LATAM requieren apps terceros'
        ],
        vtexAdvantages: [
          'B2B nativo con precios por cliente/segmento',
          'Checkout 100% customizable',
          'Multi-tenant nativo para operaciones regionales',
          'Marketplace integrado out-of-the-box',
          'Compliance fiscal LATAM nativo'
        ],
        migrationComplexity: 'Media',
        typicalTimeframe: '3-5 meses'
      },
      woocommerce: {
        name: 'WooCommerce',
        weaknesses: [
          'No diseñado para alto volumen transaccional',
          'Seguridad dependiente de actualizaciones WordPress',
          'Performance limitada sin hosting enterprise',
          'Requiere múltiples plugins para funcionalidad básica',
          'Sin soporte enterprise ni SLAs garantizados'
        ],
        vtexAdvantages: [
          'Arquitectura enterprise para cualquier escala',
          'Seguridad y compliance gestionados',
          'Performance garantizada con SLAs',
          'Funcionalidad completa sin plugins externos',
          'Soporte enterprise 24/7'
        ],
        migrationComplexity: 'Media',
        typicalTimeframe: '3-4 meses'
      },
      oracle: {
        name: 'Oracle Commerce',
        weaknesses: [
          'Complejidad extrema de implementación',
          'Costos de licenciamiento muy elevados',
          'Ecosistema cerrado y propietario',
          'Ciclos de actualización lentos',
          'Talento especializado escaso y costoso'
        ],
        vtexAdvantages: [
          'Implementación ágil y predecible',
          'Modelo de pricing transparente',
          'Ecosistema abierto con +800 partners',
          'Innovación continua con releases frecuentes',
          'Amplia comunidad de desarrolladores'
        ],
        migrationComplexity: 'Alta',
        typicalTimeframe: '6-9 meses'
      },
      custom: {
        name: 'Plataforma Custom / In-house',
        weaknesses: [
          'Deuda técnica acumulada dificulta evolución',
          'Dependencia de conocimiento interno',
          'Costo de mantenimiento creciente',
          'Dificultad para incorporar nuevas funcionalidades',
          'Riesgo de obsolescencia tecnológica'
        ],
        vtexAdvantages: [
          'Plataforma siempre actualizada',
          'Comunidad y ecosistema de soporte',
          'Roadmap de producto continuo',
          'Nuevas funcionalidades sin desarrollo custom',
          'Estándares de industria garantizados'
        ],
        migrationComplexity: 'Variable',
        typicalTimeframe: '4-8 meses'
      }
    };
    
    const currentPlatformDetails = platformDetails[currentPlatform] || platformDetails.custom;
    const relevantCases = industryCases[industry] || industryCases.retail;
    
    // Generar argumentación según el beneficio principal
    const benefitArgumentation = {
      revenueUplift: `
        <h3>Revenue Uplift como Driver Principal del ROI</h3>
        <p>El análisis identifica el <strong>incremento en ingresos</strong> como el factor de mayor impacto en el retorno de inversión, representando el <strong>${primaryBenefit.percentage}%</strong> del beneficio total proyectado.</p>
        
        <h4>Metodología de Cálculo del Uplift</h4>
        <p>El uplift proyectado de <strong>${calculations.revenueUpliftPercentage}%</strong> se calcula considerando múltiples factores:</p>
        <ul>
          <li><strong>Base por industria (${industry}):</strong> Los benchmarks de VTEX para la industria ${industry} muestran un uplift base de ${industryData[industry]?.baseUplift || 18}-${(industryData[industry]?.baseUplift || 18) + 6}% en el primer año post-migración.</li>
          <li><strong>Features seleccionados:</strong> Cada funcionalidad habilitada contribuye incrementalmente al uplift. ${selectedFeaturesDetails.length > 0 ? `Los features de mayor impacto en tu selección son: ${selectedFeaturesDetails.slice(0, 3).map(f => f.name + ' (+' + f.uplift + '%)').join(', ')}.` : ''}</li>
          <li><strong>Integración omnicanal:</strong> Con ${physicalStores} tiendas físicas, la integración O2O aporta un incremento adicional significativo basado en casos similares.</li>
          <li><strong>Madurez digital:</strong> El ajuste por años de operación considera la curva de aprendizaje y optimización progresiva.</li>
        </ul>
        
        <h4>Validación con Casos Reales</h4>
        <p>Empresas similares en la industria ${industry} han reportado resultados consistentes con estas proyecciones:</p>
      `,
      teamSavings: `
        <h3>Optimización de Recursos como Driver Principal del ROI</h3>
        <p>El análisis identifica el <strong>ahorro en equipo técnico y operativo</strong> como el factor de mayor impacto, representando el <strong>${primaryBenefit.percentage}%</strong> del beneficio total proyectado.</p>
        
        <h4>Metodología de Cálculo</h4>
        <p>La reducción de recursos se basa en el modelo SaaS de VTEX que elimina cargas operativas:</p>
        <ul>
          <li><strong>Reducción de FTEs:</strong> De ${fteCount} FTEs actuales, se proyecta una reducción del ${currentPlatform === 'custom' || currentPlatform === 'magento' ? '50%' : '30%'} basado en benchmarks de migraciones similares.</li>
          <li><strong>Horas de agencia:</strong> De ${agencyHours} hrs/mes actuales, se estima reducción de ${currentPlatform === 'custom' ? '70%' : '50%'} por menor mantenimiento requerido.</li>
          <li><strong>Eliminación de tareas:</strong> Gestión de infraestructura, parches de seguridad, actualizaciones de versión, y optimización de performance son absorbidas por VTEX.</li>
        </ul>
        
        <h4>Factores que Soportan esta Proyección</h4>
        <p>La plataforma actual (${platformNames[currentPlatform]}) tiene características que demandan recursos significativos:</p>
        <ul>
          ${currentPlatformDetails.weaknesses.slice(0, 3).map(w => `<li>${w}</li>`).join('')}
        </ul>
      `,
      tcoSavings: `
        <h3>Reducción de TCO como Driver Principal del ROI</h3>
        <p>El análisis identifica la <strong>reducción del Costo Total de Propiedad</strong> como el factor de mayor impacto, representando el <strong>${primaryBenefit.percentage}%</strong> del beneficio total proyectado.</p>
        
        <h4>Componentes del TCO Actual vs VTEX</h4>
        <p>El ahorro proyectado de <strong>${formatMoney(calculations.tcoSavings)}</strong> en ${period} años se fundamenta en:</p>
        <ul>
          <li><strong>Hosting/Infraestructura:</strong> ${currentPlatform === 'magento' || currentPlatform === 'woocommerce' || currentPlatform === 'custom' ? 'Eliminación completa de costos de hosting, CDN, y escalamiento' : 'Consolidación en modelo SaaS'}</li>
          <li><strong>Licenciamiento:</strong> ${currentPlatform === 'salesforce' || currentPlatform === 'oracle' ? 'Reducción significativa vs modelo de licencias enterprise' : 'Modelo predictivo basado en GMV'}</li>
          <li><strong>Mantenimiento:</strong> Actualizaciones, parches y evolución incluidos en la suscripción</li>
          <li><strong>Seguridad y Compliance:</strong> PCI-DSS, LGPD/GDPR incluidos sin costo adicional</li>
        </ul>
        
        <h4>Benchmark de Mercado</h4>
        <p>Según datos de Forrester y Gartner, las migraciones a plataformas SaaS de comercio electrónico típicamente generan:</p>
        <ul>
          <li>Reducción de 25-40% en TCO a 3 años</li>
          <li>Eliminación del 60-80% del esfuerzo de mantenimiento</li>
          <li>ROI positivo entre 12-18 meses post go-live</li>
        </ul>
      `,
      featureGap: `
        <h3>Cierre de Brechas Funcionales como Driver Principal del ROI</h3>
        <p>El análisis identifica el <strong>ahorro por funcionalidades nativas</strong> como el factor de mayor impacto, representando el <strong>${primaryBenefit.percentage}%</strong> del beneficio total proyectado.</p>
        
        <h4>Features que Generan Mayor Impacto</h4>
        <p>La selección de ${selectedFeaturesDetails.length} funcionalidades representa un ahorro de <strong>${formatMoney(calculations.featureGapSavings)}</strong> vs desarrollo custom:</p>
        <ul>
          ${selectedFeaturesDetails.map(f => `<li><strong>${f.name}:</strong> Incluido nativamente en VTEX, costo de desarrollo alternativo estimado en mercado: $${((featureLabels[f.key]?.implementationCost || 25000) * 0.5).toLocaleString()} - $${(featureLabels[f.key]?.implementationCost || 25000).toLocaleString()}</li>`).join('')}
        </ul>
        
        <h4>Costo de Oportunidad del Desarrollo Custom</h4>
        <p>Desarrollar estas funcionalidades internamente o con terceros implicaría:</p>
        <ul>
          <li><strong>Time-to-market:</strong> 6-18 meses adicionales vs disponibilidad inmediata</li>
          <li><strong>Riesgo técnico:</strong> Integración, testing, y estabilización</li>
          <li><strong>Mantenimiento continuo:</strong> 20-30% del costo inicial anualmente</li>
          <li><strong>Costo de oportunidad:</strong> Recursos dedicados a build vs innovación</li>
        </ul>
      `
    };
    
    const primaryArgumentation = benefitArgumentation[primaryBenefit.key] || benefitArgumentation.revenueUplift;
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Análisis Ejecutivo ROI - Migración a VTEX | ${new Date().toLocaleDateString('es-AR')}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      padding: 40px; 
      max-width: 1000px; 
      margin: 0 auto; 
      color: #1a1a1a; 
      line-height: 1.6;
      font-size: 14px;
    }
    .cover { 
      background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%); 
      color: white; 
      padding: 50px 40px; 
      border-radius: 16px; 
      margin-bottom: 40px;
      text-align: center;
    }
    .cover h1 { font-size: 32px; margin-bottom: 12px; font-weight: 700; }
    .cover .subtitle { font-size: 18px; opacity: 0.95; margin-bottom: 24px; }
    .cover .meta { font-size: 13px; opacity: 0.85; }
    .cover .meta span { margin: 0 15px; }
    
    .executive-summary {
      background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
    }
    .executive-summary h2 { font-size: 20px; margin-bottom: 16px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
    .executive-summary p { margin-bottom: 12px; line-height: 1.7; }
    
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin: 30px 0;
    }
    .kpi-card {
      background: white;
      border-radius: 12px;
      padding: 24px 20px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      border: 1px solid #e5e7eb;
    }
    .kpi-card .label { font-size: 12px; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .kpi-card .value { font-size: 28px; font-weight: 700; color: #1e293b; }
    .kpi-card .value.positive { color: #059669; }
    .kpi-card .value.highlight { color: #e91e63; }
    .kpi-card .subtext { font-size: 11px; color: #9ca3af; margin-top: 4px; }
    
    .section { 
      background: #ffffff; 
      border-radius: 12px; 
      padding: 28px; 
      margin-bottom: 24px; 
      border: 1px solid #e5e7eb;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .section h2 { 
      font-size: 18px; 
      color: #1e293b; 
      margin-bottom: 20px; 
      padding-bottom: 12px; 
      border-bottom: 3px solid #e91e63;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section h3 { font-size: 16px; color: #374151; margin: 20px 0 12px 0; }
    .section h4 { font-size: 14px; color: #4b5563; margin: 16px 0 10px 0; }
    .section p { margin-bottom: 12px; color: #4b5563; }
    .section ul { margin: 12px 0 12px 24px; color: #4b5563; }
    .section ul li { margin-bottom: 8px; }
    
    .config-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .config-item {
      background: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #e91e63;
    }
    .config-item .label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
    .config-item .value { font-size: 18px; font-weight: 600; color: #1e293b; margin-top: 4px; }
    
    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    .comparison-table th, .comparison-table td {
      padding: 14px 16px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    .comparison-table th {
      background: #f1f5f9;
      font-weight: 600;
      color: #374151;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .comparison-table tr:hover { background: #f8fafc; }
    .comparison-table .positive { color: #059669; font-weight: 600; }
    .comparison-table .negative { color: #dc2626; }
    
    .case-study {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-radius: 10px;
      padding: 20px;
      margin: 16px 0;
      border-left: 4px solid #22c55e;
    }
    .case-study .company { font-weight: 700; color: #166534; font-size: 15px; }
    .case-study .country { font-size: 12px; color: #4ade80; margin-left: 8px; }
    .case-study .result { margin: 8px 0; color: #15803d; }
    .case-study .source { font-size: 11px; color: #86efac; font-style: italic; }
    
    .platform-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    .platform-box {
      padding: 20px;
      border-radius: 10px;
    }
    .platform-box.current {
      background: #fef2f2;
      border: 1px solid #fecaca;
    }
    .platform-box.vtex {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
    }
    .platform-box h4 { margin-bottom: 12px; }
    .platform-box ul { margin-left: 16px; font-size: 13px; }
    .platform-box ul li { margin-bottom: 6px; }
    
    .benefit-breakdown {
      background: #fafafa;
      border-radius: 10px;
      padding: 20px;
      margin: 16px 0;
    }
    .benefit-bar {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .benefit-bar .label { width: 180px; font-size: 13px; color: #4b5563; }
    .benefit-bar .bar-container { flex: 1; height: 24px; background: #e5e7eb; border-radius: 4px; overflow: hidden; margin: 0 12px; }
    .benefit-bar .bar { height: 100%; background: linear-gradient(90deg, #e91e63, #9c27b0); border-radius: 4px; }
    .benefit-bar .value { width: 100px; text-align: right; font-weight: 600; font-size: 13px; }
    
    .opportunity-cost {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      border-left: 5px solid #f59e0b;
    }
    .opportunity-cost h3 { color: #92400e; margin-bottom: 12px; }
    .opportunity-cost .values { display: flex; gap: 30px; margin-top: 16px; }
    .opportunity-cost .value-box { text-align: center; }
    .opportunity-cost .value-label { font-size: 12px; color: #a16207; }
    .opportunity-cost .value-number { font-size: 32px; font-weight: 700; color: #92400e; }
    
    .cta-box {
      background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
    }
    .cta-box h3 { font-size: 22px; margin-bottom: 12px; }
    .cta-box p { opacity: 0.9; margin-bottom: 20px; }
    .cta-box a {
      display: inline-block;
      background: white;
      color: #e91e63;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 700;
      text-decoration: none;
      transition: transform 0.2s;
    }
    .cta-box a:hover { transform: scale(1.05); }
    
    .disclaimer {
      background: #f1f5f9;
      border-radius: 8px;
      padding: 20px;
      margin-top: 30px;
      border: 1px solid #cbd5e1;
    }
    .disclaimer h4 { color: #475569; font-size: 13px; margin-bottom: 10px; }
    .disclaimer p { font-size: 11px; color: #64748b; line-height: 1.6; }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 2px solid #e5e7eb;
    }
    .footer .contact { font-size: 14px; color: #374151; margin-bottom: 8px; }
    .footer .contact strong { color: #1e293b; }
    
    @media print {
      body { padding: 20px; font-size: 12px; }
      .section { page-break-inside: avoid; }
      .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <!-- PORTADA -->
  <div class="cover">
    <h1>Análisis Ejecutivo de ROI</h1>
    <p class="subtitle">Migración a VTEX Commerce Platform</p>
    <div class="meta">
      <span>📅 ${new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      <span>📊 Período: ${period} ${period === 1 ? 'año' : 'años'}</span>
      <span>🏢 Industria: ${industry.charAt(0).toUpperCase() + industry.slice(1)}</span>
    </div>
  </div>

  <!-- RESUMEN EJECUTIVO -->
  <div class="executive-summary">
    <h2>📋 Resumen Ejecutivo</h2>
    <p>Este análisis evalúa el retorno de inversión proyectado para la migración desde <strong>${platformNames[currentPlatform]}</strong> hacia <strong>VTEX Commerce Platform</strong>, considerando un GMV anual de <strong>${formatMoney(gmv * 1000000)}</strong> y un horizonte de <strong>${period} ${period === 1 ? 'año' : 'años'}</strong>.</p>
    <p>Basado en benchmarks de industria, casos de éxito comparables y la configuración específica del negocio, se proyecta un <strong>ROI del ${calculations.roi}%</strong>, con recuperación de la inversión en <strong>${calculations.paybackMonths} meses</strong> y beneficio neto acumulado de <strong>${formatMoney(calculations.beneficioIncremental)}</strong>.</p>
    <p>El principal driver del retorno es <strong>${primaryBenefit.key === 'revenueUplift' ? 'el incremento en ingresos' : primaryBenefit.key === 'teamSavings' ? 'la optimización de recursos' : primaryBenefit.key === 'tcoSavings' ? 'la reducción del TCO' : 'el cierre de brechas funcionales'}</strong>, representando el ${primaryBenefit.percentage}% del beneficio total proyectado.</p>
  </div>

  <!-- KPIs PRINCIPALES -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="label">ROI Proyectado</div>
      <div class="value highlight">${calculations.roi}%</div>
      <div class="subtext">En ${period} ${period === 1 ? 'año' : 'años'}</div>
    </div>
    <div class="kpi-card">
      <div class="label">Beneficio Neto</div>
      <div class="value positive">${formatMoney(calculations.beneficioIncremental)}</div>
      <div class="subtext">Acumulado</div>
    </div>
    <div class="kpi-card">
      <div class="label">Payback</div>
      <div class="value">${calculations.paybackMonths} meses</div>
      <div class="subtext">Recuperación inversión</div>
    </div>
    <div class="kpi-card">
      <div class="label">Multiplicador</div>
      <div class="value positive">${calculations.roiMultiplier}x</div>
      <div class="subtext">Por cada $1 invertido</div>
    </div>
  </div>

  <!-- CONFIGURACIÓN DEL ANÁLISIS -->
  <div class="section">
    <h2>⚙️ Parámetros del Análisis</h2>
    <div class="config-grid">
      <div class="config-item">
        <div class="label">Plataforma Actual</div>
        <div class="value">${platformNames[currentPlatform]}</div>
      </div>
      <div class="config-item">
        <div class="label">GMV Anual</div>
        <div class="value">${formatMoney(gmv * 1000000)}</div>
      </div>
      <div class="config-item">
        <div class="label">Margen de Beneficio</div>
        <div class="value">${profitMargin}%</div>
      </div>
      <div class="config-item">
        <div class="label">Industria</div>
        <div class="value">${industry.charAt(0).toUpperCase() + industry.slice(1)}</div>
      </div>
      <div class="config-item">
        <div class="label">Equipo Técnico</div>
        <div class="value">${fteCount} FTEs + ${agencyHours} hrs agencia/mes</div>
      </div>
      <div class="config-item">
        <div class="label">Tiendas Físicas</div>
        <div class="value">${physicalStores} tiendas</div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="label" style="font-size: 11px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">Features Seleccionados (${selectedFeaturesNames.length}/12)</div>
      <p style="font-size: 13px; color: #4b5563; line-height: 1.6;">${selectedFeaturesNames.join(' • ')}</p>
    </div>
  </div>

  <!-- ARGUMENTACIÓN PRINCIPAL -->
  <div class="section">
    <h2>📊 Análisis de Impacto Principal</h2>
    ${primaryArgumentation}
    
    <div style="margin-top: 24px;">
      ${relevantCases.map(c => `
        <div class="case-study">
          <span class="company">${c.company}</span>
          <span class="country">${c.country}</span>
          <p class="result">${c.result}</p>
          <p class="source">Fuente: ${c.source}</p>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- DESGLOSE DE BENEFICIOS -->
  <div class="section">
    <h2>💰 Desglose de Beneficios Proyectados</h2>
    <p>El beneficio total de <strong>${formatMoney(calculations.totalBenefits)}</strong> se compone de las siguientes fuentes:</p>
    
    <div class="benefit-breakdown">
      ${sortedBenefits.map(b => `
        <div class="benefit-bar">
          <span class="label">${b.key === 'revenueUplift' ? 'Revenue Uplift' : b.key === 'teamSavings' ? 'Ahorro Equipo' : b.key === 'tcoSavings' ? 'Ahorro TCO' : 'Feature Gap'}</span>
          <div class="bar-container">
            <div class="bar" style="width: ${b.percentage}%"></div>
          </div>
          <span class="value">${formatMoney(b.value)} (${b.percentage}%)</span>
        </div>
      `).join('')}
    </div>

    <table class="comparison-table">
      <tr>
        <th>Concepto</th>
        <th>Monto Proyectado</th>
        <th>% del Total</th>
        <th>Base de Cálculo</th>
      </tr>
      <tr>
        <td>Revenue Uplift (Margen ${profitMargin}%)</td>
        <td class="positive">${formatMoney(calculations.totalProfitFromUplift)}</td>
        <td>${Math.round((calculations.totalProfitFromUplift / calculations.totalBenefits) * 100)}%</td>
        <td>GMV × Uplift ${calculations.revenueUpliftPercentage}% × Margen</td>
      </tr>
      <tr>
        <td>Ahorro en Equipo Técnico</td>
        <td class="positive">${formatMoney(calculations.teamSavings * period)}</td>
        <td>${Math.round((calculations.teamSavings * period / calculations.totalBenefits) * 100)}%</td>
        <td>Reducción FTEs + Horas agencia</td>
      </tr>
      <tr>
        <td>Ahorro TCO</td>
        <td class="positive">${formatMoney(calculations.tcoSavings)}</td>
        <td>${Math.round((calculations.tcoSavings / calculations.totalBenefits) * 100)}%</td>
        <td>Hosting + Licencias + Mantenimiento</td>
      </tr>
      <tr>
        <td>Ahorro Feature Gap</td>
        <td class="positive">${formatMoney(calculations.featureGapSavings)}</td>
        <td>${Math.round((calculations.featureGapSavings / calculations.totalBenefits) * 100)}%</td>
        <td>Costo dev alternativo evitado</td>
      </tr>
      <tr style="background: #f0fdf4; font-weight: 600;">
        <td>TOTAL BENEFICIOS</td>
        <td class="positive">${formatMoney(calculations.totalBenefits)}</td>
        <td>100%</td>
        <td></td>
      </tr>
    </table>
  </div>

  <!-- COMPARATIVO DE PLATAFORMAS -->
  <div class="section">
    <h2>🔄 Comparativo: ${platformNames[currentPlatform]} vs VTEX</h2>
    <p>El análisis considera las características específicas de ${platformNames[currentPlatform]} y cómo VTEX resuelve las limitaciones identificadas:</p>
    
    <div class="platform-comparison">
      <div class="platform-box current">
        <h4 style="color: #dc2626;">❌ Limitaciones de ${platformNames[currentPlatform]}</h4>
        <ul>
          ${currentPlatformDetails.weaknesses.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>
      <div class="platform-box vtex">
        <h4 style="color: #16a34a;">✓ Ventajas de VTEX</h4>
        <ul>
          ${currentPlatformDetails.vtexAdvantages.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>
    
    <table class="comparison-table">
      <tr>
        <th>Criterio</th>
        <th>${platformNames[currentPlatform]}</th>
        <th>VTEX</th>
      </tr>
      <tr>
        <td>Complejidad de Migración</td>
        <td>${currentPlatformDetails.migrationComplexity}</td>
        <td>N/A (destino)</td>
      </tr>
      <tr>
        <td>Timeframe Típico</td>
        <td>${currentPlatformDetails.typicalTimeframe}</td>
        <td>Go-live en ${calculations.migrationMonths} meses estimados</td>
      </tr>
      <tr>
        <td>Modelo de Costo</td>
        <td>${currentPlatform === 'magento' || currentPlatform === 'woocommerce' || currentPlatform === 'custom' ? 'CapEx + OpEx variable' : 'Licencia + Servicios'}</td>
        <td>SaaS basado en GMV (predecible)</td>
      </tr>
      <tr>
        <td>Soporte LATAM</td>
        <td>${currentPlatform === 'salesforce' || currentPlatform === 'oracle' ? 'Limitado / Partners' : currentPlatform === 'shopify' ? 'Básico' : 'Comunidad'}</td>
        <td>Nativo + Ecosistema local</td>
      </tr>
    </table>
  </div>

  <!-- ANÁLISIS DE FEATURES -->
  <div class="section">
    <h2>🔧 Análisis de Features Seleccionados</h2>
    <p>Se seleccionaron <strong>${selectedFeaturesDetails.length} funcionalidades</strong> que contribuyen al uplift proyectado y representan capacidades nativas de VTEX:</p>
    
    <table class="comparison-table">
      <tr>
        <th>Feature</th>
        <th>Contribución al Uplift</th>
        <th>Costo Implementación Alternativa</th>
        <th>Estado en VTEX</th>
      </tr>
      ${selectedFeaturesDetails.map(f => `
        <tr>
          <td><strong>${f.name}</strong></td>
          <td class="positive">+${f.uplift}%</td>
          <td>${formatMoney(featureLabels[f.key]?.implementationCost || 25000)}</td>
          <td>✓ Nativo</td>
        </tr>
      `).join('')}
      <tr style="background: #f0fdf4; font-weight: 600;">
        <td>Total Contribución Features</td>
        <td class="positive">+${selectedFeaturesDetails.reduce((sum, f) => sum + f.uplift, 0)}%</td>
        <td>${formatMoney(selectedFeaturesDetails.reduce((sum, f) => sum + (featureLabels[f.key]?.implementationCost || 25000), 0))}</td>
        <td>Incluido en licencia</td>
      </tr>
    </table>
  </div>

  <!-- DESGLOSE DE INVERSIÓN -->
  <div class="section">
    <h2>💵 Desglose de Inversión Requerida</h2>
    <table class="comparison-table">
      <tr>
        <th>Concepto</th>
        <th>Monto</th>
        <th>Tipo</th>
        <th>Notas</th>
      </tr>
      <tr>
        <td>Implementación Base</td>
        <td>${formatMoney(calculations.implementationBase)}</td>
        <td>Único</td>
        <td>Setup, migración de datos, integraciones core</td>
      </tr>
      <tr>
        <td>Integración Tiendas (${physicalStores})</td>
        <td>${formatMoney(calculations.storeIntegrationCost)}</td>
        <td>Único</td>
        <td>POS, inventario, fulfillment omnicanal</td>
      </tr>
      <tr>
        <td>Features Adicionales</td>
        <td>${formatMoney(calculations.featureImplementationCost)}</td>
        <td>Único</td>
        <td>Customizaciones y configuraciones</td>
      </tr>
      <tr style="background: #fef3c7;">
        <td><strong>Total Setup (inversión inicial)</strong></td>
        <td><strong>${formatMoney(calculations.inversionSetup)}</strong></td>
        <td>Único</td>
        <td></td>
      </tr>
      <tr>
        <td>Suscripción VTEX</td>
        <td>${formatMoney(calculations.costoOperativoAnual)}/año</td>
        <td>Recurrente</td>
        <td>Basado en GMV, incluye soporte y actualizaciones</td>
      </tr>
      <tr style="background: #f1f5f9; font-weight: 600;">
        <td>INVERSIÓN TOTAL (${period} ${period === 1 ? 'año' : 'años'})</td>
        <td>${formatMoney(calculations.totalInvestment)}</td>
        <td></td>
        <td>Setup + Suscripción período completo</td>
      </tr>
    </table>
  </div>

  <!-- COSTO DE OPORTUNIDAD -->
  <div class="opportunity-cost">
    <h3>⚠️ Costo de Oportunidad: Cada día cuenta</h3>
    <p style="color: #92400e; margin-bottom: 16px;">Mientras se posterga la decisión, el negocio deja de capturar los beneficios proyectados:</p>
    <div class="values">
      <div class="value-box">
        <div class="value-label">Pérdida estimada por día</div>
        <div class="value-number">${formatMoney(calculations.dailyBenefitLost)}</div>
      </div>
      <div class="value-box">
        <div class="value-label">Pérdida estimada por mes</div>
        <div class="value-number">${formatMoney(calculations.monthlyBenefitLost)}</div>
      </div>
      <div class="value-box">
        <div class="value-label">Pérdida potencial 6 meses</div>
        <div class="value-number">${formatMoney(calculations.monthlyBenefitLost * 6)}</div>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="cta-box">
    <h3>¿Listo para dar el siguiente paso?</h3>
    <p>Agenda una demo ejecutiva para profundizar en este análisis y explorar un roadmap personalizado para tu negocio.</p>
    <a href="${calendlyUrl}">📅 Agendar Demo Ejecutiva</a>
  </div>

  <!-- DISCLAIMER -->
  <div class="disclaimer">
    <h4>📋 Disclaimer Legal</h4>
    <p><strong>Este análisis es una estimación basada en datos de mercado y benchmarks de industria. Los resultados reales pueden variar.</strong></p>
    <p>Bajo ninguna circunstancia este documento constituye un compromiso, ni una propuesta comercial de VTEX, ni de su ecosistema de partners. Los valores presentados son proyecciones basadas en información provista por el usuario y datos históricos de implementaciones similares. Los casos de éxito referenciados corresponden a implementaciones reales pero los resultados específicos dependen de múltiples factores incluyendo ejecución, condiciones de mercado, y adopción organizacional.</p>
    <p>Para obtener una propuesta comercial formal, se requiere un proceso de discovery y scoping detallado con los equipos técnicos y comerciales de VTEX.</p>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <p class="contact"><strong>Sebastián Balbo</strong> | Enterprise Account Executive @ VTEX</p>
    <p style="color: #6b7280; font-size: 13px; margin-top: 8px;">📧 Contacto para seguimiento | 📅 <a href="${calendlyUrl}" style="color: #e91e63;">Agendar reunión</a></p>
    <p style="color: #9ca3af; font-size: 11px; margin-top: 16px;">Documento generado automáticamente | ${new Date().toLocaleDateString('es-AR')} | Versión para impresión/PDF</p>
  </div>
</body>
</html>`;

    // Mostrar el modal con el contenido
    setExportHtmlContent(htmlContent);
    setShowExportModal(true);
    setIsExporting(false);
  };

  // Función para imprimir desde el modal
  const handlePrintFromModal = () => {
    const iframe = document.getElementById('export-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print();
    }
  };

  // Función para descargar HTML desde el modal
  const handleDownloadHtml = () => {
    const blob = new Blob([exportHtmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Analisis-ROI-VTEX-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Calcular scores de comparación
  const currentPlatformScores = platformComparison[currentPlatform];
  const calculateWeightedScore = (scores) => {
    let total = 0;
    Object.keys(criteriaLabels).forEach(k => {
      total += (scores[k] / 5) * criteriaLabels[k].weight;
    });
    return total;
  };
  const currentScore = calculateWeightedScore(currentPlatformScores);
  const vtexScore = calculateWeightedScore(vtexScores);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-4 md:p-6" ref={dashboardRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header con Logo VTEX */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Calculadora de Migración a VTEX</h1>
              <p className="text-gray-600">Análisis completo de ROI, TCO, Cashflow y Comparativa de plataformas</p>
            </div>
            <div className="bg-pink-600 text-white px-4 py-2 rounded-lg font-bold text-xl">VTEX</div>
          </div>
        </div>

        {/* Input Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Panel 1: Empresa */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos de tu Empresa</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plataforma Actual</label>
                <select value={currentPlatform} onChange={(e) => setCurrentPlatform(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="magento">Magento / Adobe Commerce</option>
                  <option value="shopify">Shopify Plus</option>
                  <option value="salesforce">Salesforce Commerce Cloud</option>
                  <option value="woocommerce">WooCommerce</option>
                  <option value="prestashop">PrestaShop</option>
                  <option value="e3">E3 ecommerce</option>
                  <option value="otros">Otros / Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industria</label>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="beauty">Beauty & Cosmetics</option>
                  <option value="pharmacy">Pharmacy & Health</option>
                  <option value="grocery">Grocery & Supermarkets</option>
                  <option value="sports">Sports & Outdoor</option>
                  <option value="electronics">Electronics & Tech</option>
                  <option value="home">Home & Furniture</option>
                  <option value="toys">Toys & Baby</option>
                  <option value="department">Department Stores</option>
                  <option value="marketplace">Marketplace Multi-Category</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GMV Anual (Millones USD)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleGmvStep(-1)} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={gmv} onChange={(e) => handleGmvChange(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" min="0.1" max="200" step="0.1" />
                  <button onClick={() => handleGmvStep(1)} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Período a Analizar (años)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map(y => (
                    <button key={y} onClick={() => setPeriod(y)} className={`flex-1 py-2 rounded-lg font-bold transition ${period === y ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{y} año{y > 1 ? 's' : ''}</button>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-blue-800 mb-2">Margen Neto (%) | última línea del P&L</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="1" max="60" value={profitMargin} onChange={(e) => setProfitMargin(parseInt(e.target.value))} className="flex-1" />
                  <span className="font-bold text-blue-700 w-12 text-right">{profitMargin}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Equipo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipo Técnico</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipo Interno (FTE)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setInternalTeam(Math.max(0, internalTeam - 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={internalTeam} onChange={(e) => setInternalTeam(Math.max(0, Math.min(50, parseInt(e.target.value) || 0)))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" />
                  <button onClick={() => setInternalTeam(Math.min(50, internalTeam + 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Costo: $80k/año por persona</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agencia (Horas/Mes)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAgencyHours(Math.max(0, agencyHours - 10))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={agencyHours} onChange={(e) => setAgencyHours(Math.max(0, Math.min(500, Math.round(parseInt(e.target.value) || 0))))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" step="10" />
                  <button onClick={() => setAgencyHours(Math.min(500, agencyHours + 10))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rate Agencia (USD/h)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAgencyRate(Math.max(10, agencyRate - 10))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={agencyRate} onChange={(e) => setAgencyRate(Math.max(10, Math.min(500, Math.round(parseInt(e.target.value) || 0))))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" step="10" />
                  <button onClick={() => setAgencyRate(Math.min(500, agencyRate + 10))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm font-semibold text-gray-700">Costo Equipo Actual:</p>
                <p className="text-2xl font-bold text-blue-600">{formatMoney(calculations.currentTeamCost)}/año</p>
              </div>
            </div>
          </div>

          {/* Panel 3: Omnicanalidad */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Omnicanalidad</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiendas Físicas</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPhysicalStores(Math.max(0, physicalStores - 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={physicalStores} onChange={(e) => setPhysicalStores(Math.max(0, Math.min(500, parseInt(e.target.value) || 0)))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" />
                  <button onClick={() => setPhysicalStores(Math.min(500, physicalStores + 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Madurez Omnicanal Actual</label>
                <select value={omnichannelMaturity} onChange={(e) => setOmnichannelMaturity(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  {Object.entries(maturityDescriptions).map(([key, { label, desc }]) => (
                    <option key={key} value={key}>{label} — {desc}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 border-t">
                <p className="text-xs text-gray-600 mb-2">Impacto Estimado Omnicanal:</p>
                <p className="text-2xl font-bold text-green-600">{formatMoney(calculations.omniTotal)}/año</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Features en Roadmap ({selectedFeatureCount}/12)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(featureLabels).map(([key, { name, desc }]) => (
              <button key={key} onClick={() => toggleFeature(key)} className={`p-3 rounded-lg border-2 transition-all text-left ${selectedFeatures[key] ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}>
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">{desc}</div>
                <div className="text-xs mt-1 font-medium">{selectedFeatures[key] ? '✓ Activo' : 'Click para activar'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex justify-between mb-2"><DollarSign className="w-6 h-6" /><span className="text-xl font-bold">{calculations.tcoSavingsPercent}%</span></div>
            <h3 className="text-sm font-semibold">Ahorro TCO/año</h3>
            <p className="text-2xl font-bold mt-1">{formatMoney(calculations.tcoSavingsAnnual)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex justify-between mb-2"><TrendingUp className="w-6 h-6" /><span className="text-xl font-bold">{calculations.roi}%</span></div>
            <h3 className="text-sm font-semibold">ROI ({period}a)</h3>
            <p className="text-lg font-bold mt-1">{calculations.paybackMonths}m payback</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex justify-between mb-2"><ShoppingCart className="w-6 h-6" /><span className="text-xl font-bold">+{Math.round(calculations.upliftYear1Percent * 100)}%</span></div>
            <h3 className="text-sm font-semibold">Uplift Año 1</h3>
            <p className="text-2xl font-bold mt-1">{formatMoney(calculations.revenueUpliftYear1)}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex justify-between mb-2"><Clock className="w-6 h-6" /><span className="text-xl font-bold">{calculations.migrationMonths}m</span></div>
            <h3 className="text-sm font-semibold">Implementación</h3>
            <p className="text-lg font-bold mt-1">Tamaño: {calculations.size}</p>
          </div>
        </div>

        {/* COMPARATIVA DE PLATAFORMAS */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{platformNames[currentPlatform]} vs VTEX</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scores totales */}
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-gray-600">{currentScore.toFixed(0)}</span>
                </div>
                <p className="text-sm font-semibold text-gray-600">{platformNames[currentPlatform].split(' /')[0]}</p>
              </div>
              <div className="text-4xl font-light text-gray-300">vs</div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-4 border-green-500 bg-green-50 flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-green-600">{vtexScore.toFixed(0)}</span>
                </div>
                <p className="text-sm font-semibold text-green-600">VTEX</p>
              </div>
            </div>
            
            {/* Barra comparativa por criterio */}
            <div className="space-y-3">
              {Object.entries(criteriaLabels).map(([key, { label, weight }]) => (
                <div key={key} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{label} <span className="text-gray-400">({weight}%)</span></span>
                    <span className="text-gray-500">{currentPlatformScores[key]} vs {vtexScores[key]}</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: `${(currentPlatformScores[key] / 5) * 100}%` }}></div>
                    </div>
                    <div className="flex-1 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${(vtexScores[key] / 5) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>VTEX supera en {(vtexScore - currentScore).toFixed(0)} puntos</strong> a {platformNames[currentPlatform].split(' /')[0]}, 
              con ventajas clave en Omnicanalidad, LATAM Ready y Marketplace nativo.
            </p>
          </div>
        </div>

        {/* CASHFLOW Y BREAK-EVEN - Opción A: Original + Panel de Composición */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Cashflow Mensual y Break-Even</h2>
          
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-xs text-gray-600">Inversión Setup</p>
              <p className="text-lg font-bold text-orange-600">{formatMoney(calculations.inversionSetup)}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-600">Costo VTEX/mes</p>
              <p className="text-lg font-bold text-blue-600">{formatMoney(calculations.costoOperativoAnual / 12)}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-gray-600">Break-Even</p>
              <p className="text-lg font-bold text-green-600">Mes {calculations.breakevenMonth || 'N/A'}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-xs text-gray-600">Beneficio Neto</p>
              <p className="text-lg font-bold text-purple-600">{formatMoney(calculations.beneficioIncremental)}</p>
            </div>
          </div>

          {/* GRÁFICO ORIGINAL - Barras simples de cashflow acumulado */}
          {(() => {
            const data = calculations.cashflowData.slice(0, Math.min(36, period * 12 + 6));
            const maxVal = Math.max(...data.map(d => d.cumulative));
            const minVal = Math.min(...data.map(d => d.cumulative));
            const maxAbs = Math.max(Math.abs(maxVal), Math.abs(minVal), 1);
            
            return (
              <div className="mb-6">
                <div className="flex items-end h-48 gap-1 border-b border-gray-300 relative">
                  {/* Línea de cero */}
                  {minVal < 0 && maxVal > 0 && (
                    <div 
                      className="absolute left-0 right-0 border-t-2 border-dashed border-gray-400 z-10" 
                      style={{top: `${(maxVal / (maxVal - minVal)) * 100}%`}}
                    >
                      <span className="absolute -left-10 -top-2 text-xs text-gray-500">$0</span>
                    </div>
                  )}
                  
                  {data.map((d, i) => {
                    const isPositive = d.cumulative >= 0;
                    const height = (Math.abs(d.cumulative) / maxAbs) * 50;
                    const isBreakeven = d.month === calculations.breakevenMonth;
                    const topPosition = minVal < 0 && maxVal > 0
                      ? (isPositive ? (maxVal / (maxVal - minVal)) * 100 - height : (maxVal / (maxVal - minVal)) * 100)
                      : (isPositive ? 100 - height : 50);
                    
                    return (
                      <div key={i} className="flex-1 flex flex-col justify-center h-full relative group">
                        <div 
                          className={`absolute left-0 right-0 mx-px rounded-sm transition-all ${
                            d.isImplementation ? 'bg-orange-400 hover:bg-orange-500' :
                            isPositive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-400 hover:bg-red-500'
                          }`}
                          style={{
                            height: `${Math.max(height, 2)}%`,
                            top: `${topPosition}%`
                          }}
                        />
                        
                        {/* Break-even marker */}
                        {isBreakeven && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                            <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">BE</span>
                          </div>
                        )}
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs p-2 rounded z-20 whitespace-nowrap shadow-lg">
                          <p className="font-bold">Mes {d.month}</p>
                          <p>Acumulado: {formatMoney(d.cumulative)}</p>
                          <p className="text-gray-300">Flujo mes: {formatMoney(d.net)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Eje X */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Mes 1</span>
                  <span className="text-orange-600">← Implementación ({calculations.migrationMonths}m)</span>
                  <span>Mes {Math.floor(data.length / 2)}</span>
                  <span className="text-green-600">Operación →</span>
                  <span>Mes {data.length}</span>
                </div>
                
                {/* Leyenda simple */}
                <div className="flex gap-4 mt-3 text-xs">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-400 rounded"></div> Implementación</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded"></div> Negativo</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded"></div> Positivo</div>
                  <div className="flex items-center gap-1"><span className="bg-green-100 text-green-700 px-1 rounded font-bold">BE</span> Break-even</div>
                </div>
              </div>
            );
          })()}

          {/* PANEL DE COMPOSICIÓN DE BENEFICIOS */}
          <div className="border-t-2 border-gray-200 pt-6">
            <h3 className="font-bold text-gray-800 mb-4">📊 Composición de Beneficios ({period} {period === 1 ? 'año' : 'años'})</h3>
            
            {(() => {
              const composition = [
                { name: 'Revenue Uplift', value: calculations.totalProfitFromUplift, color: '#10b981' },
                { name: 'Ahorro Equipo', value: calculations.teamSavings * period, color: '#3b82f6' },
                { name: 'Ahorro TCO', value: calculations.tcoSavings, color: '#8b5cf6' },
                { name: 'Feature Gap', value: calculations.featureGapSavings, color: '#f59e0b' },
              ].map(item => ({
                ...item,
                pct: Math.round((item.value / calculations.totalBenefits) * 100)
              }));
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gráfico de dona */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        {(() => {
                          let offset = 0;
                          return composition.map((item, i) => {
                            const circumference = 2 * Math.PI * 35;
                            const dash = (item.pct / 100) * circumference;
                            const gap = circumference - dash;
                            const elem = (
                              <circle
                                key={i}
                                cx="50" cy="50" r="35"
                                fill="none"
                                stroke={item.color}
                                strokeWidth="20"
                                strokeDasharray={`${dash} ${gap}`}
                                strokeDashoffset={-offset}
                              />
                            );
                            offset += dash;
                            return elem;
                          });
                        })()}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold text-gray-800">{formatMoney(calculations.totalBenefits)}</p>
                        <p className="text-xs text-gray-500">Total Beneficios</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Barras horizontales */}
                  <div className="space-y-3">
                    {composition.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{backgroundColor: item.color}}></div>
                            {item.name}
                          </span>
                          <span className="font-bold">{formatMoney(item.value)} ({item.pct}%)</span>
                        </div>
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{width: `${item.pct}%`, backgroundColor: item.color}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Revenue Uplift & Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Uplift */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Uplift de Revenue</h2>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div><p className="text-gray-500">Base</p><p className="font-bold text-blue-600">+{(calculations.baseUplift * 100).toFixed(0)}%</p></div>
                <div><p className="text-gray-500">Features</p><p className="font-bold text-green-600">+{(calculations.featuresUpliftBonus * 100).toFixed(1)}%</p></div>
                <div><p className="text-gray-500">Tiendas</p><p className="font-bold text-purple-600">+{(calculations.storesUpliftBonus * 100).toFixed(1)}%</p></div>
                <div><p className="text-gray-500">Madurez</p><p className="font-bold text-red-500">-{(calculations.maturityDiscount * 100).toFixed(0)}%</p></div>
              </div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map(year => {
                const uplift = year === 1 ? calculations.revenueUpliftYear1 : year === 2 ? calculations.revenueUpliftYear2 : calculations.revenueUpliftYear3;
                const pct = year === 1 ? calculations.upliftYear1Percent : year === 2 ? calculations.upliftYear2Percent : calculations.upliftYear3Percent;
                const active = period >= year;
                return (
                  <div key={year} className={`flex justify-between items-center p-2 rounded ${active ? 'bg-blue-50' : 'bg-gray-100 opacity-50'}`}>
                    <span className="text-sm">Año {year}</span>
                    <div className="text-right">
                      <span className={`font-bold ${active ? 'text-blue-600' : 'text-gray-400'}`}>{formatMoney(uplift)}</span>
                      <span className="text-xs text-gray-500 ml-2">(+{(pct * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team & Investment */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Inversión & Equipo</h2>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Inversión Única (Setup)</p>
                <p className="text-xl font-bold text-orange-600">{formatMoney(calculations.inversionSetup)}</p>
                <div className="text-xs text-gray-500 mt-1">
                  Base: {formatMoney(calculations.implementationBase)} + Tiendas: {formatMoney(calculations.storeIntegrationCost)} + Features: {formatMoney(calculations.featureImplementationCost)}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Costo Operativo (Suscripción VTEX)</p>
                <p className="text-xl font-bold text-blue-600">{formatMoney(calculations.costoOperativoAnual)}/año</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Ahorro en Equipo</p>
                <p className="text-xl font-bold text-green-600">{formatMoney(calculations.teamSavings)}/año</p>
                <div className="text-xs text-gray-500 mt-1">
                  {calculations.internalTeamBefore}→{calculations.internalTeamAfter} FTE | {calculations.agencyHoursBefore}→{calculations.agencyHoursAfter} hrs/mes agencia
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen Ejecutivo Final */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl shadow-xl p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Resumen Ejecutivo - {period} {period === 1 ? 'Año' : 'Años'}</h2>
          
          {/* Desglose Beneficios */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Desglose de Beneficios</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="opacity-90 text-xs">Uplift (Margen {profitMargin}%)</p>
                <p className="text-lg font-bold text-yellow-300">{formatMoney(calculations.totalProfitFromUplift)}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="opacity-90 text-xs">Ahorro Equipo</p>
                <p className="text-lg font-bold">{formatMoney(calculations.teamSavings * period)}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="opacity-90 text-xs">Ahorro TCO</p>
                <p className="text-lg font-bold">{formatMoney(calculations.tcoSavings)}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="opacity-90 text-xs">Features Gap</p>
                <p className="text-lg font-bold">{formatMoney(calculations.featureGapSavings)}</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white/10 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Beneficio Total</span>
              <span className="text-2xl font-bold">{formatMoney(calculations.totalBenefits)}</span>
            </div>
          </div>

          {/* Desglose Inversión */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Desglose de Inversión</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="opacity-90 text-xs">Inversión Setup (única)</p>
                <p className="text-lg font-bold">{formatMoney(calculations.inversionSetup)}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="opacity-90 text-xs">Suscripción VTEX ({period}a)</p>
                <p className="text-lg font-bold">{formatMoney(calculations.costoOperativoAnual * period)}</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white/30 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Inversión Total</span>
              <span className="text-2xl font-bold">{formatMoney(calculations.totalInvestment)}</span>
            </div>
          </div>

          {/* ROI */}
          <div className="text-center pt-6 border-t border-white/20">
            <p className="text-lg mb-2">Return on Investment (ROI) | Ingresos incrementados</p>
            <p className="text-5xl md:text-6xl font-bold">{calculations.roi}%</p>
            <p className="text-lg mt-4 opacity-90">
              Por cada $1 invertido en la migración a VTEX, obtenés <span className="font-bold text-yellow-300">${calculations.roiMultiplier}</span> de beneficio extra
            </p>
            <p className="text-sm mt-2 opacity-70">
              Payback: {calculations.paybackMonths} meses | Break-even: Mes {calculations.breakevenMonth || 'N/A'}
            </p>
          </div>
        </div>

        {/* COSTO DE OPORTUNIDAD - Banner de cierre */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg p-6 mt-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Costo de Oportunidad por NO migrar a VTEX</h3>
              <p className="text-sm opacity-90">Cada día que pasa sin migrar, tu negocio deja de capturar este valor</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <p className="text-sm opacity-90 mb-1">Perdés por día</p>
              <p className="text-3xl md:text-4xl font-bold">{formatMoney(calculations.dailyBenefitLost)}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <p className="text-sm opacity-90 mb-1">Perdés por mes</p>
              <p className="text-3xl md:text-4xl font-bold">{formatMoney(calculations.monthlyBenefitLost)}</p>
            </div>
          </div>
          <p className="text-xs mt-4 opacity-80 text-center">* Beneficio neto que podrías estar generando si ya estuvieras operando en VTEX (Uplift + Ahorros - Costo VTEX)</p>
        </div>

        {/* Footer CTAs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">¿Listo para transformar tu ecommerce?</h3>
            <p className="text-gray-600 text-sm">Descargá el análisis completo o agendá una demo con el equipo de VTEX</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              {isExporting ? 'Generando Análisis...' : 'Exportar Análisis Completo'}
            </button>
            <a 
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Agendar Demo Ejecutiva
            </a>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              <strong>Disclaimer:</strong> Este análisis es una estimación basada en datos de mercado y benchmarks de industria. 
              Los resultados reales pueden variar. Bajo ninguna circunstancia es un compromiso, ni una propuesta comercial VTEX, ni de su ecosistema.
            </p>
          </div>
        </div>

        {/* Bio & Inspirational Footer */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 mt-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src="https://iili.io/f4PCq7a.md.png"
              alt="Sebastián Balbo"
              className="w-24 h-24 rounded-full object-cover border-2 border-slate-500"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hidden items-center justify-center text-3xl font-bold">SB</div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-lg font-bold">Sebastián Balbo</h4>
              <p className="text-sm text-slate-300 mb-2">Enterprise Account Executive @ VTEX</p>
              <p className="text-xs text-slate-400">Especialista en transformación digital y comercio unificado para retailers de Latinoamérica.</p>
              <a 
                href="https://www.linkedin.com/in/sebastian-balbo/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
            <div className="hidden md:block w-px h-16 bg-slate-600"></div>
            <div className="flex-1 text-center md:text-right">
              <p className="text-lg italic text-slate-300 leading-relaxed">
                "El mejor momento para transformar tu negocio fue ayer.<br/>
                <span className="text-white font-semibold">El segundo mejor momento es hoy."</span>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-4 mb-2">
          Este análisis es una estimación basada en datos de mercado y benchmarks de industria. Los resultados reales pueden variar.
        </p>
      </div>

      {/* MODAL DE EXPORTACIÓN */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
            {/* Header del modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-xl">
              <div>
                <h3 className="text-xl font-bold">📊 Análisis Ejecutivo ROI - Migración a VTEX</h3>
                <p className="text-sm opacity-90">Vista previa del documento • Podés imprimir o descargar</p>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Contenido - iframe */}
            <div className="flex-1 overflow-hidden p-2 bg-gray-100">
              <iframe
                id="export-iframe"
                srcDoc={exportHtmlContent}
                className="w-full h-full bg-white rounded-lg shadow-inner"
                title="Análisis ROI Preview"
              />
            </div>
            
            {/* Footer con acciones */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex flex-col sm:flex-row gap-3 justify-between items-center">
              <p className="text-sm text-gray-500">
                💡 <strong>Tip:</strong> Usá "Imprimir" y seleccioná "Guardar como PDF" para obtener el documento
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadHtml}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 font-medium"
                >
                  <Download className="w-4 h-4" />
                  Descargar HTML
                </button>
                <button
                  onClick={handlePrintFromModal}
                  className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition flex items-center gap-2 font-bold shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Imprimir / Guardar PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MigrationROICalculator;
