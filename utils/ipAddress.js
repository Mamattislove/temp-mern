import os from "node:os";

export function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (let interfaceName in interfaces) {
        for (let iface of interfaces[interfaceName]) {
            // Skip over non-IPv4 and internal (i.e., 127.0.0.1) addresses
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "localhost"; // Fallback if no network IP found
}
