"use client";

import { useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const[finalerror,setFinalError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    validateField(name, value);  
  };

  const validateField = (name: string, value: string) => {
    let message = "";
    
    switch (name) {
      case "firstName":
        if (value && !/^[A-Za-zÀ-ÿ\s'-]+$/.test(value)) {
          message = "El nombre no puede contener números ni caracteres especiales.";
        }
        break;
      case "lastName":
        if (value && !/^[A-Za-zÀ-ÿ\s'-]+$/.test(value)) {
          message = "El apellido no puede contener números ni caracteres especiales.";
        }
        break;
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Formato de correo electrónico inválido.";
        }
        break;
      case "password":
        if (value && value.length < 6) {
          message = "La contraseña debe tener al menos 6 caracteres.";
        }
        break;
      case "confirmPassword":
        if (value && value !== form.password) {
          message = "Las contraseñas no coinciden.";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    Object.values(formErrors).forEach((errorMessage) => {
      if (errorMessage) isValid = false;
    });
    return isValid && form.firstName && form.lastName && form.email && form.password && form.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setFinalError("Por favor, revisa los errores en el formulario. Asegúrate de que todos los campos estén correctamente completados.");
      return; 
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      }),
    });

    if (res.ok) {
      router.push("/login")
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
        <h2 className="text-2xl font-bold text-center">Crea una cuenta</h2>
        <p className="text-center text-gray-500 mb-6">Es rápido y fácil.</p>
        {finalerror && (<p className="text-xs p-3 border-red-700 bg-red-200 mb-4">{finalerror}</p>)}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={form.firstName}
                onChange={handleChange}
                className={`w-full border p-2 rounded-md focus:outline-none ${formErrors.firstName ? 'border-red-500' : 'border-gray-400'}`}
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs">{formErrors.firstName}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={form.lastName}
                onChange={handleChange}
                className={`w-full border p-2 rounded-md focus:outline-none ${formErrors.lastName ? 'border-red-500' : 'border-gray-400'}`}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs">{formErrors.lastName}</p>
              )}
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className={`w-full border p-2 rounded-md focus:outline-none ${formErrors.email ? 'border-red-500' : 'border-gray-400'}`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs">{formErrors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className={`w-full border p-2 rounded-md focus:outline-none ${formErrors.password ? 'border-red-500' : 'border-gray-400'}`}
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs">{formErrors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 rounded-md border focus:outline-none ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-400'}`}
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-xs">{formErrors.confirmPassword}</p>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Al hacer clic en "Registrarte", aceptas nuestras <span className="text-blue-500">Condiciones</span>. 
            Consulta cómo recopilamos, usamos y compartimos tu información en nuestra <span className="text-blue-500">Política de Privacidad</span> y el uso de cookies en nuestra <span className="text-blue-500">Política de Cookies</span>.
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Registrarte
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta? <a href="/login" className="text-blue-500">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
