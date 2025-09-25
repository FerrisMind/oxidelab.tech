// Client-side completion function for static export
type CompleteTextInput = {
  incompleteText: string;
};

// Simulate a delay to mimic AI processing time
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCompletion(input: CompleteTextInput) {
  try {
    // Simulate the AI "thinking"
    await sleep(1500);

    // Use the input to make the completion more contextual
    const mockCompletion = input.incompleteText.includes("future")
      ? "is to invent it. - Alan Kay"
      : "is the key to success.";

    return { success: true, completedText: mockCompletion };
  } catch (error) {
    console.error("Error in getCompletion:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}
