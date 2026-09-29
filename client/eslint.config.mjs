import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const toArray = (v) => (Array.isArray(v) ? v : [v]);

const eslintConfig = [
  ...toArray(nextVitals),
  ...toArray(nextTs),
  { ignores: [".next/", "out/", "node_modules/"] },
];

export default eslintConfig;
