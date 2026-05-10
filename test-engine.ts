import { autoImportEngine } from "./core/engine/autoImport";

const products = [
  {
    title: "Viral LED Light",
    price: 40,
    cost: 12,
    sales: 2000,
    sellers: 80,
    trendCurrent: 150,
    trendPast: 90,
    likes: 12000,
    shares: 800,
    comments: 400,
  },

  {
    title: "Weak Product",
    price: 20,
    cost: 18,
    sales: 100,
    sellers: 700,
    trendCurrent: 100,
    trendPast: 100,
    likes: 50,
    shares: 2,
    comments: 1,
  },
];

console.log(autoImportEngine(products));

