export interface ICoordinate {
  latitide: number;
  longitude: number;
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function calculateDistance(
  firstCoordinate: ICoordinate,
  secondCoordinate: ICoordinate,
): number {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(
    secondCoordinate.latitide - firstCoordinate.latitide,
  );
  const dLon = degreesToRadians(
    secondCoordinate.longitude - firstCoordinate.longitude,
  );

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(firstCoordinate.latitide)) *
      Math.cos(degreesToRadians(secondCoordinate.latitide)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}
