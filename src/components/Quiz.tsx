import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RefreshCcw, ExternalLink } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  learnMoreLink?: string;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

interface ShuffledQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  learnMoreLink?: string;
}

const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");

const quizData: Question[] = [
  {
    question: "When was the international space station designed ?",
    options: [
      "between 1984 and 1993",
      "Between 2000 and 2010",
      "between 1956 and 1970",
      "between 1650 and 1760",
    ],
    correctAnswer: 0,
    explanation: "The design phase of the ISS started in 1984 until 1993.",
    learnMoreLink:
      "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/International_Space_Station/Building_the_International_Space_Station2",
  },
  {
    question: "When was the International Space Station launched into orbit?",
    options: ["1680", "1998", "1990", "1995"],
    correctAnswer: 1,
    explanation:
      "the first module of the ISS, called Zarya, was launched by Russia in November 1998. This marked the official start of ISS construction in orbit.",
    learnMoreLink:
      "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/International_Space_Station/Building_the_International_Space_Station2",
  },
  {
    question:
      "Which of the following agencies is NOT one of the five main ISS partners?",
    options: ["NASA", "Roscosmos (Russian)", "ISRO (Indian)", "JAXA (Jaban)"],
    correctAnswer: 2,
    explanation:
      "the ISS is a global collaboration between major space agencies — NASA (USA), Roscosmos (Russia), ESA (Europe), JAXA (Japan), and CSA (Canada).",
    learnMoreLink:
      "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/International_Space_Station/Building_the_International_Space_Station2",
  },
  {
    question: "What is the main purpose of the International Space Station?",
    options: [
      "Space tourism",
      "Military experiments",
      "Scientific research in microgravity",
      "Planet exploration",
    ],
    correctAnswer: 2,
    explanation:
      "The ISS functions as a science lab for experiments in microgravity to benefit life on Earth and space.",
    learnMoreLink: "https://www.pbs.org/spacestation/station/purpose.htm",
  },
  {
    question: "How often does the ISS orbit Earth?",
    options: [
      "Once a day",
      "Every 12 hours",
      "Every 90 minutes ",
      "Every 3 hours",
    ],
    correctAnswer: 2,
    explanation:
      " The ISS travels around Earth about every 90 minutes, completing 16 orbits daily.",
    learnMoreLink:
      "https://www.space.com/how-to-track-the-international-space-station",
  },
  {
    question: "How many astronauts usually live on the ISS?",
    options: ["3", "5", "6–7", "10"],
    correctAnswer: 2,
    explanation:
      "The ISS is designed to host a crew of six or seven astronauts from different countries.",
    learnMoreLink:
      "https://www.nasa.gov/international-space-station/space-station-facts-and-figures/",
  },
  {
    question: "What provides power to the International Space Station?",
    options: ["Nuclear reactor", "Solar panels", "Fuel cells", "Wind turbines"],
    correctAnswer: 1,
    explanation:
      "The ISS uses large solar arrays to generate electricity from sunlight.",
    learnMoreLink:
      "https://ontario-solar-installers.ca/news/solar-panels-on-the-international-space-station/",
  },
  {
    question: "What kind of experiments are conducted on the ISS?",
    options: [
      "Only space vehicle tests",
      " Biology, physics, medicine, and material science ",
      "Agricultural studies only",
      "Tourism-related projects",
    ],
    correctAnswer: 1,
    explanation:
      "Scientists use microgravity to study life sciences, materials, and physical behavior in space.",
    learnMoreLink:
      "https://issnationallab.org/iss360/life-sciences-on-the-space-station/",
  },
  {
    question: "Which two countries lead the ISS program?",
    options: [
      "USA and Japan",
      "Canada and Europe",
      "USA and Russia",
      "USA and China",
    ],
    correctAnswer: 2,
    explanation:
      "NASA (USA) and Roscosmos (Russia) are the two main leading agencies operating and managing the ISS.",
    learnMoreLink:
      "https://www.france24.com/en/americas/20250731-russia-space-nasa-iss-us",
  },
  {
    question: "Until what year is the ISS expected to operate?",
    options: ["2025", "2030", "2040", "2050"],
    correctAnswer: 1,
    explanation:
      "NASA and its partners have extended the ISS’s operation timeline to at least 2030.",
    learnMoreLink:
      "https://spacenews.com/nasa-open-to-extending-iss-beyond-2030/",
  },
  {
    question: "When was the redesign of the International Space Station?",
    options: ["1988", "1990", "1993 ", "1995"],
    correctAnswer: 2,
    explanation:
      "The redesign of the ISS took place in 1993 when Russia officially joined the program.",
    learnMoreLink: "https://www.russianspaceweb.com/iss.html",
  },
  {
    question: "How many phases was the ISS Agreement made to proceed in?",
    options: ["1", "2", "3 ", "4"],
    correctAnswer: 1,
    explanation:
      " The program was divided into two phases — Phase 1 (NASA–Mir) and Phase 2 (the ISS construction).",
    learnMoreLink:
      "https://impulso.space/tools/blog/posts/the-international-space-station",
  },
  {
    question: "How many phases was the ISS Agreement made to proceed in?",
    options: ["1", "2", "3 ", "4"],
    correctAnswer: 1,
    explanation:
      " The program was divided into two phases — Phase 1 (NASA–Mir) and Phase 2 (the ISS construction).",
    learnMoreLink:
      "https://impulso.space/tools/blog/posts/the-international-space-station",
  },
  {
    question: "What was Phase 1 of the ISS program called?",
    options: [
      "Apollo Program",
      "Skylab Mission",
      "NASA–Mir",
      "SpaceX Collaboration",
    ],
    correctAnswer: 2,
    explanation:
      " Phase 1, called NASA–Mir, involved cooperation between the U.S. and Russia using the Mir space station.",
    learnMoreLink: "https://www.nasa.gov/space-shuttle/shuttle-mir/",
  },
  {
    question: "How many Space Shuttle launches went to Mir?",
    options: ["5", "8", "11", "15"],
    correctAnswer: 2,
    explanation:
      " A total of 11 Space Shuttle missions were sent to the Mir space station between 1995 and 1998.",
    learnMoreLink:
      "https://www.airports-worldwide.com/articles/article0804.php",
  },
  {
    question: "How many of those launches docked with Mir?",
    options: ["5", "8", "10", "1"],
    correctAnswer: 2,
    explanation:
      "Out of the 11 Space Shuttle launches, 10 successfully docked with the Mir space station.",
    learnMoreLink:
      "https://www.youtube.com/live/Ye1uKGKvqwk?si=smuDu3rbvks5JsrX",
  },
  {
    question:
      "What were the names of the two new Russian modules added to Mir?",
    options: [
      "Soyuz and Progress",
      "Zvezda and Zarya",
      "Spektr and Priroda",
      "Mir-1 and Mir-2",
    ],
    correctAnswer: 2,
    explanation:
      "The Spektr and Priroda modules were added to Mir to host U.S. experiments and astronauts",
    learnMoreLink:
      "https://www.britannica.com/topic/Mir-Soviet-Russian-space-station",
  },
  {
    question: "All of these are the main goals of the ISS except:",
    options: [
      "Scientific research",
      "Education and STEM majors",
      "International collaboration",
      "Isolation and competition between countries",
    ],
    correctAnswer: 3,
    explanation:
      "The ISS was built for global cooperation, not isolation or competition",
    learnMoreLink:
      "https://www.satellitetoday.com/opinion/2021/04/21/why-global-collaboration-not-competition-is-the-future-of-the-space-industry/n",
  },
];

export const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<ShuffledQuestion[]>([]);
  const [showLearnMoreOptions, setShowLearnMoreOptions] = useState(false);

  const generateQuiz = () => {
    const shuffled = shuffleArray(quizData).slice(0, 5);

    const shuffledQuestions: ShuffledQuestion[] = shuffled.map((q) => {
      const shuffledOptions = shuffleArray(q.options);
      const correctAnswerIndex = shuffledOptions.indexOf(
        q.options[q.correctAnswer]
      );
      return {
        question: q.question,
        options: shuffledOptions,
        correctAnswerIndex,
        explanation: q.explanation,
        learnMoreLink: q.learnMoreLink,
      };
    });

    setQuizQuestions(shuffledQuestions);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect =
      answerIndex === quizQuestions[currentQuestionIndex].correctAnswerIndex;

    if (isCorrect) {
      correctSound.play();
      setScore(score + 1);
    } else {
      wrongSound.play();
    }

    setShowResult(true);
    setShowLearnMoreOptions(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowLearnMoreOptions(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    generateQuiz();
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setShowLearnMoreOptions(false);
  };

  if (quizQuestions.length === 0) return null;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            ISS KNOWLEDGE QUIZ
          </h2>
          <p className="text-muted-foreground">
            Test your knowledge about the International Space Station
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!quizCompleted ? (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <motion.div
                  className={`card-wrapper`}
                  animate={
                    showResult &&
                    selectedAnswer === currentQuestion.correctAnswerIndex
                      ? {
                          scale: [1, 1.05, 1],
                          boxShadow: "0px 0px 20px #00FFAA",
                        }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  <Card className="bg-card/80 backdrop-blur border-primary/30 shadow-card-space">
                    <div className="p-6 md:p-8">
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                          <span>
                            Question {currentQuestionIndex + 1} of{" "}
                            {quizQuestions.length}
                          </span>
                          <span>
                            Score: {score}/{quizQuestions.length}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
                        {currentQuestion.question}
                      </h3>

                      <div className="space-y-3 mb-6">
                        {currentQuestion.options.map((option, index) => {
                          const isSelected = selectedAnswer === index;
                          const isCorrect =
                            index === currentQuestion.correctAnswerIndex;
                          const showCorrect = showResult && isCorrect;
                          const showIncorrect =
                            showResult && isSelected && !isCorrect;

                          return (
                            <motion.button
                              key={index}
                              whileHover={{
                                scale: selectedAnswer === null ? 1.02 : 1,
                              }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={selectedAnswer !== null}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                                showCorrect
                                  ? "border-green-500 bg-green-500/10"
                                  : showIncorrect
                                  ? "border-red-500 bg-red-500/10"
                                  : isSelected
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50 bg-card/50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-foreground">
                                  {option}
                                </span>
                                {showCorrect && (
                                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                                )}
                                {showIncorrect && (
                                  <XCircle className="w-6 h-6 text-red-500" />
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      <AnimatePresence>
                        {showResult && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg"
                          >
                            <p className="text-sm text-muted-foreground">
                              {currentQuestion.explanation}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {showLearnMoreOptions &&
                        currentQuestion.learnMoreLink && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center gap-4 mb-4"
                          >
                            <Button
                              onClick={() =>
                                window.open(
                                  currentQuestion.learnMoreLink,
                                  "_blank"
                                )
                              }
                              className="bg-accent hover:bg-accent/90 text-white flex items-center gap-2"
                            >
                              Learn More <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() =>
                                window.open(
                                  "https://www.nasa.gov/mission_pages/station/main/index.html",
                                  "_blank"
                                )
                              }
                              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                            >
                              NASA <ExternalLink className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        )}

                      {showResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Button
                            onClick={handleNext}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
                          >
                            {currentQuestionIndex < quizQuestions.length - 1
                              ? "Next Question"
                              : "View Results"}
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="bg-card/80 backdrop-blur border-primary/30 shadow-glow">
                  <div className="p-6 md:p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="mb-6"
                    >
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                        <span className="text-5xl font-bold text-white">
                          {score}/{quizQuestions.length}
                        </span>
                      </div>
                    </motion.div>

                    <h3 className="text-3xl font-bold mb-4 text-foreground">
                      {score === quizQuestions.length
                        ? "Perfect Score! 🚀"
                        : score >= quizQuestions.length / 2
                        ? "Great Job! 🌟"
                        : "Keep Learning! 📚"}
                    </h3>

                    <p className="text-muted-foreground mb-8">
                      You got {score} out of {quizQuestions.length} questions
                      correct.
                    </p>

                    <Button
                      onClick={handleRestart}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Restart Quiz
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
