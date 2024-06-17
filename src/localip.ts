import * as os from "os"

// Function to get the local IP address
export function getLocalIP() {
  const interfaces = os.networkInterfaces();
  // Iterate over all network interfaces
  for (const iface of Object.values(interfaces)) {
    // Filter out internal and non-IPv4 addresses
    const ifaceIPv4 = iface.find((details) => details.family === 'IPv4' && !details.internal);
    if (ifaceIPv4) {
      return ifaceIPv4.address;
    }
  }
  return '127.0.0.1'; // Default to localhost if no valid IP found
}
