// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const Util = require('util.js');
const Escape = require('lodash/escape');

const BACKGROUND_IMAGE_URL = ['Media/chewbacca/1.jpg','Media/chewbacca/2.jpg','Media/chewbacca/3.jpg','Media/chewbacca/4.jpg','Media/chewbacca/5.jpg','Media/chewbacca/6.jpg'],
  SUBTITLE = "",
  TITLE = 'Uuuuuuuuuuuuuuuuur Aaaahhhhhhhhhhrrrrrrrr Uhrrrrr Aaaaarghhhh';

const chewbaccaArray = [
        "Media/chewbacca/Chewbacca.mp3",
        "Media/chewbacca/Chewbacca1.mp3",
        "Media/chewbacca/Chewbacca2.mp3",
        "Media/chewbacca/Chewbacca3.mp3",
        "Media/chewbacca/Chewbacca4.mp3",
        "Media/chewbacca/Chewbacca5.mp3",
        "Media/chewbacca/Chewbacca6.mp3",
        "Media/chewbacca/Chewbacca7.mp3",
        "Media/chewbacca/Chewbacca8.mp3",
        "Media/chewbacca/Chewbacca9.mp3",
        "Media/chewbacca/Chewbacca10.mp3",
        "Media/chewbacca/Chewbacca11.mp3",
    ];
  
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao, sono Ciubecca! Salutami per sentire i miei versi!';
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
        var chewbacca = chewbaccaArray[Math.floor(Math.random()*chewbaccaArray.length)];
       
        console.log(chewbacca);
        
        let speakOutput = '<audio src="' + Escape(Util.getS3PreSignedUrl(chewbacca)) + '" />';
        
        console.log(speakOutput);

        var backg = BACKGROUND_IMAGE_URL[Math.floor(Math.random()*BACKGROUND_IMAGE_URL.length)];

        if (supportsDisplay(handlerInput)) {

          let backgroundImage = new Alexa.ImageHelper()
            .withDescription(TITLE)
            .addImageInstance(Util.getS3PreSignedUrl(backg))
            .getImage();         
    
          let myTemplate = {
            type: 'BodyTemplate1',
            token: 'Welcome',
            backButton: 'HIDDEN',
            backgroundImage: backgroundImage,
            title: TITLE
          }
          //if (speakOutput !== "Ricorda, al testo che vuoi visualizzare parola mescola anteporre devi!") {
            handlerInput.responseBuilder
                .speak(speakOutput)
                .addRenderTemplateDirective(myTemplate)
                .withSimpleCard(TITLE, SUBTITLE);
          /*} else {
            handlerInput.responseBuilder
                .speak(speakOutput)
                .withSimpleCard(TITLE, SUBTITLE);
          }*/
    
        } else {
          handlerInput.responseBuilder
            .withSimpleCard(TITLE, SUBTITLE)
            .speak(speakOutput);
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
        const speakOutput = 'Ciao, sono Ciubecca! Salutami per sentire i miei versi!';

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
        const speakOutput = `Hai evocato ${intentName}`;

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