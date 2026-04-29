import createAiModel from "../../models/createAiModel.js";
import getResponse from "./methods/getResponse.js";
import instruction from "./instruction.js";
import getRoomName from "./methods/getRoomName.js";


export const textAssistanceModel=createAiModel(instruction)


const TextAssistance={
getResponse,
getRoomName

}

export default TextAssistance;