const key = process.env.REACT_APP_INTRINIO_API_KEY;

export const searchBar = async ticker => {
  const res = await fetch(
    `https://api-v2.intrinio.com/companies/search?query=${ticker}?api_key=${key}`
  );
  console.log(res);
};
