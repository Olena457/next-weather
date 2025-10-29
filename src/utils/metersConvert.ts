export default function metersConvert(visibilityInMeters: number): string {
    
    const visibilityInKilometers = visibilityInMeters / 1000;
    return `${visibilityInKilometers.toFixed(2)} km`;
}