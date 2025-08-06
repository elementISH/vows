"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

export const useProductCarousel = (images, { delay = 5000 }) => {
  const autoplayRef = useRef(
    Autoplay({
      delay,
      playOnInit: true,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, watchDrag: false, watchFocus: false },
    [autoplayRef.current, Fade()]
  );

  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressValue, setProgressValue] = useState(0);

  const rafId = useRef(null);
  const lastValue = useRef(0);
  const isManualPause = useRef(false);
  const isAnimating = useRef(false);

  const stopProgress = () => {
    cancelAnimationFrame(rafId.current);
    isAnimating.current = false;
  };

  const startProgress = () => {
    stopProgress();
    const autoplay = autoplayRef.current;
    if (!autoplay || !autoplay.isPlaying()) {
      return;
    }

    setProgressValue(0);
    lastValue.current = 0;
    isAnimating.current = true;

    const duration = autoplay.options.delay;
    const FRAME_STEP = 40;
    let lastFrame = 0;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const percent = Math.min((elapsed / duration) * 100, 100);

      if (now - lastFrame >= FRAME_STEP) {
        const rounded = Math.round(percent * 10) / 10;
        if (rounded !== lastValue.current) {
          lastValue.current = rounded;
          setProgressValue(rounded);
        }
        lastFrame = now;
      }

      if (percent < 100 && autoplay.isPlaying()) {
        rafId.current = requestAnimationFrame(step);
      } else {
        isAnimating.current = false;
      }
    };

    rafId.current = requestAnimationFrame(step);
  };

  const toggleAutoplay = useCallback(() => {
    const autoplay = autoplayRef.current;
    if (!autoplay) return;

    if (autoplay.isPlaying()) {
      autoplay.stop();
      stopProgress();
      isManualPause.current = true;
      setIsPlaying(false);
    } else {
      isManualPause.current = false;
      autoplay.play();
      autoplay.reset();
      startProgress();
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = autoplayRef.current;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
    };

    const onPlay = () => {
      if (isManualPause.current) {
        return;
      }
      setIsPlaying(true);
      startProgress();
    };

    const onStop = () => {
      if (isManualPause.current) {
        return;
      }
      setIsPlaying(false);
      stopProgress();
    };

    const onTimerReset = () => {
      if (!isManualPause.current && autoplay.isPlaying()) {
        startProgress();
      }
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("autoplay:play", onPlay);
    emblaApi.on("autoplay:stop", onStop);
    emblaApi.on("autoplay:timerset", onTimerReset);

    onSelect();

    if (autoplay.isPlaying()) startProgress();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("autoplay:play", onPlay);
      emblaApi.off("autoplay:stop", onStop);
      emblaApi.off("autoplay:timerset", onTimerReset);

      stopProgress();
    };
  }, [emblaApi]);

  return {
    emblaRef,
    emblaApi,
    selected,
    isPlaying,
    toggleAutoplay,
    progressValue,
    autoplayRef,
    startProgress,
    setSelected,
    rafId,
    lastValue,
  };
};
