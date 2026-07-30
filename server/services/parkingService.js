class ParkingService {
  constructor() {
    this.total = 500;
    this.current = { occupied: 120, available: 380, percentage: 24, updatedAt: new Date() };
  }

  generate(crowdDensity, now = new Date()) {
    const targetOccupied = Math.round(this.total * Math.min(0.92, 0.15 + crowdDensity / 120));
    const step = Math.max(-12, Math.min(12, targetOccupied - this.current.occupied));
    const occupied = Math.max(0, Math.min(this.total, this.current.occupied + step));
    this.current = { occupied, available: this.total - occupied, percentage: Number(((occupied / this.total) * 100).toFixed(1)), updatedAt: now };
    return this.current;
  }

  getCurrent() { return this.current; }
}

module.exports = new ParkingService();
