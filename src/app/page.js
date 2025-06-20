'use client';
import React, { useState, useRef, useEffect } from "react";
import { Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title
);

export default function Home() {
  // Tab state
  const [mainTab, setMainTab] = useState("push");
  const [pushSubTab, setPushSubTab] = useState("push1");
  const [pullSubTab, setPullSubTab] = useState("pull1");
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExercise, setModalExercise] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Data
  const pushDay1Exercises = [
    { name: "Push-ups", muscles: "Chest, Shoulders, Triceps", sets: "3-4", reps: "AMRAP", details: "Beginner: Wall/Incline push-ups. Intermediate: Knee/Standard push-ups. Advanced: Decline push-ups. Band Option: Place a band across your upper back, holding ends in hands to add resistance." },
    { name: "Band Overhead Press", muscles: "Shoulders, Triceps", sets: "3-4", reps: "10-15", details: "Stand on the band with feet, hold ends at shoulder height with palms forward. Press overhead until arms are fully extended." },
    { name: "Band Chest Press (No Anchor)", muscles: "Chest, Shoulders, Triceps", sets: "3-4", reps: "10-15", details: "Loop the band around your upper back. Hold the ends and push your hands straight forward, extending your arms fully." },
    { name: "Triceps Extensions", muscles: "Triceps", sets: "3-4", reps: "12-18", details: "Overhead: Stand on the band, hold the end behind your head, and extend arm upward. Kickback: Stand on the band, hinge forward, and extend your arm straight back, keeping elbow tucked." },
    { name: "Band Squats", muscles: "Quads, Glutes, Hamstrings", sets: "3-4", reps: "10-15", details: "Place a band just above your knees. Perform squats, focusing on pushing your knees out against the band." },
  ];
  const pushDay2Exercises = [
    { name: "Decline Push-ups", muscles: "Upper Chest, Shoulders, Triceps", sets: "3-4", reps: "AMRAP", details: "Place feet on an elevated surface (e.g., chair, bench) and hands on the floor. Perform push-ups, focusing on upper chest and shoulders." },
    { name: "Pike Push-ups", muscles: "Shoulders, Triceps", sets: "3-4", reps: "10-15", details: "Start in a downward-dog position, hips high. Bend elbows, lowering head towards the floor. Push back up, mimicking an overhead press motion." },
    { name: "Band Punches", muscles: "Chest, Triceps", sets: "3-4", reps: "10-15 per arm", details: "Hold band with one hand, loop middle around your back. Extend arm forward in a punching motion against band resistance. Alternate arms." },
    { name: "Narrow Grip Push-ups", muscles: "Triceps, Chest", sets: "3-4", reps: "AMRAP", details: "Perform push-ups with hands closer than shoulder-width apart, emphasizing triceps engagement." },
    { name: "Sumo Squats (Bodyweight/Band)", muscles: "Inner Thighs, Glutes, Quads", sets: "3-4", reps: "15-20", details: "Stand with feet wider than shoulder-width, toes pointed out. Squat down, keeping back straight. Use a band above knees for added resistance." },
  ];
  const pullDay1Exercises = [
    { name: "Inverted Rows / Table Rows", muscles: "Back, Biceps", sets: "3-4", reps: "AMRAP", details: "Lie under a sturdy table, grab the edge, and pull your chest towards it, keeping your body straight." },
    { name: "Band Rows (Seated)", muscles: "Back, Biceps", sets: "3-4", reps: "10-15", details: "Sit on the floor with legs extended, loop band around your feet. Keep back straight and pull the band towards your torso." },
    { name: "Band Pull-Aparts", muscles: "Upper Back, Rear Delts", sets: "3-4", reps: "15-20", details: "Hold a band in front of you at shoulder height. Pull the band apart, squeezing shoulder blades together." },
    { name: "Band Bicep Curls", muscles: "Biceps", sets: "3-4", reps: "12-18", details: "Stand on the band, hold the ends with palms up. Perform curls, keeping elbows tucked in." },
    { name: "Glute Bridge / Band Hip Thrusts", muscles: "Glutes, Hamstrings", sets: "3-4", reps: "15-20", details: "Lie on your back, knees bent. Lift hips toward the ceiling. For more resistance, add a band just above your knees." },
  ];
  const pullDay2Exercises = [
    { name: "Superman Holds", muscles: "Lower Back, Glutes", sets: "3-4", reps: "30-60 sec hold", details: "Lie face down, extend arms and legs. Lift chest, arms, and legs off the floor simultaneously, squeezing lower back and glutes. Hold." },
    { name: "Band Lat Pulldowns (Kneeling)", muscles: "Lats, Upper Back", sets: "3-4", reps: "10-15", details: "Kneel, anchor band high (e.g., over a sturdy door frame or around a sturdy beam). Pull band ends down towards your shoulders, squeezing lats. Ensure anchor is secure." },
    { name: "Face Pulls with Band", muscles: "Rear Delts, Upper Back", sets: "3-4", reps: "15-20", details: "Anchor band at chest height. Grab ends with palms facing each other. Pull band towards your face, flaring elbows out, squeezing shoulder blades." },
    { name: "Hammer Curls with Band", muscles: "Biceps, Forearms", sets: "3-4", reps: "12-18", details: "Stand on the band, hold ends with a neutral grip (palms facing each other). Perform curls, keeping elbows tucked." },
    { name: "Single-Leg Romanian Deadlifts", muscles: "Hamstrings, Glutes", sets: "3", reps: "10-15 per leg", details: "Stand on one leg (slight bend in knee). Loop a band under the foot you are standing on, holding the ends in your hands. Hinge at your hips, extending the non-standing leg straight back, keeping your back flat. Lower your torso until it's nearly parallel to the floor. Return to standing." },
  ];
  const legsAbsDayExercises = [
    { name: "Bodyweight Squats", muscles: "Quads, Glutes, Hamstrings", sets: "3-4", reps: "15-20", details: "Perform classic squats with good form. Keep chest up and descend as if sitting into a chair. Add a band above knees for more resistance." },
    { name: "Bodyweight Lunges", muscles: "Quads, Glutes, Hamstrings", sets: "3-4", reps: "10-15 per leg", details: "Step forward, lower until both knees are at 90 degrees. Push back up. Focus on balance and control." },
    { name: "Band Hamstring Curls (Lying)", muscles: "Hamstrings", sets: "3-4", reps: "15-20", details: "Lie on stomach. Loop band around ankles, anchor other end to sturdy furniture. Curl heels towards glutes." },
    { name: "Calf Raises", muscles: "Calves", sets: "3-4", reps: "20-30", details: "Stand tall. Raise up onto the balls of your feet, holding for a second, then slowly lower. Perform one leg at a time for more challenge." },
    { name: "Plank", muscles: "Core, Abs", sets: "3-4", reps: "30-60 seconds hold", details: "Hold a straight line from head to heels. Engage your core, avoid sagging hips or arching back." },
    { name: "Crunches / Reverse Crunches", muscles: "Abs", sets: "3-4", reps: "15-20", details: "Crunches: Lie on back, knees bent. Lift shoulders off ground. Reverse Crunches: Lie on back, lift hips and knees towards chest." },
    { name: "Russian Twists", muscles: "Obliques, Abs", sets: "3-4", reps: "15-20 per side", details: "Sit on floor, knees bent, feet slightly off ground. Twist torso side to side. Hold a light object for more resistance." },
    { name: "Leg Raises", muscles: "Lower Abs", sets: "3-4", reps: "15-20", details: "Lie on back, legs straight. Slowly raise legs towards ceiling, keeping lower back pressed into floor. Lower slowly." },
  ];

  // Chart data
  const timeChartData = {
    labels: ["Main Workout", "Warm-up", "Cool-down"],
    datasets: [
      {
        data: [48, 7, 5],
        backgroundColor: ["#3D405B", "#81B29A", "#E07A5F"],
        borderColor: "#F5F5F5",
        borderWidth: 4,
      },
    ],
  };
  const timeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) return label.join(" ");
            else return label;
          },
        },
      },
    },
  };
  const muscleFocusData = {
    labels: ["Chest", "Shoulders", "Back", "Biceps", "Triceps", "Legs/Glutes", "Core/Abs"],
    datasets: [
      {
        label: "Push Day",
        data: [5, 5, 0, 0, 5, 2, 1],
        backgroundColor: "rgba(224, 122, 95, 0.4)",
        borderColor: "#E07A5F",
        pointBackgroundColor: "#E07A5F",
      },
      {
        label: "Pull Day",
        data: [0, 1, 5, 4, 0, 3, 1],
        backgroundColor: "rgba(129, 178, 154, 0.4)",
        borderColor: "#81B29A",
        pointBackgroundColor: "#81B29A",
      },
      {
        label: "Legs & Abs Day",
        data: [0, 0, 0, 0, 0, 5, 5],
        backgroundColor: "rgba(61, 64, 91, 0.4)",
        borderColor: "#3D405B",
        pointBackgroundColor: "#3D405B",
      },
    ],
  };
  const muscleFocusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        pointLabels: { font: { size: 12 } },
        ticks: { display: false },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) return label.join(" ");
            else return label;
          },
        },
      },
    },
  };

  // Accordion logic
  const [openIndexes, setOpenIndexes] = useState({});
  function toggleAccordion(day, idx) {
    setOpenIndexes((prev) => ({
      ...prev,
      [day]: prev[day] === idx ? null : idx,
    }));
  }

  // Modal logic (AI-powered variations)
  async function fetchVariations(exerciseName, muscleGroup) {
    setModalLoading(true);
    setModalContent(null);
    setModalOpen(true);
    setModalExercise({ name: exerciseName, muscles: muscleGroup });
    // Placeholder API key
    const apiKey = "AIzaSyD-PLACEHOLDER-KEY";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;


    const prompt = `As an expert fitness coach, suggest 3 beginner and 3 advanced variations for the "${exerciseName}" exercise, which primarily targets ${muscleGroup}. For each variation, provide a very brief explanation of how to perform it or its key benefit. Format the response in Markdown with clear headings for 'Beginner Variations' and 'Advanced Variations'.`;
    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        setModalContent(result.candidates[0].content.parts[0].text);
      } else {
        setModalContent("Failed to generate variations. Please try again.");
      }
    } catch (error) {
      setModalContent(`Error: ${error.message}. Could not connect to the API.`);
    } finally {
      setModalLoading(false);
    }
  }

  // Helper to render exercise cards
  function ExerciseCard({ exercise, day, idx }) {
    const isOpen = openIndexes[day] === idx;
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <div
          className="accordion-header p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleAccordion(day, idx)}
        >
          <div>
            <h4 className="font-bold text-lg">{exercise.name}</h4>
            <p className="text-sm text-gray-500">{exercise.muscles}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-sm text-gray-700">{exercise.sets} sets / {exercise.reps} reps</span>
            <span
              className="accordion-arrow text-xl"
              style={{ color: "#E07A5F", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ▼
            </span>
          </div>
        </div>
        <div
          className="accordion-content"
          style={{ maxHeight: isOpen ? 300 : 0 }}
        >
          <div className="p-4 border-t border-gray-200 text-gray-600">
            <p>{exercise.details}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                fetchVariations(exercise.name, exercise.muscles);
              }}
            >
              ✨ More Variations
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Modal
  function VariationModal() {
    if (!modalOpen || !modalExercise) return null;
    return (
      <div className="modal-overlay open">
        <div className="modal-content relative">
          <button className="close-button" onClick={() => setModalOpen(false)}>&times;</button>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "#3D405B" }}>
            Exercise Variations
          </h3>
          <div id="modal-content-area">
            {modalLoading ? (
              <>
                <div className="loading-spinner"></div>
                <p className="text-center text-gray-500 mt-4">Generating variations...</p>
              </>
            ) : modalContent ? (
              <div className="prose max-w-none" style={{ whiteSpace: "pre-line" }}>{modalContent}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // Tab content helpers
  function renderPushContent() {
    return (
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <button
            className={
              pushSubTab === "push1"
                ? "sub-tab-active text-md font-semibold py-2 px-6 rounded-l-md transition-colors duration-300"
                : "sub-tab-inactive text-md font-semibold py-2 px-6 rounded-l-md transition-colors duration-300"
            }
            onClick={() => setPushSubTab("push1")}
          >
            Push Day 1
          </button>
          <button
            className={
              pushSubTab === "push2"
                ? "sub-tab-active text-md font-semibold py-2 px-6 rounded-r-md transition-colors duration-300"
                : "sub-tab-inactive text-md font-semibold py-2 px-6 rounded-r-md transition-colors duration-300"
            }
            onClick={() => setPushSubTab("push2")}
          >
            Push Day 2
          </button>
        </div>
        <div className={pushSubTab === "push1" ? "space-y-4" : "hidden"}>
          {pushDay1Exercises.map((ex, i) => (
            <ExerciseCard key={ex.name} exercise={ex} day="push1" idx={i} />
          ))}
        </div>
        <div className={pushSubTab === "push2" ? "space-y-4" : "hidden"}>
          {pushDay2Exercises.map((ex, i) => (
            <ExerciseCard key={ex.name} exercise={ex} day="push2" idx={i} />
          ))}
        </div>
      </div>
    );
  }
  function renderPullContent() {
    return (
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <button
            className={
              pullSubTab === "pull1"
                ? "sub-tab-active text-md font-semibold py-2 px-6 rounded-l-md transition-colors duration-300"
                : "sub-tab-inactive text-md font-semibold py-2 px-6 rounded-l-md transition-colors duration-300"
            }
            onClick={() => setPullSubTab("pull1")}
          >
            Pull Day 1
          </button>
          <button
            className={
              pullSubTab === "pull2"
                ? "sub-tab-active text-md font-semibold py-2 px-6 rounded-r-md transition-colors duration-300"
                : "sub-tab-inactive text-md font-semibold py-2 px-6 rounded-r-md transition-colors duration-300"
            }
            onClick={() => setPullSubTab("pull2")}
          >
            Pull Day 2
          </button>
        </div>
        <div className={pullSubTab === "pull1" ? "space-y-4" : "hidden"}>
          {pullDay1Exercises.map((ex, i) => (
            <ExerciseCard key={ex.name} exercise={ex} day="pull1" idx={i} />
          ))}
        </div>
        <div className={pullSubTab === "pull2" ? "space-y-4" : "hidden"}>
          {pullDay2Exercises.map((ex, i) => (
            <ExerciseCard key={ex.name} exercise={ex} day="pull2" idx={i} />
          ))}
        </div>
      </div>
    );
  }
  function renderLegsAbsContent() {
    return (
      <div className="space-y-4">
        {legsAbsDayExercises.map((ex, i) => (
          <ExerciseCard key={ex.name} exercise={ex} day="legsabs" idx={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-7xl font-inter">
      <header className="text-center mb-12 bg-black rounded-xl p-6">
        <h1 className="text-4xl md:text-5xl font-bold" style={{ color: "#F5F5F5" }}>
          Your Interactive Home Workout
        </h1>
        <p className="mt-2 text-lg" style={{ color: "#F5F5F5" }}>
          A Push/Pull/Legs & Abs plan using only bodyweight and resistance bands.
        </p>
      </header>
      <main className="space-y-12">
        {/* Overview Section */}
        <section id="overview" className="bg-black rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#F5F5F5" }}>Workout at a Glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-5xl font-bold" style={{ color: "#81B29A" }}>3-4</p>
              <p className="mt-1 font-semibold">Sets per Exercise</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-5xl font-bold" style={{ color: "#81B29A" }}>8-15</p>
              <p className="mt-1 font-semibold">Reps per Set</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-5xl font-bold" style={{ color: "#81B29A" }}>60-90</p>
              <p className="mt-1 font-semibold">Seconds Rest</p>
            </div>
          </div>
        </section>
        {/* Structure & Muscle Focus Section */}
        <section id="structure" className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#3D405B" }}>Plan Structure & Muscle Focus</h2>
          <p className="max-w-3xl mx-auto text-center text-gray-600 mb-8">
            This plan splits workouts into &quot;Push&quot;, &quot;Pull&quot;, and &quot;Legs & Abs&quot; days to target different muscle groups effectively, allowing for focused training and optimal recovery. The charts below visualize how each session is structured by time and which muscle groups are prioritized.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-center mb-4" style={{ color: "#3D405B" }}>Workout Time Distribution</h3>
              <div className="chart-container h-64 md:h-auto">
                <Doughnut data={timeChartData} options={timeChartOptions} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-center mb-4" style={{ color: "#3D405B" }}>Primary Muscle Group Focus</h3>
              <div className="chart-container">
                <Radar data={muscleFocusData} options={muscleFocusOptions} />
              </div>
            </div>
          </div>
        </section>
        {/* Daily Workout Details Section */}
        <section id="workouts" className="bg-black rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#F5F5F5" }}>Daily Workout Details</h2>
          <p className="max-w-3xl mx-auto text-center mb-8" style={{ color: "#F5F5F5" }}>
            Select a workout day to see the full list of exercises. Click on any exercise to view detailed instructions on how to perform it correctly. Use the &quot;✨ More Variations&quot; button for AI-powered suggestions!
          </p>
          <div className="flex justify-center mb-6">
            <button
              id="push-main-tab"
              className={
                mainTab === "push"
                  ? "tab-active text-lg font-bold py-3 px-8 rounded-l-lg transition-colors duration-300"
                  : "tab-inactive text-lg font-bold py-3 px-8 rounded-l-lg transition-colors duration-300"
              }
              onClick={() => setMainTab("push")}
            >
              Push Days
            </button>
            <button
              id="pull-main-tab"
              className={
                mainTab === "pull"
                  ? "tab-active text-lg font-bold py-3 px-8 transition-colors duration-300"
                  : "tab-inactive text-lg font-bold py-3 px-8 transition-colors duration-300"
              }
              onClick={() => setMainTab("pull")}
            >
              Pull Days
            </button>
            <button
              id="legs-abs-main-tab"
              className={
                mainTab === "legsabs"
                  ? "tab-active text-lg font-bold py-3 px-8 rounded-r-lg transition-colors duration-300"
                  : "tab-inactive text-lg font-bold py-3 px-8 rounded-r-lg transition-colors duration-300"
              }
              onClick={() => setMainTab("legsabs")}
            >
              Legs & Abs
            </button>
          </div>
          <div className={mainTab === "push" ? "" : "hidden"}>{renderPushContent()}</div>
          <div className={mainTab === "pull" ? "" : "hidden"}>{renderPullContent()}</div>
          <div className={mainTab === "legsabs" ? "" : "hidden"}>{renderLegsAbsContent()}</div>
        </section>
        {/* Progression Path Section */}
        <section id="progression" className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#3D405B" }}>Your Path to Progression</h2>
          <p className="max-w-3xl mx-auto text-center text-gray-600 mb-10">
            To continue building strength and muscle, you must gradually increase the challenge. This principle is called progressive overload. Follow these steps to ensure you keep making gains.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg" style={{ backgroundColor: "#81B29A" }}>1</div>
              <p className="mt-3 font-semibold w-36">Increase Reps/Sets</p>
            </div>
            <div className="h-1 w-12 bg-gray-300 hidden md:block"></div>
            <div className="w-1 h-8 bg-gray-300 md:hidden"></div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg" style={{ backgroundColor: "#E07A5F" }}>2</div>
              <p className="mt-3 font-semibold w-36">Decrease Rest Time</p>
            </div>
            <div className="h-1 w-12 bg-gray-300 hidden md:block"></div>
            <div className="w-1 h-8 bg-gray-300 md:hidden"></div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg" style={{ backgroundColor: "#3D405B" }}>3</div>
              <p className="mt-3 font-semibold w-40">Use Stronger Bands</p>
            </div>
            <div className="h-1 w-12 bg-gray-300 hidden md:block"></div>
            <div className="w-1 h-8 bg-gray-300 md:hidden"></div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg" style={{ backgroundColor: "#3d405bd9" }}>4</div>
              <p className="mt-3 font-semibold w-40">Use Harder Variations</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center mt-12 py-6 border-t border-gray-200 bg-black rounded-xl">
        <p style={{ color: "#F5F5F5" }}>Stay hydrated, prioritize form, and enjoy your fitness journey!</p>
      </footer>
      <VariationModal />
    </div>
  );
}
