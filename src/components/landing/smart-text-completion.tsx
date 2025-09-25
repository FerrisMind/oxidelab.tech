"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCompletion } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Sparkle } from "@phosphor-icons/react";
import { useLanguage } from "@/contexts/language-context";

const ThinkingAnimation = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="h-3 w-3 bg-accent rounded-full animate-thinking"></div>
    <div className="h-3 w-3 bg-accent rounded-full animate-thinking [animation-delay:0.2s]"></div>
    <div className="h-3 w-3 bg-accent rounded-full animate-thinking [animation-delay:0.4s]"></div>
  </div>
);

const TypingAnimation = ({
  text,
  onDone,
}: {
  text: string;
  onDone: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (text) {
      setDisplayedText(""); // Reset on new text
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          onDone();
        }
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [text, onDone]);

  return (
    <p className="text-center text-lg">
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
};

export default function SmartTextCompletion() {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const formSchema = z.object({
    incompleteText: z
      .string()
      .min(5, { message: t("smartText.validationError") }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { incompleteText: "" },
  });

  useEffect(() => {
    // Reset form state when language changes if needed
    reset();
  }, [language, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setCompletion("");
    setShowResult(true);

    const result = await getCompletion(data);
    setIsLoading(false);

    if (result.success && result.completedText) {
      setCompletion(result.completedText);
      setIsTyping(true);
      reset();
    } else {
      setShowResult(false);
      toast({
        variant: "destructive",
        title: t("smartText.error.title"),
        description: result.error || t("smartText.error.description"),
      });
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea
            placeholder={t("smartText.placeholder")}
            className="min-h-[100px] text-base"
            {...register("incompleteText")}
          />
          {errors.incompleteText && (
            <p className="text-sm text-destructive">
              {errors.incompleteText.message}
            </p>
          )}
          <Button
            type="submit"
            disabled={isLoading || isTyping}
            className="w-full bg-gradient-accent text-primary-foreground rounded-xl shadow-lg hover:shadow-accent/50 transition-shadow"
          >
            {isLoading ? (
              t("smartText.status.thinking")
            ) : isTyping ? (
              t("smartText.status.creating")
            ) : (
              <>
                {t("smartText.buttonText")}{" "}
                <Sparkle className="ml-2 h-4 w-4" weight="light" />
              </>
            )}
          </Button>
        </form>

        {showResult && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-center font-semibold text-muted-foreground mb-4">
              {t("smartText.resultTitle")}
            </h4>
            <div className="min-h-[80px] p-4 rounded-md bg-secondary flex items-center justify-center">
              {isLoading ? (
                <ThinkingAnimation />
              ) : isTyping && completion ? (
                <TypingAnimation
                  text={completion}
                  onDone={() => setIsTyping(false)}
                />
              ) : (
                <p className="text-center text-lg">{completion}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
