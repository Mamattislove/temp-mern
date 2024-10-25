import os from "node:os"; // Use 'node:' prefix to ensure core module

// Function to get the local IPv4 address
const getLocalIPAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address; // Return local IP address
            }
        }
    }
    return "localhost"; // Fallback to localhost if no IP found
};

export default getLocalIPAddress;
