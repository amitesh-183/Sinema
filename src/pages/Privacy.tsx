import LegalPage from "@/components/LegalPage";

const Privacy = () => {
  return (
    <LegalPage
      badge="Legal"
      title="Privacy Policy"
      updated="August 2026"
      sections={[
        {
          heading: "Information we collect",
          body: "Sinema is a client-side application. We do not require an account and we do not collect personal information such as your name, email or payment details to browse the catalog. Content is fetched directly from public APIs on your behalf.",
        },
        {
          heading: "Local storage",
          body: "We store a small amount of data in your browser's local storage to remember preferences like your theme (light/dark/system). This data never leaves your device.",
        },
        {
          heading: "Third-party services",
          body: "The app may load posters, backdrops and video streams from third-party providers (including TMDB and video-hosting services). Those providers may set their own cookies or process request data according to their privacy policies, which we encourage you to review.",
        },
        {
          heading: "Your choices",
          body: "You can clear locally stored preferences at any time by clearing your browser's site data. This will reset theme preferences but will not affect your ability to browse the catalog.",
        },
        {
          heading: "Changes",
          body: "We may update this policy as the service evolves. Material changes will be reflected here with an updated revision date.",
        },
      ]}
    />
  );
};

export default Privacy;
