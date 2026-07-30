const gates = ["Main Entrance", "East Entrance", "West Entrance", "North Entrance", "South Entrance"];

class CrowdService {
  constructor() {
    this.current = { density: 35, level: "LOW", gate: "Main Entrance", trend: "stable", updatedAt: new Date() };
  }

  generate(now = new Date()) {
    const hour = now.getHours();
    const target = hour >= 17 && hour <= 20 ? 76 : hour >= 15 && hour <= 22 ? 52 : 28;
    const delta = Math.max(-5, Math.min(5, target - this.current.density)) + Math.floor(Math.random() * 5) - 2;
    const density = Math.max(8, Math.min(96, this.current.density + delta));
    const level = density >= 70 ? "HIGH" : density >= 40 ? "MEDIUM" : "LOW";
    const gate = density >= 70 ? "Main Entrance" : gates[(Math.floor(now.getMinutes() / 5) + 1) % gates.length];

    this.current = {
      density,
      level,
      gate,
      trend: density > this.current.density ? "increasing" : density < this.current.density ? "decreasing" : "stable",
      updatedAt: now,
    };
    return this.current;
  }

  getCurrent() { return this.current; }
}

module.exports = new CrowdService();
