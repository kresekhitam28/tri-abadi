export const pricingConfig = {
  asphalt: {
    packages: {
      A: { ratePerM2: 75000, warrantyMonths: [3, 6] },
      B: { ratePerM2: 95000, warrantyMonths: [3, 6] },
      C: { ratePerM2: 100000, warrantyMonths: [6, 12] },
      D: { ratePerM2: 150000, warrantyMaxMonths: 24, minimumStructuralThicknessCm: 5 },
    },
    simulations: {
      overlay: { areaM2: 500, ratePerM2: 85000, compactedThicknessCm: 3 },
      newRoad: { areaM2: 1000, ratePerM2: 165000, baseCourseCm: 15, acBcCm: 3, acWcCm: 2 },
    },
  },
  readyMix: {
    standard: { minimumOrderM3: [5, 7], recommendedAccessWidthOverM: 4 },
    minimix: { minimumOrderM3: 3 },
  },
  materials: {
    minimumTrips: 1,
    standardCapacityM3: [6, 8],
    trontonCapacityM3: [20, 24],
  },
};
