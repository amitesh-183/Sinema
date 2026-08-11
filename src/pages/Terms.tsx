import LegalPage from "@/components/LegalPage";

const Terms = () => {
  return (
    <LegalPage
      badge="Legal"
      title="Terms of Service"
      updated="August 2026"
      sections={[
        {
          heading: "Acceptance of terms",
          body: "By using Sinema you agree to these terms. The service is provided for personal, non-commercial discovery of movie and TV show information.",
        },
        {
          heading: "Content & streaming",
          body: "Sinema is an informational and discovery platform. Playback is provided through third-party video services over which we have no control. We do not host, upload, sell or distribute video files, and we are not responsible for the availability or legitimacy of third-party streams.",
        },
        {
          heading: "Acceptable use",
          body: "You agree not to misuse the service, attempt to gain unauthorized access, scrape it at abusive rates, or use it in any way that violates applicable law or the terms of the data providers (including TMDB).",
        },
        {
          heading: "No warranty",
          body: "The service is provided 'as is' without warranties of any kind. We do not guarantee that metadata, availability or playback will be uninterrupted or error-free.",
        },
        {
          heading: "Limitation of liability",
          body: "To the maximum extent permitted by law, Sinema shall not be liable for any indirect, incidental or consequential damages arising from your use of the service.",
        },
        {
          heading: "Changes",
          body: "We may revise these terms at any time. Continued use of the service after changes are posted constitutes acceptance of the updated terms.",
        },
      ]}
    />
  );
};

export default Terms;
