// Banco de números primos medianos para simulación criptográfica rápida
const primosPool = [104729, 1299709, 15485863, 179424673, 32416190071, 433494437];

/**
 * Simula la generación de una clave dinámica uniendo Fibonacci y Primos
 */
function generarTokenSimbiotico() {
    const fibText = document.getElementById('output-fibonacci');
    const primosText = document.getElementById('output-primos');
    const tokenText = document.getElementById('output-token');

    // 1. Fase Fibonacci: Generar saltos dinámicos en la semilla
    let f0 = 0, f1 = 1, temp;
    let iteracionesRandom = Math.floor(Math.random() * 8) + 5; // Salto orgánico entre F(5) y F(12)
    
    for (let i = 0; i < iteracionesRandom; i++) {
        temp = f0 + f1;
        f0 = f1;
        f1 = temp;
    }
    // f1 ahora contiene el valor de Fibonacci usado para alterar el bit-rate
    if (fibText) fibText.innerHTML = `F(${iteracionesRandom}) calculado en paso previo: <strong>${f1}</strong>. Desfase temporal activo.`;

    // 2. Fase Números Primos: Simulación de factorización RSA asimétrica
    const p = primosPool[Math.floor(Math.random() * primosPool.length)];
    let q = primosPool[Math.floor(Math.random() * primosPool.length)];
    while (q === p) { // Asegurar que no sean el mismo primo
        q = primosPool[Math.floor(Math.random() * primosPool.length)];
    }
    
    // El producto de dos primos crea la base de la clave asimétrica irreversible
    const moduloCifradoN = p * q;
    if (primosText) primosText.innerHTML = `P: ${p} | Q: ${q}. Producto compuesto irreversible (N): <strong>${moduloCifradoN}</strong>`;

    // 3. Fusión final: Crear el bloque de token estético aplicando operaciones sobre N y Fibonacci
    let semillaFinal = moduloCifradoN + f1;
    let stringSemilla = semillaFinal.toString();
    
    // CORRECCIÓN: Asegurar que si el número es muy grande, no rompa el formato (rellena o recorta uniformemente)
    stringSemilla = stringSemilla.padStart(12, "0"); 

    let bloque1 = stringSemilla.substring(0, 4) || "8834";
    let bloque2 = stringSemilla.substring(4, 8) || "9120";
    let bloque3 = stringSemilla.substring(8, 12) || "4751";
    
    // Inyectar el token en la interfaz con animación de texto
    if (tokenText) tokenText.innerText = `${bloque1}-${bloque2}-${bloque3}`;
    // Función para copiar la llave/token generado en la consola simbiótica
document.getElementById('btn-copiar-token').addEventListener('click', function() {
    var tokenTexto = document.getElementById('output-token').innerText;
    
    // Evitamos copiar si aún está el valor por defecto
    if (tokenTexto === "0000-0000-0000") {
        alert("Primero debes generar una llave de seguridad.");
        return;
    }

    // Copia el texto al portapapeles
    navigator.clipboard.writeText(tokenTexto);
    
    // Feedback visual rápido en el botón
    var boton = this;
    boton.innerText = "¡Copiado! ✔";
    boton.style.borderColor = "#27c93f";
    boton.style.color = "#27c93f";
    
    setTimeout(function() {
        boton.innerText = "📋 Copiar";
        boton.style.borderColor = "#2d3d60";
        boton.style.color = "#79c0ff";
    }, 1500);
});
}

/**
 * PRIME SHIELD - Motor de Verificación Criptográfica Escalar
 */
// CORRECCIÓN: Cambiado al ID específico del botón de la sección de Primos
const btnValidarPrimo = document.getElementById('btn-validar-primo');
if (btnValidarPrimo) {
    btnValidarPrimo.addEventListener('click', validarCodigoPrimo);
}

// --- FUNCIÓN AUXILIAR DE PRIMALIDAD (Para las recomendaciones) ---
function esNumeroPrimo(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

// --- BUSCADOR DE PRIMOS CERCANOS ---
function obtenerPrimosCercanos(num) {
    let menores = [];
    let mayores = [];
    
    // Buscar hacia abajo
    let i = num - 1;
    while (i > 1 && menores.length < 1) {
        if (esNumeroPrimo(i)) menores.push(i);
        i--;
    }
    
    // Buscar hacia arriba
    let j = num + 1;
    while (mayores.length < 1) {
        if (esNumeroPrimo(j)) mayores.push(j);
        j++;
    }
    
    return [...menores, ...mayores];
}

function validarCodigoPrimo() {
    var inputCodigo = document.getElementById('codigo-token');
    var divResultado = document.getElementById('resultado-primos'); 
    
    if (!inputCodigo || !divResultado) return;
    
    var numero = parseInt(inputCodigo.value);

    if (isNaN(numero) || numero < 1) {
        divResultado.innerHTML = `
            <div class='error-box-anim'>
                <span>⚠ ERROR CRÍTICO:</span> Por favor, ingresa un código numérico entero y positivo mayor a 0.
            </div>`;
        return;
    }

    // Casos base escalares
    if (numero === 1) {
        generarGridVisual(false, "SISTEMA VULNERABLE", "El número 1 no es primo por definición. Posee una entropía nula.", numero);
        return;
    }
    if (numero === 2 || numero === 3) {
        generarGridVisual(true, "SISTEMA SEGURO", "Primo absoluto. Excelente nivel de dispersión y protección matemática.", numero);
        return;
    }
    if (numero % 2 === 0 || numero % 3 === 0) {
        var divisor = (numero % 2 === 0) ? 2 : 3;
        generarGridVisual(false, "SISTEMA RECHAZADO", "Código predecible. Es un factor multiplicativo directo de " + divisor + ".", numero);
        return;
    }

    // Algoritmo While de primalidad pura
    var esPrimo = true;
    var factorBuscado = 0;
    var i = 5;

    while (i * i <= numero) {
        if (numero % i === 0) {
            esPrimo = false;
            factorBuscado = i;
            break; 
        }
        if (numero % (i + 2) === 0) {
            esPrimo = false;
            factorBuscado = i + 2;
            break; 
        }
        i = i + 6;
    }

    if (esPrimo) {
        generarGridVisual(true, "SISTEMA SEGURO", "Código aprobado con éxito. Carece por completo de factores de descomición lineal.", numero);
    } else {
        generarGridVisual(false, "SISTEMA RECHAZADO", "Ataque aritmético efectivo. Se detectó que la clave es vulnerable al divisor " + factorBuscado + ".", numero);
    }
    
}

function generarGridVisual(valido, estadoTexto, descripcion, original) {
    var divResultado = document.getElementById('resultado-primos'); 
    
    var colorClase = valido ? "card-segura" : "card-vulnerable";
    var badgeClase = valido ? "tag-seguro" : "tag-rechazado";

    // Generar recomendaciones si no es válido
    let htmlRecomendaciones = "";
    if (!valido) {
        const recomendados = obtenerPrimosCercanos(original);
        htmlRecomendaciones = `
            <div class="sugerencias-box">
                <strong>💡 Alternativas de Alta Entropía recomendadas:</strong>
                <div class="sugerencias-lista">
                    ${recomendados.map(num => `<span class="tag-sugerido" onclick="document.getElementById('codigo-token').value='${num}'; btnValidarPrimo.click();">${num}</span>`).join(' ')}
                </div>
            </div>
        `;
    }

    var html = `
    <h3 class="resultado-titulo" aria-live="polite">> Reporte de Diagnóstico Estructural:</h3>
    <div class="fib-grid">
        
        <div class="fib-item ${colorClase}">
            <span class="fib-nivel">Análisis de Integridad</span>
            <span class="fib-valor">${estadoTexto || 'No evaluado'}</span>
            <span class="fib-flor">
                <span class="tag ${badgeClase || ''}">Filtro Activo</span>
            </span>
        </div>
        
        <div class="fib-item card-datos">
            <span class="fib-nivel">Token Evaluado</span>
            <span class="fib-valor-num" id="token-a-copiar">${original !== undefined && original !== null ? original : '---'}</span>
            <span class="fib-flor">
                <span class="btn-copiar-cyber" role="button" tabindex="0" onclick="copiarTokenAlPortapapeles(this)">📋 Copiar Token</span>
            </span>
        </div>
        
    </div>
    
    <div class="diagnostico-final">
        <strong>Resultado Técnico:</strong> ${descripcion || 'Sin descripción disponible.'}
    </div>

    ${htmlRecomendaciones}
    `;
    
    divResultado.innerHTML = html;
}

// --- FUNCIÓN DE COPIADO AL PORTAPAPELES ---
function copiarTokenAlPortapapeles(elementoBoton) {
    const contenedorTexto = document.getElementById('token-a-copiar');
    if (!contenedorTexto) return;

    const texto = contenedorTexto.innerText;

    navigator.clipboard.writeText(texto).then(() => {
        const textoOriginal = elementoBoton.innerHTML;
        elementoBoton.innerHTML = "✅ ¡Copiado!";
        elementoBoton.classList.add('copiado-exito');
        
        setTimeout(() => {
            elementoBoton.innerHTML = textoOriginal;
            elementoBoton.classList.remove('copiado-exito');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}
/**
 * FIBONACCI SAVER - Motor de Cálculo Financiero Escalar
 */
// CORRECCIÓN: Cambiado al ID específico del botón de la sección de Fibonacci
const btnCalcularFib = document.getElementById('btn-calcular-fibonacci');
if (btnCalcularFib) {
    btnCalcularFib.addEventListener('click', calcularFibonacci);
}

function calcularFibonacci() {
    var inputDinero = document.getElementById('base-dinero');
    var inputNiveles = document.getElementById('niveles');
    var divResultado = document.getElementById('resultado-fibonacci'); // CORRECCIÓN: ID único para no pisar pantallas

    if (!inputDinero || !inputNiveles || !divResultado) return;

    var baseDinero = parseFloat(inputDinero.value);
    var niveles = parseInt(inputNiveles.value);

    if (isNaN(baseDinero) || baseDinero <= 0) {
        divResultado.innerHTML = "<span class='error-msg'>⚠ Por favor, ingresa un depósito inicial válido y mayor a 0.</span>";
        return;
    }
    
    if (isNaN(niveles) || niveles < 2 || niveles > 24) {
        divResultado.innerHTML = "<span class='error-msg'>⚠ El rango de semanas permitido para el reto es de 2 a 24 semanas.</span>";
        return;
    }

    var a = 1; 
    var b = 1; 
    var c;     
    var acumulado = 0; 

    var html = "<h3>Proyección de Ahorro Estructurado:</h3>";
    html = html + "<div class='fib-grid'>"; 

    var i = 1;
    while (i <= niveles) {
        var depositoSemana = a * baseDinero;
        acumulado = acumulado + depositoSemana;

        html = html +
            "<div class='fib-item'>" +
            "  <span class='fib-nivel'>Semana " + i + "</span>" +
            "  <span class='fib-valor'>Bs. " + depositoSemana.toFixed(2) + "</span>" +
            "  <span class='fib-flor'>Total: Bs. " + acumulado.toFixed(2) + "</span>" +
            "</div>";

        c = a + b; 
        a = b;     
        b = c;     
        
        i = i + 1; 
    }

    html = html + "</div>"; 
    divResultado.innerHTML = html;
}