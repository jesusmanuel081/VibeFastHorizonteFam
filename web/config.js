// ============================================================
// Horizonte Familiar · config.js
// ------------------------------------------------------------
// ARCHIVO CENTRAL DE CONTENIDO. Todo el copy institucional vive
// aquí para que agregar programas, preguntas o recursos no exija
// tocar el código de la interfaz.
//
// Estructura:
//   - app:      identidad del producto
//   - brand:    identidad visual
//   - features: toggles de funcionalidades
//   - auth:     providers y rutas de login
//   - landing:  navegación y copy de la página pública
//   - content:  secciones de contenido institucional
//   - pricing:  vitrina de precios (se mantiene, no se muestra)
// ============================================================

const config = {
  // -----------------------------------------------------------
  // Identidad de la organización
  // -----------------------------------------------------------
  app: {
    name: "Horizonte Familiar",
    description:
      "Asociación Civil de Chihuahua que promueve, orienta y acompaña procesos de adopción y familias de acogimiento, con información confiable para dar el primer paso.",
    domain: "horizontefamiliar.mx", // sin https://, sin www
    locale: "es",
    defaultUrl: "http://localhost:3000",
  },

  // -----------------------------------------------------------
  // Identidad visual
  // -----------------------------------------------------------
  brand: {
    primary: "#e9a30e", // ámbar cálido: confianza y esperanza
    logoText: "Horizonte Familiar",
    logoSrc: null,
    radius: "1rem",
  },

  // -----------------------------------------------------------
  // Toggles de features
  // -----------------------------------------------------------
  features: {
    waitlist: false,
    googleAuth: true,
    emailLogin: true,
    aiChat: true,
    toolUse: true,
    agents: true,
    mcp: true,
    rag: false,
    posthog: false,
    resend: true,
    pricing: false,
    payments: false,
    hardware: false,
  },

  // -----------------------------------------------------------
  // OpenAI
  // -----------------------------------------------------------
  ai: {
    chatModel: "gpt-4o-mini",
    structuredModel: "gpt-4o-mini",
    agentModel: "gpt-4o",
    embeddingModel: "text-embedding-3-small",
    maxTokens: 1500,
    temperature: 0.4,
  },

  // -----------------------------------------------------------
  // Resend (email transaccional)
  // -----------------------------------------------------------
  email: {
    from: "Horizonte Familiar <onboarding@resend.dev>",
    replyTo: "hola@horizontefamiliar.mx",
    supportEmail: "hola@horizontefamiliar.mx",
  },

  // -----------------------------------------------------------
  // Auth — se mantiene exactamente como estaba
  // -----------------------------------------------------------
  auth: {
    loginUrl: "/login",
    afterLoginUrl: "/dashboard",
    afterLogoutUrl: "/",
    providers: ["google", "email"],
  },

  // -----------------------------------------------------------
  // Landing — navegación y copy público
  // -----------------------------------------------------------
  landing: {
    nav: [
      { label: "Inicio", href: "/" },
      {
        label: "Nosotros",
        href: "/historia",
        children: [
          { label: "Nuestra historia", href: "/historia" },
          { label: "Misión, visión y valores", href: "/mision" },
        ],
      },
      {
        label: "Información",
        href: "/adopcion",
        children: [
          { label: "¿Qué es la adopción?", href: "/adopcion" },
          { label: "Familias de acogimiento", href: "/acogimiento" },
        ],
      },
      { label: "Programas", href: "/programas" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
      { label: "Recursos y guías", href: "/recursos" },
      { label: "Cómo puedes ayudar", href: "/ayudar" },
      { label: "Contacto", href: "/contacto" },
    ],
    hero: {
      eyebrow: "Asociación Civil · Chihuahua",
      title: "Acompañamos el camino hacia una familia, paso a paso.",
      subtitle:
        "Información confiable, orientación cercana y programas de apoyo para personas y familias que desean adoptar o acoger. Aquí resuelves tus dudas antes de dar el primer paso.",
      cta: { label: "Conoce nuestros programas", href: "/programas" },
      ctaSecondary: { label: "Resuelve tus dudas", href: "/preguntas-frecuentes" },
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Resolvemos tus dudas antes de dar el primer paso.",
      items: [
        {
          q: "¿Qué necesito para iniciar un proceso de adopción en Chihuahua?",
          a: "El primer paso no es llenar papeles, es informarte. Te orientamos sobre los requisitos vigentes, los tiempos y el acompañamiento disponible para que llegues preparado a cada etapa.",
        },
        {
          q: "¿Qué es una familia de acogimiento y en qué se diferencia de la adopción?",
          a: "Una familia de acogimiento brinda cuidados temporales a una niña, niño o adolescente mientras se define su situación legal, sin romper su vínculo de origen. La adopción, en cambio, crea un vínculo definitivo. Te explicamos ambas con claridad.",
        },
        {
          q: "¿Puedo acercarme sin comprometerme a un proceso?",
          a: "Sí. Queremos que resuelvas todas tus dudas antes de decidir. Puedes asistir a nuestras pláticas informativas y agendar una orientación sin ningún compromiso.",
        },
        {
          q: "¿Los procesos tienen costo?",
          a: "Como Asociación Civil ofrecemos orientación e información. Te acompañamos a conocer los requisitos oficiales y te recomendamos acudir siempre a las instituciones autorizadas.",
        },
        {
          q: "¿Qué acompañamiento reciben las familias durante el proceso?",
          a: "Acompañamos desde la información inicial, la preparación y la vinculación, hasta el seguimiento posterior, con un trato cercano y confidencial en cada etapa.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Da el primer paso",
      title: "Habla con nosotros cuando te sientas listo.",
      subtitle:
        "No importa en qué punto del camino estés: informarte, resolver dudas o iniciar un proceso. Estamos aquí para acompañarte.",
      cta: { label: "Contáctanos", href: "/contacto" },
      ctaSecondary: { label: "Ver programas", href: "/programas" },
    },
    footer: {
      tagline:
        "Asociación Civil dedicada a promover, orientar y acompañar procesos de adopción y familias de acogimiento en Chihuahua.",
      columns: [
        {
          title: "Información",
          links: [
            { label: "¿Qué es la adopción?", href: "/adopcion" },
            { label: "Familias de acogimiento", href: "/acogimiento" },
            { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
            { label: "Recursos y guías", href: "/recursos" },
          ],
        },
        {
          title: "Nosotros",
          links: [
            { label: "Nuestra historia", href: "/historia" },
            { label: "Misión, visión y valores", href: "/mision" },
            { label: "Nuestros programas", href: "/programas" },
            { label: "Cómo puedes ayudar", href: "/ayudar" },
          ],
        },
        {
          title: "Contacto",
          links: [
            { label: "Contáctanos", href: "/contacto" },
            {
              label: "Documentación técnica",
              href: "/docs",
            },
          ],
        },
      ],
      links: [
        { label: "Contacto", href: "/contacto" },
        { label: "Documentación técnica", href: "/docs" },
      ],
    },
  },

  // -----------------------------------------------------------
  // Content — secciones institucionales
  // Cada página de contenido se construye desde aquí.
  // -----------------------------------------------------------
  content: {
    // Página de inicio
    home: {
      intro: {
        eyebrow: "Bienvenida",
        title: "Un espacio seguro para informarte y decidir.",
        body: [
          "Somos una Asociación Civil de Chihuahua dedicada a promover, orientar y acompañar los procesos de adopción y las familias de acogimiento.",
          "Creemos en el derecho de cada niña, niño y adolescente a crecer en un entorno seguro y amoroso, y en el derecho de cada familia a recibir información clara y acompañamiento humano para dar ese paso.",
        ],
      },
      stepsTitle: "Cómo empezar, a tu ritmo",
      steps: [
        {
          icon: "BookOpen",
          title: "1. Infórmate",
          body: "Explora nuestras secciones sobre adopción y acogimiento. Respondemos las dudas más comunes con información clara y verificada.",
        },
        {
          icon: "MessagesSquare",
          title: "2. Oriéntate",
          body: "Agenda una orientación con nuestro equipo. Escuchamos tu situación y te explicamos las opciones sin compromiso.",
        },
        {
          icon: "HeartHandshake",
          title: "3. Da el primer paso",
          body: "Cuando te sientas listo, te acompañamos en cada etapa del proceso que decidas iniciar.",
        },
      ],
      sectionsCards: [
        { icon: "Heart", title: "¿Qué es la adopción?", body: "Entiende el proceso, los requisitos y lo que implica formar una familia por adopción.", href: "/adopcion" },
        { icon: "Home", title: "Familias de acogimiento", body: "Conoce qué es acoger, en qué se diferencia de adoptar y quién puede ser familia de acogida.", href: "/acogimiento" },
        { icon: "Compass", title: "Nuestra misión", body: "Conoce quiénes somos, por qué lo hacemos y los valores que guían nuestro acompañamiento.", href: "/mision" },
        { icon: "Sprout", title: "Programas", body: "Revisa los programas activos y encuentra el que responda a tu momento.", href: "/programas" },
      ],
    },

    // /historia
    historia: {
      eyebrow: "Nosotros",
      title: "Nuestra historia",
      lede:
        "Horizonte Familiar nace en Chihuahua del encuentro entre personas convencidas de que toda niña, niño y adolescente merece crecer en familia.",
      sections: [
        {
          title: "Un punto de partida",
          body: [
            "Al conocer de cerca la realidad de niñas, niños y adolescentes que esperan una familia, un grupo de profesionales y personas voluntarias decidió crear un espacio donde las familias interesadas encontraran información clara y acompañamiento humano.",
          ],
        },
        {
          title: "Crecer acompañando",
          body: [
            "Desde entonces trabajamos para que la adopción y el acogimiento se vivan con información, preparación y cercanía. No queremos que las familias caminen solas: queremos estar a su lado en cada paso.",
          ],
        },
      ],
    },

    // /mision
    mision: {
      eyebrow: "Nosotros",
      title: "Misión, visión y valores",
      lede:
        "Lo que nos mueve, hacia dónde vamos y los principios con los que acompañamos a cada familia.",
      sections: [
        {
          title: "Nuestra misión",
          body: [
            "Promover, orientar y acompañar procesos de adopción y familias de acogimiento en Chihuahua, ofreciendo información confiable, recursos y una experiencia que inspire confianza y facilite el primer paso hacia la formación y el fortalecimiento de familias.",
          ],
        },
        {
          title: "Nuestra visión",
          body: [
            "Ser una referencia de confianza para las personas interesadas en la adopción y el acogimiento, contribuyendo a que cada niña, niño y adolescente encuentre una familia y un entorno seguro donde desarrollarse.",
          ],
        },
      ],
      valuesTitle: "Nuestros valores",
      values: [
        {
          icon: "HeartHandshake",
          title: "Acompañamiento cercano",
          body: "Estamos al lado de las familias en cada etapa, con trato humano y confidencial.",
        },
        {
          icon: "ShieldCheck",
          title: "Confianza y transparencia",
          body: "Información clara y verificada, y procesos claros que inspiran confianza.",
        },
        {
          icon: "Users",
          title: "Centrados en las personas",
          body: "Nunca reducimos a una niña, niño, adolescente o familia a su situación. Hablamos de personas con derechos, historias y futuro.",
        },
        {
          icon: "Scale",
          title: "Ética y legalidad",
          body: "Orientamos siempre hacia las instituciones y procedimientos autorizados, protegiendo el interés superior de la niñez.",
        },
        {
          icon: "Sun",
          title: "Esperanza",
          body: "Creemos en las segundas oportunidades y en las familias que se construyen desde el amor y la responsabilidad.",
        },
      ],
    },

    // /adopcion
    adopcion: {
      eyebrow: "Información",
      title: "¿Qué es la adopción?",
      lede:
        "La adopción es un acto de amor y de responsabilidad que crea un vínculo familiar permanente entre una niña, niño o adolescente y una familia, con todos los derechos y deberes de una filiación.",
      sections: [
        {
          title: "Un vínculo para toda la vida",
          body: [
            "A través de la adopción, una niña, niño o adolescente pasa a formar parte de una familia de manera definitiva. Es una decisión que transforma la vida de quien es adoptado y de quienes adoptan.",
            "En México la adopción está regulada por la ley y siempre se resuelve considerando el interés superior de la niñez: su bienestar, su seguridad y su derecho a crecer en familia.",
          ],
        },
        {
          title: "El camino, paso a paso",
          body: [
            "Aunque cada caso es único, el proceso suele incluir: información y preparación, presentación de la solicitud y documentos, evaluaciones psicosociales, asignación, y seguimiento posterior a la integración familiar.",
            "Nosotros te orientamos para que llegues preparado a cada etapa y sepas qué esperar, sin prisas y con total claridad.",
          ],
        },
        {
          title: "¿Quién puede adoptar?",
          body: [
            "Las personas mayores de edad en pleno ejercicio de sus derechos, en condiciones de asumir los cuidados de una niña, niño o adolescente. La ley valora la idoneidad de cada solicitante a través de un proceso de evaluación.",
            "No importa si vas solo, en pareja, o tu estructura familiar: lo importante es tu capacidad de brindar un entorno seguro, estable y amoroso.",
          ],
        },
      ],
    },

    // /acogimiento
    acogimiento: {
      eyebrow: "Información",
      title: "¿Qué son las familias de acogimiento?",
      lede:
        "Una familia de acogimiento brinda cuidados temporales a una niña, niño o adolescente mientras se resuelve su situación legal, con la esperanza de un regreso a su familia de origen o una solución definitiva.",
      sections: [
        {
          title: "Cuidar mientras se define el futuro",
          body: [
            "El acogimiento familiar es una respuesta temporal y solidaria: una familia abre su hogar para dar estabilidad, cuidado y afecto a una niña, niño o adolescente sin que se rompa su vínculo con su familia de origen.",
            "Es distinto a la adopción. En el acogimiento, el objetivo es el cuidado y la protección durante un tiempo definido; la adopción, en cambio, crea un vínculo permanente.",
          ],
        },
        {
          title: "Quién puede acoger",
          body: [
            "Personas o familias con disposición para ofrecer cuidados temporales, que pasan por un proceso de preparación y valoración. No se trata de sustituir a la familia de origen, sino de ser un refugio seguro en un momento difícil.",
          ],
        },
        {
          title: "El impacto de acoger",
          body: [
            "Acoger transforma también a quien acoge. Es una experiencia de aprendizaje, de solidaridad y de esperanza que deja huella en toda la familia.",
            "Te acompañamos a resolver tus dudas sobre el proceso, los tiempos y el apoyo que reciben las familias de acogida.",
          ],
        },
      ],
    },

    // /programas — contenido de respaldo cuando no hay base de datos configurada
    programas: {
      eyebrow: "Programas",
      title: "Nuestros programas",
      lede:
        "Programas y acciones pensadas para informarte, orientarte y acompañarte en cada etapa. Encuentra el que responda a tu momento.",
      fallback: [
        {
          id: "programa-orientacion",
          nombre: "Orientación inicial",
          descripcion_corta:
            "Pláticas y asesorías para resolver tus dudas sobre adopción y acogimiento, sin compromiso.",
          publico_objetivo: "Familias interesadas",
          estado: "Publicado",
          orden: 1,
        },
        {
          id: "programa-preparacion",
          nombre: "Preparación para la adopción",
          descripcion_corta:
            "Acompañamiento formativo para entender el proceso y llegar preparado a cada etapa.",
          publico_objetivo: "Familias interesadas",
          estado: "Publicado",
          orden: 2,
        },
        {
          id: "programa-acogimiento",
          nombre: "Familias de acogimiento",
          descripcion_corta:
            "Información y preparación para quienes desean abrir su hogar como familia de acogida.",
          publico_objetivo: "Comunidad",
          estado: "Publicado",
          orden: 3,
        },
        {
          id: "programa-sensibilizacion",
          nombre: "Sensibilización para la comunidad",
          descripcion_corta:
            "Jornadas para comprender la realidad de la niñez en espera de familia y cómo acompañarla.",
          publico_objetivo: "Comunidad",
          estado: "Publicado",
          orden: 4,
        },
      ],
    },

    // /preguntas-frecuentes (la lista vive en landing.faq; aquí copy de apoyo)
    recursos: {
      eyebrow: "Recursos y guías",
      title: "Recursos y guías",
      lede:
        "Materiales elaborados con información confiable para que tomes decisiones informadas.",
      groups: [
        {
          title: "Guías",
          items: [
            {
              icon: "FileText",
              title: "Guía: primeros pasos en adopción",
              body: "Qué esperar al iniciar, qué documentos preparar y a quién acudir.",
              href: "/contacto",
            },
            {
              icon: "FileText",
              title: "Guía: acoger a una niña, niño o adolescente",
              body: "Información esencial sobre el acogimiento familiar y su diferencia con la adopción.",
              href: "/acogimiento",
            },
          ],
        },
        {
          title: "Orientación",
          items: [
            {
              icon: "MessagesSquare",
              title: "Pláticas informativas",
              body: "Sesiones abiertas para resolver dudas generales sobre adopción y acogimiento.",
              href: "/contacto",
            },
            {
              icon: "Phone",
              title: "Asesoría personalizada",
              body: "Orientación confidencial para tu situación particular, sin compromiso.",
              href: "/contacto",
            },
          ],
        },
        {
          title: "Apoyo",
          items: [
            {
              icon: "Users",
              title: "Grupos de familias",
              body: "Espacios de encuentro y apoyo entre familias que viven procesos similares.",
              href: "/ayudar",
            },
            {
              icon: "HeartHandshake",
              title: "Ser voluntario",
              body: "Formas concretas de sumarte a nuestra labor si quieres ayudar.",
              href: "/ayudar",
            },
          ],
        },
      ],
    },

    // /ayudar
    ayudar: {
      eyebrow: "Súmate",
      title: "Cómo puedes ayudar",
      lede:
        "Hay muchas formas de hacer posible que más niñas, niños y adolescentes crezcan en familia.",
      ways: [
        {
          icon: "Share2",
          title: "Comparte la información",
          body: "Difunde nuestro contenido y ayuda a que más personas se informen sobre adopción y acogimiento.",
        },
        {
          icon: "HandHeart",
          title: "Sé voluntario",
          body: "Acompaña en pláticas, actividades y eventos. Tu tiempo y tu talento hacen la diferencia.",
        },
        {
          icon: "Briefcase",
          title: "Suma tu talento profesional",
          body: "Profesionales de la psicología, el derecho y el trabajo social pueden aportar a nuestros programas.",
        },
        {
          icon: "Building2",
          title: "Alianzas institucionales",
          body: "Organizaciones y empresas pueden aliarse con nosotros para ampliar el alcance de nuestros programas.",
        },
        {
          icon: "Heart",
          title: "Forma una familia",
          body: "Si estás considerando adoptar o acoger, permítenos acompañarte a informarte y dar el primer paso.",
        },
        {
          icon: "MessagesSquare",
          title: "Platica con nosotros",
          body: "¿Tienes otra idea? Escríbenos y platiquemos cómo sumar fuerzas.",
        },
      ],
    },

    // /contacto
    contacto: {
      eyebrow: "Contacto",
      title: "Hablemos",
      lede:
        "Escríbenos para resolver dudas, agendar una orientación o conocer nuestros programas. Te respondemos con confianza y confidencialidad.",
      channels: [
        {
          icon: "Mail",
          title: "Correo",
          value: "hola@horizontefamiliar.mx",
          href: "mailto:hola@horizontefamiliar.mx",
        },
        {
          icon: "Phone",
          title: "Teléfono",
          value: "(614) 000 0000",
          href: "tel:+526140000000",
        },
        {
          icon: "MapPin",
          title: "Chihuahua, Chih.",
          value: "Ciudad de Chihuahua, México",
          href: null,
        },
      ],
    },
  },

  // -----------------------------------------------------------
  // Pricing — se conserva en config para referencia futura.
  // No se muestra (features.pricing = false).
  // -----------------------------------------------------------
  pricing: {
    eyebrow: "Precios",
    title: "Simple y sin sorpresas.",
    subtitle: "Empieza gratis. Sube de plan cuando tu producto crezca.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: 0,
        currency: "USD",
        interval: "mes",
        description: "Para probar el producto.",
        features: ["Hasta 100 usuarios", "Soporte por email", "Branding VibeFast"],
        cta: "Empezar gratis",
      },
      {
        id: "pro",
        name: "Pro",
        price: 29,
        currency: "USD",
        interval: "mes",
        description: "Para founders que ya facturan.",
        features: ["Usuarios ilimitados", "Soporte prioritario", "Sin branding"],
        cta: "Probar Pro",
        highlighted: true,
        stripePriceId: "",
      },
    ],
  },
}

export default config
