function showBirthday() {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  const resultDiv = document.getElementById("result");

  // ============================================
  // Функция определения високосного года
  // ============================================
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  // ============================================
  // Вывод даты в формате электронного табло
  // ============================================
  function printDigitalDate(day, month, year) {
    const digits = {
      0: ["*****", "*   *", "*   *", "*   *", "*****"],
      1: ["  *  ", " **  ", "  *  ", "  *  ", "*****"],
      2: ["*****", "*   *", "  ** ", " *   ", "*****"],
      3: ["*****", "*   *", "  ** ", "*   *", "*****"],
      4: ["*   *", "*   *", "*****", "    *", "    *"],
      5: ["*****", "*    ", "*****", "    *", "*****"],
      6: ["*****", "*    ", "*****", "*   *", "*****"],
      7: ["*****", "    *", "   * ", "  *  ", " *   "],
      8: ["*****", "*   *", "*****", "*   *", "*****"],
      9: ["*****", "*   *", "*****", "    *", "*****"],
    };

    const dateStr =
      String(day).padStart(2, "0") +
      "  " +
      String(month).padStart(2, "0") +
      "  " +
      String(year);

    console.log("\n=== Дата рождения ===");
    for (let row = 0; row < 5; row++) {
      let line = "";
      for (let i = 0; i < dateStr.length; i++) {
        const char = dateStr[i];
        if (char === " ") {
          line += " ";
        } else {
          line += digits[char][row];
        }
        line += " ";
      }
      console.log(line);
    }
  }

  // ============================================
  // Функция определения возраста
  // ============================================
  function getAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    resultDiv.textContent = "❌ Пожалуйста, заполните все поля числами.";
    return;
  }

  const birthDate = new Date(year, month - 1, day);

  if (
    birthDate.getFullYear() === year &&
    birthDate.getMonth() === month - 1 &&
    birthDate.getDate() === day &&
    year >= 1900 &&
    year <= 2026
  ) {
    const weekdays = [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ];
    const weekday = weekdays[birthDate.getDay()];

    resultDiv.innerHTML = `Ваша дата рождения: <strong>${day}.${month}.${year}</strong><br>
                               Это был день недели - <strong>${weekday}</strong><br>
                               Это был <strong>${isLeapYear(year) ? "високосный" : "не високосный"} год </strong><br>
                               Ваш возраст <strong>${getAge(birthDate)}</strong>
                               `;
    console.log(printDigitalDate(day, month, year));
  } else {
    resultDiv.textContent =
      "❌ Некорректная дата. Проверьте введённые значения.";
  }
}
