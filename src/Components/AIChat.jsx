import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback
} from "react";

import { motion } from "framer-motion";

import {
  Send,
  Sparkles,
  AlertCircle
} from "lucide-react";

const EXAMPLE_QUESTIONS = [
  "Which city has the highest collection?",
  "How many approved properties exist?",
  "Compare Pune and Delhi",
  "Which city has most rejected properties?"
];

const API_TIMEOUT = 30000; // 30 seconds

export default function AIChat({
  filteredData
}) {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const chatEndRef =
    useRef(null);

  const analytics = useMemo(() => {

    const cityStats = {};

    (
      filteredData || []
    ).forEach((item) => {

      const city =
        item.tenant || "Unknown";

      if (!cityStats[city]) {

        cityStats[city] = {
          totalProperties: 0,
          approved: 0,
          rejected: 0,
          pending: 0,
          totalCollection: 0
        };

      }

      cityStats[city]
        .totalProperties++;

      if (
        item.status === "Approved"
      ) {
        cityStats[city]
          .approved++;
      }

      if (
        item.status === "Rejected"
      ) {
        cityStats[city]
          .rejected++;
      }

      if (
        item.status === "Pending"
      ) {
        cityStats[city]
          .pending++;
      }

      cityStats[city]
        .totalCollection +=
        item.collection_inr || 0;

    });

    return cityStats;

  }, [filteredData]);

  useEffect(() => {

    chatEndRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, [messages, loading]);

  const handleAskAI =
    useCallback(
      async (clickedQuestion) => {

        const targetQuestion =
          (
            clickedQuestion ||
            question
          ).trim();

        if (
          !targetQuestion ||
          loading
        ) {
          return;
        }

        setQuestion("");
        setError(null);
        setLoading(true);

        const userMessage = {
          role: "user",
          text: targetQuestion
        };

        setMessages((prev) => [
          ...prev,
          userMessage
        ]);

        try {

          const systemPrompt = `You are an AI assistant for a Property Tax Analytics Dashboard.

Dataset Analytics:
${JSON.stringify(analytics, null, 2)}

Rules:
- Give short answers (max 2-3 sentences)
- Use exact numbers from the data
- Be professional and helpful
- Only answer based on provided data
- If data is unavailable, say so clearly`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

          const response =
            await fetch(
              '/api/chat',
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                  systemPrompt,
                  messages: [
                    {
                      role: "user",
                      content: targetQuestion
                    }
                  ]
                }),

                signal: controller.signal
              }
            );

          clearTimeout(timeoutId);

          const data =
            await response.json();

          if (!response.ok) {

            let errorMessage = "Failed to get AI response";

            if (response.status === 429) {
              errorMessage = "Too many requests. Please wait a moment.";
            } else if (response.status === 401) {
              errorMessage = "Authentication error. Please check configuration.";
            } else if (data?.error) {
              errorMessage = data.error;
            }

            throw new Error(errorMessage);

          }

          const text =
            data?.content?.[0]
              ?.text ||
            "No response received.";

          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text
            }
          ]);

        } catch (error) {

          let errorMessage = "Failed to fetch AI response";

          if (error.name === 'AbortError') {
            errorMessage = "Request timeout. Please try again.";
          } else if (error.message) {
            errorMessage = error.message;
          }

          console.error(
            "Chat Error:",
            error
          );

          setError(errorMessage);

          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text: `❌ ${errorMessage}`,
              isError: true
            }
          ]);

        } finally {

          setLoading(false);

        }

      },
      [question, loading, analytics]
    );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-amber-200
        bg-gradient-to-br
        from-white
        via-amber-50
        to-amber-100
        backdrop-blur-2xl
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.06)]
        font-['Outfit']
      "
    >

      <div
        className="
          absolute
          -top-24
          -right-24
          w-80
          h-80
          rounded-full
          bg-amber-300/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-white/30
          backdrop-blur-[2px]
        "
      />

      <div className="relative z-10">

        <div className="mb-6">

          <div
            className="
              flex
              items-center
              gap-3
              mb-2
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/70
                border
                border-white/50
                backdrop-blur-xl
                flex
                items-center
                justify-center
                shadow-lg
              "
            >

              <Sparkles
                className="
                  w-6
                  h-6
                  text-amber-500
                "
              />

            </div>

            <h2
              className="
                text-3xl
                xl:text-4xl
                font-black
                tracking-tight
                text-neutral-900
              "
            >
              AI Chat
              <span
                className="
                  bg-gradient-to-r
                  from-amber-500
                  to-yellow-600
                  bg-clip-text
                  text-transparent
                  ml-2
                "
              >
                Assistant
              </span>
            </h2>

          </div>

          <p
            className="
              text-neutral-500
              text-sm
              leading-relaxed
            "
          >
            Ask questions about property
            tax analytics and city
            performance
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                mt-3
                flex
                items-center
                gap-2
                p-3
                bg-red-50
                border
                border-red-200
                rounded-lg
                text-red-700
                text-sm
              "
            >
              <AlertCircle size={16} />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </motion.div>
          )}

        </div>

        <div
          className="
            h-[450px]
            overflow-y-auto
            rounded-[28px]
            border
            border-white/40
            bg-white/50
            backdrop-blur-xl
            p-5
            mb-5
            space-y-5
            shadow-inner
          "
        >

          {messages.length === 0 && (

            <div
              className="
                text-sm
                space-y-4
              "
            >

              <p
                className="
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-neutral-500
                  text-xs
                "
              >
                Example Questions
              </p>

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  items-start
                "
              >

                {EXAMPLE_QUESTIONS.map(
                  (q, idx) => (

                    <motion.button
                      key={idx}
                      whileHover={{
                        scale: 1.02,
                        x: 4
                      }}
                      whileTap={{
                        scale: 0.98
                      }}
                      disabled={loading}
                      onClick={() =>
                        handleAskAI(q)
                      }
                      className="
                        text-left
                        bg-white/70
                        border
                        border-amber-200
                        hover:border-amber-400
                        text-neutral-700
                        hover:text-black
                        px-4
                        py-3
                        rounded-2xl
                        transition-all
                        duration-300
                        text-sm
                        font-medium
                        shadow-sm
                        backdrop-blur-xl
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                      "
                    >
                      ✨ {q}
                    </motion.button>

                  )
                )}

              </div>

            </div>

          )}

          {messages.map(
            (msg, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.25
                }}
                className={`
                  flex
                  ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }
                `}
              >

                <div
                  className={`
                    max-w-[80%]
                    rounded-[28px]
                    px-5
                    py-4
                    whitespace-pre-wrap
                    text-sm
                    leading-7
                    shadow-lg
                    border
                    backdrop-blur-xl
                    ${
                      msg.role ===
                      "user"
                        ? `
                          bg-gradient-to-r
                          from-amber-500
                          to-yellow-500
                          text-white
                          border-amber-400
                        `
                        : msg.isError
                        ? `
                          bg-red-50
                          text-red-700
                          border-red-200
                        `
                        : `
                          bg-white/80
                          text-neutral-800
                          border-white/50
                        `
                    }
                  `}
                >
                  {msg.text}
                </div>

              </motion.div>

            )
          )}

          {loading && (

            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              className="
                bg-white/80
                border
                border-amber-200
                px-5
                py-4
                rounded-[28px]
                w-fit
                text-sm
                font-semibold
                text-amber-600
                animate-pulse
                backdrop-blur-xl
                shadow-lg
              "
            >
              Thinking...
            </motion.div>

          )}

          <div ref={chatEndRef} />

        </div>

        <div
          className="
            flex
            gap-3
          "
        >

          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            disabled={loading}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {

                e.preventDefault();

                handleAskAI();

              }

            }}
            className="
              flex-1
              border
              border-amber-200
              bg-white/70
              backdrop-blur-xl
              rounded-2xl
              px-5
              py-4
              outline-none
              text-sm
              font-medium
              text-neutral-800
              focus:ring-4
              focus:ring-amber-100
              focus:border-amber-400
              transition-all
              duration-300
              shadow-sm
              disabled:bg-neutral-100
              disabled:cursor-not-allowed
            "
          />

          <motion.button
            whileHover={{
              scale: 1.03
            }}
            whileTap={{
              scale: 0.97
            }}
            onClick={() =>
              handleAskAI()
            }
            disabled={
              loading ||
              !question.trim()
            }
            className="
              bg-gradient-to-r
              from-amber-500
              to-yellow-500
              text-white
              px-6
              rounded-2xl
              transition-all
              duration-300
              shadow-lg
              hover:shadow-xl
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >

            <Send size={20} />

          </motion.button>

        </div>

      </div>

    </motion.div>
  );
}
