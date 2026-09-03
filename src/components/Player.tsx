import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  Captions,
  Check,
  ChevronDown,
  Loader2,
  Maximize,
  Minimize,
  MonitorPlay,
  RotateCcw,
  Server,
} from "lucide-react";
import { STREAM_PROVIDERS } from "@/lib/streamProviders";
import { useLanguage, LANGUAGES } from "@/store/useLanguage";
import { cn } from "@/lib/utils";

function useClickOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

const Player = () => {
  const { playerId } = useParams();
  const { pathname, key } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  const mediaType = pathname.includes("/tv") ? "tv" : "movie";

  const language = useLanguage((state) => state.language);
  const setLanguage = useLanguage((state) => state.setLanguage);
  const captionsOn = useLanguage((state) => state.captions);
  const setCaptions = useLanguage((state) => state.setCaptions);
  const activeLang = LANGUAGES.find((l) => l.code === language);

  const [providerId, setProviderId] = useState(STREAM_PROVIDERS[0].id);
  const [loading, setLoading] = useState(true);
  const provider =
    STREAM_PROVIDERS.find((p) => p.id === providerId) ?? STREAM_PROVIDERS[0];

  const [captionsOpen, setCaptionsOpen] = useState(false);
  const [serverOpen, setServerOpen] = useState(false);

  const captionsRef = useClickOutside<HTMLDivElement>(() => setCaptionsOpen(false));
  const serverRef = useClickOutside<HTMLDivElement>(() => setServerOpen(false));

  const movieUrl = provider.url(
    mediaType,
    playerId ?? "",
    season ?? "",
    episode ?? "",
    captionsOn ? language : undefined,
  );

  useEffect(() => {
    setLoading(true);
  }, [providerId, playerId, season, episode, language, captionsOn]);

  /* fullscreen */
  const playerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void playerRef.current?.requestFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* auto-hiding controls */
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<number | undefined>(undefined);

  const wake = () => {
    setShowControls(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setShowControls(false), 3200);
  };

  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current);
  }, []);

  const goBack = () => {
    const hasHistory = key !== "default" && window.history.state?.idx > 0;
    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(`/${mediaType}-info/${playerId}`);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-black">
      <div
        ref={playerRef}
        className="relative h-full w-full"
        onMouseMove={wake}
        onClick={wake}
      >
        {/* loading overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black"
            >
              <Loader2 className="h-8 w-8 animate-spin text-white/70" />
              <p className="text-sm text-white/50">
                Loading {provider.name}…
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <iframe
          key={`${providerId}-${mediaType}-${playerId}-${season}-${episode}-${language}-${captionsOn}`}
          src={movieUrl}
          title="Video player"
          className="h-full w-full"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="no-referrer"
          frameBorder="0"
          allowFullScreen
          onLoad={() => setLoading(false)}
        />

        {/* controls overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between"
            >
              {/* top bar */}
              <div className="pointer-events-auto flex items-center justify-between gap-3 bg-gradient-to-b from-black/70 to-transparent p-3 sm:p-4">
                <button
                  onClick={goBack}
                  aria-label="Back"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white sm:px-3 sm:text-xs">
                    Now Playing
                  </span>
                  <span className="hidden rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur-md sm:block">
                    {provider.name}
                  </span>
                </div>
              </div>

              {/* bottom control bar */}
              <div className="pointer-events-auto bg-gradient-to-t from-black/85 via-black/50 to-transparent p-3 sm:p-4 sm:pt-10">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/60 p-2 backdrop-blur-md sm:gap-3 sm:px-3 sm:py-2">
                  <div className="hidden items-center gap-2 pl-1 sm:flex">
                    <MonitorPlay className="h-4 w-4 text-yellow-400" />
                    <p className="text-xs font-medium text-white/70">
                      {captionsOn
                        ? `Captions: ${activeLang?.label}`
                        : "Captions: Off"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {/* captions */}
                    <div className="relative" ref={captionsRef}>
                      <button
                        onClick={() => {
                          setServerOpen(false);
                          setCaptionsOpen((o) => !o);
                        }}
                        className={cn(
                          "flex h-8 items-center gap-1 rounded-full border px-2 text-[11px] font-semibold transition-colors sm:h-9 sm:gap-1.5 sm:px-3 sm:text-xs",
                          captionsOn
                            ? "border-yellow-400/40 bg-yellow-400/10 text-white"
                            : "border-white/15 text-white/60 hover:bg-white/10",
                        )}
                      >
                        <Captions
                          className={cn(
                            "h-3.5 w-3.5 sm:h-4 sm:w-4",
                            captionsOn ? "text-yellow-400" : "text-white/40",
                          )}
                        />
                        <span className="hidden sm:inline">{activeLang?.emoji}</span>
                        <span>{captionsOn ? activeLang?.label : "Off"}</span>
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <AnimatePresence>
                        {captionsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full right-0 z-30 mb-2 max-h-72 w-44 overflow-y-auto rounded-2xl border border-white/10 bg-black/90 p-1.5 shadow-xl backdrop-blur-md sm:w-52"
                          >
                            <button
                              onClick={() => {
                                setCaptions(false);
                                setCaptionsOpen(false);
                              }}
                              className={cn(
                                "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                                !captionsOn
                                  ? "bg-brand-gradient font-semibold text-white"
                                  : "text-white/70 hover:bg-white/10",
                              )}
                            >
                              <span>Off</span>
                            </button>
                            {LANGUAGES.map((l) => (
                              <button
                                key={l.code}
                                onClick={() => {
                                  setCaptions(true);
                                  setLanguage(l.code);
                                  setCaptionsOpen(false);
                                }}
                                className={cn(
                                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                                  captionsOn && language === l.code
                                    ? "bg-brand-gradient font-semibold text-white"
                                    : "text-white/70 hover:bg-white/10",
                                )}
                              >
                                <span>{l.emoji}</span>
                                <span>{l.label}</span>
                                {captionsOn && language === l.code && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* servers */}
                    <div className="relative" ref={serverRef}>
                      <button
                        onClick={() => {
                          setCaptionsOpen(false);
                          setServerOpen((o) => !o);
                        }}
                        className="flex h-8 items-center gap-1 rounded-full border border-white/15 px-2 text-[11px] font-semibold text-white/70 transition-colors hover:bg-white/10 sm:h-9 sm:gap-1.5 sm:px-3 sm:text-xs"
                      >
                        <Server className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>{provider.name}</span>
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <AnimatePresence>
                        {serverOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full right-0 z-30 mb-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-1.5 shadow-xl backdrop-blur-md sm:w-60"
                          >
                            <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                              Servers
                            </p>
                            {STREAM_PROVIDERS.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => {
                                  setProviderId(p.id);
                                  setServerOpen(false);
                                }}
                                className={cn(
                                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                                  providerId === p.id
                                    ? "bg-brand-gradient font-semibold text-white"
                                    : "text-white/70 hover:bg-white/10",
                                )}
                              >
                                <span
                                  className={cn(
                                    "h-2 w-2 rounded-full",
                                    p.verified
                                      ? "bg-emerald-400"
                                      : "bg-amber-400/70",
                                  )}
                                  title={
                                    p.verified
                                      ? "Verified working"
                                      : "Availability may vary"
                                  }
                                />
                                <span>{p.name}</span>
                                {providerId === p.id && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </button>
                            ))}
                            <p className="border-t border-white/10 px-3 py-2 text-[11px] text-white/40">
                              Green dot = verified working source
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                      title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 sm:h-9 sm:w-9"
                    >
                      {isFullscreen ? (
                        <Minimize className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      ) : (
                        <Maximize className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      )}
                    </button>

                    {/* reload */}
                    <button
                      onClick={() => setLoading(true)}
                      aria-label="Reload player"
                      title="Reload player"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 sm:h-9 sm:w-9"
                    >
                      <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Player;
