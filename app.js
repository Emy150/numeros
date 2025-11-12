// Esperar a que el documento esté listo
document.addEventListener("DOMContentLoaded", function () {

  // Obtener elementos
  const btn = document.getElementById("btn-verificar");
  const input = document.getElementById("numero");
  const resultado = document.getElementById("resultado");
  const loader = document.querySelector(".custom-loader");

  // Al hacer clic en el botón "Verificar"
  btn.addEventListener("click", function () {
    // Tomar el valor del input
    const valor = input.value.trim();

    // Validar que el usuario haya ingresado algo
    if (valor === "") {
      resultado.textContent = "Por favor, ingresa un número.";
      return;
    }

    // Convertir a número
    const n = parseInt(valor);

    // Validar número 0
    if (n === 0) {
      resultado.textContent = "El número 0 no puede ser clasificado como primo ni compuesto. Por favor, ingrese un número mayor que 0.";
      return;
    }

    // Validar número 1
    if (isNaN(n) || n === 1) {
      resultado.textContent = "El número 1 no puede ser clasificado como primo ni compuesto. Por favor, ingrese un número entero mayor que 1.";
      return;
    }

    // Mostrar loader
    loader.style.display = "block";
    resultado.innerHTML = ""; // limpiar resultado mientras carga

    // Esperar 3 segundos antes de mostrar resultado
    setTimeout(() => {
      loader.style.display = "none";

      // ---- Paso 1: Calcular raíz cuadrada entera ----
      let raiz = 0;
      while (raiz * raiz < n) {
        raiz++;
      }

      // Si se pasó, significa que la raíz entera es una menos
      let raizEntera = raiz;
      if (raizEntera * raizEntera > n) {
        raizEntera--;
      }

      // ---- Calcular residuo de la raíz ----
      const residuo = n - (raizEntera * raizEntera);

      // ---- Paso 2: Lista de primos menores o iguales a la raíz ----
      const primos = [];
      for (let i = 2; i <= raizEntera; i++) {
        let esPrimo = true;
        for (let j = 2; j < i; j++) {
          if (i % j === 0) {
            esPrimo = false;
            break;
          }
        }
        if (esPrimo) {
          primos.push(i);
        }
      }

      // ---- Paso 3 y 4: Comprobar divisibilidad ----
      const divisores = [];
      let esCompuesto = false;

      for (let i = 0; i < primos.length; i++) {
        if (n % primos[i] === 0) {
          divisores.push(primos[i]);
          esCompuesto = true;
        }
      }

      // ---- Resultado ----
      let mensaje = "";
      if (esCompuesto) {
        mensaje += `El número ${n} es compuesto.<br>`;
      } else {
        mensaje += `El número ${n} es primo.<br>`;
      }

      mensaje += `Su raíz cuadrada entera es: ${raizEntera}<br>`;
      mensaje += `El residuo de la raíz cuadrada es: ${residuo}<br>`;
      mensaje += `Factores primos menores o iguales a la raíz: ${primos.join(", ") || "Ninguno"}<br><br>`;

      // ---- Nuevo apartado: divisibilidad específica ----
      if (divisores.length > 0) {
        mensaje += `El número ${n} es divisible únicamente entre: ${divisores.join(", ")}.`;
      } else {
        mensaje += `El número ${n} no es divisible por ninguno de los primos menores o iguales a su raíz (${raizEntera}).`;
      }

      // Mostrar resultado en el div
      resultado.innerHTML = mensaje;
    }, 3000); // 3000ms = 3 segundos
  });
});
