export const textResponse = (text) => {
    return {
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        text
                    ]
                }
            }
        ]
    }
}

export const cardResponse = (title, subtitle, imageUri, buttons) => {
    return {
        "fulfillmentMessages": [
            {
                "card": {
                    "title": title,
                    "subtitle": subtitle,
                    "imageUri": imageUri,
                    "buttons": buttons
                }
            }
        ]
    }
}

export const googleAssistantResponse = (expectUserResponse, text) => {
    return {
        "payload": {
            "google": {
                "expectUserResponse": expectUserResponse,
                "richResponse": {
                    "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": text
                            }
                        }
                    ]
                }
            }
        }
    }
}

export const contextResponse = (text, outputContextName, parameters) => {
    return {
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        text
                    ]
                }
            }
        ],
        "outputContexts": [
            {
                "name": outputContextName,
                "lifespanCount": 5,
                "parameters": parameters
            }
        ]
    }
}

