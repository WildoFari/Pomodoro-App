import React, { useState, useEffect } from "react";

const DURACIONES = {
  pomodoro: 25 * 60, // 25 minutos
  corto: 5 * 60,     // 5 minutos
  largo: 15 * 60     // 15 minutos
};

const PomodoroTimer = () => {
  const [modo, setModo] = useState("pomodoro");
  const [segundos, setSegundos] = useState(DURACIONES[modo]);
  const [activo, setActivo] = useState(false);
  const [ciclos, setCiclos] = useState(0);

  useEffect(() => {
    setSegundos(DURACIONES[modo]);
  }, [modo]);

  useEffect(() => {
    let intervalo = null;
    if (activo && segundos > 0) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev - 1);
      }, 1000);
    } else if (segundos === 0) {
      if (modo === "pomodoro") {
        setCiclos((c) => c + 1);
        setModo(ciclos % 4 === 3 ? "largo" : "corto");
      } else {
        setModo("pomodoro");
      }
      setActivo(false);
    }
    return () => clearInterval(intervalo);
  }, [activo, segundos, modo, ciclos]);

  const formatearTiempo = (s) => {
    const min = String(Math.floor(s / 60)).padStart(2, "0");
    const seg = String(s % 60).padStart(2, "0");
    return `${min}:${seg}`;
  };

  const iniciar = () => setActivo(true);
  const pausar = () => setActivo(false);
  const reiniciar = () => {
    setActivo(false);
    setSegundos(DURACIONES[modo]);
  };

  return (
    <div className="pomodoro-timer">
      <h2>{modo === "pomodoro" ? "Pomodoro" : modo === "corto" ? "Descanso Corto" : "Descanso Largo"}</h2>
      <div className="tiempo">{formatearTiempo(segundos)}</div>
      <div className="controles">
        <button onClick={iniciar} disabled={activo}>Iniciar</button>
        <button onClick={pausar} disabled={!activo}>Pausar</button>
        <button onClick={reiniciar}>Reiniciar</button>
      </div>
      <div className="ciclos">Ciclos completados: {ciclos}</div>
    </div>
  );
};

export default PomodoroTimer;
