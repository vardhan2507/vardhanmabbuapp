import { INTENT_NAMES } from "enums";

export interface FulfillmentRequest {
    "responseId": string,
    "session": string,
    "queryResult": {
        "queryText": string,
        "parameters": any,
        "allRequiredParamsPresent": boolean,
        "fulfillmentText": string,
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        string
                    ]
                }
            }
        ],
        "outputContexts": [
            {
                "name": string,
                "lifespanCount": number,
                "parameters": any
            }
        ],
        "intent": {
            "name": string,
            "displayName": INTENT_NAMES
        },
        "intentDetectionConfidence": number,
        "diagnosticInfo": object,
        "languageCode": string
    },
    "originalDetectIntentRequest": any
}