import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CheckoutServer } from './server.js';

const checkoutServer = new CheckoutServer();
const serverInstance = checkoutServer.createServer();

// Vercel-এর জন্য সঠিক সার্ভার রিকোয়েস্ট হ্যান্ডলার এক্সপোর্ট
export default function (req, res) {
  serverInstance(req, res);
}

// লোকাল টার্মিনালের জন্য
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const finalPort = Number(process.env.CHECKOUT_PORTAL_PORT || 7000);
  serverInstance.listen(finalPort, () => {
    console.log(`[Checkout Portal] Server listening on port ${finalPort}`);
  });
}
