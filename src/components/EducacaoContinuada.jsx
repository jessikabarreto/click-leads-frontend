import React, { useState, useEffect } from 'react';
import './EducacaoContinuada.css';

const EducacaoContinuada = ({ currentPage }) => {
  const [currentTip, setCurrentTip] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [completedTips, setCompletedTips] = useState([]);

  const educationalContent = {
    dashboard: {
      tips: [
        {
          id: 'dashboard-1',
          title: '📊 Interpretando Métricas',
          content: 'Os números do dashboard são seus melhores amigos! Acompanhe diariamente para identificar tendências e oportunidades.',
          action: 'Clique nos cards de estatísticas para ver detalhes'
        },
        {
          id: 'dashboard-2',
          title: '🎯 Definindo Metas',
          content: 'Estabeleça metas SMART (Específicas, Mensuráveis, Atingíveis, Relevantes, Temporais) para cada métrica.',
          action: 'Acesse o painel de Metas para configurar'
        }
      ],
      tutorial: {
        title: '🌟 Bem-vindo ao Dashboard Mágico!',
        steps: [
          'Aqui você tem uma visão geral de toda sua operação',
          'Os cards coloridos mostram suas principais métricas',
          'Use os gráficos para identificar padrões e tendências',
          'Clique em qualquer elemento para mais detalhes'
        ]
      }
    },
    clientes: {
      tips: [
        {
          id: 'clientes-1',
          title: '🤝 Relacionamento é Tudo',
          content: 'Mantenha sempre atualizado o histórico de interações com cada cliente. Isso cria confiança e melhora o atendimento.',
          action: 'Use as notas para registrar cada contato'
        },
        {
          id: 'clientes-2',
          title: '📈 Segmentação Inteligente',
          content: 'Agrupe seus clientes por perfil, valor ou necessidades. Isso permite estratégias mais eficazes.',
          action: 'Use os filtros para criar segmentações'
        }
      ],
      tutorial: {
        title: '👥 Gestão de Clientes Encantadora',
        steps: [
          'Cada cliente é único e especial',
          'Mantenha dados sempre atualizados',
          'Use tags para organizar melhor',
          'Acompanhe o histórico de serviços'
        ]
      }
    },
    leads: {
      tips: [
        {
          id: 'leads-1',
          title: '⚡ Velocidade na Qualificação',
          content: 'Leads quentes esfriam rapidamente! Responda em até 5 minutos para maximizar conversões.',
          action: 'Configure alertas automáticos'
        },
        {
          id: 'leads-2',
          title: '🎯 Qualificação BANT',
          content: 'Use os critérios BANT: Budget (Orçamento), Authority (Autoridade), Need (Necessidade), Timeline (Prazo).',
          action: 'Preencha todos os campos de qualificação'
        }
      ],
      tutorial: {
        title: '🎯 Captação de Leads Mágica',
        steps: [
          'Todo lead é uma oportunidade de ouro',
          'Qualifique rapidamente para não perder tempo',
          'Use o funil para acompanhar o progresso',
          'Automatize o que for possível'
        ]
      }
    },
    'seo-sites': {
      tips: [
        {
          id: 'seo-1',
          title: '🔍 SEO é Maratona, não Sprint',
          content: 'Resultados de SEO levam tempo. Foque em conteúdo de qualidade e otimizações técnicas consistentes.',
          action: 'Acompanhe rankings semanalmente'
        },
        {
          id: 'seo-2',
          title: '📱 Mobile First',
          content: 'Google prioriza sites mobile-friendly. Sempre teste a experiência mobile antes de publicar.',
          action: 'Use ferramentas de teste mobile'
        }
      ],
      tutorial: {
        title: '🌐 SEO Sites Poderosos',
        steps: [
          'SEO é a base do sucesso online',
          'Foque em palavras-chave relevantes',
          'Conteúdo de qualidade é rei',
          'Monitore constantemente os resultados'
        ]
      }
    },
    'google-perfil': {
      tips: [
        {
          id: 'google-perfil-1',
          title: '📍 Presença Local Forte',
          content: 'Google Meu Negócio é crucial para negócios locais. Mantenha informações sempre atualizadas.',
          action: 'Poste regularmente e responda avaliações'
        },
        {
          id: 'google-perfil-2',
          title: '⭐ Avaliações são Ouro',
          content: 'Incentive avaliações positivas e responda todas profissionalmente. Isso melhora o ranking local.',
          action: 'Crie um processo de solicitação de avaliações'
        }
      ],
      tutorial: {
        title: '📍 Google Perfil Otimizado',
        steps: [
          'Sua vitrine digital no Google',
          'Fotos atraem mais clientes',
          'Responda todas as avaliações',
          'Poste novidades regularmente'
        ]
      }
    },
    'redes-sociais': {
      tips: [
        {
          id: 'redes-sociais-1',
          title: '📱 Consistência é Chave',
          content: 'Poste regularmente e mantenha uma identidade visual consistente em todas as redes.',
          action: 'Use um calendário editorial'
        },
        {
          id: 'redes-sociais-2',
          title: '💬 Engajamento Real',
          content: 'Responda comentários e mensagens rapidamente. Interação genuína constrói comunidade.',
          action: 'Reserve tempo diário para interações'
        }
      ],
      tutorial: {
        title: '📱 Redes Sociais Encantadoras',
        steps: [
          'Cada rede tem sua personalidade',
          'Conteúdo visual atrai mais',
          'Interaja genuinamente com seguidores',
          'Analise métricas para melhorar'
        ]
      }
    },
    'trafego-pago': {
      tips: [
        {
          id: 'trafego-pago-1',
          title: '💰 ROI é Prioridade',
          content: 'Monitore constantemente o retorno sobre investimento. Pause campanhas que não performam.',
          action: 'Configure conversões e acompanhe CPA'
        },
        {
          id: 'trafego-pago-2',
          title: '🎯 Segmentação Precisa',
          content: 'Quanto mais específica a segmentação, melhor a performance. Teste diferentes públicos.',
          action: 'Crie personas detalhadas'
        }
      ],
      tutorial: {
        title: '💰 Tráfego Pago Eficiente',
        steps: [
          'Cada clique custa dinheiro',
          'Segmente com precisão',
          'Teste constantemente',
          'Otimize baseado em dados'
        ]
      }
    }
  };

  useEffect(() => {
    const content = educationalContent[currentPage];
    if (content && content.tips.length > 0) {
      // Mostrar dica aleatória que ainda não foi completada
      const availableTips = content.tips.filter(tip => !completedTips.includes(tip.id));
      if (availableTips.length > 0) {
        const randomTip = availableTips[Math.floor(Math.random() * availableTips.length)];
        setCurrentTip(randomTip);
      }
    }
  }, [currentPage, completedTips]);

  const markTipAsCompleted = (tipId) => {
    setCompletedTips(prev => [...prev, tipId]);
    setCurrentTip(null);
  };

  const startTutorial = () => {
    setShowTutorial(true);
  };

  const content = educationalContent[currentPage];
  if (!content) return null;

  return (
    <div className="educacao-continuada">
      {/* Dica flutuante */}
      {currentTip && (
        <div className="tip-container">
          <div className="tip-card">
            <div className="tip-header">
              <h4 className="tip-title">{currentTip.title}</h4>
              <button 
                className="tip-close"
                onClick={() => setCurrentTip(null)}
              >
                ✕
              </button>
            </div>
            <div className="tip-content">
              <p>{currentTip.content}</p>
              {currentTip.action && (
                <div className="tip-action">
                  <strong>💡 Dica:</strong> {currentTip.action}
                </div>
              )}
            </div>
            <div className="tip-actions">
              <button 
                className="btn-tip secondary"
                onClick={() => setCurrentTip(null)}
              >
                Depois
              </button>
              <button 
                className="btn-tip primary"
                onClick={() => markTipAsCompleted(currentTip.id)}
              >
                Entendi! ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial modal */}
      {showTutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-modal">
            <div className="tutorial-header">
              <h3>{content.tutorial.title}</h3>
              <button 
                className="tutorial-close"
                onClick={() => setShowTutorial(false)}
              >
                ✕
              </button>
            </div>
            <div className="tutorial-content">
              <div className="tutorial-steps">
                {content.tutorial.steps.map((step, index) => (
                  <div key={index} className="tutorial-step">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-text">{step}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tutorial-actions">
              <button 
                className="btn-tutorial"
                onClick={() => setShowTutorial(false)}
              >
                Começar Jornada! 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão de ajuda flutuante */}
      <button 
        className="help-button"
        onClick={startTutorial}
        title="Tutorial da página"
      >
        <span className="help-icon">🎓</span>
        <span className="help-text">Tutorial</span>
      </button>
    </div>
  );
};

export default EducacaoContinuada;

