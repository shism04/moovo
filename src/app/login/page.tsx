"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError("Por favor, completa todos los campos.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Formato de correo electrónico inválido.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <Image
        src="/logo/logoHorizontal.png"
        alt="Logo de Moovo"
        width={200}
        height={200}
        className="rounded-full"
      />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>
        <p className="text-center text-gray-500 mb-6">Bienvenido de nuevo</p>
        {error && (
            <p className="text-xs p-3 border-red-700 bg-red-200 mb-4">{error}</p>
          )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md transition active:scale-95 hover:bg-blue-600"
            >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿No tienes una cuenta? <a href="/signup" className="text-blue-500">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
