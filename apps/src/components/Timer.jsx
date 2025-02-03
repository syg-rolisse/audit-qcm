import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosConfig";

const Timer = ({ userId, roundId, watchTimer, defaultDuration }) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: defaultDuration, // Dynamique
    seconds: 0,
  });
  const timerIntervalRef = useRef(null);
  const thematiqueId = JSON.parse(localStorage.getItem("thematiqueId"));

  const calculateTimeRemaining = (endTime) => {
    const now = new Date().getTime();
    const diff = endTime - now;
    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };

  const startTimer = (durationInMinutes) => {
    const durationMs = durationInMinutes * 60 * 1000; // Convert duration to milliseconds
    const endTime = new Date().getTime() + durationMs;
    localStorage.setItem("timerEndTime", endTime);

    setTimerStarted(true);
    setTimeRemaining({
      hours: Math.floor(durationInMinutes / 60),
      minutes: durationInMinutes % 60,
      seconds: 0,
    });

    watchTimer(true);

    timerIntervalRef.current = setInterval(() => {
      const remainingTime = calculateTimeRemaining(endTime);
      setTimeRemaining(remainingTime);

      if (
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0
      ) {
        clearInterval(timerIntervalRef.current);
        setTimerStarted(false);
        watchTimer(false);
        localStorage.removeItem("timerEndTime");
        toast.error("Délai épuisé pour ce round!", { duration: 5000 });
      }
    }, 1000);
  };

  const fetchDomains = useMutation(
    () =>
      axiosInstance.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/testDomain?page=1&perpage=1&userId=${userId}&thematiqueId=${thematiqueId}&roundId=${roundId}`
      ),
    {
      onSuccess: (response) => {
        console.log(response?.data?.test);
        const duration = response?.data?.test?.duration || 2; // Durée dynamique (2 par défaut)

        switch (response?.data?.tag) {
          case "both":
            toast.error(response?.data?.message, { duration: 5000 });
            break;

          case "once":
            toast.success("Round 2 lancé !", { duration: 5000 });
            startTimer(duration);
            break;

          case "play":
            startTimer(duration);
            break;

          default:
            break;
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error, { autoClose: 1000 });
      },
    }
  );

  const startTimerHandler = () => {
    if (!timerStarted) {
      fetchDomains.mutate({});
    }
  };

  useEffect(() => {
    const endTime = localStorage.getItem("timerEndTime");
    if (endTime) {
      const remainingTime = calculateTimeRemaining(endTime);
      setTimeRemaining(remainingTime);
      if (
        remainingTime.hours !== 0 ||
        remainingTime.minutes !== 0 ||
        remainingTime.seconds !== 0
      ) {
        setTimerStarted(true);
        watchTimer(true);

        timerIntervalRef.current = setInterval(() => {
          const remainingTime = calculateTimeRemaining(endTime);
          setTimeRemaining(remainingTime);

          if (
            remainingTime.hours === 0 &&
            remainingTime.minutes === 0 &&
            remainingTime.seconds === 0
          ) {
            clearInterval(timerIntervalRef.current);
            setTimerStarted(false);
            watchTimer(false);
            localStorage.removeItem("timerEndTime");
            toast.error("Délai épuisé!");
          }
        }, 1000);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="tw-container">
      <div id="decompte" className="tw-flex tw-justify-start tw-items-center">
        <div className="tw-flex tw-space-x-2">
          <div className="max-sm:tw-w-1/4">
            <div className="p-3 under-maintenance-time rounded">
              <p className="mb-1 fs-12 op-5">HEURES</p>
              <h4 className="fw-semibold mb-0">{timeRemaining.hours}</h4>
            </div>
          </div>
          <div className="max-sm:tw-w-1/4">
            <div className="p-3 under-maintenance-time rounded">
              <p className="mb-1 fs-12 op-5">MINUTES</p>
              <h4 className="fw-semibold mb-0">{timeRemaining.minutes}</h4>
            </div>
          </div>
          <div className="max-sm:tw-w-1/4">
            <div className="p-3 under-maintenance-time rounded">
              <p className="mb-1 fs-12 op-5">SECONDES</p>
              <h4 className="fw-semibold mb-0">{timeRemaining.seconds}</h4>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={startTimerHandler}
        className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded mt-4"
        disabled={timerStarted}
      >
        {timerStarted ? "Le timer est en cours..." : "Démarrer le test"}
      </button>
    </div>
  );
};

Timer.propTypes = {
  userId: PropTypes.number.isRequired,
  thematiqueId: PropTypes.number,
  defaultDuration: PropTypes.number,
  roundId: PropTypes.number.isRequired,
  watchTimer: PropTypes.func.isRequired,
};

export default Timer;
