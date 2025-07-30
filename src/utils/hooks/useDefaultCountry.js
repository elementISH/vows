export default function useDefaultCountry() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const map = {
    "Africa/Cairo": "EG",
    "America/New_York": "US",
    "Europe/London": "GB",
  };
  return map[tz] || "EG";
}
