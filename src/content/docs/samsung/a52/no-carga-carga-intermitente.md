---
title: No carga o carga intermitente
description: "[Ejemplo] Diagnóstico y procedimiento general para problemas de carga en el Samsung Galaxy A52: no carga, carga lenta o carga con interrupciones."
---

| Campo             | Detalle                                         |
|-------------------|-------------------------------------------------|
| **Marca**         | Samsung                                         |
| **Modelo**        | Galaxy A52                                      |
| **Componente**    | Puerto USB-C / batería / IC de carga            |
| **Dificultad**    | Fácil a Media (depende de la causa)             |
| **Herramientas**  | Destornillador Pentalobe, palanca de apertura, pinzas, lupa o microscopio, aire comprimido |
| **Última actualización** | Pendiente: agregar fecha al publicar    |

---

## Síntoma

- El teléfono no carga aunque esté conectado al cargador.
- La carga comienza y se interrumpe repetidamente.
- La carga es muy lenta (inferior a lo normal).
- El teléfono solo carga en ciertas posiciones del cable.
- Aparece el mensaje "Humedad detectada en el puerto USB".

## Diagnóstico

Empezar siempre por las causas más simples:

1. **Probar con otro cable y otro cargador**: el 40-50 % de los casos se resuelven reemplazando el accesorio.
2. **Revisar el puerto USB-C** con lupa: buscar suciedad compactada, pelusas, pelitos o partículas entre los pines. Es muy común en equipos usados en bolsillos.
3. **Limpiar el puerto** con cuidado usando un palillo de madera (nunca metálico) o aire comprimido a presión moderada.
4. **Reiniciar el equipo** y volver a intentar la carga.
5. **Probar el modo de carga**: conectar el cargador y verificar en Configuración → Batería → Carga si detecta el cargador como rápido o lento.
6. **Revisar el estado de la batería**: Configuración → Batería → Estado de la batería. Pendiente: verificar ruta exacta en Android 13/14 en A52.

Si el problema persiste después de los pasos anteriores, las causas posibles son:

- Puerto USB-C dañado o con pines doblados.
- Batería hinchada o degradada (capacidad muy baja).
- IC de carga de la placa base defectuoso (requiere soldadura o reemplazo de placa).

## Procedimiento

> ⚠️ Este procedimiento es orientativo. Los pasos exactos pueden variar. Si no tienes experiencia en reparaciones, considera llevarlo a un técnico certificado.

### Limpieza del puerto (sin abrir el equipo)

1. Apagar el equipo.
2. Con luz directa, inspeccionar el puerto USB-C.
3. Usar un palillo de madera para extraer pelusas compactadas con movimiento suave de palanca.
4. Aplicar aire comprimido en ráfagas cortas.
5. Encender y probar la carga.

### Reemplazo del puerto USB-C (abriendo el equipo)

1. **Apagar el equipo** y retirar la SIM.
2. **Calentar y abrir la tapa trasera** (ver procedimiento de apertura en el artículo de líneas verdes).
3. **Desconectar la batería**.
4. **Localizar el módulo del puerto USB-C**: en el A52 el puerto está en una placa secundaria conectada por flex a la placa principal. Pendiente: confirmar si es placa separada o soldado a placa principal.
5. **Desconectar el flex** del puerto y retirar los tornillos de sujeción.
6. **Reemplazar el módulo** por uno nuevo.
7. **Probar antes de cerrar**: conectar batería, encender y verificar carga.
8. **Cerrar el equipo**.

## Notas y advertencias

- No insertar objetos metálicos en el puerto; pueden cortocircuitar los pines.
- Si la batería está hinchada (la tapa trasera se levanta o el teléfono no cierra plano), retirarla con precaución y no presionarla. Una batería hinchada puede incendiarse.
- El reemplazo del IC de carga requiere equipo de soldadura SMD y no se recomienda sin experiencia en microelectrónica.
- Usar solo baterías de reemplazo de origen o de proveedor confiable.
