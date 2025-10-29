export default function convertSpeedWind(speedInMps: number): string {
    
    const speedInKilometersPerHour = speedInMps * 3.6;
    return `${speedInKilometersPerHour.toFixed(0)} km/h`;
}