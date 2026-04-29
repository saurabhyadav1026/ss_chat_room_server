import createAiModel from "../../models/createAiModel.js";
import instruction from "./instruction.js";
import getResponse from "./methods/getResponse.js";


export const voiceAssistanceModel=createAiModel(instruction);

const VoiceAssistance={

getResponse
}

export default VoiceAssistance;