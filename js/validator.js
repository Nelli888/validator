class Validator {
  constructor(fields) {
    this.fields = fields;
  }
  validate() {
    return this.fields.map((field) => {
      const inputValue = field.input.value;
      const validationResults = field.rules.map((rule) => {
        return rule(inputValue);
      });
      const success = validationResults.every((result) => result === true);
      return {
        input: field.input,
        success,
        errorMessage: success ? null : field.errorMessage,
      };
    });
  }
  static isRequired(value) {
    return value.replace(/\s/g, "").length > 0;
  }
  static isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  static isDate(value) {
    const [day, month, year] = value.split("-").map((value) => Number(value));

    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  }
}
