export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/'/g, "''") // Escape single quotes
    .replace(/;/g, "") // Remove semicolons
    .replace(/--/g, "") // Remove SQL comments
    .replace(/\/\*/g, "") // Remove SQL block comments start
    .replace(/\*\//g, "") // Remove SQL block comments end
    .replace(/xp_/gi, "") // Remove SQL Server extended procedures
    .replace(/sp_/gi, "") // Remove SQL Server stored procedures
    .replace(/exec/gi, "") // Remove EXEC commands
    .replace(/execute/gi, "") // Remove EXECUTE commands
    .replace(/select/gi, "") // Remove SELECT statements
    .replace(/insert/gi, "") // Remove INSERT statements
    .replace(/update/gi, "") // Remove UPDATE statements
    .replace(/delete/gi, "") // Remove DELETE statements
    .replace(/drop/gi, "") // Remove DROP statements
    .replace(/union/gi, "") // Remove UNION statements
    .replace(/script/gi, "") // Remove script tags for XSS prevention
    .trim();
};
export const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}
