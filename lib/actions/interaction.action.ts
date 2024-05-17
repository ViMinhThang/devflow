"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mogoose";
import { ViewQuestionParams } from "./shared.types";
import interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, userId } = params;

    //Update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingInteraction) return console.log("User has already viewd");

      //Create interaction
      await interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
