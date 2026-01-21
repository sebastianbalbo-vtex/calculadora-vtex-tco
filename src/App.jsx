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
    // 
    // Durante implementación (meses 1 a N): 
    //   - Seguís operando con plataforma actual (costo neutro)
    //   - Pagás el setup de VTEX (inversión a recuperar)
    //   - Beneficio de VTEX = $0 (todavía no estás live)
    //
    // Post go-live (mes N+1 en adelante):
    //   - Apagás plataforma actual
    //   - Beneficio = Uplift×Margen + Ahorro Equipo + Ahorro TCO + Feature Gap
    //   - tcoSavingsAnnual ya incluye (costoActual - costoVTEX), así que suscripción VTEX ya está descontada
    
    const monthlyUpliftProfit = (revenueUpliftYear1 * marginMultiplier) / 12;
    const monthlyTeamSavings = teamSavingsAnnual / 12;
    const monthlyTcoSavings = tcoSavingsAnnual / 12; // Ya incluye la diferencia (Magento - VTEX)
    const monthlyFeatureGapSavings = featureGapSavings / 36;
    
    // Beneficio mensual NETO post go-live (TCO ya descuenta suscripción VTEX)
    const monthlyBenefitNet = monthlyUpliftProfit + monthlyTeamSavings + monthlyTcoSavings + monthlyFeatureGapSavings;
    
    // Payback = meses de implementación (sin beneficio) + meses para recuperar setup
    const monthsToRecoverSetup = monthlyBenefitNet > 0 ? (inversionSetup / monthlyBenefitNet) : 999;
    const paybackMonths = monthlyBenefitNet > 0 
      ? (migrationMonths + monthsToRecoverSetup).toFixed(1) 
      : 'N/A';
    
    // COSTO DE OPORTUNIDAD (beneficio perdido por no migrar)
    // Es el beneficio mensual que podrías tener si ya estuvieras en VTEX
    const dailyBenefitLost = monthlyBenefitNet / 30;
    const monthlyBenefitLost = monthlyBenefitNet;
    
    // CASHFLOW MENSUAL - Corregido
    // Meses 1-N (implementación): Solo costos, beneficio = 0
    // Mes N+1 en adelante: Beneficios activos
    const cashflowData = [];
    let cumulative = 0;
    const monthsToShow = Math.max(period * 12, 24);
    
    for (let m = 1; m <= monthsToShow; m++) {
      let monthCost = 0;
      let monthBenefit = 0;
      
      if (m <= migrationMonths) {
        // Durante implementación: solo costos
        if (m === 1) {
          monthCost = inversionSetup; // Setup upfront en mes 1
        }
        // Durante implementación seguís pagando plataforma actual (costo neutro, no lo sumamos)
        // No hay beneficio de VTEX todavía
        monthBenefit = 0;
      } else {
        // Post go-live: beneficios activos
        const monthsOperating = m - migrationMonths;
        const yearOfOperation = Math.ceil(monthsOperating / 12);
        
        let upliftThisMonth = 0;
        if (yearOfOperation === 1) upliftThisMonth = revenueUpliftYear1 / 12;
        else if (yearOfOperation === 2) upliftThisMonth = revenueUpliftYear2 / 12;
        else upliftThisMonth = revenueUpliftYear3 / 12;
        
        // Beneficio mensual post go-live (TCO savings ya incluye la diferencia de costos)
        monthBenefit = (upliftThisMonth * marginMultiplier) + (teamSavingsAnnual / 12) + (tcoSavingsAnnual / 12) + (featureGapSavings / 36);
        monthCost = 0; // Los costos de VTEX ya están descontados en tcoSavingsAnnual
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

  // Función para exportar PDF profesional con justificación
  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Cargar jsPDF
      if (!window.jspdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      let y = 15;
      
      // Colores
      const blue = [30, 64, 175];
      const green = [22, 163, 74];
      const gray = [75, 85, 99];
      const lightGray = [156, 163, 175];
      
      // Helper para texto
      const addText = (text, x, yPos, size = 10, color = gray, style = 'normal') => {
        doc.setFontSize(size);
        doc.setTextColor(...color);
        doc.setFont('helvetica', style);
        doc.text(text, x, yPos);
        return yPos + (size * 0.5);
      };
      
      // Helper para líneas
      const addLine = (yPos) => {
        doc.setDrawColor(220, 220, 220);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        return yPos + 5;
      };
      
      // ===== PÁGINA 1 =====
      
      // Header
      doc.setFillColor(30, 64, 175);
      doc.rect(0, 0, pageWidth, 35, 'F');
      addText('ANÁLISIS DE ROI - MIGRACIÓN A VTEX', margin, 15, 18, [255, 255, 255], 'bold');
      addText(`${platformNames[currentPlatform]} → VTEX | GMV: ${formatMoney(calculations.gmvUSD)} | Período: ${period} año${period > 1 ? 's' : ''}`, margin, 25, 10, [200, 210, 255]);
      
      y = 45;
      
      // Resumen Ejecutivo
      addText('RESUMEN EJECUTIVO', margin, y, 14, blue, 'bold');
      y += 10;
      
      // Métricas clave en boxes
      const boxWidth = (contentWidth - 10) / 3;
      const boxes = [
        { label: 'ROI', value: `${calculations.roi}%`, color: green },
        { label: 'Payback', value: `${calculations.paybackMonths} meses`, color: blue },
        { label: 'Beneficio Neto', value: formatMoney(calculations.beneficioIncremental), color: green }
      ];
      
      boxes.forEach((box, i) => {
        const x = margin + (i * (boxWidth + 5));
        doc.setFillColor(245, 247, 250);
        doc.roundedRect(x, y, boxWidth, 20, 2, 2, 'F');
        addText(box.label, x + 5, y + 7, 8, lightGray);
        addText(box.value, x + 5, y + 15, 12, box.color, 'bold');
      });
      y += 30;
      
      // Desglose de beneficios
      addText('DESGLOSE DE BENEFICIOS', margin, y, 12, blue, 'bold');
      y += 8;
      
      const benefits = [
        { label: `Uplift de Revenue (Margen ${profitMargin}%)`, value: calculations.totalProfitFromUplift, pct: `+${Math.round(calculations.upliftYear1Percent * 100)}% año 1` },
        { label: 'Ahorro en Equipo Técnico', value: calculations.teamSavings * period, pct: `${calculations.internalTeamBefore}→${calculations.internalTeamAfter} FTE` },
        { label: 'Ahorro en TCO', value: calculations.tcoSavings, pct: `-${calculations.tcoSavingsPercent}%` },
        { label: 'Features Nativos (vs desarrollo)', value: calculations.featureGapSavings, pct: `${selectedFeatureCount} features` },
      ];
      
      benefits.forEach(b => {
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, y, contentWidth, 8, 'F');
        addText(b.label, margin + 2, y + 5.5, 9, gray);
        addText(formatMoney(b.value), margin + 120, y + 5.5, 9, green, 'bold');
        addText(b.pct, margin + 155, y + 5.5, 8, lightGray);
        y += 9;
      });
      
      doc.setFillColor(220, 252, 231);
      doc.rect(margin, y, contentWidth, 10, 'F');
      addText('BENEFICIO TOTAL', margin + 2, y + 7, 10, gray, 'bold');
      addText(formatMoney(calculations.totalBenefits), margin + 120, y + 7, 11, green, 'bold');
      y += 18;
      
      // Inversión
      addText('INVERSIÓN REQUERIDA', margin, y, 12, blue, 'bold');
      y += 8;
      
      addText(`Setup de migración (único): ${formatMoney(calculations.inversionSetup)}`, margin + 2, y, 9, gray);
      y += 6;
      addText(`Suscripción VTEX (${period}a): ${formatMoney(calculations.costoOperativoAnual * period)}`, margin + 2, y, 9, gray);
      y += 6;
      addText(`Inversión Total: ${formatMoney(calculations.totalInvestment)}`, margin + 2, y, 10, blue, 'bold');
      y += 12;
      
      y = addLine(y);
      
      // Justificación del Uplift
      addText('JUSTIFICACIÓN DEL UPLIFT DE REVENUE', margin, y, 12, blue, 'bold');
      y += 8;
      
      addText('El uplift se calcula considerando:', margin, y, 9, gray);
      y += 6;
      addText(`• Base por industria (${industry}): +${Math.round(calculations.baseUplift * 100)}% - Benchmark VTEX para el sector`, margin + 2, y, 8, gray);
      y += 5;
      addText(`• Bonus por features (${selectedFeatureCount} seleccionados): +${(calculations.featuresUpliftBonus * 100).toFixed(1)}% - Impacto acumulativo documentado`, margin + 2, y, 8, gray);
      y += 5;
      addText(`• Bonus omnicanal (${physicalStores} tiendas): +${(calculations.storesUpliftBonus * 100).toFixed(1)}% - Efecto de integración física-digital`, margin + 2, y, 8, gray);
      y += 5;
      addText(`• Descuento madurez actual: -${(calculations.maturityDiscount * 100).toFixed(0)}% - Valor ya capturado`, margin + 2, y, 8, gray);
      y += 8;
      addText(`Resultado: ${Math.round(calculations.upliftYear1Percent * 100)}% de uplift en año 1, decayendo a ${Math.round(calculations.upliftYear2Percent * 100)}% (año 2) y ${Math.round(calculations.upliftYear3Percent * 100)}% (año 3)`, margin, y, 9, gray, 'italic');
      y += 12;
      
      // Justificación TCO
      addText('JUSTIFICACIÓN DEL AHORRO EN TCO', margin, y, 12, blue, 'bold');
      y += 8;
      
      addText(`VTEX es 100% SaaS, eliminando costos de: licencias perpetuas, hosting dedicado, parches de`, margin, y, 9, gray);
      y += 5;
      addText(`seguridad, actualizaciones de versión y escalabilidad manual. Comparativa anual:`, margin, y, 9, gray);
      y += 7;
      addText(`${platformNames[currentPlatform].split(' /')[0]}: ${formatMoney(calculations.currentPlatformAnnual)}/año`, margin + 5, y, 9, [220, 38, 38]);
      y += 5;
      addText(`VTEX: ${formatMoney(calculations.vtexAnnualTechOnly)}/año (suscripción + soporte)`, margin + 5, y, 9, green);
      y += 5;
      addText(`Ahorro: ${formatMoney(calculations.tcoSavingsAnnual)}/año (${calculations.tcoSavingsPercent}%)`, margin + 5, y, 9, green, 'bold');
      y += 12;
      
      // ===== PÁGINA 2 =====
      doc.addPage();
      y = 15;
      
      // Justificación Equipo
      addText('OPTIMIZACIÓN DE EQUIPO TÉCNICO', margin, y, 12, blue, 'bold');
      y += 8;
      
      addText('La reducción de carga operativa permite reasignar recursos a tareas de mayor valor:', margin, y, 9, gray);
      y += 7;
      addText(`• Equipo interno: ${calculations.internalTeamBefore} → ${calculations.internalTeamAfter} FTE (${Math.round((1 - calculations.internalTeamAfter/calculations.internalTeamBefore) * 100)}% reducción)`, margin + 2, y, 9, gray);
      y += 5;
      addText(`• Horas agencia: ${calculations.agencyHoursBefore} → ${calculations.agencyHoursAfter} hrs/mes (${Math.round((1 - calculations.agencyHoursAfter/calculations.agencyHoursBefore) * 100)}% reducción)`, margin + 2, y, 9, gray);
      y += 5;
      addText(`• Ahorro anual: ${formatMoney(calculations.teamSavings)}`, margin + 2, y, 9, green, 'bold');
      y += 12;
      
      // Timeline
      addText('TIMELINE DE IMPLEMENTACIÓN', margin, y, 12, blue, 'bold');
      y += 8;
      
      addText(`Duración estimada: ${calculations.migrationMonths} meses (tamaño: ${calculations.size})`, margin, y, 9, gray);
      y += 6;
      addText('Fases: Discovery (15%) → Setup & Dev (45%) → Testing (25%) → Go-Live (15%)', margin, y, 9, gray);
      y += 12;
      
      // Comparativa de plataformas
      addText(`COMPARATIVA: ${platformNames[currentPlatform].split(' /')[0].toUpperCase()} VS VTEX`, margin, y, 12, blue, 'bold');
      y += 8;
      
      addText(`Score ponderado: ${currentScore.toFixed(0)} vs ${vtexScore.toFixed(0)} (VTEX +${(vtexScore - currentScore).toFixed(0)} puntos)`, margin, y, 9, gray);
      y += 6;
      addText('Criterios evaluados: Omnicanalidad, LATAM Ready, TCO, Escalabilidad, Time-to-Market, Marketplace', margin, y, 8, lightGray);
      y += 12;
      
      y = addLine(y);
      
      // Fuentes y referencias
      addText('FUENTES Y REFERENCIAS', margin, y, 12, blue, 'bold');
      y += 8;
      
      const sources = [
        'VTEX Business Cases - https://vtex.com/ar-es/resources/ebooks/business-cases/',
        'VTEX ROI de plataformas - https://vtex.com/ar-es/blog/estrategia/roi-de-una-plataforma-de-comercio-digital/',
        'VTEX Intelligent Search - https://help.vtex.com/es/tracks/vtex-intelligent-search',
        'VTEX Security & Compliance - https://vtex.com/ar-es/security/',
        'Gartner Voice of Customer 2024 - VTEX reconocido como Customers\' Choice',
      ];
      
      sources.forEach(s => {
        addText(`• ${s}`, margin, y, 7, lightGray);
        y += 4;
      });
      
      y += 8;
      
      // Costo de oportunidad
      doc.setFillColor(254, 226, 226);
      doc.roundedRect(margin, y, contentWidth, 25, 2, 2, 'F');
      addText('COSTO DE OPORTUNIDAD', margin + 5, y + 8, 10, [185, 28, 28], 'bold');
      addText(`Cada día sin migrar, tu negocio deja de capturar ${formatMoney(calculations.dailyBenefitLost)}/día`, margin + 5, y + 15, 9, [185, 28, 28]);
      addText(`(${formatMoney(calculations.monthlyBenefitLost)}/mes en beneficios no realizados)`, margin + 5, y + 21, 8, [185, 28, 28]);
      y += 35;
      
      // Footer con contacto
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 270, pageWidth, 27, 'F');
      addText('Sebastián Balbo | Enterprise Account Executive @ VTEX', margin, 280, 9, [255, 255, 255], 'bold');
      addText('linkedin.com/in/sebastian-balbo | calendly.com/sebastian-balbo/hablemos-de-vtex', margin, 286, 8, [148, 163, 184]);
      addText('"El mejor momento para transformar tu negocio fue ayer. El segundo mejor momento es hoy."', margin, 292, 7, [148, 163, 184], 'italic');
      
      // Guardar
      const fileName = `Analisis_ROI_VTEX_${platformNames[currentPlatform].split(' /')[0].replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error exportando PDF:', error);
      alert('Error al generar PDF. Por favor intenta de nuevo.');
    }
    setIsExporting(false);
  };

  // URL de Calendly
  const calendlyUrl = 'https://calendly.com/sebastian-balbo/hablemos-de-vtex';

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
            <img src="/outputs/logo-vtex.png" alt="VTEX" className="h-10 md:h-12 object-contain" />
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
                <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{desc}</div>
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

        {/* CASHFLOW Y BREAK-EVEN */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Cashflow Mensual y Break-Even</h2>
          
          {/* Mini resumen */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-gray-600">Inversión Setup</p>
              <p className="text-xl font-bold text-orange-600">{formatMoney(calculations.inversionSetup)}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">Costo VTEX/mes</p>
              <p className="text-xl font-bold text-blue-600">{formatMoney(calculations.costoOperativoAnual / 12)}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-600">Break-Even</p>
              <p className="text-xl font-bold text-green-600">Mes {calculations.breakevenMonth || 'N/A'}</p>
            </div>
          </div>

          {/* Gráfico de barras simplificado */}
          <div className="relative">
            <div className="flex items-end gap-1 h-48 border-b border-l border-gray-300 pl-1 pb-1">
              {calculations.cashflowData.slice(0, Math.min(24, period * 12 + 6)).map((d, i) => {
                const maxAbs = Math.max(...calculations.cashflowData.map(x => Math.abs(x.cumulative)));
                const height = Math.abs(d.cumulative) / maxAbs * 100;
                const isPositive = d.cumulative >= 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                    <div 
                      className={`w-full rounded-t transition-all ${
                        d.isImplementation ? 'bg-orange-400' : isPositive ? 'bg-green-500' : 'bg-red-400'
                      }`}
                      style={{ height: `${Math.max(height, 2)}%` }}
                    ></div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded whitespace-nowrap z-10">
                      <p>Mes {d.month}</p>
                      <p>Acumulado: {formatMoney(d.cumulative)}</p>
                    </div>
                    {d.month === calculations.breakevenMonth && (
                      <div className="absolute -top-6 text-xs font-bold text-green-600">⭐</div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mes 1</span>
              <span>Mes {Math.min(24, period * 12 + 6)}</span>
            </div>
          </div>

          {/* Leyenda */}
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-400 rounded"></div> Implementación</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded"></div> Cashflow negativo</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded"></div> Cashflow positivo</div>
            <div className="flex items-center gap-1">⭐ Break-even</div>
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
            <p className="text-gray-600 text-sm">Exportá este análisis para compartirlo con tu equipo directivo</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button 
              onClick={exportToPDF}
              disabled={isExporting}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Exportar Análisis (PDF)
                </>
              )}
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
        </div>

        {/* Bio & Inspirational Footer */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 mt-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src="/outputs/sebastian-balbo.png" 
              alt="Sebastián Balbo" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
            />
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
    </div>
  );
};

export default MigrationROICalculator;
