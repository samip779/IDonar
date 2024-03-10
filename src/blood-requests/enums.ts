export enum AcceptBloodRequestStatus {
  SUBMITTED_BY_DONOR = 'submitted_by_donor',
  CANCELLED_BY_DONOR = 'cancelled_by_donor',
  INVITED_BY_REQUESTER = 'invited_by_requester',
  REJECTED_BY_REQUESTER = 'rejected_by_requester',
  DONATED_BY_OTHER_DONOR = 'donated_by_other_donor',
  REQUEST_CANCELLED = 'request_cancelled',
  DONATED = 'donated',
}

export enum BloodRequestStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum GetUserDonationsQueryEnum {
  CANCELLED = 'cancelled',
  INVITED = 'invited',
  PENDING = 'pending',
  DONATED = 'donated',
}
