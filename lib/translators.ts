export function translateSubject(subject: string) {
  switch (subject.toLowerCase()) {
    case "english language":
      return "اللغة الإنجليزية";
    case "arabic language":
      return "اللغة العربية";
    case "math":
      return "الرياضيات";
    case "physics":
      return "الفيزياء";
    case "chemistry":
      return "الكيمياء";
    case "biology":
      return "الاحياء";
    case "history":
      return "التاريخ";
    case "geography":
      return "الجغرافية";
    case "politics":
      return "السياسة";
    case "art":
      return "الفنون";
    case "religion":
      return "الاسلامية";
    case "science":
      return "العلوم";
    case "other":
      return "اخرى";
    default:
      return subject;
  }
}

export function translateGrade(grade: number | null): string {
  switch (grade) {
    case 1:
      return "الاول";
    case 2:
      return "الثاني";
    case 3:
      return "الثالث";
    case 4:
      return "الرابع";
    case 5:
      return "الخامس";
    case 6:
      return "السادس";
    case 7:
      return "السابع";
    case 8:
      return "الثامن";
    case 9:
      return "التاسع";
    case 10:
      return "الاول الثانوي";
    case 11:
      return "الثاني الثانوي";
    case 12:
      return "الثالث الثانوي";
    default:
      return "";
  }
}

export function translateGender(gender: "M" | "F") {
  switch (gender) {
    case "M":
      return "ذكر";
    case "F":
      return "أنثى";
    default:
      return "_";
  }
}

export function translateDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // get current date
  const today = new Date();

  if (today.toDateString() === date.toDateString()) {
    return "اليوم";
  } else if (
    today.toDateString() === new Date(year, month, day).toDateString()
  ) {
    return "هذا الشهر";
  }

  return `${day}/${month}/${year}`;
}
