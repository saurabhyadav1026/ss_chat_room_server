
import { GoogleGenAI } from "@google/genai";             // gemini SDK


import dotenv from "dotenv";
dotenv.config();


export const  genAI=new GoogleGenAI(process.env.GEN_API);

    