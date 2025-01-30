import os from 'os'

export function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let localIP = '';

  for (const interfaceName in interfaces) {
    for (const interfaceInfo of interfaces[interfaceName]) {
      // Skip internal interfaces
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        localIP = interfaceInfo.address;
        break;
      }
    }
    if (localIP) break;  // If we found the local IP, no need to check further
  }

  return localIP;
}
