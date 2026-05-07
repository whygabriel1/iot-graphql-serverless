/**
 * @file resolvers.ts
 * @description GraphQL resolvers for the IoT Device Monitoring API.
 *
 * Open/Closed Principle (OCP): resolvers delegate all data logic to the
 * repository layer, so new queries or mutations can be added without
 * modifying existing resolver logic.
 *
 * Single Responsibility Principle (SRP): each resolver function handles
 * exactly one query field — nothing more.
 */

import { findAllDevices, findDeviceById, updateDevice } from './repositories/device.repository';
import { DeviceFilter, UpdateDeviceInput } from './types/device.types';

/** Shape of the arguments for the `devices` query. */
interface DevicesArgs {
  filter?: DeviceFilter;
}

/** Shape of the arguments for the `device` query. */
interface DeviceArgs {
  id: string;
}

export const resolvers = {
  Query: {
    /**
     * Resolver for `devices` — returns all IoT devices, optionally filtered.
     *
     * @example
     * query {
     *   devices(filter: { status: ONLINE }) {
     *     id name temperature
     *   }
     * }
     */
    devices: (_parent: unknown, args: DevicesArgs) => {
      return findAllDevices(args.filter);
    },

    /**
     * Resolver for `device` — returns a single device by ID.
     *
     * @example
     * query {
     *   device(id: "1") {
     *     id name status temperature lastUpdated
     *   }
     * }
     */
    device: (_parent: unknown, args: DeviceArgs) => {
      return findDeviceById(args.id);
    },
  },

  Mutation: {
    /**
     * Resolver for `updateDevice` — modifies an IoT device.
     */
    updateDevice: (_parent: unknown, args: UpdateDeviceInput) => {
      return updateDevice(args);
    },
  },
};
