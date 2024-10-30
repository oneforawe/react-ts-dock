import { IANAZone, Zone } from 'luxon';

// Example time zone appropriate for this app.
const ianaZone = 'America/Los_Angeles';
export const zone: Zone = IANAZone.create(ianaZone);
