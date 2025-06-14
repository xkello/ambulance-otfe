/* tslint:disable */
/* eslint-disable */
/**
 * Employee List Api
 * Hospital Employee Administration for Web-In-Cloud system
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: xkello@stuba.sk
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Role } from './Role';
import {
    RoleFromJSON,
    RoleFromJSONTyped,
    RoleToJSON,
} from './Role';
import type { PerformanceEntry } from './PerformanceEntry';
import {
    PerformanceEntryFromJSON,
    PerformanceEntryFromJSONTyped,
    PerformanceEntryToJSON,
} from './PerformanceEntry';

/**
 *
 * @export
 * @interface EmployeeListEntry
 */
export interface EmployeeListEntry {
    /**
     * Unique id of the entry in this employee list
     * @type {string}
     * @memberof EmployeeListEntry
     */
    id: string;
    /**
     * Name of employee in employee list
     * @type {string}
     * @memberof EmployeeListEntry
     */
    name?: string;
    /**
     *
     * @type {Role}
     * @memberof EmployeeListEntry
     */
    role?: Role;
    /**
     * Performance rating of employee (0-10)
     * @type {number}
     * @memberof EmployeeListEntry
     */
    performance?: number;
    /**
     * List of performance entries for this employee
     * @type {Array<PerformanceEntry>}
     * @memberof EmployeeListEntry
     */
    performances?: Array<PerformanceEntry>;
}

/**
 * Check if a given object implements the EmployeeListEntry interface.
 */
export function instanceOfEmployeeListEntry(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function EmployeeListEntryFromJSON(json: any): EmployeeListEntry {
    return EmployeeListEntryFromJSONTyped(json, false);
}

export function EmployeeListEntryFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmployeeListEntry {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'id': json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'role': !exists(json, 'role') ? undefined : RoleFromJSON(json['role']),
        'performance': !exists(json, 'performance') ? 0 : json['performance'],
        'performances': !exists(json, 'performances') ? [] : ((json['performances'] as Array<any>).map(PerformanceEntryFromJSON)),
    };
}

export function EmployeeListEntryToJSON(value?: EmployeeListEntry | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'id': value.id,
        'name': value.name,
        'role': RoleToJSON(value.role),
        'performance': value.performance === undefined ? 0 : value.performance,
        'performances': value.performances === undefined ? [] : ((value.performances as Array<any>).map(PerformanceEntryToJSON)),
    };
}

