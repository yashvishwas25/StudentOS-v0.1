import { useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { validateUsername, validatePassword } from "../utils/validators";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const successMessage = location.state?.message;
  const sessionExpired = searchParams.get("expired") === "1";

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
      await login(form.username, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="mb-5 text-center text-lg font-semibold text-ink">Log in</h2>

      {successMessage && (
        <p className="mb-4 rounded-md bg-success/10 px-3 py-2 text-sm text-success">
          {successMessage}
        </p>
      )}

      {sessionExpired && (
        <p className="mb-4 rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">
          Your session has expired. Please log in again.
        </p>
      )}

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

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit" loading={loading} className="w-full">
          Log in
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-muted">
        New to StudentOS?{" "}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;