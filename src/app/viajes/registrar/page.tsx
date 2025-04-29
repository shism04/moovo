// src/app/entregas/registrar/page.tsx
"use client";

import { useState } from "react";

export default function RegistrarEntrega() {
  const [tab, setTab] = useState<"manual" | "captura" | "voz">("manual");

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Registrar <span className="text-blue-500">entrega</span></h1>
      <p className="text-gray-600 mb-6">
        Aquí puedes registrar un viaje de entrega de forma manual, mediante una captura de pantalla o usando tu voz. 
        Elige la opción que prefieras para introducir los datos del recorrido.
      </p>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {["manual", "captura", "voz"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item as any)}
            className={`px-4 py-2 capitalize ${
              tab === item ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"
            }`}
          >
            {item === "manual" ? "Manual" : item === "captura" ? "Captura de Pantalla" : "Voz"}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "manual" && <ManualForm />}
      {tab === "captura" && <CapturaForm />}
      {tab === "voz" && <VozForm />}
    </div>
  );
}

function ManualForm() {
  return (
    <div className="space-y-4">
      <FechaHoraDuracion />
      <TarifaRecogidaDestino />
      <GuardarViajeButton />
    </div>
  );
}

function CapturaForm() {
  return (
    <div className="space-y-4">
      <div className="border-dashed border-2 border-gray-300 p-6 text-center">
        <p>Click to upload or drag and drop</p>
        <p className="text-sm text-gray-400">Max. File Size: 30MB</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Browse File</button>
      </div>
      <FechaHoraDuracion />
      <TarifaRecogidaDestino />
      <GuardarViajeButton />
    </div>
  );
}

function VozForm() {
  return (
    <div className="space-y-4">
      <div className="bg-blue-100 p-4 rounded-md text-sm text-blue-700">
        <h2 className="font-semibold mb-2">Instrucciones para registrar por voz</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Fecha</li>
          <li>Hora de entrega</li>
          <li>Duración estimada del trayecto</li>
          <li>Origen y destino</li>
          <li>Tarifa recibida</li>
          <li>Notas adicionales (si las hay)</li>
        </ul>
        <p className="mt-2 italic">
          Ejemplo: "Entrega es a las 10:30, duración 8 minutos, desde McDonald's hasta Calle Peña 23, tarifa 3,87€, sin incidencias."
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-4 rounded-full bg-blue-500 text-white">
          🎤
        </button>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Audio</label>
          <input type="file" accept="audio/*" />
          <p className="text-xs text-gray-400">Formatos permitidos: mp3, wav, mp4</p>
        </div>
      </div>

      <FechaHoraDuracion />
      <TarifaRecogidaDestino />
      <GuardarViajeButton />
    </div>
  );
}

function FechaHoraDuracion() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <input type="date" className="border p-2 rounded-md" placeholder="Fecha" />
      <input type="time" className="border p-2 rounded-md" placeholder="Hora" />
      <input type="text" className="border p-2 rounded-md" placeholder="Duración" />
    </div>
  );
}

function TarifaRecogidaDestino() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input type="text" className="border p-2 rounded-md flex-1" placeholder="Tarifa" />
        <span className="font-bold">€</span>
      </div>
      <input type="text" className="border p-2 rounded-md w-full" placeholder="Recogida" />
      <input type="text" className="border p-2 rounded-md w-full" placeholder="Destino" />
    </div>
  );
}

function GuardarViajeButton() {
  return (
    <button className="w-full bg-blue-500 text-white p-3 rounded-md mt-4">
      Guardar Viaje
    </button>
  );
}
