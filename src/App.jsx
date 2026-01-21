import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Users, ShoppingCart } from 'lucide-react';

// Tabla de Suscripción VTEX Anual según GMV
const vtexSubscriptionTable = [
  { gmv: 200000, subscription: 11000 },
  { gmv: 400000, subscription: 13875 },
  { gmv: 600000, subscription: 21000 },
  { gmv: 800000, subscription: 23250 },
  { gmv: 1000000, subscription: 23250 },
  { gmv: 1200000, subscription: 32625 },
  { gmv: 1400000, subscription: 32625 },
  { gmv: 1600000, subscription: 42000 },
  { gmv: 1800000, subscription: 42000 },
  { gmv: 2000000, subscription: 42000 },
  { gmv: 2250000, subscription: 51375 },
  { gmv: 2500000, subscription: 51375 },
  { gmv: 2750000, subscription: 60750 },
  { gmv: 3000000, subscription: 60400 },
  { gmv: 3250000, subscription: 63100 },
  { gmv: 3500000, subscription: 65800 },
  { gmv: 3750000, subscription: 68500 },
  { gmv: 4000000, subscription: 71200 },
  { gmv: 4250000, subscription: 73900 },
  { gmv: 4500000, subscription: 76600 },
  { gmv: 4750000, subscription: 79300 },
  { gmv: 5000000, subscription: 82000 },
  { gmv: 5250000, subscription: 84700 },
  { gmv: 5500000, subscription: 87400 },
  { gmv: 5750000, subscription: 90100 },
  { gmv: 6000000, subscription: 92800 },
  { gmv: 6250000, subscription: 95500 },
  { gmv: 6500000, subscription: 98200 },
  { gmv: 6750000, subscription: 100900 },
  { gmv: 7000000, subscription: 103600 },
  { gmv: 7250000, subscription: 106300 },
  { gmv: 7500000, subscription: 109000 },
  { gmv: 7750000, subscription: 111700 },
  { gmv: 8000000, subscription: 114400 },
  { gmv: 8250000, subscription: 117100 },
  { gmv: 8500000, subscription: 119800 },
  { gmv: 8750000, subscription: 122500 },
  { gmv: 9000000, subscription: 125200 },
  { gmv: 9250000, subscription: 127900 },
  { gmv: 9500000, subscription: 130600 },
  { gmv: 9750000, subscription: 133300 },
  { gmv: 10000000, subscription: 136000 },
  { gmv: 11000000, subscription: 143300 },
  { gmv: 12000000, subscription: 148800 },
  { gmv: 13000000, subscription: 154300 },
  { gmv: 14000000, subscription: 159800 },
  { gmv: 15000000, subscription: 165300 },
  { gmv: 16000000, subscription: 170800 },
  { gmv: 17000000, subscription: 176300 },
  { gmv: 18000000, subscription: 181800 },
  { gmv: 19000000, subscription: 187300 },
  { gmv: 20000000, subscription: 192800 },
  { gmv: 21000000, subscription: 198300 },
  { gmv: 22000000, subscription: 203800 },
  { gmv: 23000000, subscription: 209300 },
  { gmv: 24000000, subscription: 214800 },
  { gmv: 25000000, subscription: 220300 },
  { gmv: 26000000, subscription: 225800 },
  { gmv: 27000000, subscription: 231300 },
  { gmv: 28000000, subscription: 234400 },
  { gmv: 29000000, subscription: 236900 },
  { gmv: 30000000, subscription: 239400 },
];

// Tabla de Implementación Base según GMV
const implementationBaseTable = [
  { gmv: 200000, cost: 12000 },
  { gmv: 400000, cost: 12000 },
  { gmv: 600000, cost: 12000 },
  { gmv: 800000, cost: 12000 },
  { gmv: 1000000, cost: 12000 },
  { gmv: 1200000, cost: 12000 },
  { gmv: 1400000, cost: 14000 },
  { gmv: 1600000, cost: 14000 },
  { gmv: 1800000, cost: 14000 },
  { gmv: 2000000, cost: 14000 },
  { gmv: 2250000, cost: 14000 },
  { gmv: 2500000, cost: 14000 },
  { gmv: 2750000, cost: 18750 },
  { gmv: 3000000, cost: 18750 },
  { gmv: 3250000, cost: 18750 },
  { gmv: 3500000, cost: 18750 },
  { gmv: 3750000, cost: 18750 },
  { gmv: 4000000, cost: 20000 },
  { gmv: 4250000, cost: 20000 },
  { gmv: 4500000, cost: 20000 },
  { gmv: 4750000, cost: 20000 },
  { gmv: 5000000, cost: 25000 },
  { gmv: 5250000, cost: 25000 },
  { gmv: 5500000, cost: 25000 },
  { gmv: 5750000, cost: 25000 },
  { gmv: 6000000, cost: 30000 },
  { gmv: 6250000, cost: 31250 },
  { gmv: 6500000, cost: 32500 },
  { gmv: 6750000, cost: 33750 },
  { gmv: 7000000, cost: 35000 },
  { gmv: 7250000, cost: 36250 },
  { gmv: 7500000, cost: 37500 },
  { gmv: 7750000, cost: 38750 },
  { gmv: 8000000, cost: 40000 },
  { gmv: 8250000, cost: 41250 },
  { gmv: 8500000, cost: 42500 },
  { gmv: 8750000, cost: 43750 },
  { gmv: 9000000, cost: 45000 },
  { gmv: 9250000, cost: 46250 },
  { gmv: 9500000, cost: 47500 },
  { gmv: 9750000, cost: 48750 },
  { gmv: 10000000, cost: 50000 },
  { gmv: 11000000, cost: 55000 },
  { gmv: 12000000, cost: 60000 },
  { gmv: 13000000, cost: 65000 },
  { gmv: 14000000, cost: 70000 },
  { gmv: 15000000, cost: 75000 },
  { gmv: 16000000, cost: 80000 },
  { gmv: 17000000, cost: 85000 },
  { gmv: 18000000, cost: 90000 },
  { gmv: 19000000, cost: 95000 },
  { gmv: 20000000, cost: 100000 },
  { gmv: 21000000, cost: 105000 },
  { gmv: 22000000, cost: 110000 },
  { gmv: 23000000, cost: 115000 },
  { gmv: 24000000, cost: 120000 },
  { gmv: 25000000, cost: 125000 },
  { gmv: 26000000, cost: 130000 },
  { gmv: 27000000, cost: 135000 },
  { gmv: 28000000, cost: 140000 },
  { gmv: 29000000, cost: 145000 },
  { gmv: 30000000, cost: 150000 },
];

const getImplementationBase = (gmvUSD) => {
  if (gmvUSD <= implementationBaseTable[0].gmv) {
    return implementationBaseTable[0].cost;
  }
  const lastTwo = implementationBaseTable.slice(-2);
  if (gmvUSD >= lastTwo[1].gmv) {
    const rate = (lastTwo[1].cost - lastTwo[0].cost) / (lastTwo[1].gmv - lastTwo[0].gmv);
    return lastTwo[1].cost + (gmvUSD - lastTwo[1].gmv) * rate;
  }
  for (let i = 0; i < implementationBaseTable.length - 1; i++) {
    const lower = implementationBaseTable[i];
    const upper = implementationBaseTable[i + 1];
    if (gmvUSD >= lower.gmv && gmvUSD < upper.gmv) {
      const ratio = (gmvUSD - lower.gmv) / (upper.gmv - lower.gmv);
      return lower.cost + ratio * (upper.cost - lower.cost);
    }
  }
  return implementationBaseTable[implementationBaseTable.length - 1].cost;
};

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

const featureImplementationCosts = {
  nativeMarketplace: 5000,
  intelligentSearch: 0,
  smartCheckout: 0,
  oms: 0,
  stock360: 5000,
  advancedPromos: 0,
  subscriptions: 4000,
  vtexInStore: 5000,
  liveShopping: 2500,
  aiRecommendations: 3000,
  pricingManagement: 2000,
  multiCurrency: 5000,
};

const industryBaseUplift = {
  fashion: 0.22,
  beauty: 0.24,
  pharmacy: 0.19,
  grocery: 0.18,
  sports: 0.20,
  electronics: 0.21,
  home: 0.19,
  toys: 0.22,
  department: 0.20,
  marketplace: 0.23,
};

const featureUpliftBonus = {
  nativeMarketplace: 0.020,
  intelligentSearch: 0.015,
  smartCheckout: 0.015,
  oms: 0.010,
  stock360: 0.015,
  advancedPromos: 0.010,
  subscriptions: 0.020,
  vtexInStore: 0.015,
  liveShopping: 0.010,
  aiRecommendations: 0.015,
  pricingManagement: 0.010,
  multiCurrency: 0.005,
};

const getStoreUpliftBonus = (storeCount) => {
  if (storeCount === 0) return 0;
  if (storeCount <= 5) return 0.02;
  if (storeCount <= 15) return 0.04;
  if (storeCount <= 30) return 0.055;
  if (storeCount <= 50) return 0.07;
  return 0.08;
};

const maturityUpliftDiscount = {
  none: 0,
  basic: 0.03,
  pilot: 0.06,
  stock360: 0.09,
  operational: 0.12,
  advanced: 0.15,
};

const getVtexSubscription = (gmvUSD) => {
  if (gmvUSD <= vtexSubscriptionTable[0].gmv) {
    return vtexSubscriptionTable[0].subscription;
  }
  const lastTwo = vtexSubscriptionTable.slice(-2);
  if (gmvUSD >= lastTwo[1].gmv) {
    const rate = (lastTwo[1].subscription - lastTwo[0].subscription) / (lastTwo[1].gmv - lastTwo[0].gmv);
    return lastTwo[1].subscription + (gmvUSD - lastTwo[1].gmv) * rate;
  }
  for (let i = 0; i < vtexSubscriptionTable.length - 1; i++) {
    const lower = vtexSubscriptionTable[i];
    const upper = vtexSubscriptionTable[i + 1];
    if (gmvUSD >= lower.gmv && gmvUSD < upper.gmv) {
      const ratio = (gmvUSD - lower.gmv) / (upper.gmv - lower.gmv);
      return lower.subscription + ratio * (upper.subscription - lower.subscription);
    }
  }
  return vtexSubscriptionTable[vtexSubscriptionTable.length - 1].subscription;
};

const getStoreCoverageFactor = (physicalStores) => {
  if (physicalStores === 0) return 0;
  if (physicalStores <= 5) return 0.20;
  if (physicalStores <= 15) return 0.40;
  if (physicalStores <= 30) return 0.60;
  if (physicalStores <= 60) return 0.80;
  return 1.00;
};

const featureLabels = {
  nativeMarketplace: 'Marketplace nativo',
  intelligentSearch: 'Search IA',
  smartCheckout: 'SmartCheckout + pagos locales',
  oms: 'OMS distribuido',
  stock360: 'Stock 360° / Omnicanal',
  advancedPromos: 'Promos avanzadas',
  subscriptions: 'Subscripciones',
  vtexInStore: 'VTEX inStore / POS',
  liveShopping: 'Live shopping & conversacional',
  aiRecommendations: 'Recomendaciones IA',
  pricingManagement: 'Pricing avanzado',
  multiCurrency: 'Multi-moneda & multi-idioma',
};

const MigrationROICalculator = () => {
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
    nativeMarketplace: true,
    intelligentSearch: true,
    smartCheckout: true,
    oms: true,
    stock360: true,
    advancedPromos: true,
    subscriptions: false,
    vtexInStore: false,
    liveShopping: false,
    aiRecommendations: true,
    pricingManagement: true,
    multiCurrency: false,
  });

  const handleAgencyHoursChange = (value) => {
    const numValue = parseInt(value) || 0;
    const roundedValue = Math.round(numValue / 10) * 10;
    setAgencyHours(Math.max(0, Math.min(500, roundedValue)));
  };

  const handleAgencyRateChange = (value) => {
    const numValue = parseInt(value) || 0;
    const roundedValue = Math.round(numValue / 10) * 10;
    setAgencyRate(Math.max(10, Math.min(500, roundedValue)));
  };
  
  const handleGmvChange = (value) => {
    const numValue = parseFloat(String(value)) || 0;
    const roundedValue = Math.round(numValue * 10) / 10;
    setGmv(Math.max(0.1, Math.min(200, roundedValue)));
  };

  const handleGmvIncrement = () => {
    let step = gmv < 1 ? 0.2 : gmv < 10 ? 0.5 : 1;
    handleGmvChange(Math.round((gmv + step) * 10) / 10);
  };

  const handleGmvDecrement = () => {
    let step = gmv <= 1 ? 0.2 : gmv <= 10 ? 0.5 : 1;
    handleGmvChange(Math.round((gmv - step) * 10) / 10);
  };

  const calculations = useMemo(() => {
    const gmvUSD = gmv * 1000000;
    const averageOrderValue = 150;
    const annualOrders = gmvUSD / averageOrderValue;
    const marginMultiplier = profitMargin / 100;
    
    // UPLIFT
    const baseUplift = industryBaseUplift[industry];
    let featuresUpliftBonus = 0;
    Object.keys(selectedFeatures).forEach((feature) => {
      if (selectedFeatures[feature]) featuresUpliftBonus += featureUpliftBonus[feature] || 0;
    });
    const storesUpliftBonus = getStoreUpliftBonus(physicalStores);
    const maturityDiscount = maturityUpliftDiscount[omnichannelMaturity];
    
    const upliftYear1Percent = Math.max(0.25, Math.min(0.45, baseUplift + featuresUpliftBonus + storesUpliftBonus - maturityDiscount));
    const upliftYear2Percent = upliftYear1Percent * 0.72;
    const upliftYear3Percent = upliftYear2Percent * 0.965;
    
    const revenueUpliftYear1 = gmvUSD * upliftYear1Percent;
    const revenueUpliftYear2 = gmvUSD * upliftYear2Percent;
    const revenueUpliftYear3 = gmvUSD * upliftYear3Percent;
    
    // OMNI
    const maturityDiscounts = { none: 1.0, basic: 0.85, pilot: 0.70, stock360: 0.55, operational: 0.40, advanced: 0.25 };
    const maturityFactor = maturityDiscounts[omnichannelMaturity];
    const storeCoverageFactor = getStoreCoverageFactor(physicalStores);
    const hasPhysicalStores = physicalStores > 0;

    let omniTotal = 0;
    if (hasPhysicalStores) {
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
      const endlessAisle = gmvUSD * 0.40 * 0.12 * 0.75 * maturityFactor +
                          gmvUSD * 0.40 * 0.49 * maturityFactor;
      const workingCapital = gmvUSD * 0.60 * 22 / 365 * 0.10 * maturityFactor * storeCoverageFactor;
      omniTotal = (stock360Impact + shipFromStore + bopis + endlessAisle + workingCapital) * 0.50;
    }
    
    // FEATURES GAP
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
    Object.keys(selectedFeatures).forEach((feature) => {
      if (selectedFeatures[feature]) {
        featureGapSavings += featureCosts[currentPlatform][feature] || 0;
      }
    });
    
    // TEAM
    const currentTeamCostAnnual = (internalTeam * 80000) + (agencyHours * agencyRate * 12);
    const teamReductionRates = { small: 0.30, medium: 0.40, large: 0.45, enterprise: 0.50 };
    const size = gmv < 5 ? 'small' : gmv < 20 ? 'medium' : gmv < 50 ? 'large' : 'enterprise';
    const teamReduction = teamReductionRates[size];
    const vtexInternalTeam = Math.ceil(internalTeam * (1 - teamReduction));
    const vtexAgencyHours = Math.ceil(agencyHours * 0.35);
    const vtexTeamCostAnnual = (vtexInternalTeam * 80000) + (vtexAgencyHours * agencyRate * 12);
    const teamSavingsAnnual = currentTeamCostAnnual - vtexTeamCostAnnual;
    
    // MIGRATION
    const migrationMonthsBySize = { small: 3, medium: 5, large: 7, enterprise: 9 };
    const migrationMonths = migrationMonthsBySize[size];
    const vtexAnnualSubscription = getVtexSubscription(gmvUSD);
    const implementationBase = getImplementationBase(gmvUSD);
    const costPerStore = getStoreCost(physicalStores);
    const storeIntegrationCost = physicalStores * costPerStore;
    let featureImplementationCost = 0;
    Object.keys(selectedFeatures).forEach((feature) => {
      if (selectedFeatures[feature]) featureImplementationCost += featureImplementationCosts[feature] || 0;
    });
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
    const currentPlatformTechOnly = Object.values(currentCosts).reduce((a, b) => a + b, 0);
    const vtexAnnualTechOnly = vtexAnnualSubscription + 8000;
    const tcoSavings = (currentPlatformTechOnly - vtexAnnualTechOnly) * period;
    const tcoSavingsPercent = currentPlatformTechOnly > 0 ? ((tcoSavings / (currentPlatformTechOnly * period)) * 100).toFixed(1) : 0;
    
    // ROI
    let totalRevenueUplift = revenueUpliftYear1;
    if (period >= 2) totalRevenueUplift += revenueUpliftYear2;
    if (period >= 3) totalRevenueUplift += revenueUpliftYear3;
    
    const totalProfitFromUplift = totalRevenueUplift * marginMultiplier;
    const totalSavingsValue = (teamSavingsAnnual * period) + tcoSavings + featureGapSavings;
    const totalBenefits = totalProfitFromUplift + totalSavingsValue;
    
    const monthlyUpliftProfit = (revenueUpliftYear1 * marginMultiplier) / 12;
    const monthlySavings = (teamSavingsAnnual + (currentPlatformTechOnly - vtexAnnualTechOnly) + (featureGapSavings / 36)) / 12;
    const monthlyBenefit = monthlyUpliftProfit + monthlySavings;
    
    const totalInvestment = migrationTotal + (vtexAnnualSubscription * period);
    const beneficioIncremental = totalBenefits - totalInvestment;
    
    const roi = totalInvestment > 0 ? ((beneficioIncremental / totalInvestment) * 100).toFixed(0) : 0;
    const roiMultiplier = totalInvestment > 0 ? (beneficioIncremental / totalInvestment).toFixed(2) : 0;
    const paybackMonths = monthlyBenefit > 0 ? (totalInvestment / monthlyBenefit).toFixed(1) : 0;
    
    return {
      gmvUSD, size,
      upliftYear1Percent, upliftYear2Percent, upliftYear3Percent,
      revenueUpliftYear1, revenueUpliftYear2, revenueUpliftYear3,
      baseUplift, featuresUpliftBonus, storesUpliftBonus, maturityDiscount,
      omniTotal, featureGapSavings,
      currentTeamCost: currentTeamCostAnnual, teamSavings: teamSavingsAnnual,
      internalTeamBefore: internalTeam, internalTeamAfter: vtexInternalTeam,
      agencyHoursBefore: agencyHours, agencyHoursAfter: vtexAgencyHours,
      tcoSavings, tcoSavingsPercent,
      migrationMonths, vtexAnnualSubscription, migrationTotal,
      implementationBase, storeIntegrationCost, featureImplementationCost, costPerStore,
      totalRevenueUplift, totalProfitFromUplift,
      monthlyBenefit, totalBenefits, totalInvestment, beneficioIncremental,
      roi, roiMultiplier, paybackMonths
    };
  }, [currentPlatform, gmv, industry, period, profitMargin, internalTeam, agencyHours, 
      agencyRate, physicalStores, omnichannelMaturity, selectedFeatures]);

  const formatMoney = (value) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const toggleFeature = (feature) => setSelectedFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  const selectedFeatureCount = Object.values(selectedFeatures).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Calculadora de Migración a VTEX</h1>
          <p className="text-gray-600">Análisis completo de ROI, TCO y P&L de migración</p>
        </div>

        {/* Input Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Panel 1: Empresa */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos de tu Empresa</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plataforma Actual</label>
                <select value={currentPlatform} onChange={(e) => setCurrentPlatform(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="magento">Magento / Adobe Commerce</option>
                  <option value="shopify">Shopify / Shopify Plus</option>
                  <option value="salesforce">Salesforce Commerce Cloud</option>
                  <option value="woocommerce">WooCommerce</option>
                  <option value="prestashop">PrestaShop</option>
                  <option value="e3">E3 ecommerce</option>
                  <option value="otros">Otros / Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GMV Anual (Millones USD)</label>
                <div className="flex items-center gap-2">
                  <button onClick={handleGmvDecrement} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={gmv} onChange={(e) => handleGmvChange(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" min="0.1" max="200" step="0.1" />
                  <button onClick={handleGmvIncrement} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-blue-800 mb-2">Margen Operativo / Neto (%)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="1" max="60" value={profitMargin} onChange={(e) => setProfitMargin(parseInt(e.target.value))} className="flex-1" />
                  <span className="font-bold text-blue-700 w-12 text-right">{profitMargin}%</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">Se usa para calcular el beneficio real sobre el Uplift de ventas.</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Período de Análisis (años)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPeriod(Math.max(1, period - 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={period} onChange={(e) => setPeriod(Math.max(1, Math.min(3, Number(e.target.value) || 1)))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" min="1" max="3" />
                  <button onClick={() => setPeriod(Math.min(3, period + 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Equipo */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipo Técnico</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipo Interno (FTE)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setInternalTeam(Math.max(0, internalTeam - 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={internalTeam} onChange={(e) => setInternalTeam(Math.max(0, Math.min(50, Number(e.target.value) || 0)))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" />
                  <button onClick={() => setInternalTeam(Math.min(50, internalTeam + 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Costo: $80k/año por persona</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agencia (Horas/Mes)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAgencyHours(Math.max(0, agencyHours - 10))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={agencyHours} onChange={(e) => handleAgencyHoursChange(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" step="10" />
                  <button onClick={() => setAgencyHours(Math.min(500, agencyHours + 10))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rate Agencia (USD/h)</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAgencyRate(Math.max(10, agencyRate - 10))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={agencyRate} onChange={(e) => handleAgencyRateChange(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" step="10" />
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Omnicanalidad</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiendas Físicas</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPhysicalStores(Math.max(0, physicalStores - 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">−</button>
                  <input type="number" value={physicalStores} onChange={(e) => setPhysicalStores(Math.max(0, Math.min(500, Number(e.target.value) || 0)))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center" />
                  <button onClick={() => setPhysicalStores(Math.min(500, physicalStores + 1))} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">+</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Madurez Actual</label>
                <select value={omnichannelMaturity} onChange={(e) => setOmnichannelMaturity(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="none">Sin omnicanalidad</option>
                  <option value="basic">Integración básica</option>
                  <option value="pilot">Piloto (2-5 tiendas)</option>
                  <option value="stock360">Stock 360°</option>
                  <option value="operational">Operativo (>70%)</option>
                  <option value="advanced">Avanzado (Unified)</option>
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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Features VTEX ({selectedFeatureCount}/12)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(featureLabels).map(([key, label]) => (
              <button key={key} onClick={() => toggleFeature(key)} className={`p-3 rounded-lg border-2 transition-all text-left ${selectedFeatures[key] ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-700'}`}>
                <div className="text-sm font-semibold">{label}</div>
                <div className="text-xs mt-1">{selectedFeatures[key] ? '✓ Activo' : 'Click para activar'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-4 md:p-6 text-white">
            <div className="flex justify-between mb-2"><DollarSign className="w-6 h-6 md:w-8 md:h-8" /><span className="text-xl md:text-2xl font-bold">{calculations.tcoSavingsPercent}%</span></div>
            <h3 className="text-sm md:text-lg font-semibold">Ahorro TCO</h3>
            <p className="text-xl md:text-3xl font-bold mt-2">{formatMoney(calculations.tcoSavings)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-4 md:p-6 text-white">
            <div className="flex justify-between mb-2"><TrendingUp className="w-6 h-6 md:w-8 md:h-8" /><span className="text-xl md:text-2xl font-bold">{calculations.roi}%</span></div>
            <h3 className="text-sm md:text-lg font-semibold">ROI {period}a</h3>
            <p className="text-lg md:text-xl font-bold mt-2">{calculations.paybackMonths}m payback</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-4 md:p-6 text-white">
            <div className="flex justify-between mb-2"><ShoppingCart className="w-6 h-6 md:w-8 md:h-8" /><span className="text-xl md:text-2xl font-bold">+{Math.round(calculations.upliftYear1Percent*100)}%</span></div>
            <h3 className="text-sm md:text-lg font-semibold">Uplift Año 1</h3>
            <p className="text-xl md:text-3xl font-bold mt-2">{formatMoney(calculations.revenueUpliftYear1)}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-4 md:p-6 text-white">
            <div className="flex justify-between mb-2"><Users className="w-6 h-6 md:w-8 md:h-8" /><span className="text-xl md:text-2xl font-bold">-{calculations.internalTeamBefore - calculations.internalTeamAfter}</span></div>
            <h3 className="text-sm md:text-lg font-semibold">Opt. Equipo</h3>
            <p className="text-lg md:text-xl font-bold mt-2">{formatMoney(calculations.teamSavings)}/año</p>
          </div>
        </div>

        {/* Revenue Uplift Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Impacto de Revenue - Desglose</h2>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Cálculo del Uplift Año 1</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="text-gray-500 mb-1">Base Industria</p>
                <p className="text-xl font-bold text-blue-600">+{(calculations.baseUplift * 100).toFixed(0)}%</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="text-gray-500 mb-1">+ Features</p>
                <p className="text-xl font-bold text-green-600">+{(calculations.featuresUpliftBonus * 100).toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="text-gray-500 mb-1">+ Tiendas</p>
                <p className="text-xl font-bold text-purple-600">+{(calculations.storesUpliftBonus * 100).toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <p className="text-gray-500 mb-1">- Madurez</p>
                <p className="text-xl font-bold text-red-500">-{(calculations.maturityDiscount * 100).toFixed(0)}%</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border-2 ${period >= 1 ? 'bg-blue-50 border-blue-300' : 'bg-gray-100 border-gray-200'}`}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Año 1</h3>
              <p className="text-2xl font-bold text-blue-600">{formatMoney(calculations.revenueUpliftYear1)}</p>
              <p className="text-lg font-semibold text-blue-500">+{(calculations.upliftYear1Percent * 100).toFixed(1)}%</p>
              <div className="mt-2 pt-2 border-t text-xs text-gray-600">
                <span className="font-bold">Margen ({profitMargin}%):</span> {formatMoney(calculations.revenueUpliftYear1 * (profitMargin/100))}
              </div>
            </div>
            <div className={`p-4 rounded-lg border-2 ${period >= 2 ? 'bg-green-50 border-green-300' : 'bg-gray-100 border-gray-200'}`}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Año 2</h3>
              <p className={`text-2xl font-bold ${period >= 2 ? 'text-green-600' : 'text-gray-400'}`}>{formatMoney(calculations.revenueUpliftYear2)}</p>
              <p className={`text-lg font-semibold ${period >= 2 ? 'text-green-500' : 'text-gray-400'}`}>+{(calculations.upliftYear2Percent * 100).toFixed(1)}%</p>
              <div className="mt-2 pt-2 border-t text-xs text-gray-600">
                <span className="font-bold">Margen ({profitMargin}%):</span> {formatMoney(calculations.revenueUpliftYear2 * (profitMargin/100))}
              </div>
            </div>
            <div className={`p-4 rounded-lg border-2 ${period >= 3 ? 'bg-purple-50 border-purple-300' : 'bg-gray-100 border-gray-200'}`}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Año 3</h3>
              <p className={`text-2xl font-bold ${period >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>{formatMoney(calculations.revenueUpliftYear3)}</p>
              <p className={`text-lg font-semibold ${period >= 3 ? 'text-purple-500' : 'text-gray-400'}`}>+{(calculations.upliftYear3Percent * 100).toFixed(1)}%</p>
              <div className="mt-2 pt-2 border-t text-xs text-gray-600">
                <span className="font-bold">Margen ({profitMargin}%):</span> {formatMoney(calculations.revenueUpliftYear3 * (profitMargin/100))}
              </div>
            </div>
          </div>
        </div>

        {/* Team & Migration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Optimización Equipo</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b"><span>Equipo Actual:</span><span className="font-bold">{calculations.internalTeamBefore} FTE</span></div>
              <div className="flex justify-between py-2 border-b"><span>Con VTEX:</span><span className="font-bold text-green-600">{calculations.internalTeamAfter} FTE</span></div>
              <div className="flex justify-between py-2 border-b"><span>Agencia Actual:</span><span className="font-bold">{calculations.agencyHoursBefore} hrs/mes</span></div>
              <div className="flex justify-between py-2"><span>Agencia VTEX:</span><span className="font-bold text-green-600">{calculations.agencyHoursAfter} hrs/mes</span></div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex justify-between"><span className="font-semibold">Ahorro Anual:</span><span className="font-bold text-green-600">{formatMoney(calculations.teamSavings)}</span></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Inversión Migración</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b"><span>Impl. Base (GMV):</span><span className="font-bold">{formatMoney(calculations.implementationBase)}</span></div>
              <div className="flex justify-between py-2 border-b"><span>+ Tiendas ({physicalStores}):</span><span className="font-bold">{formatMoney(calculations.storeIntegrationCost)}</span></div>
              <div className="flex justify-between py-2 border-b"><span>+ Features:</span><span className="font-bold">{formatMoney(calculations.featureImplementationCost)}</span></div>
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <div className="flex justify-between"><span className="font-semibold">Total Setup:</span><span className="font-bold text-orange-600">{formatMoney(calculations.migrationTotal)}</span></div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between"><span className="font-semibold">Suscripción VTEX/año:</span><span className="font-bold text-blue-600">{formatMoney(calculations.vtexAnnualSubscription)}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-lg shadow-xl p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Resumen Ejecutivo - {period} {period === 1 ? 'Año' : 'Años'}</h2>
          
          {/* Desglose Beneficios */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Desglose de Beneficios ({period} {period === 1 ? 'año' : 'años'})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-white/20 rounded-lg p-3 text-center border border-yellow-400/50">
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
          </div>

          {/* Beneficio Total */}
          <div className="mb-6 p-4 bg-white/10 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Beneficio Total</h3>
              <p className="text-3xl font-bold">{formatMoney(calculations.totalBenefits)}</p>
            </div>
          </div>

          {/* Desglose Inversión */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Desglose de Inversión ({period} {period === 1 ? 'año' : 'años'})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex justify-between"><span className="opacity-90">Inversión Migración</span><span className="font-bold">{formatMoney(calculations.migrationTotal)}</span></div>
                <div className="text-xs opacity-70 mt-1">Setup inicial único</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex justify-between"><span className="opacity-90">Suscripción VTEX ({period}a)</span><span className="font-bold">{formatMoney(calculations.vtexAnnualSubscription * period)}</span></div>
                <div className="text-xs opacity-70 mt-1">{formatMoney(calculations.vtexAnnualSubscription)}/año × {period}</div>
              </div>
            </div>
            <div className="mt-3 p-4 bg-white/30 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Inversión Total</h3>
                <p className="text-3xl font-bold">{formatMoney(calculations.totalInvestment)}</p>
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="text-center pt-6 border-t border-white/20">
            <p className="text-lg mb-2">Return on Investment (ROI) | Ingresos incrementados</p>
            <p className="text-5xl md:text-6xl font-bold">{calculations.roi}%</p>
            <p className="text-lg mt-4 opacity-90">
              Por cada $1 invertido en la migración a VTEX, obtienes <span className="font-bold text-yellow-300">${calculations.roiMultiplier}</span> de beneficio extra
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
            Agendar Demo Ejecutiva
          </button>
        </div>
      </div>
    </div>
  );
};

export default MigrationROICalculator;