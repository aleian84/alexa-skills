// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const BACKGROUND_IMAGE_URL = 'https://s3.amazonaws.com/cdn.dabblelab.com/img/echo-show-bg-blue.png',
//const BACKGROUND_IMAGE_URL = 'http://i2.wp.com/abbracciodiluce.files.wordpress.com/2011/04/coloriarcobaleno1.png',
  SUBTITLE = "",
  TITLE = 'ANAGRAMMI DIVERTENTI',
  NUMBER_OF_ANAGR = 10;
  
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao, dimmi il testo che vuoi anagrammare preceduto dalla parola mescola!!!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        var speakOutput = 'Ricorda, devi anteporre al testo che vuoi visualizzare la parola mescola!';
        if (handlerInput.requestEnvelope && handlerInput.requestEnvelope.request && handlerInput.requestEnvelope.request.intent && handlerInput.requestEnvelope.request.intent.slots && handlerInput.requestEnvelope.request.intent.slots.testo && handlerInput.requestEnvelope.request.intent.slots.testo.value){
            speakOutput = handlerInput.requestEnvelope.request.intent.slots.testo.value;
            
        }
        
        if (supportsDisplay(handlerInput)) {

          let backgroundImage = new Alexa.ImageHelper()
            .withDescription(TITLE)
            .addImageInstance(BACKGROUND_IMAGE_URL)
            .getImage();
            
          let primaryTextString = "<div align='center'><b><font size='4'>Parola pronunciata: " + speakOutput + "</font></b></div>";
          for (var i=0; i<NUMBER_OF_ANAGR; i++) {
              primaryTextString += "<div align='center'><b><font size='4'>" + (i+1) + ") " + speakOutput.split('').sort(function(){return 0.5-Math.random()}).join('') + "</font></b></div>";
          }
    
          let primaryText = new Alexa.RichTextContentHelper()
            .withPrimaryText(primaryTextString)
            .getTextContent();
    
          let myTemplate = {
            type: 'BodyTemplate1',
            token: 'Welcome',
            backButton: 'HIDDEN',
            backgroundImage: backgroundImage,
            title: TITLE,
            textContent: primaryText,
            /*textContent: {
                         primaryText: {
                                    text:`<span style="color: red;">Phone: 08163/2534</span>`,
                                    type: 'RichText'
                                }
            }*/
          }
          if (speakOutput !== "Ricorda, devi anteporre al testo che vuoi visualizzare la parola mescola!") {
            handlerInput.responseBuilder
                .speak("Ho anagrammato " + speakOutput)
                .addRenderTemplateDirective(myTemplate)
                .withSimpleCard(TITLE, SUBTITLE);
          } else {
            handlerInput.responseBuilder
                .speak(speakOutput)
                .withSimpleCard(TITLE, SUBTITLE);
          }
    
        } else {
          handlerInput.responseBuilder
            .withSimpleCard(TITLE, SUBTITLE)
            .speak("Il tuo device non ha un display. Non sono riuscita a mostrarti " + speakOutput);
        }
    
        return handlerInput.responseBuilder
          .getResponse();

        
        //return handlerInput.responseBuilder
            //.speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            //.getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'La skill che stai utilizzando ti permette di generare gli anagrammi di una parola o una frase. Anteponi al testo che vuoi anagrammare la parola mescola e buon divertimento!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao ciao!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Scusa non ho capito. Puoi ripetere?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();