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
/**
 *
 * @export
 * @interface TransferEmployeeListEntryRequest
 */
export interface TransferEmployeeListEntryRequest {
    /**
     * The hospital to move this entry into
     * @type {string}
     * @memberof TransferEmployeeListEntryRequest
     */
    targetHospitalId: string;
}

/**
 * Check if a given object implements the TransferEmployeeListEntryRequest interface.
 */
export function instanceOfTransferEmployeeListEntryRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "targetHospitalId" in value;

    return isInstance;
}

export function TransferEmployeeListEntryRequestFromJSON(json: any): TransferEmployeeListEntryRequest {
    return TransferEmployeeListEntryRequestFromJSONTyped(json, false);
}

export function TransferEmployeeListEntryRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransferEmployeeListEntryRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'targetHospitalId': json['targetHospitalId'],
    };
}

export function TransferEmployeeListEntryRequestToJSON(value?: TransferEmployeeListEntryRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'targetHospitalId': value.targetHospitalId,
    };
}

