import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { validateUsername, validatePassword } from "../utils/validators";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const usernameError = validateUsername(form.username);
    const passwordError = validatePassword(form.password);

    if (usernameError || passwordError) {
      setFieldErrors({ username: usernameError, password: passwordError });
      return;
    }

    setLoading(true);

    try {
      await register(form.username, form.password);
      navigate("/login", {
        state: { message: "Account created. Please log in." },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="mb-5 text-center text-lg font-semibold text-ink">Create your account</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="username"
          name="username"
          label="Username"
          value={form.username}
          onChange={handleChange}
          error={fieldErrors.username}
          required
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
          required
        />
        <p className="-mt-2 text-xs text-ink-muted">
          At least 3 characters for username, 6 for password.
        </p>

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit" loading={loading} className="w-full">
          Create account
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;