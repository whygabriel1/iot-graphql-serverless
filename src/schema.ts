/**
 * @file schema.ts
 * @description GraphQL schema definition for the IoT Device Monitoring API.
 *
 * Follows Single Responsibility Principle (SRP): this file is exclusively
 * responsible for defining the GraphQL type system (SDL).
 */

/** GraphQL Schema Definition Language (SDL) */
export const typeDefs = `#graphql
  """
  Possible operational statuses of an IoT device.
  """
  enum DeviceStatus {
    ONLINE
    OFFLINE
    WARNING
    ERROR
  }

  """
  Represents a physical IoT device being monitored.
  """
  type Device {
    "Unique identifier of the device."
    id: ID!
    "Human-readable name or label of the device."
    name: String!
    "Current operational status of the device."
    status: DeviceStatus!
    "Last recorded temperature in Celsius."
    temperature: Float!
    "Timestamp of the last recorded data update (ISO 8601)."
    lastUpdated: String!
  }

  """
  Filter options for querying devices.
  """
  input DeviceFilter {
    "Filter by operational status."
    status: DeviceStatus
  }

  type Query {
    "Returns a list of all monitored IoT devices, optionally filtered."
    devices(filter: DeviceFilter): [Device!]!
    "Returns a single device by its unique ID."
    device(id: ID!): Device
  }

  type Mutation {
    "Updates a device's status or temperature. Returns the updated device."
    updateDevice(id: ID!, status: DeviceStatus, temperature: Float): Device
  }
`;
