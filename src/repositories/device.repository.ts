/**
 * @file device.repository.ts
 * @description In-memory data store with mock IoT device data.
 *
 * Dependency Inversion Principle (DIP): resolvers depend on this
 * repository abstraction, not on raw data arrays directly. This makes
 * it trivial to swap the in-memory store for a real database later.
 */

import { Device, DeviceFilter, DeviceStatus } from '../types/device.types';

/** Simulated in-memory dataset of IoT devices. */
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Sensor-Alpha-01',
    status: DeviceStatus.ONLINE,
    temperature: 22.5,
    lastUpdated: '2026-05-07T08:00:00Z',
  },
  {
    id: '2',
    name: 'Gateway-Beta-07',
    status: DeviceStatus.WARNING,
    temperature: 38.2,
    lastUpdated: '2026-05-07T08:05:00Z',
  },
  {
    id: '3',
    name: 'Actuator-Gamma-03',
    status: DeviceStatus.OFFLINE,
    temperature: 0.0,
    lastUpdated: '2026-05-06T23:50:00Z',
  },
  {
    id: '4',
    name: 'Camera-Delta-11',
    status: DeviceStatus.ONLINE,
    temperature: 31.7,
    lastUpdated: '2026-05-07T08:09:00Z',
  },
  {
    id: '5',
    name: 'Controller-Epsilon-02',
    status: DeviceStatus.ERROR,
    temperature: 75.4,
    lastUpdated: '2026-05-07T07:45:00Z',
  },
];

/**
 * Returns all devices, optionally filtered by status.
 *
 * @param filter - Optional filter criteria.
 * @returns Array of matching Device objects.
 */
export function findAllDevices(filter?: DeviceFilter): Device[] {
  if (filter?.status) {
    return mockDevices.filter((d) => d.status === filter.status);
  }
  return mockDevices;
}

/**
 * Returns a single device by its ID.
 *
 * @param id - The device unique identifier.
 * @returns The matching Device, or null if not found.
 */
export function findDeviceById(id: string): Device | null {
  return mockDevices.find((d) => d.id === id) ?? null;
}

/**
 * Updates a device's status and/or temperature.
 *
 * @param input - Data to update.
 * @returns The updated Device, or null if not found.
 */
export function updateDevice(input: { id: string; status?: DeviceStatus; temperature?: number }): Device | null {
  const device = mockDevices.find((d) => d.id === input.id);
  if (!device) return null;

  if (input.status) device.status = input.status;
  if (input.temperature !== undefined) device.temperature = input.temperature;
  device.lastUpdated = new Date().toISOString();

  return device;
}
