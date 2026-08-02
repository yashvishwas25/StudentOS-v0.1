export function validateUsername(username) {
  if (!username || !username.trim()) return "Username is required";
  if (username.trim().length < 3) return "Username must be at least 3 characters";
  return "";
}

export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
}

export function validateProjectName(name) {
  if (!name || !name.trim()) return "Project name is required";
  if (name.trim().length < 3) return "Project name must be at least 3 characters";
  return "";
}

export function validateAssignmentTitle(title) {
  if (!title || !title.trim()) return "Assignment title is required";
  if (title.trim().length < 3) return "Assignment title must be at least 3 characters";
  return "";
}