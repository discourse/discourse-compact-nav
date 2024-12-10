export default function migrate(settings) {
  if (settings.has("open_icon")) {
    settings.set("dropdown_icon", settings.get("open_icon"));
    settings.delete("open_icon");
  }
  return settings;
}
