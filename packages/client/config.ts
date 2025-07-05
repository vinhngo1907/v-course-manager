const { NEXT_PUBLIC_SERVER_URL } = process.env;
console.log({NEXT_PUBLIC_SERVER_URL})
const config = {
  ServerUrl: NEXT_PUBLIC_SERVER_URL
};

export default config;
