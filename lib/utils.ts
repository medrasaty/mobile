import { Session } from "@/auth/ctx";
import { Subject } from "@/definitions/school.types";

export function parseSession(session: string): Session {
  return JSON.parse(session);
}

export function getSubjectColor(subject: Subject["name"]) {
  subject = subject.toLowerCase();
  switch (subject) {
    case "english":
      return "#FFC107";

    case "arabic":
      return "#03A9F4";

    case "math":
      return "#4CAF50";

    case "physics":
      return "#9C27B0";

    case "chemistry":
      return "#E91E63";

    case "biology":
      return "#2196F3";

    case "history":
      return "#F44336";

    case "geography":
      return "#FF5722";

    case "politics":
      return "#795548";

    case "art":
      return "#FF9800";

    case "religion":
      return "#9C27B0";

    case "science":
      return "#673AB7";

    case "other":
      return "#9E9E9E";

    default:
      return "#9E9E9E";
  }
}
