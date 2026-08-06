const PUBLICOS_OBJETIVO = ["Familias interesadas", "Profesionales", "Comunidad", "Todos"]
const ESTADOS = ["Publicado", "Borrador"]

const fieldLabel = "mb-1 block text-sm font-medium text-base-content/80"

export default function ProgramaFields({ values = {} }) {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="programa-nombre" className={fieldLabel}>
          Nombre del programa <span className="text-error">*</span>
        </label>
        <input
          id="programa-nombre"
          name="nombre"
          required
          maxLength={120}
          defaultValue={values.nombre}
          placeholder="Ej. Orientación inicial"
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label htmlFor="programa-corta" className={fieldLabel}>
          Descripción corta
        </label>
        <textarea
          id="programa-corta"
          name="descripcion_corta"
          rows={2}
          maxLength={280}
          defaultValue={values.descripcion_corta}
          placeholder="Resumen breve que se muestra en las tarjetas públicas."
          className="textarea textarea-bordered w-full"
        />
      </div>

      <div>
        <label htmlFor="programa-completa" className={fieldLabel}>
          Descripción completa
        </label>
        <textarea
          id="programa-completa"
          name="descripcion_completa"
          rows={5}
          defaultValue={values.descripcion_completa}
          placeholder="Información detallada del programa: en qué consiste, a quién está dirigido, cómo participar…"
          className="textarea textarea-bordered w-full"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="programa-publico" className={fieldLabel}>
            Público objetivo
          </label>
          <select
            id="programa-publico"
            name="publico_objetivo"
            defaultValue={values.publico_objetivo || "Todos"}
            className="select select-bordered w-full"
          >
            {PUBLICOS_OBJETIVO.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="programa-estado" className={fieldLabel}>
            Estado
          </label>
          <select
            id="programa-estado"
            name="estado"
            defaultValue={values.estado || "Borrador"}
            className="select select-bordered w-full"
          >
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="programa-orden" className={fieldLabel}>
            Orden de visualización
          </label>
          <input
            id="programa-orden"
            type="number"
            name="orden"
            min={0}
            defaultValue={values.orden ?? 0}
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  )
}
