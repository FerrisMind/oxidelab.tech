
export type Locale = 'en' | 'ru' | 'pt-BR';

const translations = {
  en: {
    nav: {
      features: 'Features',
      models: 'Models',
      privacy: 'Privacy',
      download: 'Download',
      github: 'GitHub'
    },
    hero: {
      badge: 'v0.14.0 — Now with Qwen3 MoE support',
      title: 'Private AI chat',
      titleGlow: '100% local',
      description: 'Run large language models on your machine with complete privacy. No cloud. No data sharing. No compromises',
      ctaDownload: 'Download free',
      ctaGithub: 'View on GitHub',
      statLocal: 'Local inference',
      statModels: 'Model architectures',
      statCloud: 'Data sent to cloud',
      windowTitle: 'Oxide Lab — Local AI chat'
    },
    features: {
      label: 'Features',
      title: 'Everything you need for',
      titleGlow: 'private conversations with AI',
      description: 'Oxide Lab combines the power of modern LLMs with complete privacy. No compromises, no subscriptions, no limits',
      items: [
        {
          title: '100% private',
          description: 'All inference happens locally on your machine. Your conversations never leave your device — no cloud, no API calls, no data sharing'
        },
        {
          title: 'Hardware acceleration',
          description: 'Native support for CUDA (NVIDIA), Metal (Apple Silicon), Intel MKL, and CPU. Optimized performance for your hardware'
        },
        {
          title: 'Multi-architecture',
          description: 'Support for Llama, Qwen, Mistral, DeepSeek, Yi, and more. Load GGUF or SafeTensors models directly'
        },
        {
          title: 'Streaming response',
          description: 'Real-time token streaming for instant feedback. See responses as they are generated, just like cloud-based AI'
        },
        {
          title: 'Multi-language UI',
          description: 'Interface available in English, Russian, and Brazilian Portuguese. Built with i18n support for easy localisation'
        },
        {
          title: 'Built with Rust',
          description: 'Powered by Candle ML framework and Tauri v2. Fast, memory-efficient, and secure by design'
        }
      ],
      techStack: 'Built with'
    },
    models: {
      label: 'Compatibility',
      title: 'Run popular',
      titleGlow: 'open models',
      description: 'Oxide Lab supports a wide range of state-of-the-art open-source model architectures',
      llamaDesc: 'The most popular open model family',
      qwenDesc: 'State-of-the-art models from Alibaba Cloud',
      mistralDesc: 'High-performance models for various tasks',
      gemmaDesc: 'Efficient models from Google DeepMind',
      phiDesc: 'Powerful small language models from Microsoft',
      smollmDesc: 'Optimized tiny models for edge devices',
      formatsTitle: 'Supported formats',
      ggufName: 'GGUF',
      ggufDesc: 'Quantized models for efficient inference. Recommended for most users',
      ggufBadge: 'Recommended',
      stName: 'SafeTensors',
      stDesc: 'Full precision models from HuggingFace. Best quality, more VRAM required',
      hfLink: 'Browse models on Hugging Face'
    },
    privacy: {
      label: 'Privacy & security',
      title: 'Your data stays',
      titleGlow: 'with you',
      description: 'In a world where every AI service wants your data, Oxide Lab takes a different approach. Your conversations are yours — we never see them, never store them, never train on them',
      features: [
        {
          title: 'Zero data collection',
          description: 'We don\'t collect any telemetry, usage data, or analytics. Your activity stays on your machine'
        },
        {
          title: 'No internet required',
          description: 'Once you have a model, Oxide Lab works completely offline. No network requests for inference'
        },
        {
          title: 'Local storage only',
          description: 'Conversations and settings are stored locally in encrypted SQLite databases'
        },
        {
          title: 'CSP protected',
          description: 'Content Security Policy prevents any external scripts or connections from running'
        }
      ]
    },
    download: {
      label: 'Download',
      title: 'Get Oxide Lab',
      titleGlow: 'for free',
      description: 'Open source under Apache-2.0 license',
      cpuLink: 'Works on any Windows system',
      gpuLink: 'Requires NVIDIA GPU with CUDA',
      metalDesc: 'M1/M2/M3 chips with Metal acceleration',
      linuxDesc: 'Build from source available',
      requirements: 'System requirements',
      ramLabel: 'RAM',
      ramValue: '4 GB minimum, 8+ GB recommended',
      storageLabel: 'Storage',
      storageValue: '100 MB + model size',
      gpuLabel: 'GPU (optional)',
      gpuValue: 'NVIDIA CUDA or Apple Metal',
      smartscreenWarning: 'Windows users: If you see a "SmartScreen" warning, click More Info → Run Anyway. This is a known false-positive for new open-source projects',
      buildNotice: 'Want to build from source or need a different platform? Check the GitHub repository for build instructions'
    },
    footer: {
      description: 'Private AI chat application with local LLM support. Built with Rust, Tauri, and Svelte',
      product: 'Product',
      resources: 'Resources',
      legal: 'Legal',
      builtWith: 'Built with',
      license: 'Released under Apache-2.0 license'
    }
  },
  ru: {
    nav: {
      features: 'Возможности',
      models: 'Модели',
      privacy: 'Приватность',
      download: 'Скачать',
      github: 'GitHub'
    },
    hero: {
      badge: 'v0.14.0 — Теперь с поддержкой Qwen3 MoE',
      title: 'Приватный AI-чат',
      titleGlow: '100% локально',
      description: 'Запускайте большие языковые модели на своем компьютере с полной конфиденциальностью. Без облака. Без передачи данных. Без компромиссов',
      ctaDownload: 'Скачать бесплатно',
      ctaGithub: 'Смотреть на GitHub',
      statLocal: 'Локальный инференс',
      statModels: 'Архитектур моделей',
      statCloud: 'Данных отправлено в облако',
      windowTitle: 'Oxide Lab — Локальный AI-чат'
    },
    features: {
      label: 'Возможности',
      title: 'Все что нужно для',
      titleGlow: 'приватных бесед с AI',
      description: 'Oxide Lab объединяет мощь современных LLM с полной приватностью. Без компромиссов, подписок и ограничений',
      items: [
        {
          title: '100% приватность',
          description: 'Весь инференс происходит локально. Ваши разговоры никогда не покидают ваше устройство — никакого облака, API-вызовов или передачи данных'
        },
        {
          title: 'Аппаратное ускорение',
          description: 'Нативная поддержка CUDA (NVIDIA), Metal (Apple Silicon), Intel MKL и CPU. Оптимизированная производительность под ваше железо'
        },
        {
          title: 'Мульти-архитектурность',
          description: 'Поддержка Llama, Qwen, Mistral, DeepSeek, Yi и других. Загружайте модели GGUF или SafeTensors напрямую'
        },
        {
          title: 'Потоковый ответ',
          description: 'Стриминг токенов в реальном времени. Видьте ответ по мере его генерации, прямо как в облачных ИИ'
        },
        {
          title: 'Многоязычный интерфейс',
          description: 'Интерфейс доступен на английском, русском и португальском. Полноценная поддержка локализации'
        },
        {
          title: 'Сделано на Rust',
          description: 'Работает на базе Candle ML и Tauri v2. Быстро, эффективно по памяти и безопасно по дизайну'
        }
      ],
      techStack: 'Разработано с использованием'
    },
    models: {
      label: 'Совместимость',
      title: 'Запускайте популярные',
      titleGlow: 'открытые модели',
      description: 'Oxide Lab поддерживает широкий спектр самых современных архитектур моделей с открытым исходным кодом',
      llamaDesc: 'Самое популярное семейство открытых моделей',
      qwenDesc: 'Современные модели от Alibaba Cloud',
      mistralDesc: 'Высокопроизводительные модели для различных задач',
      gemmaDesc: 'Эффективные модели от Google DeepMind',
      phiDesc: 'Мощные компактные языковые модели от Microsoft',
      smollmDesc: 'Оптимизированные мини-модели для мобильных устройств',
      formatsTitle: 'Поддерживаемые форматы',
      ggufName: 'GGUF',
      ggufDesc: 'Квантованные модели для эффективного инференса. Рекомендуется для большинства',
      ggufBadge: 'Рекомендуется',
      stName: 'SafeTensors',
      stDesc: 'Полноточные модели из HuggingFace. Лучшее качество, требуется больше VRAM',
      hfLink: 'Искать модели на Hugging Face'
    },
    privacy: {
      label: 'Приватность и безопасность',
      title: 'Ваши данные остаются',
      titleGlow: 'при вас',
      description: 'В мире, где каждый ИИ-сервис хочет ваши данные, Oxide Lab выбирает другой путь. Ваши разговоры принадлежат вам — мы их не видим, не храним и не обучаемся на них',
      features: [
        {
          title: 'Нулевой сбор данных',
          description: 'Мы не собираем телеметрию, данные об использовании или аналитику. Ваша активность остается на вашем устройстве'
        },
        {
          title: 'Интернет не требуется',
          description: 'После загрузки модели Oxide Lab работает полностью офлайн. Никаких сетевых запросов при генерации'
        },
        {
          title: 'Только локальное хранение',
          description: 'Диалоги и настройки хранятся локально в зашифрованных базах данных SQLite'
        },
        {
          title: 'Защита CSP',
          description: 'Content Security Policy предотвращает запуск любых внешних скриптов или соединений'
        }
      ]
    },
    download: {
      label: 'Скачать',
      title: 'Получить Oxide Lab',
      titleGlow: 'бесплатно',
      description: 'Открытый исходный код под лицензией Apache-2.0',
      cpuLink: 'Работает на любой системе Windows',
      gpuLink: 'Требуется видеокарта NVIDIA с поддержкой CUDA',
      metalDesc: 'Чипы M1/M2/M3 с ускорением Metal',
      linuxDesc: 'Доступна сборка из исходного кода',
      requirements: 'Системные требования',
      ramLabel: 'ОЗУ',
      ramValue: 'Минимум 4 ГБ, рекомендуется 8+ ГБ',
      storageLabel: 'Память',
      storageValue: '100 МБ + размер модели',
      gpuLabel: 'Видеокарта (опционально)',
      gpuValue: 'NVIDIA CUDA или Apple Metal',
      smartscreenWarning: 'Пользователям Windows: Если вы видите предупреждение «SmartScreen», нажмите Подробнее → Выполнить в любом случае. Это ложное срабатывание для новых открытых проектов',
      buildNotice: 'Хотите собрать из исходников или нужна другая платформа? Инструкции доступны в GitHub repository'
    },
    footer: {
      description: 'Приватный ИИ-чат с поддержкой локальных LLM. Создано на Rust, Tauri и Svelte',
      product: 'Продукт',
      resources: 'Ресурсы',
      legal: 'Юридическая информация',
      builtWith: 'Сделано на',
      license: 'Лицензия Apache-2.0'
    }
  },
  'pt-BR': {
    nav: {
      features: 'Recursos',
      models: 'Modelos',
      privacy: 'Privacidade',
      download: 'Baixar',
      github: 'GitHub'
    },
    hero: {
      badge: 'v0.14.0 — Agora com suporte para Qwen3 MoE',
      title: 'Chat de IA privado',
      titleGlow: '100% local',
      description: 'Execute grandes modelos de linguagem em sua máquina com total privacidade. Sem nuvem. Sem compartilhamento de dados. Sem concessões',
      ctaDownload: 'Baixar grátis',
      ctaGithub: 'Ver no GitHub',
      statLocal: 'Inferência local',
      statModels: 'Arquiteturas de modelos',
      statCloud: 'Dados enviados para a nuvem',
      windowTitle: 'Oxide Lab — Chat de IA local'
    },
    features: {
      label: 'Recursos',
      title: 'Tudo o que você precisa para',
      titleGlow: 'conversas privadas com IA',
      description: 'O Oxide Lab combina o poder de LLMs modernos com total privacidade. Sem concessões, sem assinaturas, sem limites',
      items: [
        {
          title: '100% privado',
          description: 'Toda a inferência acontece localmente em sua máquina. Suas conversas nunca saem do seu dispositivo — sem nuvem, sem chamadas de API, sem compartilhamento de dados'
        },
        {
          title: 'Aceleração de hardware',
          description: 'Suporte nativo para CUDA (NVIDIA), Metal (Apple Silicon), Intel MKL e CPU. Performance otimizada para o seu hardware'
        },
        {
          title: 'Multi-arquitetura',
          description: 'Suporte para Llama, Qwen, Mistral, DeepSeek, Yi e mais. Carregue modelos GGUF ou SafeTensors diretamente'
        },
        {
          title: 'Resposta em streaming',
          description: 'Streaming de tokens em tempo real para feedback instantâneo. Veja as respostas conforme são geradas, assim como na IA em nuvem'
        },
        {
          title: 'Interface multi-idioma',
          description: 'Interface disponível em inglês, russo e português brasileiro. Construído com suporte i18n para fácil localização'
        },
        {
          title: 'Construído com Rust',
          description: 'Alimentado pelo framework Candle ML e Tauri v2. Rápido, eficiente em memória e seguro por design'
        }
      ],
      techStack: 'Construído com'
    },
    models: {
      label: 'Compatibilidade',
      title: 'Execute modelos',
      titleGlow: 'populares e abertos',
      description: 'O Oxide Lab suporta uma ampla gama de arquiteturas de modelos de código aberto de última geração',
      llamaDesc: 'A família de modelos abertos mais popular',
      qwenDesc: 'Modelos de última geração da Alibaba Cloud',
      mistralDesc: 'Modelos de alta performance para diversas tarefas',
      gemmaDesc: 'Modelos eficientes do Google DeepMind',
      phiDesc: 'Poderosos modelos de linguagem pequenos da Microsoft',
      smollmDesc: 'Modelos minúsculos otimizados para dispositivos de borda',
      formatsTitle: 'Formatos suportados',
      ggufName: 'GGUF',
      ggufDesc: 'Modelos quantizados para inferência eficiente. Recomendado para a maioria dos usuários',
      ggufBadge: 'Recomendado',
      stName: 'SafeTensors',
      stDesc: 'Modelos de precisão total do HuggingFace. Melhor qualidade, requer mais VRAM',
      hfLink: 'Navegar por modelos no Hugging Face'
    },
    privacy: {
      label: 'Privacidade e segurança',
      title: 'Seus dados ficam',
      titleGlow: 'com você',
      description: 'Em um mundo onde cada serviço de IA quer seus dados, o Oxide Lab segue um caminho diferente. Suas conversas são suas — nós nunca as vemos, nunca as armazenamos, nunca treinamos com elas',
      features: [
        {
          title: 'Coleta zero de dados',
          description: 'Não coletamos telemetria, dados de uso ou análises. Sua atividade permanece em sua máquina'
        },
        {
          title: 'Internet não necessária',
          description: 'Uma vez que você tenha um modelo, o Oxide Lab funciona offline. Sem requisições de rede para inferência'
        },
        {
          title: 'Apenas armazenamento local',
          description: 'Conversas e configurações são armazenadas localmente em bancos de dados SQLite criptografados'
        },
        {
          title: 'Protegido por CSP',
          description: 'A Content Security Policy impede a execução de scripts ou conexões externas'
        }
      ]
    },
    download: {
      label: 'Baixar',
      title: 'Obter o Oxide Lab',
      titleGlow: 'grátis',
      description: 'Código aberto sob licença Apache-2.0',
      cpuLink: 'Funciona em qualquer sistema Windows',
      gpuLink: 'Requer GPU NVIDIA com CUDA',
      metalDesc: 'Chips M1/M2/M3 com aceleração Metal',
      linuxDesc: 'Compilação a partir do código fonte disponível',
      requirements: 'Requisitos do sistema',
      ramLabel: 'RAM',
      ramValue: '4 GB mínimo, 8+ GB recomendado',
      storageLabel: 'Armazenamento',
      storageValue: '100 MB + tamanho do modelo',
      gpuLabel: 'GPU (opcional)',
      gpuValue: 'NVIDIA CUDA ou Apple Metal',
      smartscreenWarning: 'Usuários Windows: Se vir um aviso do «SmartScreen», clique em Mais Informações → Executar assim mesmo. Este é um falso-positivo comum para novos projetos de código aberto',
      buildNotice: 'Quer compilar a partir do código fonte ou precisa de outra plataforma? Verifique o GitHub repository para instruções'
    },
    footer: {
      description: 'Aplicativo de chat de IA privado com suporte a LLMs locais. Construído com Rust, Tauri e Svelte',
      product: 'Produto',
      resources: 'Recursos',
      legal: 'Legal',
      builtWith: 'Construído com',
      license: 'Lançado sob licença Apache-2.0'
    }
  }
};

class i18nManager {
  currentLocale: Locale = $state('en');
  
  constructor() {
    this.init();
  }
  
  init() {
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const savedLocale = localStorage.getItem('oxide_locale') as Locale;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'ru' || savedLocale === 'pt-BR')) {
        this.currentLocale = savedLocale;
        return;
      }

      const lang = window.navigator.language;
      if (lang.startsWith('ru')) {
        this.currentLocale = 'ru';
      } else if (lang.startsWith('pt')) {
        this.currentLocale = 'pt-BR';
      } else {
        this.currentLocale = 'en';
      }
    }
  }

  setLocale(locale: Locale) {
    this.currentLocale = locale;
    if (typeof window !== 'undefined') {
      localStorage.setItem('oxide_locale', locale);
    }
  }

  get t() {
    return translations[this.currentLocale];
  }
}

export const i18n = new i18nManager();
