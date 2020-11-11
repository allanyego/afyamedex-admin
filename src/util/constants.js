export const ROOT_URL =
  process.env.NODE_ENV === "production"
    ? "https://afyamedex.herokuapp.com"
    : "http://localhost:8080";

export const SERVER_URL = `${ROOT_URL}/api/v1`;

export const APPOINTMENT = {
  STATUSES: {
    UNAPPROVED: "UNAPPROVED",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CLOSED: "CLOSED",
  },
  TYPES: {
    VIRTUAL_CONSULTATION: "VIRTUAL_CONSULTATION",
    ONSITE_CONSULTATION: "ONSITE_CONSULTATION",
    ONSITE_TESTS: "ONSITE_TESTS",
  },
};

export const USER = {
  ACCOUNT_TYPES: {
    PROFESSIONAL: "PROFESSIONAL",
    INSTITUTION: "INSTITUTION",
    PATIENT: "PATIENT",
    ADMIN: "ADMIN",
  },
};

export const NOTIFICATION_TYPES = {
  DANGER: "status-error",
  SUCCESS: "status-ok",
  INFO: "neutral-3",
};

export const STORAGE_KEY = "afyamedex-admin-storage-key";

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export const MAX_ATTACHMENT_SIZE = 5000000;

export const NAME_REGEX = /([a-zA-Z]+\s?\b){2,}/g;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
export const REGEX = {
  FULL_NAME: /([a-zA-Z]+\s?\b){2,}/g,
  USERNAME: /^[a-zA-Z0-9]*$/,
};
