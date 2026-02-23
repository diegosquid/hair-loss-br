import { Step } from "./types";

export const STEPS: Step[] = [
  // ───── STEP 1: Perfil Básico ─────
  {
    id: "perfil",
    title: "Perfil Básico",
    subtitle: "Informações gerais que ajudam a contextualizar sua situação",
    icon: "👤",
    questions: [
      {
        id: "genero",
        title: "Qual é o seu gênero biológico?",
        description: "Importante para determinar o padrão de queda e opções de tratamento",
        type: "single",
        weight: 0,
        options: [
          { id: "masculino", label: "Masculino" },
          { id: "feminino", label: "Feminino" },
        ],
      },
      {
        id: "idade",
        title: "Qual é a sua faixa etária?",
        type: "single",
        weight: 1.0,
        options: [
          { id: "18-25", label: "18 a 25 anos", score: 2 },
          { id: "26-35", label: "26 a 35 anos", score: 3 },
          { id: "36-45", label: "36 a 45 anos", score: 4 },
          { id: "46-55", label: "46 a 55 anos", score: 5 },
          { id: "56+", label: "56 anos ou mais", score: 5 },
        ],
      },
      {
        id: "historico_familiar",
        title: "Há histórico de calvície na sua família?",
        description: "A genética é o fator mais determinante na alopecia androgenética",
        type: "single",
        weight: 1.5,
        options: [
          { id: "nenhum", label: "Nenhum familiar com calvície", score: 0 },
          { id: "distante", label: "Parentes distantes (tios, avós)", score: 3 },
          { id: "pai_ou_mae", label: "Pai ou mãe com queda de cabelo", score: 5 },
          { id: "ambos", label: "Ambos os lados da família", score: 8 },
        ],
      },
    ],
  },

  // ───── STEP 2: Padrão de Queda ─────
  {
    id: "padrao",
    title: "Padrão de Queda",
    subtitle: "Identifique como a queda está se manifestando",
    icon: "🔍",
    questions: [
      {
        id: "padrao_queda_masculino",
        title: "Identifique seu padrão na Escala Norwood",
        description: "Clique na imagem que mais se parece com o seu caso atual",
        type: "norwood",
        weight: 2.0,
        genderFilter: "masculino",
        options: [
          { id: "norwood_1", label: "Norwood I", score: 0 },
          { id: "norwood_2", label: "Norwood II", score: 2 },
          { id: "norwood_3", label: "Norwood III", score: 4 },
          { id: "norwood_3v", label: "Norwood III Vertex", score: 5 },
          { id: "norwood_4", label: "Norwood IV", score: 6 },
          { id: "norwood_5", label: "Norwood V", score: 8 },
          { id: "norwood_6", label: "Norwood VI", score: 9 },
          { id: "norwood_7", label: "Norwood VII", score: 10 },
        ],
      },
      {
        id: "padrao_queda_feminino",
        title: "Identifique seu padrão na Escala Ludwig",
        description: "Clique na imagem que mais se parece com o seu caso atual",
        type: "ludwig",
        weight: 2.0,
        genderFilter: "feminino",
        options: [
          { id: "ludwig_1", label: "Ludwig I", score: 2 },
          { id: "ludwig_2", label: "Ludwig II", score: 5 },
          { id: "ludwig_3", label: "Ludwig III", score: 8 },
        ],
      },
      {
        id: "duracao",
        title: "Há quanto tempo você nota queda de cabelo?",
        type: "single",
        weight: 1.2,
        options: [
          { id: "recente", label: "Menos de 6 meses", score: 1 },
          { id: "moderada", label: "6 meses a 2 anos", score: 3 },
          { id: "cronica", label: "2 a 5 anos", score: 5 },
          { id: "longa", label: "Mais de 5 anos", score: 7 },
        ],
      },
      {
        id: "progressao",
        title: "Como está a velocidade da queda?",
        type: "single",
        weight: 1.3,
        options: [
          { id: "estavel", label: "Estável, sem mudança recente", score: 1 },
          { id: "lenta", label: "Progressão lenta e gradual", score: 3 },
          { id: "moderada", label: "Piora perceptível nos últimos meses", score: 5 },
          { id: "rapida", label: "Queda acelerada/intensa recentemente", score: 8 },
        ],
      },
    ],
  },

  // ───── STEP 3: Estilo de Vida ─────
  {
    id: "estilo_vida",
    title: "Estilo de Vida",
    subtitle: "Fatores do dia a dia que influenciam a saúde capilar",
    icon: "🌿",
    questions: [
      {
        id: "estresse",
        title: "Como você classificaria seu nível de estresse?",
        type: "single",
        weight: 0.8,
        options: [
          { id: "baixo", label: "Baixo — vida equilibrada", score: 0 },
          { id: "moderado", label: "Moderado — algumas pressões", score: 2 },
          { id: "alto", label: "Alto — estresse constante", score: 4 },
          { id: "severo", label: "Muito alto — esgotamento/burnout", score: 6 },
        ],
      },
      {
        id: "nutricao",
        title: "Como é a qualidade da sua alimentação?",
        type: "single",
        weight: 0.7,
        options: [
          { id: "boa", label: "Equilibrada e variada", score: 0 },
          { id: "regular", label: "Regular, poderia melhorar", score: 2 },
          { id: "pobre", label: "Dieta restritiva ou desbalanceada", score: 4 },
          { id: "muito_pobre", label: "Alimentação muito pobre/dieta extrema", score: 6 },
        ],
      },
      {
        id: "habitos",
        title: "Marque os hábitos que se aplicam a você",
        type: "multi",
        weight: 0.6,
        options: [
          { id: "sono_irregular", label: "Durmo menos de 6h por noite", score: 2 },
          { id: "tabagismo", label: "Fumo", score: 3 },
          { id: "sedentarismo", label: "Não pratico exercício físico", score: 1 },
          { id: "alcool", label: "Consumo frequente de álcool", score: 1 },
          { id: "nenhum", label: "Nenhum destes", score: 0, exclusive: true },
        ],
      },
    ],
  },

  // ───── STEP 4: Saúde e Tratamentos ─────
  {
    id: "saude",
    title: "Saúde e Tratamentos",
    subtitle: "Condições médicas e tratamentos já experimentados",
    icon: "🏥",
    questions: [
      {
        id: "condicoes_saude",
        title: "Você possui alguma dessas condições?",
        type: "multi",
        weight: 0.9,
        options: [
          { id: "tireoide", label: "Problema de tireoide", score: 2, flags: ["hormonal"] },
          { id: "sop", label: "SOP (Síndrome dos Ovários Policísticos)", score: 2, flags: ["hormonal"] },
          { id: "anemia", label: "Anemia ou deficiência de ferro", score: 2, flags: ["nutricional"] },
          { id: "autoimune", label: "Doença autoimune", score: 2, flags: ["autoimune"] },
          { id: "dermatite", label: "Dermatite seborreica no couro cabeludo", score: 1, flags: ["couro_cabeludo"] },
          { id: "nenhum", label: "Nenhuma condição conhecida", score: 0, exclusive: true },
        ],
      },
      {
        id: "tratamentos_anteriores",
        title: "Quais tratamentos você já tentou?",
        type: "multi",
        weight: 0.5,
        options: [
          { id: "minoxidil", label: "Minoxidil tópico", score: 1 },
          { id: "finasterida", label: "Finasterida ou Dutasterida", score: 1 },
          { id: "suplementos", label: "Vitaminas / suplementos capilares", score: 1 },
          { id: "laser", label: "Laser ou LED capilar", score: 1 },
          { id: "prp", label: "PRP (Plasma Rico em Plaquetas)", score: 1 },
          { id: "transplante", label: "Transplante capilar", score: 1 },
          { id: "nenhum", label: "Nunca tentei nenhum tratamento", score: 0, exclusive: true },
        ],
      },
    ],
  },

  // ───── STEP 5: Objetivos ─────
  {
    id: "objetivos",
    title: "Seus Objetivos",
    subtitle: "O que você espera alcançar com o tratamento",
    icon: "🎯",
    questions: [
      {
        id: "objetivo",
        title: "Qual é o seu principal objetivo?",
        description: "Isso nos ajuda a calibrar as recomendações para sua realidade",
        type: "single",
        weight: 0,
        options: [
          { id: "prevenir", label: "Prevenir queda futura" },
          { id: "estabilizar", label: "Estabilizar a queda atual" },
          { id: "recuperar", label: "Recuperar cabelo perdido" },
          { id: "restaurar", label: "Restauração completa" },
        ],
      },
    ],
  },
];
