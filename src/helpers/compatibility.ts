import { BloodGroup } from '../common/enums';

export function getCompatibleBloodGroups(bloodGroup: BloodGroup): BloodGroup[] {
  switch (bloodGroup) {
    case BloodGroup.A_POSITIVE:
      return [
        BloodGroup.A_POSITIVE,
        BloodGroup.A_NEGATIVE,
        BloodGroup.O_POSITIVE,
        BloodGroup.O_NEGATIVE,
      ];

    case BloodGroup.A_NEGATIVE:
      return [BloodGroup.A_NEGATIVE, BloodGroup.O_NEGATIVE];

    case BloodGroup.B_POSITIVE:
      return [
        BloodGroup.B_POSITIVE,
        BloodGroup.B_NEGATIVE,
        BloodGroup.O_POSITIVE,
        BloodGroup.O_NEGATIVE,
      ];

    case BloodGroup.B_NEGATIVE:
      return [BloodGroup.B_NEGATIVE, BloodGroup.O_NEGATIVE];

    case BloodGroup.AB_POSITIVE:
      return [
        BloodGroup.A_POSITIVE,
        BloodGroup.A_NEGATIVE,
        BloodGroup.B_POSITIVE,
        BloodGroup.B_NEGATIVE,
        BloodGroup.AB_POSITIVE,
        BloodGroup.AB_NEGATIVE,
        BloodGroup.O_POSITIVE,
        BloodGroup.O_NEGATIVE,
      ];

    case BloodGroup.AB_NEGATIVE:
      return [
        BloodGroup.A_NEGATIVE,
        BloodGroup.B_NEGATIVE,
        BloodGroup.AB_NEGATIVE,
        BloodGroup.O_NEGATIVE,
      ];

    case BloodGroup.O_POSITIVE:
      return [BloodGroup.O_POSITIVE, BloodGroup.O_NEGATIVE];

    case BloodGroup.O_NEGATIVE:
      return [BloodGroup.O_NEGATIVE];

    default:
      throw new Error('Invalid blood group provided');
  }
}
