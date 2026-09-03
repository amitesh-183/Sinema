import LegalPage from "@/components/LegalPage";
import { useHead } from "@/hooks/useHead";

const About = () => {
  useHead({
    title: "About",
    description: "Learn about Sinema — a fast, modern web app for discovering, searching and exploring movies and TV shows.",
  });
  return (
    <LegalPage
      badge="About"
      title="About Sinema"
      updated="August 2026"
      sections={[
        {
          heading: "What is Sinema?",
          body: "Sinema is a fast, modern web app for discovering, searching and exploring an extensive library of movies and TV shows. Built with React, TypeScript and Vite, it taps into The Movie Database (TMDB) to surface what's popular, top rated and coming soon.",
        },
        {
          heading: "Why we built it",
          body: "Finding what to watch next should feel effortless and fun. Sinema is designed to be ultra fast, visually bold and easy to browse — whether you're hunting a specific title, exploring by genre or just vibing on the trending shelf.",
        },
        {
          heading: "Data & attribution",
          body: "Movie and TV metadata, posters and backdrops are provided by TMDB (themoviedb.org) and remain subject to their terms. We display attribution to TMDB for all content sourced from their API.",
        },
        {
          heading: "Feedback",
          body: "We love hearing from viewers. If something feels off, or you have an idea that would make the experience better, reach out through the community page or the channels listed in the footer.",
        },
      ]}
    />
  );
};

export default About;
