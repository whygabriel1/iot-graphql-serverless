/**
 * @file device.types.ts
 * @description Shared TypeScript domain types for IoT devices.
 *
 * Separating domain types into their own module follows the
 * Interface Segregation Principle (ISP) and makes types reusable
 * across resolvers, services, and data layers.
 */

export enum DeviceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

/** Core domain entity representing an IoT device. */
export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  /** Temperature in Celsius */
  temperature: number;
  /** ISO 8601 timestamp */
  lastUpdated: string;
}

/** Filter options passed by the client via GraphQL query arguments. */
export interface DeviceFilter {
  status?: DeviceStatus;
}

/** Input for updating a device status/temperature. */
export interface UpdateDeviceInput {
  id: string;
  status?: DeviceStatus;
  temperature?: number;
}
